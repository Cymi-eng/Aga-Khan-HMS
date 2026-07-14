import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db, googleProvider } from "../config/firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);


  // Register User

  const register = async (email, password, fullName) => {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(result.user, {
      displayName: fullName,
    });

    await setDoc(doc(db, "users", result.user.uid), {
      uid: result.user.uid,
      fullName,
      email,
      role: "patient",
      provider: "email",
      createdAt: serverTimestamp(),
    });

    return result;
  };


  // Login

  const login = (email, password) => {
    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  // Google Login

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(
      auth,
      googleProvider
    );

    const userRef = doc(db, "users", result.user.uid);

    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: result.user.uid,
        fullName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role: "patient",
        provider: "google",
        createdAt: serverTimestamp(),
      });
    }

    return result;
  };


  // Logout
 
  const logout = () => {
    return signOut(auth);
  };

  // Forgot Password

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };


  // Listen for Auth Changes
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setCurrentUser(user);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    register,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
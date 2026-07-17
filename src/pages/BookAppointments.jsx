import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  UserRound,
  Stethoscope,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "@/config/firebase";
import { useNavigate } from "react-router-dom";

export default function BookAppointment() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    patientName: currentUser?.displayName || "",
    email: currentUser?.email || "",
    phone: "",
    department: "",
    doctor: "",
    date: "",
    time: "",
    reason: "",
  });

  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const doctors = {
    Cardiology: [
      "Dr. Sarah Ahmed",
      "Dr. David Mwangi",
    ],

    Pediatrics: [
      "Dr. Grace Wanjiku",
      "Dr. Kevin Otieno",
    ],

    Orthopedics: [
      "Dr. John Kimani",
      "Dr. Mercy Achieng",
    ],

    Dermatology: [
      "Dr. Faith Njeri",
      "Dr. Brian Kiptoo",
    ],

    Dentistry: [
      "Dr. Peter Mutua",
      "Dr. Anne Chebet",
    ],

    General: [
      "Dr. James Kariuki",
      "Dr. Susan Naliaka",
    ],
  };

  const timeSlots = useMemo(
    () => [
      "08:00",
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
    ],
    []
  );

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      patientName: currentUser?.displayName || "",
      email: currentUser?.email || "",
    }));
  }, [currentUser]);

  useEffect(() => {
    const loadBookedSlots = async () => {
      if (!formData.doctor || !formData.date) {
        setBookedSlots([]);
        return;
      }

      setLoadingSlots(true);

      try {
        const q = query(
          collection(db, "appointments"),
          where("doctorName", "==", formData.doctor),
          where("date", "==", formData.date)
        );

        const snapshot = await getDocs(q);

        const slots = [];

        snapshot.forEach((doc) => {
          const data = doc.data();

          if (
            data.status === "Pending" ||
            data.status === "Approved" ||
            data.status === "pending" ||
            data.status === "approved"
          ) {
            slots.push(data.time);
          }
        });

        setBookedSlots(slots);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingSlots(false);
      }
    };

    loadBookedSlots();
  }, [formData.doctor, formData.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,

      ...(name === "department"
        ? {
            doctor: "",
            time: "",
          }
        : {}),

      ...(name === "doctor"
        ? {
            time: "",
          }
        : {}),

      ...(name === "date"
        ? {
            time: "",
          }
        : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error("Please login first.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(formData.date);

    if (selectedDate < today) {
      toast.error("You cannot book a previous date.");
      return;
    }

    if (!formData.time) {
      toast.error("Please select an appointment time.");
      return;
    }

    try {
      // Doctor already booked?

      const doctorQuery = query(
        collection(db, "appointments"),
        where("doctorName", "==", formData.doctor),
        where("date", "==", formData.date),
        where("time", "==", formData.time)
      );

      const doctorSnapshot = await getDocs(doctorQuery);

      const doctorBooked = doctorSnapshot.docs.some((doc) => {
        const status = doc.data().status?.toLowerCase();

        return (
          status === "pending" ||
          status === "approved"
        );
      });

      if (doctorBooked) {
        toast.error(
          "This doctor already has an appointment at that time."
        );

        return;
      }

      // Patient already booked?

      const patientQuery = query(
        collection(db, "appointments"),
        where("userId", "==", currentUser.uid),
        where("date", "==", formData.date),
        where("time", "==", formData.time)
      );

      const patientSnapshot = await getDocs(patientQuery);

      if (!patientSnapshot.empty) {
        toast.error(
          "You already have another appointment at this time."
        );

        return;
      }
            await addDoc(collection(db, "appointments"), {
        userId: currentUser.uid,
        patientName: formData.patientName,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        doctorName: formData.doctor,
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      toast.success("Appointment booked successfully.");

      navigate("/appointment-success");

      setFormData({
        patientName: currentUser.displayName || "",
        email: currentUser.email || "",
        phone: "",
        department: "",
        doctor: "",
        date: "",
        time: "",
        reason: "",
      });

      setBookedSlots([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to book appointment.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 pt-32 pb-16 px-5">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-3xl text-[#1a365d] flex items-center gap-3">
              <CalendarDays />
              Book an Appointment
            </CardTitle>

            <CardDescription>
              Schedule an appointment with one of our specialists.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <Label>Patient Name</Label>

                  <Input
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label>Email Address</Label>

                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <Label>Phone Number</Label>

                  <Input
                    name="phone"
                    value={formData.phone}
                    placeholder="+254..."
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label>Department</Label>

                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                    required
                  >
                    <option value="">
                      Select Department
                    </option>

                    {Object.keys(doctors).map((dept) => (
                      <option
                        key={dept}
                        value={dept}
                      >
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label>
                  <Stethoscope className="inline mr-2 h-4 w-4" />
                  Doctor
                </Label>

                <select
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                  disabled={!formData.department}
                  required
                >
                  <option value="">
                    Select Doctor
                  </option>

                  {formData.department &&
                    doctors[
                      formData.department
                    ].map((doctor) => (
                      <option
                        key={doctor}
                        value={doctor}
                      >
                        {doctor}
                      </option>
                    ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <Label>
                    <CalendarDays className="inline mr-2 h-4 w-4" />
                    Appointment Date
                  </Label>

                  <Input
                    type="date"
                    name="date"
                    value={formData.date}
                    min={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label>
                    <Clock className="inline mr-2 h-4 w-4" />
                    Available Time
                  </Label>

                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                    disabled={
                      !formData.doctor ||
                      !formData.date ||
                      loadingSlots
                    }
                    required
                  >
                    <option value="">
                      {loadingSlots
                        ? "Loading..."
                        : "Select Time"}
                    </option>

                    {timeSlots.map((slot) => (
                      <option
                        key={slot}
                        value={slot}
                        disabled={bookedSlots.includes(slot)}
                      >
                        {slot}
                        {bookedSlots.includes(slot)
                          ? " (Booked)"
                          : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label>
                  <UserRound className="inline mr-2 h-4 w-4" />
                  Reason for Visit
                </Label>

                <textarea
                  rows={4}
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Describe your symptoms..."
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1a365d] hover:bg-[#163050] text-white"
              >
                Book Appointment
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
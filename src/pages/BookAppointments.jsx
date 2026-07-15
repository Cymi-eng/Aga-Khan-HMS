import { useEffect, useState } from "react";
import { CalendarDays, Clock, UserRound, Stethoscope } from "lucide-react";
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
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      ...(e.target.name === "department" && { doctor: "" }),
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!currentUser) {
    toast.error("Please login first.");
    return;
  }

  try {
    await addDoc(collection(db, "appointments"), {
      patientId: currentUser.uid,
      patientName: formData.patientName,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
      doctor: formData.doctor,
      date: formData.date,
      time: formData.time,
      reason: formData.reason,
      status: "Pending",
      createdAt: serverTimestamp(),
    });

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

  } catch (error) {
    console.error("Booking Error:", error);
    toast.error(error.message);
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
                    placeholder="+254..."
                    value={formData.phone}
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
                    <option value="">Select Department</option>
                    {Object.keys(doctors).map((dept) => (
                      <option key={dept}>
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
                  required
                  disabled={!formData.department}
                >
                  <option value="">
                    Select Doctor
                  </option>

                  {formData.department &&
                    doctors[formData.department].map((doctor) => (
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
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label>
                    <Clock className="inline mr-2 h-4 w-4" />
                    Preferred Time
                  </Label>

                  <Input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
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
                  placeholder="Briefly describe your symptoms or reason for the appointment..."
                  required
                />

              </div>

              <Button
                type="submit"
                className="w-full bg-[#1a365d] hover:bg-[#163050]"
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
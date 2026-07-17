import { useEffect, useMemo, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import {
  Search,
  Mail,
  Phone,
  Stethoscope,
  CalendarClock,
  CheckCircle2,
  XCircle,
  Trash2,
  CalendarX,
  MessageSquarePlus,
} from "lucide-react";

const C = {
  bg: "#F3F5F9",
  card: "#FFFFFF",
  border: "#E7EAF0",
  ink: "#171E2E",
  inkSoft: "#6B7280",
  blue: "#2E6FED",
  blueTint: "#E4ECFE",
  green: "#16A34A",
  greenTint: "#E1F6E9",
  red: "#E5484D",
  redTint: "#FBE4E4",
  orange: "#F5A524",
  orangeTint: "#FDF1DC",
};

const STATUS_STYLES = {
  Pending: { color: C.orange, tint: C.orangeTint },
  Approved: { color: C.green, tint: C.greenTint },
  Rejected: { color: C.red, tint: C.redTint },
};

function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // id of the appointment whose feedback panel is currently expanded inline
  const [openFeedbackId, setOpenFeedbackId] = useState(null);
  const [feedbackDraft, setFeedbackDraft] = useState("");

  // id of the appointment whose "reason for rejection" panel is open inline
  const [openReasonId, setOpenReasonId] = useState(null);
  const [reasonDraft, setReasonDraft] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "appointments"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAppointments(
        snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesSearch =
        appointment.patientName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        appointment.doctorName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        appointment.department
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        appointment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, search, statusFilter]);

  // Used for Approve, which needs no extra input
  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "appointments", id), {
        status,
        rejectionReason: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Reject requires a reason - open the inline panel instead of a browser prompt
  const toggleReasonPanel = (appointment) => {
    if (openReasonId === appointment.id) {
      setOpenReasonId(null);
      return;
    }
    setOpenFeedbackId(null);
    setOpenReasonId(appointment.id);
    setReasonDraft(appointment.rejectionReason || "");
  };

  const confirmRejection = async (id) => {
    if (reasonDraft.trim() === "") return;

    try {
      await updateDoc(doc(db, "appointments", id), {
        status: "Rejected",
        rejectionReason: reasonDraft.trim(),
      });
      setOpenReasonId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm("Delete this appointment?"))
      return;

    try {
      await deleteDoc(
        doc(db, "appointments", id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFeedbackPanel = (appointment) => {
    if (openFeedbackId === appointment.id) {
      setOpenFeedbackId(null);
      return;
    }
    setOpenReasonId(null);
    setOpenFeedbackId(appointment.id);
    setFeedbackDraft(appointment.adminFeedback || "");
  };

  // Save admin feedback for a patient's appointment
  const saveFeedback = async (id) => {
    if (feedbackDraft.trim() === "") return;

    try {
      await updateDoc(doc(db, "appointments", id), {
        adminFeedback: feedbackDraft.trim(),
        feedbackAt: new Date().toISOString(),
      });
      setOpenFeedbackId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: C.bg,
        color: C.ink,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8">

        {/* Header */}

        <div className="mb-6">
          <h1
            style={{
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            Appointments
          </h1>

          <p
            style={{
              fontSize: 14,
              color: C.inkSoft,
              marginTop: 2,
            }}
          >
            Review, approve and manage all
            patient appointments.
          </p>
        </div>

        {/* Toolbar */}

        <div className="flex flex-col sm:flex-row gap-3 mb-5">

          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 flex-1"
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
            }}
          >
            <Search
              size={16}
              style={{
                color: C.inkSoft,
              }}
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search by patient, doctor or department..."
              className="flex-1 bg-transparent outline-none"
              style={{
                fontSize: 13.5,
              }}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-lg px-3 py-2.5"
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              fontSize: 13.5,
              color: C.ink,
            }}
          >
            <option value="All">
              All statuses
            </option>

            {Object.keys(
              STATUS_STYLES
            ).map((status) => (
              <option
                key={status}
                value={status}
              >
                {status}
              </option>
            ))}
          </select>
        </div>
                {/* Directory */}

        <div
          className="rounded-xl overflow-hidden"
          style={{
            background: C.card,
            border: `1px solid ${C.border}`,
          }}
        >
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{
              borderBottom: `1px solid ${C.border}`,
            }}
          >
            <div
              className="flex items-center gap-2"
              style={{
                fontSize: 13,
                color: C.inkSoft,
                fontWeight: 600,
              }}
            >
              <CalendarClock size={15} />

              {loading
                ? "Loading appointments..."
                : `${filteredAppointments.length} appointment${
                    filteredAppointments.length === 1 ? "" : "s"
                  }`}
            </div>
          </div>

          {loading ? (
            <div
              className="px-5 py-10 text-center"
              style={{
                color: C.inkSoft,
                fontSize: 13.5,
              }}
            >
              Loading appointments...
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <CalendarX
                size={28}
                style={{
                  color: C.inkSoft,
                  margin: "0 auto 10px",
                }}
              />

              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                No appointments found
              </div>

              <p
                style={{
                  fontSize: 13,
                  color: C.inkSoft,
                  marginTop: 4,
                }}
              >
                Try a different search or status filter.
              </p>
            </div>
          ) : (
            filteredAppointments.map((appointment) => {
              const statusStyle =
                STATUS_STYLES[appointment.status] ||
                STATUS_STYLES.Pending;

              const canGiveFeedback =
                appointment.status === "Approved" ||
                appointment.status === "Rejected";

              const isFeedbackOpen = openFeedbackId === appointment.id;
              const isReasonOpen = openReasonId === appointment.id;
              const isPanelOpen = isFeedbackOpen || isReasonOpen;

              return (
                <div key={appointment.id}>
                <div
                  className="flex flex-col lg:flex-row lg:items-center gap-3 px-5 py-4"
                  style={{
                    borderBottom: isPanelOpen
                      ? "none"
                      : `1px solid ${C.border}`,
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      width: 42,
                      height: 42,
                      background: C.blueTint,
                      color: C.blue,
                      fontWeight: 700,
                      fontSize: 13,
                    }}
                  >
                    {initials(appointment.patientName)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div
                      style={{
                        fontSize: 14.5,
                        fontWeight: 600,
                      }}
                    >
                      {appointment.patientName}
                    </div>

                    <div
                      className="flex items-center gap-4 flex-wrap mt-1"
                      style={{
                        fontSize: 12.5,
                        color: C.inkSoft,
                      }}
                    >
                      {appointment.email && (
                        <span className="flex items-center gap-1.5">
                          <Mail size={12.5} />
                          {appointment.email}
                        </span>
                      )}

                      {appointment.phone && (
                        <span className="flex items-center gap-1.5">
                          <Phone size={12.5} />
                          {appointment.phone}
                        </span>
                      )}
                    </div>

                    {/* Admin feedback preview, shown once a decision has been made */}
                    {canGiveFeedback && appointment.adminFeedback && (
                      <div
                        className="mt-2 rounded-lg px-2.5 py-1.5"
                        style={{
                          background: C.bg,
                          border: `1px solid ${C.border}`,
                          fontSize: 12,
                          color: C.ink,
                        }}
                      >
                        <span style={{ fontWeight: 600, color: C.inkSoft }}>
                          Feedback:{" "}
                        </span>
                        {appointment.adminFeedback}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 lg:w-44">
                    <div
                      className="flex items-center gap-1.5"
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      <Stethoscope
                        size={13}
                        style={{
                          color: C.inkSoft,
                        }}
                      />

                      {appointment.doctorName}
                    </div>

                    <div
                      style={{
                        fontSize: 12,
                        color: C.inkSoft,
                        marginTop: 2,
                      }}
                    >
                      {appointment.department}
                    </div>
                  </div>

                  <div
                    className="lg:w-32"
                    style={{
                      fontFamily: "monospace",
                      fontSize: 12.5,
                      color: C.inkSoft,
                    }}
                  >
                    <div>{appointment.date}</div>
                    <div>{appointment.time}</div>

                    {appointment.status === "Rejected" &&
                      appointment.rejectionReason && (
                        <div
                          className="mt-2"
                          style={{
                            color: C.red,
                            fontSize: 11,
                            fontFamily: "inherit",
                          }}
                        >
                          <strong>Reason:</strong>{" "}
                          {appointment.rejectionReason}
                        </div>
                      )}
                  </div>

                  <span
                    className="rounded-full px-2.5 py-1 self-start lg:self-auto"
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: statusStyle.color,
                      background: statusStyle.tint,
                    }}
                  >
                    {appointment.status}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateStatus(
                          appointment.id,
                          "Approved"
                        )
                      }
                      className="flex items-center justify-center rounded-lg"
                      style={{
                        width: 32,
                        height: 32,
                        border: `1px solid ${C.border}`,
                        color: C.green,
                      }}
                    >
                      <CheckCircle2 size={15} />
                    </button>

                    <button
                      onClick={() => toggleReasonPanel(appointment)}
                      title="Reject"
                      className="flex items-center justify-center rounded-lg"
                      style={{
                        width: 32,
                        height: 32,
                        border: `1px solid ${C.border}`,
                        background: isReasonOpen
                          ? C.orangeTint
                          : "transparent",
                        color: C.orange,
                      }}
                    >
                      <XCircle size={15} />
                    </button>

                    {/* Feedback button - only relevant once approved or rejected */}
                    {canGiveFeedback && (
                      <button
                        onClick={() => toggleFeedbackPanel(appointment)}
                        title={
                          appointment.adminFeedback
                            ? "Edit feedback"
                            : "Add feedback"
                        }
                        className="flex items-center justify-center rounded-lg"
                        style={{
                          width: 32,
                          height: 32,
                          border: `1px solid ${C.border}`,
                          background:
                            openFeedbackId === appointment.id
                              ? C.blueTint
                              : "transparent",
                          color: C.blue,
                        }}
                      >
                        <MessageSquarePlus size={15} />
                      </button>
                    )}

                    <button
                      onClick={() =>
                        deleteAppointment(
                          appointment.id
                        )
                      }
                      className="flex items-center justify-center rounded-lg"
                      style={{
                        width: 32,
                        height: 32,
                        border: `1px solid ${C.border}`,
                        color: C.red,
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {isFeedbackOpen && (
                  <div
                    className="px-5 py-4"
                    style={{
                      background: C.bg,
                      borderBottom: `1px solid ${C.border}`,
                    }}
                  >
                    <label
                      style={{
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: C.inkSoft,
                      }}
                    >
                      Message to {appointment.patientName}
                    </label>

                    <textarea
                      value={feedbackDraft}
                      onChange={(e) => setFeedbackDraft(e.target.value)}
                      rows={3}
                      placeholder="e.g. Please bring previous lab results to your visit, or reason for rejection / next steps..."
                      className="w-full rounded-lg px-3 py-2.5 mt-1.5 outline-none"
                      style={{
                        background: C.card,
                        border: `1px solid ${C.border}`,
                        fontSize: 13.5,
                        color: C.ink,
                        resize: "vertical",
                      }}
                    />

                    <div className="flex items-center justify-end gap-2 mt-2.5">
                      <button
                        onClick={() => setOpenFeedbackId(null)}
                        className="rounded-lg px-3.5 py-2"
                        style={{
                          border: `1px solid ${C.border}`,
                          fontSize: 13,
                          fontWeight: 600,
                          color: C.inkSoft,
                        }}
                      >
                        Cancel
                      </button>

                      <button
                        onClick={() => saveFeedback(appointment.id)}
                        disabled={feedbackDraft.trim() === ""}
                        className="rounded-lg px-3.5 py-2"
                        style={{
                          background: C.blue,
                          color: "#fff",
                          fontSize: 13,
                          fontWeight: 600,
                          opacity: feedbackDraft.trim() === "" ? 0.6 : 1,
                        }}
                      >
                        Save feedback
                      </button>
                    </div>
                  </div>
                )}

                {isReasonOpen && (
                  <div
                    className="px-5 py-4"
                    style={{
                      background: C.orangeTint,
                      borderBottom: `1px solid ${C.border}`,
                    }}
                  >
                    <label
                      style={{
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: C.inkSoft,
                      }}
                    >
                      Reason for rejecting {appointment.patientName}'s appointment
                    </label>

                    <textarea
                      value={reasonDraft}
                      onChange={(e) => setReasonDraft(e.target.value)}
                      rows={3}
                      placeholder="e.g. Doctor unavailable at this time, please rebook for another slot..."
                      className="w-full rounded-lg px-3 py-2.5 mt-1.5 outline-none"
                      style={{
                        background: C.card,
                        border: `1px solid ${C.border}`,
                        fontSize: 13.5,
                        color: C.ink,
                        resize: "vertical",
                      }}
                    />

                    <div className="flex items-center justify-end gap-2 mt-2.5">
                      <button
                        onClick={() => setOpenReasonId(null)}
                        className="rounded-lg px-3.5 py-2"
                        style={{
                          border: `1px solid ${C.border}`,
                          fontSize: 13,
                          fontWeight: 600,
                          color: C.inkSoft,
                        }}
                      >
                        Cancel
                      </button>

                      <button
                        onClick={() => confirmRejection(appointment.id)}
                        disabled={reasonDraft.trim() === ""}
                        className="rounded-lg px-3.5 py-2"
                        style={{
                          background: C.red,
                          color: "#fff",
                          fontSize: 13,
                          fontWeight: 600,
                          opacity: reasonDraft.trim() === "" ? 0.6 : 1,
                        }}
                      >
                        Confirm rejection
                      </button>
                    </div>
                  </div>
                )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
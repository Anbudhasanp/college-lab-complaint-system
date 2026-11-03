
import { useState } from "react";
import "./App.css";

const initialComplaints = [
  {
    id: "COMP001",
    student: "Arun",
    equipment: "Computer",
    lab: "Computer Lab 1",
    description: "Monitor is not displaying anything",
    priority: "High",
    status: "Pending",
    technician: "",
    history: ["Complaint registered"],
  },
  {
    id: "COMP002",
    student: "Priya",
    equipment: "Projector",
    lab: "Seminar Hall",
    description: "Projector connection problem",
    priority: "Medium",
    status: "Assigned",
    technician: "Ravi",
    history: ["Complaint registered", "Assigned to Ravi"],
  },
  {
    id: "COMP003",
    student: "Kumar",
    equipment: "Keyboard",
    lab: "Computer Lab 2",
    description: "Keyboard keys are not working",
    priority: "Low",
    status: "In Progress",
    technician: "Ravi",
    history: ["Complaint registered", "Assigned to Ravi", "Repair started"],
  },
];

const technicians = ["Ravi", "Kumar", "Suresh"];

function App() {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [complaints, setComplaints] = useState(initialComplaints);
  const [page, setPage] = useState("dashboard");

  const [form, setForm] = useState({
    equipment: "Computer",
    lab: "",
    description: "",
    priority: "Medium",
  });

  function login(e) {
    e.preventDefault();

    if (!name.trim() || !role) {
      alert("Enter your name and select your role");
      return;
    }

    setPage("dashboard");
  }

  function logout() {
    setRole("");
    setName("");
    setPage("dashboard");
  }

  function submitComplaint(e) {
    e.preventDefault();

    if (!form.lab.trim() || !form.description.trim()) {
      alert("Please fill all required fields");
      return;
    }

    const newComplaint = {
      id: "COMP" + Date.now().toString().slice(-6),
      student: name,
      equipment: form.equipment,
      lab: form.lab,
      description: form.description,
      priority: form.priority,
      status: "Pending",
      technician: "",
      history: ["Complaint registered"],
    };

    setComplaints([newComplaint, ...complaints]);

    setForm({
      equipment: "Computer",
      lab: "",
      description: "",
      priority: "Medium",
    });

    setPage("dashboard");
    alert("Complaint submitted successfully!");
  }

  function updateComplaint(id, updates, message) {
    setComplaints((previous) =>
      previous.map((complaint) => {
        if (complaint.id !== id) return complaint;

        return {
          ...complaint,
          ...updates,
          history: [...complaint.history, message],
        };
      })
    );
  }

  const myComplaints =
    role === "student"
      ? complaints.filter((c) => c.student === name)
      : complaints;

  const technicianComplaints =
    role === "technician"
      ? complaints.filter((c) => c.technician === name)
      : [];

  if (!role) {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="logo">🛠️</div>
          <h1>LabCare</h1>
          <p>College Lab Equipment Complaint System</p>

          <form onSubmit={login}>
            <label>Your Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />

            <label>Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Choose your role</option>
              <option value="student">Student / Faculty</option>
              <option value="admin">Admin</option>
              <option value="technician">Technician</option>
            </select>

            <button className="primary-btn" type="submit">
              Login
            </button>
          </form>

          <p className="demo-note">
            Demo login: Try Student, Admin or Technician.
          </p>
        </div>
      </div>
    );
  }

  const allComplaints = complaints;

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>🛠️ LabCare</h2>
        <p className="side-subtitle">Equipment Management</p>

        <button
          className={page === "dashboard" ? "nav-active" : "nav-btn"}
          onClick={() => setPage("dashboard")}
        >
          📊 Dashboard
        </button>

        {role === "student" && (
          <button
            className={page === "new" ? "nav-active" : "nav-btn"}
            onClick={() => setPage("new")}
          >
            ➕ New Complaint
          </button>
        )}

        <div className="sidebar-bottom">
          <p>{name}</p>
          <small>{role.toUpperCase()}</small>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h2>
              {role === "student"
                ? "Student Dashboard"
                : role === "admin"
                ? "Admin Dashboard"
                : "Technician Dashboard"}
            </h2>
            <p>Welcome back, {name}!</p>
          </div>
          <span className="user-avatar">
            {name.charAt(0).toUpperCase()}
          </span>
        </header>

        {page === "new" && role === "student" ? (
          <section className="content-card">
            <h2>Register New Complaint</h2>
            <p>Report faulty lab equipment</p>

            <form onSubmit={submitComplaint} className="complaint-form">
              <label>Equipment</label>
              <select
                value={form.equipment}
                onChange={(e) =>
                  setForm({ ...form, equipment: e.target.value })
                }
              >
                <option>Computer</option>
                <option>Projector</option>
                <option>Keyboard</option>
                <option>Mouse</option>
                <option>Printer</option>
                <option>Monitor</option>
                <option>Network Equipment</option>
                <option>Other</option>
              </select>

              <label>Lab / Room Number</label>
              <input
                placeholder="Example: Computer Lab 1"
                value={form.lab}
                onChange={(e) =>
                  setForm({ ...form, lab: e.target.value })
                }
              />

              <label>Problem Description</label>
              <textarea
                placeholder="Explain the equipment problem..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <label>Priority</label>
              <select
                value={form.priority}
                onChange={(e) =>
                  setForm({ ...form, priority: e.target.value })
                }
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>

              <button className="primary-btn" type="submit">
                Submit Complaint
              </button>
            </form>
          </section>
        ) : (
          <>
            <section className="stats-grid">
              <div className="stat-card">
                <span>Total Complaints</span>
                <h2>{allComplaints.length}</h2>
              </div>

              <div className="stat-card">
                <span>Pending</span>
                <h2>
                  {allComplaints.filter((c) => c.status === "Pending").length}
                </h2>
              </div>

              <div className="stat-card">
                <span>In Progress</span>
                <h2>
                  {allComplaints.filter((c) => c.status === "In Progress").length}
                </h2>
              </div>

              <div className="stat-card">
                <span>Resolved</span>
                <h2>
                  {allComplaints.filter((c) => c.status === "Resolved").length}
                </h2>
              </div>
            </section>

            {role === "student" && (
              <button
                className="primary-btn new-btn"
                onClick={() => setPage("new")}
              >
                + Register Complaint
              </button>
            )}

            <section className="content-card">
              <h2>
                {role === "student"
                  ? "My Complaints"
                  : role === "admin"
                  ? "All Complaints"
                  : "My Assigned Complaints"}
              </h2>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Equipment</th>
                      <th>Lab</th>
                      {role !== "student" && <th>Student</th>}
                      <th>Priority</th>
                      <th>Status</th>
                      {role === "admin" && <th>Assign</th>}
                      {role === "technician" && <th>Update</th>}
                    </tr>
                  </thead>

                  <tbody>
                    {(role === "technician"
                      ? technicianComplaints
                      : myComplaints
                    ).map((c) => (
                      <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.equipment}</td>
                        <td>{c.lab}</td>

                        {role !== "student" && <td>{c.student}</td>}

                        <td>
                          <span className={"priority " + c.priority.toLowerCase()}>
                            {c.priority}
                          </span>
                        </td>

                        <td>
                          <span className="status">{c.status}</span>
                        </td>

                        {role === "admin" && (
                          <td>
                            <select
                              value={c.technician}
                              onChange={(e) => {
                                const tech = e.target.value;
                                if (tech) {
                                  updateComplaint(
                                    c.id,
                                    { technician: tech, status: "Assigned" },
                                    "Assigned to " + tech
                                  );
                                }
                              }}
                            >
                              <option value="">Assign technician</option>
                              {technicians.map((tech) => (
                                <option key={tech} value={tech}>
                                  {tech}
                                </option>
                              ))}
                            </select>
                          </td>
                        )}

                        {role === "technician" && (
                          <td>
                            <select
                              value={c.status}
                              onChange={(e) => {
                                updateComplaint(
                                  c.id,
                                  { status: e.target.value },
                                  "Status changed to " + e.target.value
                                );
                              }}
                            >
                              <option>Assigned</option>
                              <option>In Progress</option>
                              <option>On Hold</option>
                              <option>Resolved</option>
                            </select>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>

                {(role === "student"
                  ? myComplaints
                  : role === "technician"
                  ? technicianComplaints
                  : allComplaints
                ).length === 0 && (
                  <p className="empty-message">No complaints found.</p>
                )}
              </div>
            </section>

            <section className="content-card">
              <h2>Complaint Repair History</h2>

              {role === "student" ? (
                myComplaints.map((c) => (
                  <div className="history-card" key={c.id}>
                    <h4>{c.id} – {c.equipment}</h4>
                    {c.history.map((item, index) => (
                      <p key={index}>• {item}</p>
                    ))}
                  </div>
                ))
              ) : (
                complaints.map((c) => (
                  <div className="history-card" key={c.id}>
                    <h4>{c.id} – {c.equipment}</h4>
                    {c.history.map((item, index) => (
                      <p key={index}>• {item}</p>
                    ))}
                  </div>
                ))
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;

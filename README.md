#  Aga Khan Hospital Management System (AKHMS)

A modern, responsive Hospital Management System built with **React**, **Vite**, **Tailwind CSS v4**, **shadcn/ui**, and **Firebase**. The application is designed to streamline hospital operations by providing secure and efficient management of patients, medical staff, appointments, billing, pharmacy, laboratory services, and administrative tasks.


---

##  Features

### Authentication

* Secure Firebase Authentication
* Protected routes
* Role-based access control
* User profile management

### Dashboard

* Hospital overview
* Patient statistics
* Appointment summary
* Revenue analytics
* Notifications
* Activity logs

### Patient Management

* Register patients
* Update patient information
* Medical history
* Emergency contacts
* Patient search

### Doctor Management

* Doctor profiles
* Departments
* Availability
* Assigned patients

### Appointment Management

* Book appointments
* Appointment calendar
* Appointment status tracking
* Doctor scheduling


---

##  Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS v4
* shadcn/ui
* React Router DOM
* Lucide React
* React Hot Toast

### Backend

* Firebase Authentication
* Cloud Firestore
* Firebase Storage

---

##  Project Structure

```text
src/
│
├── assets/
│
├── components/
│   ├── Admin/
│   │   ├── DashboardCards.jsx
│   │   ├── DashboardHooks.jsx
│   │   ├── DepartmentBarChart.jsx
│   │   ├── RecentAppointments.jsx
│   │   ├── StatCard.jsx
│   │   └── StatusPieChart.jsx
│   │
│   ├── Footer/
│   └── Navbar/
│
├── config/
│
├── context/
│   └── AuthContext.jsx
│
├── data/
│
├── layouts/
│   └── AdminLayout.jsx
│
├── pages/
│   ├── admin/
│   │   ├── AdminDashboard.jsx
│   │   ├── Appointments.jsx
│   │   ├── DataImporter.jsx
│   │   ├── Departments.jsx
│   │   ├── Doctors.jsx
│   │   └── Patients.jsx
│   │
│   ├── About.jsx
│   ├── AppointmentSuccess.jsx
│   ├── BookAppointment.jsx
│   ├── DepartmentDetail.jsx
│   ├── ForgotPassword.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── MyAppointments.jsx
│   ├── Register.jsx
│   └── Services.jsx
│
├── routes/
│   ├── AdminRoute.jsx
│   ├── AppRoutes.jsx
│   └── ProtectedRoutes.jsx
│
├── scripts/
│
├── App.css
├── App.jsx
├── main.jsx
└── index.css```

---

##  Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd aga-khan-hms
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

##  User Roles

* Administrator
* Receptionist

* Patient

---

##  Development Roadmap

### Phase 1

* Project setup
* Firebase integration
* Authentication
* Routing
* Dashboard layout

### Phase 2

* Patient management
* Appointment scheduling

### Phase 3

* Analytics
* Performance improvements
* Responsive enhancements

---

##  Design

The interface follows a clean healthcare-inspired design with:

* Professional dashboard
* Responsive layout
* Accessible components
* Modern data tables
* Clean forms
* Intuitive navigation


##  License

This project is under the MIT license.

---

##  Author

Ian Cymi
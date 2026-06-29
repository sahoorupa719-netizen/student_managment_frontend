import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import CoursePage from './pages/public/CoursePage';
import Login from './pages/public/Login';
import Signup from './pages/public/Signup';

// Student Dashboard Pages
import StudentHome from './pages/dashboard/student/StudentHome';
import StudentAttendance from './pages/dashboard/student/Attendance';
import StudentNotes from './pages/dashboard/student/Notes';
import StudentQuiz from './pages/dashboard/student/AttendQuiz';
import StudentResult from './pages/dashboard/student/ViewResult';

// Teacher Dashboard Pages
import TeacherHome from './pages/dashboard/teacher/TeacherHome';
import TeacherAddAttendance from './pages/dashboard/teacher/AddAttendance';
import TeacherAddNote from './pages/dashboard/teacher/AddNote';
import TeacherViewNotes from './pages/dashboard/teacher/ViewNotes';
import TeacherAddQuiz from './pages/dashboard/teacher/AddQuiz';
import TeacherManageQuizzes from './pages/dashboard/teacher/ManageQuizzes';
import TeacherAddMarks from './pages/dashboard/teacher/AddMarks';

// Admin Dashboard Pages
import AdminHome from './pages/dashboard/admin/AdminHome';
import AdminStudents from './pages/dashboard/admin/AdminStudents';
import AdminTeachers from './pages/dashboard/admin/AdminTeachers';
import AdminQueries from './pages/dashboard/admin/AdminQueries';

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/courses/:classId" element={<CoursePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Student Dashboard */}
      <Route
        element={<ProtectedRoute requiredRole="student"><DashboardLayout /></ProtectedRoute>}
      >
        <Route path="/dashboard/student" element={<StudentHome />} />
        <Route path="/dashboard/student/attendance" element={<StudentAttendance />} />
        <Route path="/dashboard/student/notes" element={<StudentNotes />} />
        <Route path="/dashboard/student/quiz" element={<StudentQuiz />} />
        <Route path="/dashboard/student/result" element={<StudentResult />} />
      </Route>

      {/* Teacher Dashboard */}
      <Route
        element={<ProtectedRoute requiredRole="teacher"><DashboardLayout /></ProtectedRoute>}
      >
        <Route path="/dashboard/teacher" element={<TeacherHome />} />
        <Route path="/dashboard/teacher/attendance" element={<TeacherAddAttendance />} />
        <Route path="/dashboard/teacher/add-note" element={<TeacherAddNote />} />
        <Route path="/dashboard/teacher/view-notes" element={<TeacherViewNotes />} />
        <Route path="/dashboard/teacher/quiz" element={<TeacherAddQuiz />} />
        <Route path="/dashboard/teacher/manage-quizzes" element={<TeacherManageQuizzes />} />
        <Route path="/dashboard/teacher/marks" element={<TeacherAddMarks />} />
      </Route>

      {/* Admin Dashboard */}
      <Route
        element={<ProtectedRoute requiredRole="admin"><DashboardLayout /></ProtectedRoute>}
      >
        <Route path="/dashboard/admin" element={<AdminHome />} />
        <Route path="/dashboard/admin/students" element={<AdminStudents />} />
        <Route path="/dashboard/admin/teachers" element={<AdminTeachers />} />
        <Route path="/dashboard/admin/queries" element={<AdminQueries />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

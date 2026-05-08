import ProtectedRoute from '../components/ProtectedRoute'
import AdminAppointments from '../dashboard/AdminAppointments'
import AdminOverview from '../dashboard/AdminOverview'
import ManageDoctors from '../dashboard/ManageDoctors'
import ManageServices from '../dashboard/ManageServices'
import ManageUsers from '../dashboard/ManageUsers'
import PatientAppointments from '../dashboard/PatientAppointments'
import PatientOverview from '../dashboard/PatientOverview'
import ProfileSettings from '../dashboard/ProfileSettings'
import DashboardLayout from '../layouts/DashboardLayout'
import PublicLayout from '../layouts/PublicLayout'
import Booking from '../pages/Booking'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Register from '../pages/Register'

const routes = [
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/booking', element: <Booking /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    element: <ProtectedRoute roles={['patient', 'admin']} />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          { index: true, element: <PatientOverview /> },
          { path: 'appointments', element: <PatientAppointments /> },
          { path: 'profile', element: <ProfileSettings /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute roles={['admin']} />,
    children: [
      {
        path: '/admin',
        element: <DashboardLayout admin />,
        children: [
          { index: true, element: <AdminOverview /> },
          { path: 'appointments', element: <AdminAppointments /> },
          { path: 'doctors', element: <ManageDoctors /> },
          { path: 'services', element: <ManageServices /> },
          { path: 'users', element: <ManageUsers /> },
        ],
      },
    ],
  },
  { path: '*', element: <NotFound /> },
]

export default routes

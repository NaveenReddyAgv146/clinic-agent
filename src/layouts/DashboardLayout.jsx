import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays, Gem, Home, LayoutDashboard, LogOut, Menu, Settings, Stethoscope, Users, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { mobileSheet } from '../animations/motion'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'

export default function DashboardLayout({ admin = false }) {
  const [open, setOpen] = useState(false)
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const links = admin
    ? [
        ['Overview', '/admin', LayoutDashboard],
        ['Appointments', '/admin/appointments', CalendarDays],
        ['Doctors', '/admin/doctors', Stethoscope],
        ['Services', '/admin/services', Gem],
        ['Users', '/admin/users', Users],
      ]
    : [
        ['Overview', '/dashboard', LayoutDashboard],
        ['Appointments', '/dashboard/appointments', CalendarDays],
        ['Profile', '/dashboard/profile', Settings],
      ]

  const sidebar = (
    <motion.aside
      variants={mobileSheet}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="glass fixed inset-y-4 left-4 z-40 w-72 rounded-[2rem] p-5 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]"
    >
      <div className="flex items-center justify-between lg:block">
        <Logo />
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full bg-white lg:hidden"
          onClick={() => setOpen(false)}
        >
          <X size={18} />
        </button>
      </div>
      <div className="mt-8 space-y-2">
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 rounded-2xl px-4 py-3 font-bold text-ink/65 hover:bg-white"
        >
          <Home size={19} />
          Home
        </NavLink>
        {links.map(([label, href, Icon]) => (
          <NavLink
            key={href}
            to={href}
            end={href === '/admin' || href === '/dashboard'}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 font-bold ${
                isActive ? 'bg-ink text-white shadow-luxury' : 'text-ink/65 hover:bg-white'
              }`
            }
          >
            <Icon size={19} />
            {label}
          </NavLink>
        ))}
      </div>
      <button
        className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl px-4 py-3 font-bold text-ink/65 hover:bg-white"
        onClick={() => {
          setOpen(false)
          logout()
          navigate('/')
        }}
      >
        <LogOut size={19} />
        Logout
      </button>
    </motion.aside>
  )

  return (
    <div className="min-h-screen p-4">
      <button className="glass fixed right-4 top-4 z-50 grid h-12 w-12 place-items-center rounded-full lg:hidden" onClick={() => setOpen(!open)}>
        <Menu />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-30 bg-ink/20 backdrop-blur-[2px] lg:hidden"
            />
            {sidebar}
          </>
        )}
      </AnimatePresence>
      <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
        <div className="hidden lg:block">
          <aside className="glass sticky top-4 h-[calc(100vh-2rem)] w-72 rounded-[2rem] p-5">
            <Logo />
            <div className="mt-8 space-y-2">
              <NavLink
                to="/"
                className="flex items-center gap-3 rounded-2xl px-4 py-3 font-bold text-ink/65 hover:bg-white"
              >
                <Home size={19} />
                Home
              </NavLink>
              {links.map(([label, href, Icon]) => (
                <NavLink
                  key={href}
                  to={href}
                  end={href === '/admin' || href === '/dashboard'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 font-bold ${
                      isActive ? 'bg-ink text-white shadow-luxury' : 'text-ink/65 hover:bg-white'
                    }`
                  }
                >
                  <Icon size={19} />
                  {label}
                </NavLink>
              ))}
            </div>
            <button
              className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl px-4 py-3 font-bold text-ink/65 hover:bg-white"
              onClick={() => {
                logout()
                navigate('/')
              }}
            >
              <LogOut size={19} />
              Logout
            </button>
          </aside>
        </div>
        <main className="min-w-0 py-4 lg:py-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">{admin ? 'Admin suite' : 'Patient suite'}</p>
              <h1 className="font-display text-4xl font-bold text-ink">Welcome, {user?.name?.split(' ')[0] || 'Guest'}</h1>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { mobileSheet } from '../animations/motion'
import { useAuth } from '../context/AuthContext'
import Button from './Button'
import Logo from './Logo'

const nav = [
  ['Services', '/#services'],
  ['Doctor', '/#doctor'],
  ['Gallery', '/#gallery'],
  ['Contact', '/#contact'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4">
      <nav className="glass container-lux flex items-center justify-between rounded-full px-5 py-3">
        <Logo />
        <div className="hidden items-center gap-7 lg:flex">
          {nav.map(([label, href]) => (
            <a key={label} href={href} className="text-sm font-bold text-ink/65 hover:text-gold">
              {label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <>
              <NavLink to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="btn-ghost">
                Dashboard
              </NavLink>
              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Register
              </Link>
            </>
          )}
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="grid h-11 w-11 place-items-center rounded-full bg-white lg:hidden"
          onClick={() => setOpen(!open)}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={open ? 'close' : 'menu'}
              initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
              transition={{ duration: 0.16 }}
            >
              {open ? <X /> : <Menu />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={mobileSheet}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="glass container-lux mt-3 rounded-[1.5rem] p-4 lg:hidden"
          >
            {nav.map(([label, href], index) => (
              <motion.a
                key={label}
                href={href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 font-bold text-ink/70"
              >
                {label}
              </motion.a>
            ))}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
              <Link to="/booking" className="btn-primary mt-3 w-full">
                Book appointment
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-3 grid gap-2"
            >
              {isAuthenticated ? (
                <>
                  <Link
                    to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                    onClick={() => setOpen(false)}
                    className="btn-ghost w-full"
                  >
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    className="btn-ghost w-full"
                    onClick={() => {
                      logout()
                      setOpen(false)
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="btn-ghost w-full">
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="btn-ghost w-full">
                    Register
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

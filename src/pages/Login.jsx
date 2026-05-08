import { motion } from 'framer-motion'
import { Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { pageTransition } from '../animations/motion'
import Button from '../components/Button'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { register, handleSubmit } = useForm({ defaultValues: { email: 'admin@lumina.com', password: 'password123' } })
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const onSubmit = async (data) => {
    try {
      const user = await login(data)
      navigate(location.state?.from?.pathname || (user.role === 'admin' ? '/admin' : '/dashboard'))
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to login. Seed the database or create an account.')
    }
  }

  return (
    <motion.main {...pageTransition} className="grid min-h-screen place-items-center px-4 py-10">
      <motion.form
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.42, ease: 'easeOut' }}
        onSubmit={handleSubmit(onSubmit)}
        className="glass w-full max-w-md rounded-[2rem] p-7"
      >
        <Logo />
        <h1 className="mt-8 font-display text-4xl font-bold text-ink">Welcome back</h1>
        <p className="mt-2 text-ink/60">Access your clinic dashboard securely.</p>
        {error && <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}
        <label className="mt-6 block text-sm font-bold text-ink/70">Email</label>
        <div className="relative mt-2">
          <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={18} />
          <input className="field field-icon" {...register('email', { required: true })} />
        </div>
        <label className="mt-4 block text-sm font-bold text-ink/70">Password</label>
        <div className="relative mt-2">
          <Lock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={18} />
          <input type="password" className="field field-icon" {...register('password', { required: true })} />
        </div>
        <Button className="mt-6 w-full">Login</Button>
        <p className="mt-5 text-center text-sm text-ink/60">
          New patient? <Link className="font-bold text-gold" to="/register">Create account</Link>
        </p>
      </motion.form>
    </motion.main>
  )
}

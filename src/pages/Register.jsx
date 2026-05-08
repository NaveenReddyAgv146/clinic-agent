import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { pageTransition } from '../animations/motion'
import Button from '../components/Button'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState('')
  const { register: createAccount } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      await createAccount(data)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <motion.main {...pageTransition} className="grid min-h-screen place-items-center px-4 py-10">
      <motion.form
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.42, ease: 'easeOut' }}
        onSubmit={handleSubmit(onSubmit)}
        className="glass w-full max-w-lg rounded-[2rem] p-7"
      >
        <Logo />
        <h1 className="mt-8 font-display text-4xl font-bold text-ink">Create patient profile</h1>
        {error && <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}
        <div className="mt-6 grid gap-4">
          <input className="field" placeholder="Full name" {...register('name', { required: true })} />
          <input className="field" placeholder="Email" {...register('email', { required: true })} />
          <input className="field" placeholder="Phone" {...register('phone')} />
          <input type="password" className="field" placeholder="Password" {...register('password', { required: true, minLength: 6 })} />
        </div>
        <Button className="mt-6 w-full">Register</Button>
        <p className="mt-5 text-center text-sm text-ink/60">
          Already registered? <Link className="font-bold text-gold" to="/login">Login</Link>
        </p>
      </motion.form>
    </motion.main>
  )
}

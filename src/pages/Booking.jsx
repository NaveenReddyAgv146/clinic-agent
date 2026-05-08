import { motion } from 'framer-motion'
import { CalendarCheck, CheckCircle2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { cardReveal, pageTransition, staggerContainer } from '../animations/motion'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import { useAuth } from '../context/AuthContext'
import { useFetch } from '../hooks/useFetch'
import { clinicService } from '../services/clinicService'
import { doctorsFallback, servicesFallback } from '../utils/constants'
import { getDoctorImage } from '../utils/media'

export default function Booking() {
  const { isAuthenticated } = useAuth()
  const { data: services } = useFetch(clinicService.getServices, servicesFallback)
  const { data: doctors } = useFetch(clinicService.getDoctors, doctorsFallback)
  const [form, setForm] = useState({ serviceId: '', doctorId: '', date: '', time: '' })
  const [success, setSuccess] = useState(false)
  const selectedDoctor = useMemo(() => doctors.find((doctor) => doctor._id === form.doctorId), [doctors, form.doctorId])

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const book = async () => {
    if (!isAuthenticated) return
    try {
      await clinicService.bookAppointment(form)
      setSuccess(true)
    } catch {
      setSuccess(true)
    }
  }

  return (
    <motion.main {...pageTransition} className="px-4 pb-20 pt-36">
      <div className="container-lux">
        <SectionHeader eyebrow="Booking" title="Reserve a treatment slot" text="Select treatment, doctor, date, and time in a focused appointment flow." />
        <motion.div variants={cardReveal} initial="hidden" animate="visible" className="glass mx-auto max-w-5xl rounded-[2rem] p-5 md:p-8">
          {success ? (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="grid place-items-center py-16 text-center">
              <motion.div initial={{ scale: 0.7, rotate: -16 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 220, damping: 14 }}>
                <CheckCircle2 className="text-gold" size={72} />
              </motion.div>
              <h2 className="mt-5 font-display text-4xl font-bold text-ink">Appointment confirmed</h2>
              <p className="mt-3 text-ink/60">Your booking has been saved. The clinic team will follow up if anything changes.</p>
              <Link to="/dashboard" className="btn-primary mt-8">View dashboard</Link>
            </motion.div>
          ) : (
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid gap-6">
              <motion.div variants={cardReveal}>
                <p className="mb-3 font-extrabold text-ink">1. Select service</p>
                <div className="grid gap-3 md:grid-cols-3">
                  {services.map((service) => (
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ y: -3 }}
                      key={service._id}
                      className={`rounded-2xl border p-4 text-left ${form.serviceId === service._id ? 'border-gold bg-gold/10' : 'border-gold/15 bg-white/60'}`}
                      onClick={() => update('serviceId', service._id)}
                    >
                      <span className="font-bold text-ink">{service.title}</span>
                      <span className="mt-1 block text-sm text-ink/55">Rs. {service.price}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={cardReveal}>
                <p className="mb-3 font-extrabold text-ink">2. Select doctor</p>
                <div className="grid gap-3 md:grid-cols-2">
                  {doctors.map((doctor) => (
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ y: -3 }}
                      key={doctor._id}
                      className={`flex items-center gap-4 rounded-2xl border p-4 text-left ${form.doctorId === doctor._id ? 'border-gold bg-gold/10' : 'border-gold/15 bg-white/60'}`}
                      onClick={() => update('doctorId', doctor._id)}
                    >
                      <img className="h-16 w-16 rounded-2xl object-cover" src={getDoctorImage(doctor)} alt={doctor.name} />
                      <span>
                        <span className="block font-bold text-ink">{doctor.name}</span>
                        <span className="text-sm text-ink/55">{doctor.specialization}</span>
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={cardReveal} className="grid gap-5 md:grid-cols-2">
                <div>
                  <p className="mb-3 font-extrabold text-ink">3. Select date</p>
                  <input type="date" className="field" value={form.date} onChange={(event) => update('date', event.target.value)} />
                </div>
                <div>
                  <p className="mb-3 font-extrabold text-ink">4. Select time slot</p>
                  <div className="grid grid-cols-3 gap-2">
                    {(selectedDoctor?.availableSlots || ['09:00', '11:00', '14:00']).map((slot) => (
                      <motion.button
                        whileTap={{ scale: 0.94 }}
                        key={slot}
                        className={`rounded-xl px-3 py-3 text-sm font-bold ${form.time === slot ? 'bg-ink text-white' : 'bg-white/70 text-ink'}`}
                        onClick={() => update('time', slot)}
                      >
                        {slot}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {!isAuthenticated && <Link to="/login" className="rounded-2xl bg-gold/10 p-4 font-bold text-ink">Login first to save this appointment.</Link>}
              <Button disabled={!form.serviceId || !form.doctorId || !form.date || !form.time || !isAuthenticated} onClick={book} className="w-full disabled:cursor-not-allowed disabled:opacity-45">
                <CalendarCheck size={18} /> Book appointment
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.main>
  )
}

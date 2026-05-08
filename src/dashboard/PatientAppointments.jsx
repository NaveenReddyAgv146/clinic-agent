import { motion } from 'framer-motion'
import { CalendarClock, CalendarPlus, Clock, Stethoscope, XCircle } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { cardReveal, staggerContainer } from '../animations/motion'
import { useFetch } from '../hooks/useFetch'
import { clinicService } from '../services/clinicService'

const statuses = ['all', 'confirmed', 'completed', 'cancelled']

const statusClass = {
  confirmed: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  completed: 'bg-gold/10 text-gold ring-gold/20',
  cancelled: 'bg-red-50 text-red-700 ring-red-100',
  pending: 'bg-blue-50 text-blue-700 ring-blue-100',
}

function StatusPill({ status }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-extrabold capitalize ring-1 ${statusClass[status] || 'bg-white text-ink/60 ring-gold/10'}`}>
      {status}
    </span>
  )
}

export default function PatientAppointments() {
  const { data: appointments, setData } = useFetch(clinicService.myAppointments, [])
  const [filter, setFilter] = useState('all')
  const shown = filter === 'all' ? appointments : appointments.filter((item) => item.status === filter)

  const cancel = async (id) => {
    await clinicService.cancelAppointment(id)
    setData((items) => items.map((item) => (item._id === id ? { ...item, status: 'cancelled' } : item)))
  }

  return (
    <motion.div variants={cardReveal} initial="hidden" animate="visible" className="glass rounded-[2rem] p-4 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-gold">Care schedule</p>
          <h2 className="mt-1 font-display text-3xl font-bold text-ink">Appointments</h2>
        </div>
        <Link to="/booking" className="btn-primary w-full md:w-auto">
          <CalendarPlus size={18} /> New booking
        </Link>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-extrabold capitalize transition ${
              filter === status ? 'bg-ink text-white shadow-luxury' : 'bg-white/70 text-ink/60'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mt-6 grid gap-4 lg:hidden">
        {shown.map((item) => (
          <motion.article key={item._id} variants={cardReveal} className="rounded-[1.5rem] bg-white/75 p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-extrabold text-ink">{item.serviceId?.title || 'Treatment appointment'}</p>
                <p className="mt-1 text-sm text-ink/55">{item.serviceId?.duration || 'Clinic visit'}</p>
              </div>
              <StatusPill status={item.status} />
            </div>
            <div className="mt-4 grid gap-3 text-sm text-ink/65">
              <p className="flex items-center gap-2"><Stethoscope size={16} className="text-gold" /> {item.doctorId?.name || 'Assigned doctor'}</p>
              <p className="flex items-center gap-2"><CalendarClock size={16} className="text-gold" /> {item.date}</p>
              <p className="flex items-center gap-2"><Clock size={16} className="text-gold" /> {item.time}</p>
            </div>
            {item.status !== 'cancelled' && (
              <button onClick={() => cancel(item._id)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 font-extrabold text-red-700">
                <XCircle size={17} /> Cancel appointment
              </button>
            )}
          </motion.article>
        ))}
      </motion.div>

      <div className="mt-6 hidden overflow-hidden rounded-[1.5rem] bg-white/65 lg:block">
        <table className="w-full text-left">
          <thead className="bg-ink text-xs uppercase tracking-[0.18em] text-white/70">
            <tr>
              <th className="px-5 py-4">Service</th>
              <th className="px-5 py-4">Doctor</th>
              <th className="px-5 py-4">Schedule</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((item) => (
              <tr key={item._id} className="border-t border-gold/10">
                <td className="px-5 py-4">
                  <p className="font-extrabold text-ink">{item.serviceId?.title}</p>
                  <p className="text-sm text-ink/45">{item.serviceId?.duration}</p>
                </td>
                <td className="px-5 py-4 text-ink/65">{item.doctorId?.name}</td>
                <td className="px-5 py-4 text-ink/65">{item.date} at {item.time}</td>
                <td className="px-5 py-4"><StatusPill status={item.status} /></td>
                <td className="px-5 py-4 text-right">
                  {item.status !== 'cancelled' && <button className="font-extrabold text-red-600" onClick={() => cancel(item._id)}>Cancel</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!shown.length && (
        <div className="mt-6 rounded-[1.5rem] bg-white/70 p-8 text-center">
          <CalendarClock className="mx-auto text-gold" size={40} />
          <p className="mt-3 font-extrabold text-ink">No appointments found</p>
          <p className="mt-1 text-sm text-ink/55">Try another filter or book a new treatment.</p>
        </div>
      )}
    </motion.div>
  )
}

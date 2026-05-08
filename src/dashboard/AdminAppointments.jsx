import { motion } from 'framer-motion'
import { CalendarDays, Mail, Phone, Search, SlidersHorizontal, Stethoscope } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { cardReveal, staggerContainer } from '../animations/motion'
import { clinicService } from '../services/clinicService'

const statusOptions = ['', 'confirmed', 'completed', 'cancelled', 'pending']

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

export default function AdminAppointments() {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    clinicService.adminAppointments({ q, status }).then(setItems).catch(() => setItems([]))
  }, [q, status])

  const totals = useMemo(
    () => ({
      total: items.length,
      confirmed: items.filter((item) => item.status === 'confirmed').length,
      completed: items.filter((item) => item.status === 'completed').length,
    }),
    [items],
  )

  const changeStatus = async (id, nextStatus) => {
    await clinicService.updateAppointmentStatus(id, nextStatus)
    setItems((current) => current.map((item) => (item._id === id ? { ...item, status: nextStatus } : item)))
  }

  return (
    <motion.div variants={cardReveal} initial="hidden" animate="visible" className="grid gap-5">
      <div className="glass rounded-[2rem] p-4 md:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-gold">Operations</p>
            <h2 className="mt-1 font-display text-3xl font-bold text-ink">Manage appointments</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-[1fr_12rem] xl:w-[34rem]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={18} />
              <input className="field field-icon" placeholder="Search patient, doctor, service" value={q} onChange={(event) => setQ(event.target.value)} />
            </div>
            <div className="relative">
              <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={18} />
              <select className="field field-icon capitalize" value={status} onChange={(event) => setStatus(event.target.value)}>
                {statusOptions.map((option) => <option key={option} value={option}>{option || 'All status'}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ['Total bookings', totals.total],
            ['Confirmed', totals.confirmed],
            ['Completed', totals.completed],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-white/70 p-4">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-ink/45">{label}</p>
              <p className="mt-2 text-2xl font-extrabold text-ink">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid gap-4 lg:hidden">
        {items.map((item) => (
          <motion.article key={item._id} variants={cardReveal} className="glass rounded-[1.5rem] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-extrabold text-ink">{item.userId?.name || 'Patient'}</p>
                <p className="mt-1 text-sm text-ink/55">{item.serviceId?.title || 'Treatment'}</p>
              </div>
              <StatusPill status={item.status} />
            </div>
            <div className="mt-4 grid gap-3 text-sm text-ink/65">
              <p className="flex items-center gap-2"><Stethoscope size={16} className="text-gold" /> {item.doctorId?.name}</p>
              <p className="flex items-center gap-2"><CalendarDays size={16} className="text-gold" /> {item.date} at {item.time}</p>
              <p className="flex items-center gap-2"><Phone size={16} className="text-gold" /> {item.userId?.phone || 'No phone'}</p>
              <p className="flex items-center gap-2"><Mail size={16} className="text-gold" /> {item.userId?.email || 'No email'}</p>
            </div>
            <select className="field mt-5" value={item.status} onChange={(event) => changeStatus(item._id, event.target.value)}>
              {statusOptions.filter(Boolean).map((option) => <option key={option}>{option}</option>)}
            </select>
          </motion.article>
        ))}
      </motion.div>

      <div className="glass hidden overflow-hidden rounded-[2rem] lg:block">
        <table className="w-full text-left">
          <thead className="bg-ink text-xs uppercase tracking-[0.18em] text-white/70">
            <tr>
              <th className="px-5 py-4">Patient</th>
              <th className="px-5 py-4">Treatment</th>
              <th className="px-5 py-4">Doctor</th>
              <th className="px-5 py-4">Schedule</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Update</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-t border-gold/10 bg-white/55">
                <td className="px-5 py-4">
                  <p className="font-extrabold text-ink">{item.userId?.name}</p>
                  <p className="text-sm text-ink/45">{item.userId?.phone || item.userId?.email}</p>
                </td>
                <td className="px-5 py-4">
                  <p className="font-bold text-ink">{item.serviceId?.title}</p>
                  <p className="text-sm text-gold">Rs. {item.serviceId?.price || 0}</p>
                </td>
                <td className="px-5 py-4 text-ink/65">{item.doctorId?.name}</td>
                <td className="px-5 py-4 text-ink/65">{item.date} at {item.time}</td>
                <td className="px-5 py-4"><StatusPill status={item.status} /></td>
                <td className="px-5 py-4">
                  <select className="field min-w-36 py-2" value={item.status} onChange={(event) => changeStatus(item._id, event.target.value)}>
                    {statusOptions.filter(Boolean).map((option) => <option key={option}>{option}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!items.length && (
        <div className="glass rounded-[2rem] p-8 text-center">
          <CalendarDays className="mx-auto text-gold" size={42} />
          <p className="mt-3 font-extrabold text-ink">No appointments found</p>
          <p className="mt-1 text-sm text-ink/55">Adjust search or filters to see more bookings.</p>
        </div>
      )}
    </motion.div>
  )
}

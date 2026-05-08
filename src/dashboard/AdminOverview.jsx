import { Banknote, CalendarDays, Sparkles, Users } from 'lucide-react'
import StatCard from '../components/StatCard'
import { useFetch } from '../hooks/useFetch'
import { clinicService } from '../services/clinicService'

const fallback = { totalBookings: 0, revenue: 0, services: 0, patientsServed: 0, statusCounts: {}, recent: [] }

export default function AdminOverview() {
  const { data: stats } = useFetch(clinicService.adminStats, fallback)
  const bars = Object.entries(stats.statusCounts || {})

  return (
    <div className="grid gap-6">
      <div className="grid gap-5 md:grid-cols-4">
        <StatCard icon={CalendarDays} label="Total bookings" value={stats.totalBookings || 0} />
        <StatCard icon={Banknote} label="Revenue" value={`Rs. ${stats.revenue || 0}`} />
        <StatCard icon={Sparkles} label="Services" value={stats.services || 0} tone="sage" />
        <StatCard icon={Users} label="Patients served" value={stats.patientsServed || 0} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="glass rounded-[2rem] p-6">
          <h2 className="font-display text-3xl font-bold text-ink">Recent appointments</h2>
          <div className="mt-5 space-y-3">
            {(stats.recent || []).map((item) => (
              <div key={item._id} className="flex flex-wrap justify-between gap-4 rounded-2xl bg-white/70 p-4">
                <div><p className="font-bold">{item.userId?.name}</p><p className="text-sm text-ink/55">{item.serviceId?.title} with {item.doctorId?.name}</p></div>
                <span className="font-bold text-gold">Rs. {item.serviceId?.price}</span>
              </div>
            ))}
            {!stats.recent?.length && <p className="rounded-2xl bg-white/70 p-5 text-ink/60">No bookings yet. Seed the database or book a patient appointment.</p>}
          </div>
        </div>
        <div className="glass rounded-[2rem] p-6">
          <h2 className="font-display text-3xl font-bold text-ink">Booking statistics</h2>
          <div className="mt-6 space-y-4">
            {bars.length ? bars.map(([label, value]) => (
              <div key={label}>
                <div className="mb-2 flex justify-between text-sm font-bold"><span>{label}</span><span>{value}</span></div>
                <div className="h-3 rounded-full bg-white"><div className="h-3 rounded-full bg-gold" style={{ width: `${Math.min(100, value * 18)}%` }} /></div>
              </div>
            )) : <div className="h-56 rounded-3xl bg-white/70 p-5 text-ink/55">Charts placeholder ready for analytics integration.</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

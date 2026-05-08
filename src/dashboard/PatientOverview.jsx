import { CalendarDays, Clock, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'
import { useFetch } from '../hooks/useFetch'
import { clinicService } from '../services/clinicService'

export default function PatientOverview() {
  const { data: appointments } = useFetch(clinicService.myAppointments, [])
  const upcoming = appointments.filter((item) => item.status !== 'cancelled')

  return (
    <div className="grid gap-6">
      <div className="grid gap-5 md:grid-cols-3">
        <StatCard icon={CalendarDays} label="Upcoming" value={upcoming.length} />
        <StatCard icon={Clock} label="History" value={appointments.length} tone="sage" />
        <StatCard icon={Sparkles} label="Care credits" value="Premium" />
      </div>
      <div className="glass rounded-[2rem] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold text-ink">Next appointments</h2>
            <p className="mt-1 text-ink/55">Your treatment schedule and clinic notifications.</p>
          </div>
          <Link to="/booking" className="btn-primary">New booking</Link>
        </div>
        <div className="mt-6 grid gap-3">
          {upcoming.slice(0, 4).map((item) => (
            <div key={item._id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white/70 p-4">
              <div>
                <p className="font-bold text-ink">{item.serviceId?.title || 'Treatment'}</p>
                <p className="text-sm text-ink/55">{item.doctorId?.name} - {item.date} at {item.time}</p>
              </div>
              <span className="rounded-full bg-gold/10 px-3 py-1 text-sm font-bold text-gold">{item.status}</span>
            </div>
          ))}
          {!upcoming.length && <p className="rounded-2xl bg-white/70 p-5 text-ink/60">No appointments yet. Your glow calendar is wide open.</p>}
        </div>
      </div>
      <div className="glass rounded-[2rem] p-6">
        <h2 className="font-display text-3xl font-bold text-ink">Notifications</h2>
        <div className="mt-4 space-y-3">
          <p className="rounded-2xl bg-white/70 p-4 text-ink/65">Pre-treatment instructions appear here 24 hours before each appointment.</p>
          <p className="rounded-2xl bg-white/70 p-4 text-ink/65">Follow-up reminders and product guidance are ready for clinic automation.</p>
        </div>
      </div>
    </div>
  )
}

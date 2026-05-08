import { useFetch } from '../hooks/useFetch'
import { clinicService } from '../services/clinicService'

export default function ManageUsers() {
  const { data: users } = useFetch(clinicService.users, [])

  return (
    <div className="glass rounded-[2rem] p-6">
      <h2 className="font-display text-3xl font-bold text-ink">Manage users</h2>
      <div className="mt-6 grid gap-3">
        {users.map((user) => (
          <div key={user._id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white/70 p-4">
            <div><p className="font-bold text-ink">{user.name}</p><p className="text-sm text-ink/55">{user.email} - {user.phone}</p></div>
            <span className="rounded-full bg-gold/10 px-3 py-1 text-sm font-bold text-gold">{user.role}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

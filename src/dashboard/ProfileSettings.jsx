import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { authService } from '../services/authService'

export default function ProfileSettings() {
  const { user, setUser } = useAuth()
  const { register, handleSubmit } = useForm({ defaultValues: user })

  const save = async (data) => {
    const updated = await authService.updateProfile(data)
    localStorage.setItem('lumina_user', JSON.stringify(updated))
    setUser(updated)
  }

  return (
    <form onSubmit={handleSubmit(save)} className="glass max-w-3xl rounded-[2rem] p-6">
      <h2 className="font-display text-3xl font-bold text-ink">Profile settings</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <input className="field" placeholder="Name" {...register('name')} />
        <input className="field" placeholder="Phone" {...register('phone')} />
        <input className="field md:col-span-2" placeholder="Avatar URL" {...register('avatar')} />
        <input className="field md:col-span-2" disabled value={user?.email || ''} />
      </div>
      <Button className="mt-6">Save profile</Button>
    </form>
  )
}

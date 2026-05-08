import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import { useFetch } from '../hooks/useFetch'
import { clinicService } from '../services/clinicService'
import { doctorsFallback } from '../utils/constants'
import { getDoctorImage } from '../utils/media'

export default function ManageDoctors() {
  const { data, setData } = useFetch(clinicService.getDoctors, doctorsFallback)
  const { register, handleSubmit, reset } = useForm()

  const add = async (payload) => {
    const doctor = await clinicService.createDoctor({ ...payload, availableSlots: payload.availableSlots.split(',').map((x) => x.trim()) })
    setData([doctor, ...data])
    reset()
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <form onSubmit={handleSubmit(add)} className="glass rounded-[2rem] p-6">
        <h2 className="font-display text-3xl font-bold">Add doctor</h2>
        <div className="mt-5 grid gap-3">
          <input className="field" placeholder="Name" {...register('name', { required: true })} />
          <input className="field" placeholder="Specialization" {...register('specialization', { required: true })} />
          <input className="field" placeholder="Experience" type="number" {...register('experience', { required: true })} />
          <input className="field" placeholder="Image URL" {...register('image')} />
          <input className="field" placeholder="Slots comma separated" defaultValue="09:00, 10:30, 14:00" {...register('availableSlots')} />
        </div>
        <Button className="mt-5">Create doctor</Button>
      </form>
      <div className="grid gap-4">
        {data.map((doctor) => <div key={doctor._id} className="glass flex items-center gap-4 rounded-[1.5rem] p-4"><img className="h-20 w-20 rounded-2xl object-cover" src={getDoctorImage(doctor)} alt={doctor.name} /><div><p className="font-bold text-ink">{doctor.name}</p><p className="text-sm text-ink/55">{doctor.specialization} - {doctor.experience} years</p></div></div>)}
      </div>
    </div>
  )
}

import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import { useFetch } from '../hooks/useFetch'
import { clinicService } from '../services/clinicService'
import { servicesFallback } from '../utils/constants'
import { getServiceImage } from '../utils/media'

export default function ManageServices() {
  const { data, setData } = useFetch(clinicService.getServices, servicesFallback)
  const { register, handleSubmit, reset } = useForm()

  const add = async (payload) => {
    const service = await clinicService.createService(payload)
    setData([service, ...data])
    reset()
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <form onSubmit={handleSubmit(add)} className="glass rounded-[2rem] p-6">
        <h2 className="font-display text-3xl font-bold">Add service</h2>
        <div className="mt-5 grid gap-3">
          <input className="field" placeholder="Title" {...register('title', { required: true })} />
          <textarea className="field" placeholder="Description" {...register('description', { required: true })} />
          <input className="field" placeholder="Price" type="number" {...register('price', { required: true })} />
          <input className="field" placeholder="Duration" {...register('duration')} />
          <input className="field" placeholder="Image URL" {...register('image')} />
        </div>
        <Button className="mt-5">Create service</Button>
      </form>
      <div className="grid gap-4">
        {data.map((service) => <div key={service._id} className="glass flex items-center gap-4 rounded-[1.5rem] p-4"><img className="h-20 w-20 rounded-2xl object-cover" src={getServiceImage(service)} alt={service.title} /><div><p className="font-bold text-ink">{service.title}</p><p className="text-sm text-ink/55">Rs. {service.price} - {service.duration}</p></div></div>)}
      </div>
    </div>
  )
}

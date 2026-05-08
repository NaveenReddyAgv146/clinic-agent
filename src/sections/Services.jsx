import { motion } from 'framer-motion'
import { Clock, IndianRupee } from 'lucide-react'
import { cardReveal, staggerContainer } from '../animations/motion'
import SectionHeader from '../components/SectionHeader'
import Skeleton from '../components/Skeleton'
import { clinicService } from '../services/clinicService'
import { servicesFallback } from '../utils/constants'
import { getServiceImage } from '../utils/media'
import { useFetch } from '../hooks/useFetch'

export default function Services() {
  const { data: services, loading } = useFetch(clinicService.getServices, servicesFallback)

  return (
    <section id="services" className="section-pad">
      <div className="container-lux">
        <SectionHeader eyebrow="Treatments" title="Doctor-led services" text="High-touch cosmetic and dermatology programs built for repeatable clinic workflows." />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="grid gap-5 md:grid-cols-3"
        >
          {loading
            ? [1, 2, 3].map((item) => <Skeleton key={item} className="h-96" />)
            : services.map((service) => (
                <motion.article
                  key={service._id}
                  variants={cardReveal}
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass overflow-hidden rounded-[1.5rem]"
                >
                    <img
                      className="h-56 w-full object-cover"
                      src={getServiceImage(service)}
                      alt={service.title}
                      onError={(event) => {
                        event.currentTarget.src = '/clinic-photos/service-hydra.jpg'
                      }}
                    />
                  <div className="p-6">
                    <h3 className="text-2xl font-extrabold text-ink">{service.title}</h3>
                    <p className="mt-3 min-h-20 text-ink/62">{service.description}</p>
                    <div className="mt-5 flex items-center justify-between text-sm font-bold text-ink/70">
                      <span className="flex items-center gap-1"><Clock size={16} /> {service.duration}</span>
                      <span className="flex items-center gap-1"><IndianRupee size={16} /> {service.price}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
        </motion.div>
      </div>
    </section>
  )
}

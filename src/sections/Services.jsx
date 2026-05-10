import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Clock, IndianRupee, Sparkles, Wrench, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { cardReveal, staggerContainer } from '../animations/motion'
import SectionHeader from '../components/SectionHeader'
import Skeleton from '../components/Skeleton'
import { clinicService } from '../services/clinicService'
import { serviceDetails, servicesFallback } from '../utils/constants'
import { getServiceImage } from '../utils/media'
import { useFetch } from '../hooks/useFetch'

export default function Services() {
  const { data: services, loading } = useFetch(clinicService.getServices, servicesFallback)
  const [selectedService, setSelectedService] = useState(null)

  const selectedDetails = useMemo(() => {
    if (!selectedService) return null
    return (
      serviceDetails[selectedService.title] || {
        overview: selectedService.description,
        treatmentFlow: [
          'Specialist consultation and treatment planning',
          'Custom in-clinic protocol tailored to your skin goals',
          'Progress review and treatment refinements',
        ],
        visits: 'Visit frequency depends on skin condition, goals, and clinical assessment.',
        products: ['Doctor-selected premium skincare', 'Barrier support and SPF'],
        machinery: ['Specialist-grade aesthetic tools chosen by the clinic'],
        aftercare: 'Aftercare instructions are provided after the session based on your treatment plan.',
      }
    )
  }, [selectedService])

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
                  <button type="button" onClick={() => setSelectedService(service)} className="block w-full text-left">
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
                    <div className="mt-5 inline-flex rounded-full bg-ink px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-white">
                      View full protocol
                    </div>
                  </div>
                  </button>
                </motion.article>
              ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedService && selectedDetails && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 z-40 bg-ink/35 backdrop-blur-[3px]"
            />
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 32, scale: 0.98 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="fixed inset-x-4 top-1/2 z-50 max-h-[88vh] -translate-y-1/2 overflow-y-auto rounded-[2rem] bg-[#fffdf8] shadow-[0_28px_90px_rgba(32,26,23,0.22)] md:inset-x-10 lg:left-1/2 lg:right-auto lg:w-[58rem] lg:-translate-x-1/2"
            >
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-gold/10 bg-[#fffdf8]/95 px-6 py-5 backdrop-blur md:px-8">
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-gold">Service details</p>
                  <h3 className="mt-2 font-display text-3xl font-bold text-ink">{selectedService.title}</h3>
                  <p className="mt-2 text-ink/62">{selectedDetails.overview}</p>
                </div>
                <button type="button" onClick={() => setSelectedService(null)} className="rounded-full bg-white p-3 text-ink/70 shadow-sm">
                  <X size={18} />
                </button>
              </div>

              <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <img
                    src={getServiceImage(selectedService)}
                    alt={selectedService.title}
                    className="h-72 w-full rounded-[1.5rem] object-cover shadow-luxury"
                  />
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.25rem] bg-mist p-4">
                      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold">Session length</p>
                      <p className="mt-2 text-lg font-extrabold text-ink">{selectedService.duration}</p>
                    </div>
                    <div className="rounded-[1.25rem] bg-mist p-4">
                      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold">Starting price</p>
                      <p className="mt-2 text-lg font-extrabold text-ink">Rs. {selectedService.price}</p>
                    </div>
                  </div>
                  <div className="mt-5 rounded-[1.5rem] bg-mist p-5">
                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold">Visits</p>
                    <p className="mt-3 leading-7 text-ink/68">{selectedDetails.visits}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-[1.5rem] bg-mist p-5">
                    <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.16em] text-gold">
                      <Sparkles size={16} />
                      Treatment flow
                    </p>
                    <div className="mt-4 space-y-3">
                      {selectedDetails.treatmentFlow.map((step) => (
                        <div key={step} className="flex gap-3">
                          <CheckCircle2 size={18} className="mt-1 shrink-0 text-gold" />
                          <p className="leading-7 text-ink/68">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] bg-mist p-5">
                    <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-gold">Premium products</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedDetails.products.map((product) => (
                        <span key={product} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-ink/70">
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] bg-mist p-5">
                    <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.16em] text-gold">
                      <Wrench size={16} />
                      Premium machinery
                    </p>
                    <div className="mt-4 space-y-2">
                      {selectedDetails.machinery.map((machine) => (
                        <p key={machine} className="font-semibold text-ink/68">{machine}</p>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] bg-mist p-5">
                    <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-gold">Aftercare</p>
                    <p className="mt-3 leading-7 text-ink/68">{selectedDetails.aftercare}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

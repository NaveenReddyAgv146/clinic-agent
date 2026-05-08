import { motion } from 'framer-motion'
import { cardReveal, staggerContainer } from '../animations/motion'
import SectionHeader from '../components/SectionHeader'
import { testimonials } from '../utils/constants'

export default function Testimonials() {
  return (
    <section className="section-pad">
      <div className="container-lux">
        <SectionHeader eyebrow="Patient voice" title="Quiet confidence, visible results" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="grid gap-5 md:grid-cols-3"
        >
          {testimonials.map(([quote, name]) => (
            <motion.div key={name} variants={cardReveal} whileHover={{ y: -6 }} whileTap={{ scale: 0.98 }} className="glass rounded-[1.5rem] p-6">
              <p className="text-lg leading-8 text-ink/70">"{quote}"</p>
              <p className="mt-5 font-extrabold text-ink">{name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

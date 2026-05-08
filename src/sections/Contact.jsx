import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { cardReveal, staggerContainer } from '../animations/motion'
import SectionHeader from '../components/SectionHeader'

export default function Contact() {
  return (
    <section id="contact" className="section-pad">
      <div className="container-lux">
        <SectionHeader eyebrow="Contact" title="A polished first touch for every patient" />
        <motion.div
          variants={cardReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="glass grid gap-8 rounded-[2rem] p-6 md:grid-cols-[1fr_1.2fr] md:p-10"
        >
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-5">
            {[
              [MapPin, '12 Pearl Avenue, Mumbai'],
              [Phone, '+91 98765 43210'],
              [Mail, 'care@luminaskin.com'],
            ].map(([Icon, label]) => (
              <motion.div key={label} variants={cardReveal} whileTap={{ scale: 0.98 }} className="flex items-center gap-4 rounded-2xl bg-white/70 p-4 font-bold text-ink">
                <Icon className="text-gold" />
                {label}
              </motion.div>
            ))}
          </motion.div>
          <motion.form variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-4">
            <input className="field" placeholder="Full name" />
            <input className="field" placeholder="Email address" />
            <textarea className="field min-h-32" placeholder="Tell us what you need" />
            <motion.button whileTap={{ scale: 0.97 }} whileHover={{ y: -2 }} className="btn-primary" type="button">Send enquiry</motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}

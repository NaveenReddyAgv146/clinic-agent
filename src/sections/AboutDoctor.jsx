import { motion } from 'framer-motion'
import { Award, Microscope, Star } from 'lucide-react'
import { cardReveal, fadeUp, staggerContainer } from '../animations/motion'
import SectionHeader from '../components/SectionHeader'
import { getDoctorImage } from '../utils/media'

export default function AboutDoctor() {
  return (
    <section id="doctor" className="section-pad bg-white/45">
      <div className="container-lux">
        <SectionHeader eyebrow="Medical leadership" title="Care designed by specialists" text="Premium aesthetics backed by diagnostic rigor, conservative protocols, and meticulous follow-up." />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]"
        >
          <motion.img
            variants={cardReveal}
            className="h-[34rem] w-full rounded-[2rem] object-cover shadow-luxury"
            src={getDoctorImage({ name: 'Dr. Anika Rao' })}
            alt="Lead dermatologist"
          />
          <motion.div variants={fadeUp} className="glass rounded-[2rem] p-7 md:p-10">
            <h3 className="font-display text-4xl font-bold text-ink">Dr. Anika Rao</h3>
            <p className="mt-2 font-bold text-gold">Consultant Dermatologist, 12 years experience</p>
            <p className="mt-5 text-lg leading-8 text-ink/66">
              Lumina blends medical dermatology with refined aesthetic treatments for acne, pigmentation, aging, hair, and skin wellness. Every plan is measured, documented, and tailored to the patient.
            </p>
            <motion.div variants={staggerContainer} className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                [Award, 'Board certified'],
                [Microscope, 'Evidence led'],
                [Star, '4.9 patient rating'],
              ].map(([Icon, label]) => (
                <motion.div key={label} variants={cardReveal} whileTap={{ scale: 0.97 }} className="rounded-2xl bg-white/70 p-4">
                  <Icon className="mb-3 text-gold" />
                  <p className="font-bold text-ink">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

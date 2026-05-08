import { motion } from 'framer-motion'
import { fadeUp } from '../animations/motion'

export default function SectionHeader({ eyebrow, title, text }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.28em] text-gold">{eyebrow}</p>
      <h2 className="font-display text-4xl font-bold text-ink md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-lg leading-8 text-ink/65">{text}</p>}
    </motion.div>
  )
}

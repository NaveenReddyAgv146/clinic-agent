import { motion } from 'framer-motion'

export default function StatCard({ icon: Icon, label, value, tone = 'gold' }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="glass rounded-[1.5rem] p-5">
      <div className="mb-5 flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-gold shadow-sm">
          <Icon size={20} />
        </span>
        <span className={`h-2.5 w-2.5 rounded-full ${tone === 'sage' ? 'bg-sage' : 'bg-gold'}`} />
      </div>
      <p className="text-sm font-semibold text-ink/55">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-ink">{value}</p>
    </motion.div>
  )
}

import { motion } from 'framer-motion'
import { ArrowRight, CalendarCheck, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-36 md:pt-44">
      <div className="container-lux grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="mb-5 inline-flex rounded-full border border-gold/20 bg-white/60 px-4 py-2 text-sm font-extrabold uppercase tracking-[0.24em] text-gold">
            Luxury dermatology and aesthetics
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.02] text-ink md:text-7xl">
            Clinical skincare with a softer kind of luxury.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/68">
            A complete clinic platform for dermatology, cosmetic treatments, bookings, patient care, and admin operations.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/booking" className="btn-primary">
              Book appointment <ArrowRight size={18} />
            </Link>
            <a href="#services" className="btn-ghost">
              Explore services
            </a>
          </div>
          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {[
              [ShieldCheck, 'Board-led care'],
              [Sparkles, 'Premium aesthetic plans'],
              [CalendarCheck, 'Seamless booking'],
            ].map(([Icon, label]) => (
              <div key={label} className="glass rounded-2xl p-4">
                <Icon className="mb-3 text-gold" size={22} />
                <p className="font-bold text-ink">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <img
            className="h-[34rem] w-full rounded-[2rem] object-cover shadow-luxury"
            src="/clinic-photos/hero.jpg"
            alt="Premium skincare treatment room"
          />
          <div className="glass absolute -bottom-6 left-5 right-5 rounded-[1.5rem] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-ink">Today availability</p>
                <p className="text-sm text-ink/60">12 curated treatment slots</p>
              </div>
              <Button>Reserve</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

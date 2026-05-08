import { Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="luxury-gradient grid h-11 w-11 place-items-center rounded-2xl text-white shadow-luxury">
        <Sparkles size={21} />
      </span>
      <span>
        <span className="block font-display text-2xl font-bold leading-none text-ink">Lumina</span>
        <span className="text-xs font-bold uppercase tracking-[0.24em] text-gold">Skin Clinic</span>
      </span>
    </Link>
  )
}

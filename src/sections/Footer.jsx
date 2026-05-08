import Logo from '../components/Logo'

export default function Footer() {
  return (
    <footer className="px-4 py-10">
      <div className="container-lux flex flex-col justify-between gap-5 border-t border-gold/15 pt-8 md:flex-row md:items-center">
        <Logo />
        <p className="text-sm font-semibold text-ink/55">© 2026 Lumina Skin Clinic Platform. Built for premium care teams.</p>
      </div>
    </footer>
  )
}

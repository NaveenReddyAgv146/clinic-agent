import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <h1 className="font-display text-6xl font-bold text-ink">404</h1>
        <p className="mt-3 text-ink/60">This page is not part of the treatment plan.</p>
        <Link className="btn-primary mt-8" to="/">Return home</Link>
      </div>
    </main>
  )
}

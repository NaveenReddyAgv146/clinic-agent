import { motion } from 'framer-motion'
import { pageTransition } from '../animations/motion'
import AboutDoctor from '../sections/AboutDoctor'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'
import Gallery from '../sections/Gallery'
import Hero from '../sections/Hero'
import Services from '../sections/Services'
import Testimonials from '../sections/Testimonials'

export default function Home() {
  return (
    <motion.main {...pageTransition}>
      <Hero />
      <Services />
      <AboutDoctor />
      <Testimonials />
      <Gallery />
      <Contact />
      <Footer />
    </motion.main>
  )
}

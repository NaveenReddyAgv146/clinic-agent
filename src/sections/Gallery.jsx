import { motion } from 'framer-motion'
import { cardReveal, staggerContainer } from '../animations/motion'
import SectionHeader from '../components/SectionHeader'
import { gallery } from '../utils/constants'
import { getGalleryImage } from '../utils/media'

export default function Gallery() {
  return (
    <section id="gallery" className="section-pad bg-white/45">
      <div className="container-lux">
        <SectionHeader eyebrow="Clinic gallery" title="A calm clinical atmosphere" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {gallery.map((image, index) => (
            <motion.div
              key={image}
              variants={cardReveal}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="overflow-hidden rounded-[1.5rem] bg-mist shadow-luxury"
            >
              <img
                className="block aspect-[4/5] h-full min-h-72 w-full object-cover"
                src={getGalleryImage(index, image)}
                alt=""
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.src = getGalleryImage(index)
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

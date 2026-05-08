import { motion } from 'framer-motion'

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -2 }}
      className={`${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}

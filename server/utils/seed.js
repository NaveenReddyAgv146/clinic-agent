import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import Appointment from '../models/Appointment.js'
import Doctor from '../models/Doctor.js'
import Service from '../models/Service.js'
import User from '../models/User.js'

dotenv.config()

const slots = ['09:00', '10:30', '12:00', '14:30', '16:00']

const seed = async () => {
  await connectDB()
  await Promise.all([Appointment.deleteMany(), Doctor.deleteMany(), Service.deleteMany(), User.deleteMany()])

  await User.create([
    { name: 'Clinic Admin', email: 'admin@lumina.com', password: 'password123', role: 'admin', phone: '+91 98765 00001' },
    { name: 'Ava Patient', email: 'patient@lumina.com', password: 'password123', role: 'patient', phone: '+91 98765 00002' },
  ])

  await Doctor.create([
    {
      name: 'Dr. Anika Rao',
      specialization: 'Consultant Dermatologist',
      experience: 12,
      image: '/clinic-photos/doctor-anika.jpg',
      availableSlots: slots,
      bio: 'Board-certified dermatologist focused on evidence-led skin restoration.',
    },
    {
      name: 'Dr. Mira Kapoor',
      specialization: 'Aesthetic Medicine',
      experience: 9,
      image: '/clinic-photos/doctor-mira.jpg',
      availableSlots: slots,
      bio: 'Specialist in injectables, peels, lasers, and natural cosmetic outcomes.',
    },
  ])

  await Service.create([
    {
      title: 'Hydrafacial Ritual',
      description: 'Deep cleansing, exfoliation, infusion, and calming LED therapy.',
      price: 6500,
      duration: '60 min',
      image: '/clinic-photos/service-hydra.jpg',
    },
    {
      title: 'Laser Rejuvenation',
      description: 'Target pigmentation, texture, and tone with doctor-led laser care.',
      price: 12000,
      duration: '45 min',
      image: '/clinic-photos/service-laser.jpg',
    },
    {
      title: 'Clinical Peel Program',
      description: 'Personalized resurfacing protocol for acne marks and dullness.',
      price: 8500,
      duration: '40 min',
      image: '/clinic-photos/service-peel.jpg',
    },
  ])

  console.log('Seed complete. Admin: admin@lumina.com / password123')
  await mongoose.disconnect()
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})

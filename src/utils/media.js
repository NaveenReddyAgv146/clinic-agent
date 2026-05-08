const serviceImageMap = {
  'Hydrafacial Ritual': '/clinic-photos/service-hydra.jpg',
  'Laser Rejuvenation': '/clinic-photos/service-laser.jpg',
  'Clinical Peel Program': '/clinic-photos/service-peel.jpg',
}

const doctorImageMap = {
  'Dr. Anika Rao': '/clinic-photos/doctor-anika.jpg',
  'Dr. Mira Kapoor': '/clinic-photos/doctor-mira.jpg',
}

const galleryImageFallbacks = [
  '/clinic-photos/gallery-1.jpg',
  '/clinic-photos/gallery-2.jpg',
  '/clinic-photos/gallery-3.jpg',
  '/clinic-photos/gallery-4.jpg',
]

export const getServiceImage = (service) =>
  serviceImageMap[service?.title] || service?.image || '/clinic-photos/service-hydra.jpg'

export const getDoctorImage = (doctor) =>
  doctorImageMap[doctor?.name] || doctor?.image || '/clinic-photos/doctor-anika.jpg'

export const getGalleryImage = (index, original) => galleryImageFallbacks[index] || original || galleryImageFallbacks[0]

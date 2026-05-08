import Appointment from '../models/Appointment.js'
import Service from '../models/Service.js'

const populateAppointment = (query) =>
  query.populate('doctorId', 'name specialization image').populate('serviceId', 'title price duration')

export const createAppointment = async (req, res) => {
  const appointment = await Appointment.create({ ...req.body, userId: req.user._id })
  const populated = await populateAppointment(Appointment.findById(appointment._id))
  res.status(201).json(populated)
}

export const getMyAppointments = async (req, res) => {
  const appointments = await populateAppointment(
    Appointment.find({ userId: req.user._id }).sort({ date: 1, time: 1 }),
  )
  res.json(appointments)
}

export const cancelAppointment = async (req, res) => {
  const appointment = await Appointment.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { status: 'cancelled' },
    { new: true },
  )
  res.json(appointment)
}

export const getAllAppointments = async (req, res) => {
  const { status = '', q = '' } = req.query
  const filter = status ? { status } : {}
  const appointments = await Appointment.find(filter)
    .populate('userId', 'name email phone')
    .populate('doctorId', 'name specialization')
    .populate('serviceId', 'title price')
    .sort({ createdAt: -1 })

  const filtered = q
    ? appointments.filter((item) =>
        `${item.userId?.name} ${item.doctorId?.name} ${item.serviceId?.title}`
          .toLowerCase()
          .includes(q.toLowerCase()),
      )
    : appointments

  res.json(filtered)
}

export const updateAppointmentStatus = async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true },
  )
  res.json(appointment)
}

export const getStats = async (req, res) => {
  const [totalBookings, services, appointments, recent] = await Promise.all([
    Appointment.countDocuments(),
    Service.find(),
    Appointment.find().populate('serviceId', 'price'),
    Appointment.find()
      .populate('userId', 'name')
      .populate('serviceId', 'title price')
      .populate('doctorId', 'name')
      .sort({ createdAt: -1 })
      .limit(6),
  ])

  const revenue = appointments
    .filter((item) => item.status !== 'cancelled')
    .reduce((sum, item) => sum + (item.serviceId?.price || 0), 0)

  const statusCounts = appointments.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1
    return acc
  }, {})

  res.json({
    totalBookings,
    revenue,
    services: services.length,
    patientsServed: appointments.filter((item) => item.status === 'completed').length,
    statusCounts,
    recent,
  })
}

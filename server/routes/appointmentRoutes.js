import express from 'express'
import {
  cancelAppointment,
  createAppointment,
  getAllAppointments,
  getMyAppointments,
  getStats,
  updateAppointmentStatus,
} from '../controllers/appointmentController.js'
import { authorize, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, createAppointment)
router.get('/mine', protect, getMyAppointments)
router.patch('/:id/cancel', protect, cancelAppointment)
router.get('/', protect, authorize('admin'), getAllAppointments)
router.get('/stats/overview', protect, authorize('admin'), getStats)
router.patch('/:id/status', protect, authorize('admin'), updateAppointmentStatus)

export default router

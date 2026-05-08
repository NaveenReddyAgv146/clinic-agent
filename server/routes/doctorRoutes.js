import express from 'express'
import { createDoctor, deleteDoctor, getDoctors, updateDoctor } from '../controllers/doctorController.js'
import { authorize, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getDoctors)
router.post('/', protect, authorize('admin'), createDoctor)
router.put('/:id', protect, authorize('admin'), updateDoctor)
router.delete('/:id', protect, authorize('admin'), deleteDoctor)

export default router

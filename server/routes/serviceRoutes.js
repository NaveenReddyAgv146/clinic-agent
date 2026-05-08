import express from 'express'
import { createService, deleteService, getServices, updateService } from '../controllers/serviceController.js'
import { authorize, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getServices)
router.post('/', protect, authorize('admin'), createService)
router.put('/:id', protect, authorize('admin'), updateService)
router.delete('/:id', protect, authorize('admin'), deleteService)

export default router

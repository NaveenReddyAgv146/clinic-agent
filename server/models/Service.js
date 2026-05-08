import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, default: '' },
    duration: { type: String, default: '45 min' },
  },
  { timestamps: true },
)

export default mongoose.model('Service', serviceSchema)

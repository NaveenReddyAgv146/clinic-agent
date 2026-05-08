import mongoose from 'mongoose'

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true, min: 0 },
    image: { type: String, default: '' },
    availableSlots: [{ type: String }],
    bio: { type: String, default: '' },
  },
  { timestamps: true },
)

export default mongoose.model('Doctor', doctorSchema)

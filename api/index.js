import dotenv from 'dotenv'
import app from '../server/app.js'
import { connectDB } from '../server/config/db.js'

dotenv.config()

await connectDB()

export default app

import dns from 'node:dns'
import mongoose from 'mongoose'

let connectionPromise

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection
  }

  if (connectionPromise) {
    return connectionPromise
  }

  const dnsServers = (process.env.DNS_SERVERS || '1.1.1.1,8.8.8.8')
    .split(',')
    .map((server) => server.trim())
    .filter(Boolean)

  if (dnsServers.length) {
    dns.setServers(dnsServers)
  }

  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lumina_skin'
  connectionPromise = mongoose.connect(uri)
  await connectionPromise
  console.log(`MongoDB connected: ${mongoose.connection.host}`)
  return mongoose.connection
}

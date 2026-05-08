import { Outlet } from 'react-router-dom'
import ChatWidget from '../components/ChatWidget'
import Navbar from '../components/Navbar'

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <ChatWidget />
    </>
  )
}

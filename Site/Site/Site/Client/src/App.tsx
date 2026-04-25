import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { fetchServices } from './services/api'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import BranchesPage from './pages/BranchesPage'
import GalleryPage from './pages/GalleryPage'
import PricesPage from './pages/PricesPage'
import ContactsPage from './pages/ContactsPage'
import CancelBookingPage from './pages/CancelBookingPage'
import AdminBookingsPage from './pages/AdminBookingsPage'
import type { Service } from './types'
import './App.css'

function App() {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchServices()
        setServices(data)
      } catch (e) {
        console.error('Не вдалося завантажити послуги', e)
      }
    }
    load()
  }, [])

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage services={services} />} />
          <Route path="/services" element={<ServicesPage services={services} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/branches" element={<BranchesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/prices" element={<PricesPage />} />
          <Route path="/contacts" element={<ContactsPage services={services} />} />
          <Route path="/cancel" element={<CancelBookingPage />} />
          <Route path="/admin/bookings" element={<AdminBookingsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App

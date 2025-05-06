import { Routes, Route, Navigate } from 'react-router-dom'
import About from '../components/About.tsx'
import Projects from '../components/Projects.tsx'
import Contact from '../components/Contact.tsx'

function AppRouter() {
	return (
		<Routes>
			<Route path="/about" element={<About />} />
			<Route path="/projects" element={<Projects />} />
			<Route path="/contact" element={<Contact />} />
			<Route path="*" element={<Navigate to="/about" />} />
		</Routes>
	)
}

export default AppRouter

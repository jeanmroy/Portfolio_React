import { BrowserRouter } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import AppRouter from '../router'
import Footer from './Footer'
import Navbar from './Navbar'

// Specify overly background to paths
const background: Record<string, string> = {
	'/': 'bg-overlay1',
	'/about': 'bg-overlay1',
	'/projects': 'bg-overlay2',
	'/contact': 'bg-overlay3',
}

function Layout() {
	const location = useLocation()
	const className =
		background[location.pathname] + ' page-header-overlay' || 'bg-overlay1'

	return (
		<div className={className}>
			<Navbar />
			<AppRouter />
			<Footer />
		</div>
	)
}

function App() {
	return (
		<BrowserRouter>
			<Layout />
		</BrowserRouter>
	)
}
export default App

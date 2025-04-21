import logo from './../assets/jmroy white 2.svg'
import { NavLink } from 'react-router-dom'

function Navbar() {
	return (
		<header className="content-grid">
			<div className="primary-header breakout">
				{' '}
				{/* Keep primary-header */}
				<NavLink to="/" className="logo-link">
					<img src={logo} alt="Logo" />
				</NavLink>
				<nav>
					{' '}
					{/* Keep nav */}
					<ul>
						<li>
							<NavLink
								to="/about"
								className={({ isActive }) =>
									isActive ? 'active-link' : ''
								}
							>
								about
							</NavLink>
						</li>
						<li className="nav-separator"></li>{' '}
						{/* Spacer element */}
						<li>
							<NavLink
								to="/projects"
								className={({ isActive }) =>
									isActive ? 'active-link' : ''
								}
							>
								projects
							</NavLink>
						</li>
						<li className="nav-separator"></li>{' '}
						{/* Spacer element */}
						<li>
							<NavLink
								to="/contact"
								className={({ isActive }) =>
									isActive ? 'active-link' : ''
								}
							>
								contact
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default Navbar

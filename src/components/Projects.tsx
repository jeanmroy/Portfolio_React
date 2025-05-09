import { useEffect, useRef, useState } from 'react'
import projectsImage from '../assets/projects.webp' // Renamed to avoid conflict with the component
import '../styles/App.css'
import ProjectCard, { Project } from '../components/ProjectCard' // Import ProjectCard and the Project interface

function Projects() {
	const [loaded, setLoaded] = useState(false)
	const sec2_introRef = useRef<HTMLParagraphElement>(null)
	const sec2_descriptionRef = useRef<HTMLParagraphElement>(null)
	const sec2_imageRef = useRef<HTMLImageElement>(null)
	const projectsContainerRef = useRef<HTMLDivElement>(null)

	// Define your project data
	const projectsData: Project[] = [
		{
			id: 'project1',
			title: 'Portfolio - jmroy.com',
			imageSrc: '', // Replace with actual image
			description: `Developped a personal portfolio website using React, Node.js, and Express.js. Leveraging Vite.js for a fast and optimized development workflow, the site showcases my projects, skills, and experience in a modern and responsive design.`,
			tags: ['React', 'Node.js', 'Express.js', 'Vite.js', 'TypeScript'],
			links: [
				{
					name: 'GitHub',
					url: 'https://github.com/jeanmroy/Portfolio_React',
				},
				{ name: 'Live', url: 'https://jmroy.com' },
			],
		},
		{
			id: 'project2',
			title: 'Parking Manager API',
			imageSrc: '', // Replace with actual image
			description: `Designed and implemented an API for managing paid parking spaces, built with the Spring Framework. This project provides comprehensive Create, Read ad Update operations for parking space records. Developed with Open JDK 21 and managed via Maven, it emphasizes code quality with basic JUnit tests. The entire application is containerized using Docker.`,
			tags: ['Spring', 'JUnit', 'Maven', 'JDK 21', 'Docker'],
			links: [
				{
					name: 'GitHub',
					url: 'https://github.com/jeanmroy/ParkingManager',
				},
			],
		},
		{
			id: 'project3',
			title: 'Proxmox Server',
			imageSrc: '', // Replace with actual image
			description: `Set up a Proxmox server for virtualization, hosting multiple virtual machines and containers. This project showcases my skills in server management, virtualization, and network configuration, forming a robust foundation for enhancing my home lab with various servers and Dockerized applications.`,
			tags: ['Linux', 'Network', 'Proxmox', 'Virtualization', 'Home Lab'],
			links: [],
		},
		{
			id: 'project4',
			title: 'Application Deployment & Staging Server',
			imageSrc: '', // Replace with actual image
			description: `Configured a personal application staging server on a Debian VM within Proxmox. This environment supports pre-production testing and deployment of my Node.js (via PM2) and Java applications, securely accessed via SSH.`,
			tags: [
				'Linux',
				'Debian',
				'Proxmox',
				'SSH',
				'Node.js',
				'Java',
				'PM2',
				'DevOps',
				'Deployment',
				'Docker',
				'Home Lab',
			],
			links: [],
		},
		{
			id: 'project5',
			title: 'CI/CD Jenkins Pipeline',
			imageSrc: '', // Replace with actual image
			description: `Developed and implemented a Jenkins-powered CI/CD pipeline, under a Debian proxmox VM, fully automating application build and deployment processes. This pipeline is configured to strategically deploy development branches to a staging environment and master branches to production, showcasing expertise in continuous integration and efficient, reliable software delivery practices.`,
			tags: [
				'Linux',
				'Debian',
				'Proxmox',
				'SSH',
				'Jenkins',
				'DevOps',
				'Deployment',
				'Docker',
				'Home Lab',
			],
			links: [],
		},
	]

	useEffect(() => {
		setTimeout(() => {
			setLoaded(true)
		}, 50)

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('in-view')
						observer.unobserve(entry.target)
					}
				})
			},
			{
				threshold: [0, 0.2],
				rootMargin: '0px 0px -50px 0px',
			}
		)

		const elementsToObserve = [
			sec2_introRef,
			sec2_descriptionRef,
			sec2_imageRef,
			projectsContainerRef,
		]

		elementsToObserve.forEach((ref) => {
			if (ref.current) observer.observe(ref.current)
		})

		const checkElements = () => {
			elementsToObserve.forEach((ref) => {
				if (ref.current) {
					const rect = ref.current.getBoundingClientRect()
					const isVisible =
						rect.top < window.innerHeight && rect.bottom > 0
					if (isVisible) {
						ref.current.classList.add('in-view')
					}
				}
			})
		}

		const timer = setTimeout(checkElements, 200)
		window.addEventListener('resize', checkElements)

		return () => {
			observer.disconnect()
			clearTimeout(timer)
			window.removeEventListener('resize', checkElements)
		}
	}, [])

	return (
		<div>
			<main className="content-grid">
				{/* Section 1 - Title*/}
				<section className="full-width section-title">
					<h1 className="site-title">Projects</h1>
					<div
						className={`indicator-squares ${loaded ? 'loaded' : ''}`}
					>
						<span className="square slide-in"></span>
						<span className="square slide-in"></span>
						<span className="square slide-in"></span>
					</div>
					<p></p>
				</section>

				{/* Section 2 - Description*/}
				<section className="full-width bg-secondary section-secondary">
					<div>
						<p className="intro slide-in" ref={sec2_introRef}>
							Welcome to my projects corner!
						</p>
						<img
							className="slide-in from-right"
							ref={sec2_imageRef}
							src={projectsImage} // Use the renamed import
							alt="Projects"
						/>
					</div>
					<p
						className="description slide-in"
						ref={sec2_descriptionRef}
					>
						This is where I bring ideas to life, exploring the
						fascinating intersection of networking, programming,
						DevOps, and beyond. Get a glimpse into what I've been
						building or tinkering with lately.
					</p>
				</section>

				{/* Section for Project Cards */}
				<section className="full-width bg-overlay2">
					<div
						className="project-cards-container slide-in"
						ref={projectsContainerRef}
					>
						{projectsData.map((project) => (
							<ProjectCard key={project.id} project={project} />
						))}
					</div>
				</section>
			</main>
		</div>
	)
}

export default Projects

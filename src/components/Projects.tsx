import { useEffect, useRef, useState } from 'react'
import projects from '../assets/projects.webp'
import '../styles/App.css'

function Projects() {
	const [loaded, setLoaded] = useState(false)
	const sec2_introRef = useRef<HTMLParagraphElement>(null)
	const sec2_descriptionRef = useRef<HTMLParagraphElement>(null)
	const sec2_imageRef = useRef<HTMLImageElement>(null)

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
				// Refined options:  Adjust these as needed for your layout
				threshold: [0, 0.2], // Trigger when 0% or 20% of the element is visible
				rootMargin: '0px 0px -50px 0px', // Add 50px to the bottom of the viewport
				//  before considering an element in view.
			}
		)

		const elementsToObserve = [
			sec2_introRef,
			sec2_descriptionRef,
			sec2_imageRef,
		]
		elementsToObserve.forEach((ref) => {
			if (ref.current) observer.observe(ref.current)
		})

		// Fallback check with getBoundingClientRect
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

		// Check after a short delay and on resize
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
							src={projects}
							alt="Projects"
						/>
					</div>
					<p
						className="description slide-in "
						ref={sec2_descriptionRef}
					>
						This is where I bring ideas to life, exploring the
						fascinating intersection of networking, programming,
						DevOps, and beyond. Get a glimpse into what I've been
						building or tinkering with lately.
					</p>
				</section>
			</main>
		</div>
	)
}

export default Projects

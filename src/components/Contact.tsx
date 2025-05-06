import { useEffect, useRef, useState } from 'react'
import contact from '../assets/contact.png'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import '../styles/App.css'

function Contact() {
	const [loaded, setLoaded] = useState(false)
	const sec2_introRef = useRef<HTMLParagraphElement>(null)
	const sec2_descriptionRef = useRef<HTMLParagraphElement>(null)
	const sec2_imageRef = useRef<HTMLImageElement>(null)
	const contactFormRef = useRef<HTMLFormElement>(null)

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
			contactFormRef,
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

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		const formData = new FormData(contactFormRef.current!)
		const subject = formData.get('subject') as string
		const message = formData.get('message') as string

		try {
			const response = await fetch('/api/contact/send', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded', // Set the correct content type
				},
				body: new URLSearchParams({ subject, message }).toString(), // Convert data to URL-encoded format
			})

			const data = await response.json()

			if (response.ok) {
				console.log('Success:', data)
				alert('Message sent successfully!')
				if (contactFormRef.current) {
					contactFormRef.current.reset()
				}
			} else {
				console.error('Error:', data)
				alert(
					`Failed to send message: ${data.error || 'Unknown error'}`
				)
			}
		} catch (error) {
			console.error('Fetch error:', error)
			alert('Failed to send message. Please try again later.')
		}
	}

	return (
		<div>
			<main className="content-grid">
				{/* Section 1 - Title*/}
				<section className="full-width section-title">
					<h1 className="site-title">Contact</h1>
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
							Want to contact me ?
						</p>
						<img
							className="slide-in from-right contact"
							ref={sec2_imageRef}
							src={contact}
							alt="Contact"
						/>
					</div>
					<p
						className="description slide-in "
						ref={sec2_descriptionRef}
					>
						To get in touch, feel free to connect through the social
						media links below or use the contact form to send me an
						email. <br></br>
						<a
							href="https://www.linkedin.com/in/jean-marie-roy/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaLinkedin /> LinkedIn
						</a>
						<a
							href="https://github.com/jeanmroy"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaGithub /> Github
						</a>
					</p>
					<form
						ref={contactFormRef}
						onSubmit={handleSubmit}
						className="contact-form slide-in from-right"
					>
						<div className="form-group">
							<label htmlFor="subject" className="form-label">
								Subject:
							</label>
							<input
								type="text"
								id="subject"
								name="subject"
								className="form-input"
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="message" className="form-label">
								Message:
							</label>
							<textarea
								id="message"
								name="message"
								className="form-textarea"
								rows={5}
								required
							></textarea>
						</div>
						<button type="submit" className="form-button">
							Send Message
						</button>
					</form>
				</section>
			</main>
		</div>
	)
}

export default Contact

import { useState, useEffect, useRef } from 'react'
import {
	FaJava,
	FaCode,
	FaDatabase,
	FaCloud,
	FaTools,
	FaUsers,
	FaServer,
	FaTerminal,
	FaNetworkWired,
} from 'react-icons/fa'
import {
	SiJavascript,
	SiTypescript,
	SiSharp,
	SiSpring,
	SiAngular,
	SiRubyonrails,
	SiGit,
	SiSonarqube,
	SiApachemaven,
	SiArtifacthub,
	SiJenkins,
	SiAmazonwebservices,
	SiHashicorp,
	SiLinux,
	SiDocker,
	SiElementor,
	SiReact,
	SiNodedotjs,
	SiCisco,
	SiApache,
	SiApachetomcat,
	SiNginx,
	SiUml,
} from 'react-icons/si'

import me from '../assets/me.png'
import '../styles/App.css'

function About() {
	const [loaded, setLoaded] = useState(false)
	const sec2_introRef = useRef<HTMLParagraphElement>(null)
	const sec2_descriptionRef = useRef<HTMLParagraphElement>(null)
	const sec2_imageRef = useRef<HTMLImageElement>(null)
	const sec3_titleRef = useRef<HTMLHeadingElement>(null)
	const sec3_introRef = useRef<HTMLParagraphElement>(null)
	const sec3_cat1Ref = useRef<HTMLDivElement>(null)
	const sec3_cat2Ref = useRef<HTMLDivElement>(null)
	const sec3_cat3Ref = useRef<HTMLDivElement>(null)
	const sec3_cat4Ref = useRef<HTMLDivElement>(null)
	const sec3_cat5Ref = useRef<HTMLDivElement>(null)
	const sec3_cat6Ref = useRef<HTMLDivElement>(null)

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
			sec3_titleRef,
			sec3_introRef,
			sec3_cat1Ref,
			sec3_cat2Ref,
			sec3_cat3Ref,
			sec3_cat4Ref,
			sec3_cat5Ref,
			sec3_cat6Ref,
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
					<h1 className="site-title">About me</h1>
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
							I'm a full-stack developer based in Québec, Canada.
						</p>
						<img
							className="slide-in from-right"
							src={me}
							alt="Me"
							ref={sec2_imageRef}
						/>
					</div>
					<p
						className="description slide-in "
						ref={sec2_descriptionRef}
					>
						Since 2011, my career has evolved from advanced tech
						support, to network technician and now to a full-stack
						developer. I'm passionate about programming backend
						APIs, networking and learning new technologies. When I'm
						not coding, I like to go outside in nature.
					</p>
				</section>

				{/* Section 3 - Skills */}
				<section className="full-width bg-overlay2 section-third">
					<h1 className="slide-in from-right" ref={sec3_titleRef}>
						Skills
					</h1>
					<p className="slide-in" ref={sec3_introRef}>
						Below is a summary of the key technical skills and areas
						of expertise I've developed throughout the years.
					</p>

					<div className="skills-categories">
						<div
							className="skill-category slide-in"
							ref={sec3_cat1Ref}
						>
							<h3>
								<FaCode className="category-icon" /> Languages
							</h3>
							<ul className="skills-list">
								<li>
									<FaJava className="skill-icon" /> Java
								</li>
								<li>
									<SiTypescript className="skill-icon" />
									TypeScript
								</li>
								<li>
									<SiJavascript className="skill-icon" />
									JavaScript
								</li>
								<li>
									<SiSharp className="skill-icon" /> C# .Net
									WPF
								</li>
								<li>
									<FaDatabase className="skill-icon" /> SQL
								</li>
							</ul>
						</div>

						<div
							className="skill-category slide-in"
							ref={sec3_cat2Ref}
						>
							<h3>
								<FaServer className="category-icon" />
								Frameworks & Libraries
							</h3>
							<ul className="skills-list">
								<li>
									<SiSpring className="skill-icon" /> Spring
								</li>
								<li>
									<SiAngular className="skill-icon" /> Angular
								</li>
								<li>
									<SiRubyonrails className="skill-icon" />
									Ruby on Rails
								</li>
								<li>
									<SiElementor className="skill-icon" />
									Entity
								</li>
								<li>
									<SiReact className="skill-icon" /> React
								</li>
								<li>
									<SiNodedotjs className="skill-icon" />
									Node.js
								</li>
							</ul>
						</div>

						<div
							className="skill-category slide-in"
							ref={sec3_cat3Ref}
						>
							<h3>
								<FaTools className="category-icon" /> Tools
							</h3>
							<ul className="skills-list">
								<li>
									<SiGit className="skill-icon" /> Git
								</li>
								<li>
									<SiUml className="skill-icon" /> UML
								</li>
								<li>
									<SiSonarqube className="skill-icon" />
									SonarQube
								</li>
								<li>
									<SiApachemaven className="skill-icon" />
									Maven
								</li>
								<li>
									<SiHashicorp className="skill-icon" />
									Hashicorp Vault
								</li>
								<li>
									<SiArtifacthub className="skill-icon" />
									Artifactory
								</li>
								<li>
									<SiJenkins className="skill-icon" /> Jenkins
								</li>
								<li>
									<FaTerminal className="skill-icon" />{' '}
									Powershell
								</li>
							</ul>
						</div>

						<div
							className="skill-category slide-in"
							ref={sec3_cat4Ref}
						>
							<h3>
								<FaNetworkWired className="category-icon" />
								Networking
							</h3>
							<ul className="skills-list">
								<li>
									<SiCisco className="skill-icon" /> CCNA
									Formation
								</li>
								<li>
									<SiCisco className="skill-icon" /> Cisco IOS
									& Hardware
								</li>
								<li>
									<SiCisco className="skill-icon" /> Cisco
									Packet Tracer
								</li>
								<li>
									<SiApache className="skill-icon" /> Apache
								</li>
								<li>
									<SiApachetomcat className="skill-icon" />
									Tomcat
								</li>
								<li>
									<SiNginx className="skill-icon" /> Nginx
								</li>
								<li>
									<FaTerminal className="skill-icon" /> SSH
								</li>
							</ul>
						</div>

						<div
							className="skill-category slide-in"
							ref={sec3_cat5Ref}
						>
							<h3>
								<FaCloud className="category-icon" /> Cloud
							</h3>
							<ul className="skills-list">
								<li>
									<SiAmazonwebservices className="skill-icon" />
									Amazon AWS
								</li>
								<li>
									<SiDocker className="skill-icon" /> Docker
								</li>
								<li>
									<SiLinux className="skill-icon" /> Linux
								</li>
							</ul>
						</div>

						<div
							className="skill-category slide-in"
							ref={sec3_cat6Ref}
						>
							<h3>
								<FaUsers className="category-icon" /> Management
							</h3>
							<ul className="skills-list">
								<li>Agile</li>
								<li>Scrum</li>
							</ul>
						</div>
					</div>
				</section>
			</main>
		</div>
	)
}

export default About

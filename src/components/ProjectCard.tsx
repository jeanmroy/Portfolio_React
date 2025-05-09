import React from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import '../styles/ProjectCard.css'

interface ProjectLink {
	name: 'Live' | 'GitHub' // You can extend this with other types if needed
	url: string
}

export interface Project {
	id: string
	title: string
	imageSrc: string
	description: string
	tags: string[]
	links: ProjectLink[]
}

interface ProjectCardProps {
	project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
	return (
		<div className="project-card">
			{' '}
			{/* Apply slide-in for animation */}
			{/* <img
				src={project.imageSrc}
				alt={project.title}
				className="project-image"
			/> */}
			<div className="project-content">
				<h3 className="project-title">{project.title}</h3>
				<p className="project-description">{project.description}</p>

				<div className="project-tags">
					{project.tags.map((tag, index) => (
						<span key={index} className="project-tag">
							{tag}
						</span>
					))}
				</div>

				<div className="project-links">
					{project.links.map((link, index) => (
						<a
							key={index}
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							className="project-link"
						>
							{link.name === 'GitHub' ? (
								<FaGithub className="link-icon" />
							) : (
								<FaExternalLinkAlt className="link-icon" />
							)}{' '}
							{link.name}
						</a>
					))}
				</div>
			</div>
		</div>
	)
}

export default ProjectCard

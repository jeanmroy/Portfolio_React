import 'dotenv/config' // Load environment variables from .env file
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import nodemailer from 'nodemailer'
import { body, validationResult } from 'express-validator'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const port = process.env.PORT || 3000

const limiter = rateLimit({
	windowMs: 60 * 1000,
	max: 2, // requests per minute
	message: { error: 'Too many requests. Please try again later.' },
	handler: (req, res, next, options) => {
		console.warn(`Rate limit exceeded for IP: ${req.ip}`)
		res.status(options.statusCode).json(options.message)
	},
})

// Middleware to parse URL-encoded bodies (as sent by most forms)
app.use(express.urlencoded({ extended: false }))
// Middleware to parse JSON bodies (if you decide to send JSON from the frontend)
app.use(express.json({ limit: '4mb' })) // Prevent abuse via large JSON payloads

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')))

app.use('/api/contact/send', limiter) // Apply rate limiting to the email sending endpoint

if (process.env.NODE_ENV === 'production') {
	app.use(helmet()) // Sets secure HTTP headers
	app.set('trust proxy', 1) // Trusts reverse proxy for correct IP (e.g., for rate limiting)
}

// Endpoint to handle sending emails
app.post(
	'/api/contact/send',
	[
		body('subject')
			.trim()
			.escape()
			.notEmpty()
			.withMessage('Subject is required')
			.isLength({ max: 100 })
			.withMessage('Subject is too long'),

		body('message')
			.trim()
			.escape()
			.notEmpty()
			.withMessage('Message is required')
			.isLength({ max: 5000 })
			.withMessage('Message is too long'),
	],
	async (req, res) => {
		// Validate the request body using express-validator
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { subject, message } = req.body

		// Create a Nodemailer transporter object
		const transporter = nodemailer.createTransport({
			service: 'Gmail', // e.g., 'Gmail', 'Outlook', 'Yahoo'
			auth: {
				user: process.env.GMAIL_USER, // Access from .env
				pass: process.env.GMAIL_PASS, // Access from .env
			},
		})

		const mailOptions = {
			from: process.env.GMAIL_USER, // Sender address
			to: 'jeanmroy@gmail.com', // Your personal email address where you want to receive emails
			subject: `Contact Form: ${subject}`,
			text: message,
		}

		try {
			const info = await transporter.sendMail(mailOptions)
			console.log('Email sent:', info.messageId)
			res.status(200).json({ message: 'Email sent successfully!' })
		} catch (error) {
			console.error('Error sending email:', error)
			res.status(500).json({ error: 'Failed to send email.' })
		}
	}
)

// For Single Page Applications (SPAs), redirect all unmatched routes to index.html
app.get(/^\/(.+)?$/, (req, res) => {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
})

import 'dotenv/config' // Load environment variables from .env file
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import nodemailer from 'nodemailer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const port = process.env.PORT || 3000

// Middleware to parse URL-encoded bodies (as sent by most forms)
app.use(express.urlencoded({ extended: false }))
// Middleware to parse JSON bodies (if you decide to send JSON from the frontend)
app.use(express.json())

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')))

// Endpoint to handle sending emails
app.post('/api/contact/send', async (req, res) => {
	const { subject, message } = req.body

	// Basic input validation (you might want to add more)
	if (!subject || !message) {
		return res
			.status(400)
			.json({ error: 'Subject and message are required.' })
	}

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
})

// For Single Page Applications (SPAs), redirect all unmatched routes to index.html
app.get(/^\/(.+)?$/, (req, res) => {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
})

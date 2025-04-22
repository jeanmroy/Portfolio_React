const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')))

// For Single Page Applications (SPAs), redirect all unmatched routes to index.html
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
})

import fetch from 'node-fetch-commonjs'
import express from 'express'

const app = express()

const apiKey = 'AIzaSyCi2EKAHgUtE1eO5awzizP5lAAkwhNA370'
const placeId = 'ChIJyVHDdeaGqkARPAi7oXI7JkQ'

app.get('/', async (req, res) => {
    async function fetchAndDisplayReviews () {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`

        try {
            const response = await fetch(url)
            const data = await response.json()

            // Check if 'data.result' exists before accessing 'reviews'
            if (data.result) {
                let html = `
            <html>
                <head>
                    <style>
                        h1 {color: blue;}
                        h2 {color: red;}
                        p {
                            font-weight: bold;
                        }
                    </style>
                </head>
                <body>
            `
                const reviews = data.result.reviews

                for (const review of reviews) {
                    let author = `<h1>${review.author_name}</h1>`
                    let rating = `<h2>${review.rating}</h2>`
                    let text = `<p>${review.text}</p>`

                    html += author
                    html += rating
                    html += text
                }

                html += '</body></html>'

                res
                    .status(200)
                    .send(html)
                    .end()
            } else {
                res
                    .status(200)
                    .send('No reviews found.')
                    .end()
            }
        } catch (error) {
            console.error(error)
        }
    }

// Call the function to fetch and display reviews
    await fetchAndDisplayReviews()

})

// Start the server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
    console.log('Press Ctrl+C to quit.')
})

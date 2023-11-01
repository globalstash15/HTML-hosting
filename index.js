import fetch from 'node-fetch-commonjs'
import express from 'express'

const app = express()

const apiKey = 'AIzaSyCi2EKAHgUtE1eO5awzizP5lAAkwhNA370'

app.get('/', async (req, res) => {
    async function fetchAndDisplayReviews () {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.query.id}&fields=reviews%2Crating&key=${apiKey}`

        try {
            const response = await fetch(url)
            const data = await response.json()

            // Check if 'data.result' exists before accessing 'reviews'
            if (data.result) {
                let html = `
            <html>
                <head>
                    <link href="https://cdn.jsdelivr.net/npm/reset-css@5.0.2/reset.min.css" rel="stylesheet">
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">

                    <style>
                        .card {
                            background: #ffffff; 
                            border-radius: 8px; 
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
                            padding: 16px; 
                            margin: 16px; 
                        }

                        h1 {
                            font-family: 'Anton', sans-serif;    
                        }
                        
                        h1 .name {
                            font-size: 20px;
                        }
                        h1 .time {
                            font-size: 12px;
                        }
                        h2 {color: black;}
                        p {
                            font-weight: normal;
                        }
                        
                        section {
                            margin-bottom: 30px;
                        }
                        
                        .review {
                            display: flex;
                            margin-top: 10px;
                            gap: 8px;
                            align-items: center;
                        }
                        
                        .review__image {
                            width: 40px;
                            height: 40px;
                            border-radius: 100%;
                            gap: 8px;
                        }
                        
                        .time {
                            margin-left: 10px;
                            color: grey;
                        }
                        
                        .review__text {
                            margin-top: 10px;
                        }
                        
                        h2 span {
                            color: #FFC657;
                        }
                        h2 span.empty {
                            color: #d3d3d3;
                        }
                    </style>
                </head>
                <body>
            `
                const reviews = data.result.reviews
                const rating = data.result.rating

                function getStars(count) {
                      const fullStars = Math.floor(count); // Whole star rating
                      const fractionalPart = count - fullStars; // Fractional part of the rating
                      let stars = '';
                    
                      for (let i = 0; i < fullStars; i++) {
                        stars += '<span>★</span>';
                      }
                    
                      // Add a partially filled star for the fractional part
                      if (fractionalPart > 0) {
                        const width = `${fractionalPart * 100}%`;
                        stars += `<span class="partial-star" style="width: ${width}">★</span>`;
                      }
                    
                      // Add empty stars to complete the 5-star display
                      for (let i = fullStars + 1; i < 5; i++) {
                        stars += '<span class="empty">★</span>';
                      }
                    
                      return stars;
                    }


                // rating
                html += `
                    <section>
                        <div class="card">
                            <h1><span class="name">${rating}</span></h1>
                            <h2>${ getStars(data.result.rating)}</h2>
                        </div>
                    </section>
                `

                for (const review of reviews) {
                    let item = `
                        <section>
                            <div class="card">
                                <div class="review">
                                    <img class="review__image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxLAYuv4UjJTkN84m6O5n0XP6HDKRrh4XWci9dExTdhA&s">
                                    <div class="review__content">
                                        <h1>
                                            <span class="name">${review.author_name}</span> <span class="time">${review.relative_time_description}</span>
                                        </h1>
                                        <h2>${ getStars(review.rating)}</h2>
                                    </div> 
                                </div>
                                <p class="review__text">${review.text}</p>
                            </div>
                        </section>
                    `

                    html += item
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
})

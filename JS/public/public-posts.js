document.addEventListener('DOMContentLoaded', async () => {
    const cardContainer = document.querySelector('.card-container')
    const allRadioButton = document.querySelector('input[name="filter"][value="all"]')
    const eventRadioButton = document.querySelector('input[name="filter"][value="event"]')
    const volunteerRadioButton = document.querySelector('input[name="filter"][value="volunteering"]')
    const jobRadioButton = document.querySelector('input[name="filter"][value="job"]')

    const searchButton = document.getElementById('searchButton')
    const searchInput = document.getElementById('searchInput')

    searchButton.addEventListener('click', () => {
        const inputValue = searchInput.value.trim()
        if (inputValue) {
            localStorage.setItem('search', inputValue)
            window.location.href = './public-search.html'
        } else {
            alert('Please enter a search term.')
        }
    })

    try {
        const response = await fetch('http://localhost:3000/posts/search')
        const data = await response.json()

        data.forEach(exampleObject => {
            const card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = `
            <div class="cc">
                <h2 class="top">${exampleObject.title}</h2>
                <p class="mid">${exampleObject.category} posted by: ${exampleObject.author_username}</p>
                <p class="mid">${formatDateTime(exampleObject.date_posted)}</p>
                <br>
                <p class="bottom" style="text-align: center; font-size: 20px;">${exampleObject.content}</p>
            </div>
                `
            cardContainer.appendChild(card)
        })
    } catch (error) {
        console.error('Error fetching data:', error)
    }

    allRadioButton.addEventListener('change', async () => {
        if (allRadioButton.checked) {
            try {
                const response = await fetch('http://localhost:3000/posts/search')
                const data = await response.json()

                cardContainer.innerHTML = ''

                data.forEach(exampleObject => {
                    const card = document.createElement('div')
                    card.classList.add('card')
                    card.innerHTML = `
                    <div class="cc">
                <h2 class="top">${exampleObject.title}</h2>
                <p class="mid">${exampleObject.category} posted by: ${exampleObject.author_username}</p>
                <p class="mid">${formatDateTime(exampleObject.date_posted)}</p>
                <br>
                <p class="bottom" style="text-align: center; font-size: 20px;">${exampleObject.content}</p>
            </div>
                `
                    cardContainer.appendChild(card)
                })
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
    })

    eventRadioButton.addEventListener('change', async () => {
        if (eventRadioButton.checked) {
            try {
                const response = await fetch('http://localhost:3000/posts/category/event')
                const data = await response.json()

                cardContainer.innerHTML = ''

                data.forEach(exampleObject => {
                    const card = document.createElement('div')
                    card.classList.add('card')
                    card.innerHTML = `
                    <div class="cc">
                <h2 class="top">${exampleObject.title}</h2>
                <p class="mid">${exampleObject.category} posted by: ${exampleObject.author_username}</p>
                <p class="mid">${formatDateTime(exampleObject.date_posted)}</p>
                <br>
                <p class="bottom" style="text-align: center; font-size: 20px;">${exampleObject.content}</p>
           </div>
                `
                    cardContainer.appendChild(card)
                })
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
    })

    volunteerRadioButton.addEventListener('change', async () => {
        if (volunteerRadioButton.checked) {
            try {
                const response = await fetch('http://localhost:3000/posts/category/volunteering')
                const data = await response.json()

                cardContainer.innerHTML = ''

                data.forEach(exampleObject => {
                    const card = document.createElement('div')
                    card.classList.add('card')
                    card.innerHTML = `
                    <div class="cc">
                <h2 class="top">${exampleObject.title}</h2>
                <p class="mid">${exampleObject.category} posted by: ${exampleObject.author_username}</p>
                <p class="mid">${formatDateTime(exampleObject.date_posted)}</p>
                <br>
                <p class="bottom" style="text-align: center; font-size: 20px;">${exampleObject.content}</p>
           </div>
                `
                    cardContainer.appendChild(card)
                })
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
    })

    jobRadioButton.addEventListener('change', async () => {
        if (jobRadioButton.checked) {
            try {
                const response = await fetch('http://localhost:3000/posts/category/job')
                const data = await response.json()

                cardContainer.innerHTML = ''

                data.forEach(exampleObject => {
                    const card = document.createElement('div')
                    card.classList.add('card')
                    card.innerHTML = `
                    <div class="cc">
                <h2 class="top">${exampleObject.title}</h2>
                <p class="mid">${exampleObject.category} posted by: ${exampleObject.author_username}</p>
                <p class="mid">${formatDateTime(exampleObject.date_posted)}</p>
                <br>
                <p class="bottom" style="text-align: center; font-size: 20px;">${exampleObject.content}</p>
            </div>
                `
                    cardContainer.appendChild(card)
                })
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
    })

    function formatDateTime(dateTimeString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }
        return new Date(dateTimeString).toLocaleDateString('en-US', options)
    }
})


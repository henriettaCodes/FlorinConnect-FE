document.addEventListener('DOMContentLoaded', async () => {

    const cardContainer = document.querySelector('.card-container')

    try {
        const response = await fetch('http://localhost:3000/posts/search')
        const data = await response.json()

        data.forEach(exampleObject => {
            const card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = `
            <h2 style="text-align: center;">${exampleObject.title}</h2>
            <p style="text-align: left; font-size: 15px; margin: 5px;">${exampleObject.category} posted by: ${exampleObject.author_username}</p>
            <p style="text-align: right; font-size: 15px; margin-top: -20px;">${formatDateTime(exampleObject.date_posted)}</p>
            <br>
            <p style="text-align: center; font-size: 20px;">${exampleObject.content}</p>
            `
            cardContainer.appendChild(card)
        })
    } catch (error) {
        console.error('Error fetching data:', error)
    }

    function formatDateTime(dateTimeString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }
        return new Date(dateTimeString).toLocaleDateString('en-US', options)
    }
})

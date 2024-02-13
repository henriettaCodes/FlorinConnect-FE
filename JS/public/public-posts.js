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
                <p style="text-align: left; font-size: 12px; margin-top: 5px;">Posted By: ${exampleObject.author_username}</p>
                <p style="text-align: right; font-size: 12px; margin-top: -20px;">${formatDateTime(exampleObject.date_posted)}</p>
                <h3 style="text-align: center; font-size: 16px; margin-top: 10px;">${exampleObject.category}</h3>
                <p style="text-align: center;">${exampleObject.content}</p>
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

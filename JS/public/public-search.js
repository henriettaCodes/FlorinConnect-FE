document.addEventListener('DOMContentLoaded', async () => {
    const cardContainer = document.querySelector('.card-container')
    const searched = document.querySelector('.searched')
    let search = localStorage.getItem("search")

    searched.innerHTML = `<h4> Results containing '${search}'...</h4>`


    try {
        const response = await fetch(`http://localhost:3000/posts/search/${search}`)
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
                <p class="bottom">${exampleObject.content}</p>
            </div>
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


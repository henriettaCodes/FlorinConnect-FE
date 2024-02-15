document.addEventListener('DOMContentLoaded', async () => {
    const carouselInner = document.querySelector('.carousel-inner')
    try {
        const response = await fetch('http://localhost:3000/posts/category/event')
        const data = await response.json()
        data.forEach((item, index) => {
            const activeClass = index === 0 ? 'active' : ''
            const card = document.createElement('div')
            card.className = `carousel-item ${activeClass}`
            card.innerHTML = `
                <div class="card">
                    <div class="s card-body">
                        <h5 class="card-title text-center">${item.title}</h5>
                        <p class="card-text text-center" style="padding: 0 100px;">${item.content}</p>
                    </div>
                    <div class="text-center mb-3">
                    <button class="btn2 btn-primary" onclick="savePostId(${item.post_id})">View</button>
                </div>
                </div>
            `
            carouselInner.appendChild(card)
        })
    } catch (error) {
        console.error('Error fetching data:', error)
    }

    window.savePostId = (post_id) => {
        localStorage.setItem("postId", `${post_id}`)
        window.location.href = './user-replies.html'
    }
})


document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/posts/category/volunteering')
        const data = await response.json()
        const carouselInner2 = document.querySelector('#collapseTwo .carousel-inner')
        const carouselControls2 = document.querySelector('#collapseTwo .carousel')
        data.forEach((item, index) => {
            const activeClass = index === 0 ? 'active' : ''
            const card = document.createElement('div')
            card.className = `carousel-item ${activeClass}`
            card.innerHTML = `
                <div class="card">
                    <div class="s card-body">
                        <h5 class="card-title text-center">${item.title}</h5>
                        <p class="card-text text-center" style="padding: 0 100px;">${item.content}</p>
                    </div>
                    <div class="text-center mb-3">
                        <button class="btn2 btn-primary" onclick="savePostId(${item.post_id})">View</button>
                    </div>
                </div>
            `
            carouselInner2.appendChild(card)
        })
        new bootstrap.Carousel(carouselControls2)
    } catch (error) {
        console.error('Error fetching data:', error)
    }

    window.savePostId = (post_id) => {
        localStorage.setItem("postId", `${post_id}`)
        window.location.href = './user-replies.html'
    }
})


document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/posts/category/job')
        const data = await response.json()

        const carouselInner3 = document.querySelector('#collapseThree .carousel-inner')
        const carouselControls3 = document.querySelector('#collapseThree .carousel')

        data.forEach((item, index) => {
            const activeClass = index === 0 ? 'active' : ''
            const card = document.createElement('div')
            card.className = `carousel-item ${activeClass}`
            card.innerHTML = `
                <div class="card">
                    <div class="s card-body">
                        <h5 class="card-title text-center">${item.title}</h5>
                        <p class="card-text text-center" style="padding: 0 100px;">${item.content}</p>
                    </div>
                    <div class="text-center mb-3">
                        <button class="btn2 btn-primary" onclick="savePostId(${item.post_id})">View</button>
                    </div>
                </div>
            `
            carouselInner3.appendChild(card)
        })
        new bootstrap.Carousel(carouselControls3)
    } catch (error) {
        console.error('Error fetching data:', error)
    }

    window.savePostId = (post_id) => {
        localStorage.setItem("postId", `${post_id}`)
        window.location.href = './user-replies.html'
    }
})

document.addEventListener('DOMContentLoaded', async () => {
    try {
        token = localStorage.getItem("token")
        const url = `http://localhost:3000/users/${token}`
        const response = await fetch(url)
        const userData = await response.json()
        let message
        let name = userData.username.toUpperCase()
        if (userData.isAdmin === true) {
            message = `(Admin) Welcome ${name} `
        } else {
            message = `(User) Welcome ${name} `
        }
        const messageDiv = document.getElementById('message')
        messageDiv.textContent = message

    } catch (error) {
        console.error('Error fetching data:', error)
    }
})
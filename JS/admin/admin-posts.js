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
            window.location.href = './admin-search.html'
        } else {
            alert('Please enter a search term.')
        }
    })

    try {
        let token = localStorage.getItem("token")
        const url = `http://localhost:3000/users/${token}`
        const response2 = await fetch(url)
        const userData = await response2.json()

        const response = await fetch('http://localhost:3000/posts/search')
        const data = await response.json()

        data.forEach(exampleObject => {
            const card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = `
            <div class="cc">
                <h2 class="top">${exampleObject.title}</h2>
                <p class="middle">${exampleObject.category} posted by: ${exampleObject.author_username}</p>
                <p class="middle">${formatDateTime(exampleObject.date_posted)}</p>
                <br>
                <p class="bottom">${exampleObject.content}</p>
                
                <div>
                    ${userData.account_id === exampleObject.account_id ? `<button class="btn2 edit-button" data-postid="${exampleObject.post_id}">Edit</button>` : ''}
                    <button class="btn2 delete-button" data-postid="${exampleObject.post_id}">Delete</button>
                    <button class="btn2 reply-button" data-postid="${exampleObject.post_id}">Reply</button>
                </div>
                </div>
            `
            cardContainer.appendChild(card)

            const editButton = card.querySelector('.edit-button')
            if (editButton) {
                editButton.addEventListener('click', () => {
                    const postId = editButton.getAttribute('data-postid')
                    localStorage.setItem('postId', postId)
                    window.location.href = '../user/edit-post.html'
                })
            }

            const deleteButton = card.querySelector('.delete-button')
            deleteButton.addEventListener('click', async () => {
                const postId = deleteButton.getAttribute('data-postid')
                const confirmation = window.confirm("Are you sure you want to delete this post?")

                if (confirmation) {
                    try {
                        await fetch(`http://localhost:3000/posts/${postId}`, { method: 'DELETE' })
                        location.reload()
                    } catch (error) {
                        console.error('Error deleting post:', error)
                    }
                } else {
                    return
                }
            })

            const replyButton = card.querySelector('.reply-button')
            replyButton.addEventListener('click', () => {
                const postId = replyButton.getAttribute('data-postid')
                localStorage.setItem('postId', postId)
                window.location.href = './admin-replies.html'
            })
        })
    } catch (error) {
        console.error('Error fetching data:', error)
    }

    allRadioButton.addEventListener('change', async () => {
        if (allRadioButton.checked) {
            try {
                let token = localStorage.getItem("token")
                const url = `http://localhost:3000/users/${token}`
                const response2 = await fetch(url)
                const userData = await response2.json()

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
                <p class="bottom">${exampleObject.content}</p>
                
                <div>
                    ${userData.account_id === exampleObject.account_id ? `<button class="btn2 edit-button" data-postid="${exampleObject.post_id}">Edit</button>` : ''}
                    <button class="btn2 delete-button" data-postid="${exampleObject.post_id}">Delete</button>
                    <button class="btn2 reply-button" data-postid="${exampleObject.post_id}">Reply</button>
                </div>
                </div>
            `
                    cardContainer.appendChild(card)

                    const editButton = card.querySelector('.edit-button')
                    if (editButton) {
                        editButton.addEventListener('click', () => {
                            const postId = editButton.getAttribute('data-postid')
                            localStorage.setItem('postId', postId)
                            window.location.href = '../user/edit-post.html'
                        })
                    }

                    const deleteButton = card.querySelector('.delete-button')
                    deleteButton.addEventListener('click', async () => {
                        const postId = deleteButton.getAttribute('data-postid')
                        try {
                            await fetch(`http://localhost:3000/posts/${postId}`, { method: 'DELETE' })
                            location.reload()
                        } catch (error) {
                            console.error('Error deleting post:', error)
                        }
                    })

                    const replyButton = card.querySelector('.reply-button')
                    replyButton.addEventListener('click', () => {
                        const postId = replyButton.getAttribute('data-postid')
                        localStorage.setItem('postId', postId)
                        window.location.href = './admin-replies.html'
                    })
                })
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
    })

    eventRadioButton.addEventListener('change', async () => {
        if (eventRadioButton.checked) {
            try {
                let token = localStorage.getItem("token")
                const url = `http://localhost:3000/users/${token}`
                const response2 = await fetch(url)
                const userData = await response2.json()

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
                        <p class="bottom">${exampleObject.content}</p>
                        
                        <div>
                            ${userData.account_id === exampleObject.account_id ? `<button class="btn2 edit-button" data-postid="${exampleObject.post_id}">Edit</button>` : ''}
                            <button class="btn2 delete-button" data-postid="${exampleObject.post_id}">Delete</button>
                            <button class="btn2 reply-button" data-postid="${exampleObject.post_id}">Reply</button>
                        </div>
                        </div>
                    `
                    cardContainer.appendChild(card)

                    const editButton = card.querySelector('.edit-button')
                    if (editButton) {
                        editButton.addEventListener('click', () => {
                            const postId = editButton.getAttribute('data-postid')
                            localStorage.setItem('postId', postId)
                            window.location.href = '../user/edit-post.html'
                        })
                    }

                    const deleteButton = card.querySelector('.delete-button')
                    deleteButton.addEventListener('click', async () => {
                        const postId = deleteButton.getAttribute('data-postid')
                        try {
                            await fetch(`http://localhost:3000/posts/${postId}`, { method: 'DELETE' })
                            location.reload()
                        } catch (error) {
                            console.error('Error deleting post:', error)
                        }
                    })

                    const replyButton = card.querySelector('.reply-button')
                    replyButton.addEventListener('click', () => {
                        const postId = replyButton.getAttribute('data-postid')
                        localStorage.setItem('postId', postId)
                        window.location.href = './admin-replies.html'
                    })
                })
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
    })

    volunteerRadioButton.addEventListener('change', async () => {
        if (volunteerRadioButton.checked) {
            try {
                let token = localStorage.getItem("token")
                const url = `http://localhost:3000/users/${token}`
                const response2 = await fetch(url)
                const userData = await response2.json()

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
                        <p class="bottom">${exampleObject.content}</p>
                        
                        <div>
                            ${userData.account_id === exampleObject.account_id ? `<button class="btn2 edit-button" data-postid="${exampleObject.post_id}">Edit</button>` : ''}
                            <button class="btn2 delete-button" data-postid="${exampleObject.post_id}">Delete</button>
                            <button class="btn2 reply-button" data-postid="${exampleObject.post_id}">Reply</button>
                        </div>
                        </div>
                    `
                    cardContainer.appendChild(card)

                    const editButton = card.querySelector('.edit-button')
                    if (editButton) {
                        editButton.addEventListener('click', () => {
                            const postId = editButton.getAttribute('data-postid')
                            localStorage.setItem('postId', postId)
                            window.location.href = '../user/edit-post.html'
                        })
                    }

                    const deleteButton = card.querySelector('.delete-button')
                    deleteButton.addEventListener('click', async () => {
                        const postId = deleteButton.getAttribute('data-postid')
                        try {
                            await fetch(`http://localhost:3000/posts/${postId}`, { method: 'DELETE' })
                            location.reload()
                        } catch (error) {
                            console.error('Error deleting post:', error)
                        }
                    })

                    const replyButton = card.querySelector('.reply-button')
                    replyButton.addEventListener('click', () => {
                        const postId = replyButton.getAttribute('data-postid')
                        localStorage.setItem('postId', postId)
                        window.location.href = './admin-replies.html'
                    })
                })
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
    })

    jobRadioButton.addEventListener('change', async () => {
        if (jobRadioButton.checked) {
            try {
                let token = localStorage.getItem("token")
                const url = `http://localhost:3000/users/${token}`
                const response2 = await fetch(url)
                const userData = await response2.json()

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
                        <p class="bottom">${exampleObject.content}</p>
                        
                        <div>
                            ${userData.account_id === exampleObject.account_id ? `<button class="btn2 edit-button" data-postid="${exampleObject.post_id}">Edit</button>` : ''}
                            <button class="btn2 delete-button" data-postid="${exampleObject.post_id}">Delete</button>
                            <button class="btn2 reply-button" data-postid="${exampleObject.post_id}">Reply</button>
                        </div>
                        </div>
                    `
                    cardContainer.appendChild(card)

                    const editButton = card.querySelector('.edit-button')
                    if (editButton) {
                        editButton.addEventListener('click', () => {
                            const postId = editButton.getAttribute('data-postid')
                            localStorage.setItem('postId', postId)
                            window.location.href = '../user/edit-post.html'
                        })
                    }

                    const deleteButton = card.querySelector('.delete-button')
                    deleteButton.addEventListener('click', async () => {
                        const postId = deleteButton.getAttribute('data-postid')
                        try {
                            await fetch(`http://localhost:3000/posts/${postId}`, { method: 'DELETE' })
                            location.reload()
                        } catch (error) {
                            console.error('Error deleting post:', error)
                        }
                    })

                    const replyButton = card.querySelector('.reply-button')
                    replyButton.addEventListener('click', () => {
                        const postId = replyButton.getAttribute('data-postid')
                        localStorage.setItem('postId', postId)
                        window.location.href = './admin-replies.html'
                    })
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

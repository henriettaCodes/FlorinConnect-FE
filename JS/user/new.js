document.addEventListener('DOMContentLoaded', async () => {
    let token = localStorage.getItem("token")
    const url = `http://localhost:3000/users/${token}`
    const response = await fetch(url)
    const userData = await response.json()

    const postForm = document.getElementById('postForm')
    let isFormSubmitted = false

    window.addEventListener('beforeunload', (event) => {
        if (!isFormSubmitted) {
            const message = 'Leaving the page will cause the post not to be added. Are you sure?'
            event.returnValue = message
            return message
        }
    })

    postForm.addEventListener('submit', async (event) => {
        event.preventDefault()

        const title = document.getElementById('title').value
        const description = document.getElementById('description').value
        const category = document.getElementById('category').value

        const requestBody = {
            account_id: userData.account_id,
            title: title,
            content: description,
            category: category
        }

        try {
            const response = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })

            if (response.ok) {
                console.log('Post created successfully:', await response.json())
                isFormSubmitted = true
                window.location.href = '../user/user-posts.html'
            } else {
                console.error('Failed to create post:', response.statusText)
            }
        } catch (error) {
            console.error('Error creating post:', error)
        }
    })
})


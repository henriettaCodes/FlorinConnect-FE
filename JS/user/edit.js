document.addEventListener('DOMContentLoaded', async () => {
    let id = localStorage.getItem("postId")
    const url2 = `http://localhost:3000/posts/${id}`
    const response2 = await fetch(url2)
    const postData = await response2.json()

    document.getElementById('title').value = postData.title;
    document.getElementById('description').value = postData.content;
    document.getElementById('category').value = postData.category;

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
            title: title,
            content: description,
            category: category
        }

        try {
            const response = await fetch(`http://localhost:3000/posts/${id}`, {
                method: 'PATCH',
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
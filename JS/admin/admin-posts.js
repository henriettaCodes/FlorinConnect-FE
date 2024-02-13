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
                
                <div style="text-align: center; margin-top: 10px;">
                    <button class="edit-button" data-postid="${exampleObject.post_id}">Edit</button>
                    <button class="delete-button" data-postid="${exampleObject.post_id}">Delete</button>
                    <button class="reply-button" data-postid="${exampleObject.post_id}">Reply</button>
                </div>
            `
            cardContainer.appendChild(card)

            const editButton = card.querySelector('.edit-button')
            editButton.addEventListener('click', () => {
                const postId = editButton.getAttribute('data-postid')
                localStorage.setItem('postId', postId)
                window.location.href = '../user/edit-post.html'
            })

            const deleteButton = card.querySelector('.delete-button')
            deleteButton.addEventListener('click', async () => {
                const postId = deleteButton.getAttribute('data-postid')
                try {
                    await fetch(`http://localhost:3000/posts/${postId}`, { method: 'DELETE' })
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

    function formatDateTime(dateTimeString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }
        return new Date(dateTimeString).toLocaleDateString('en-US', options)
    }
})

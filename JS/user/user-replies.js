const postReply = async () => {
    const contentValue = document.getElementById("replyInput").value

    let token = localStorage.getItem("token")
    const url = `http://localhost:3000/users/${token}`
    const response = await fetch(url)
    const userData = await response.json()

    let id = localStorage.getItem("postId")

    const requestBody = {
        content: contentValue,
        account_id: userData.account_id,
    }

    fetch(`http://localhost:3000/replies/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(
            window.location.reload()
        )
        .catch(error => {
            console.error('Error posting reply:', error)
        })
}

const postingButton = document.getElementById("postingButton")
if (postingButton) {
    postingButton.removeEventListener("click", postReply)
    postingButton.addEventListener("click", postReply)
}


document.addEventListener('DOMContentLoaded', async () => {
    try {
        let token = localStorage.getItem("token")
        const url = `http://localhost:3000/users/${token}`
        const response = await fetch(url)
        const userData = await response.json()

        let id = localStorage.getItem("postId")
        const url2 = `http://localhost:3000/posts/${id}`
        const response2 = await fetch(url2)
        const postData = await response2.json()
        const postDiv = document.getElementById('post')
        postDiv.innerHTML = `
            <div class="post-card mb-3">
                <div class="post-card-header">${postData.title}</div>
                <div class="post-card-body">
                    <h5 class="card-title">${postData.content}</h5>
                    <p class="card-text">Category: ${postData.category}</p>
                    <p class="card-text"><small class="text-muted">Posted By: ${postData.author_username}</small></p>
                    <p class="card-text"><small class="text-muted">Date Posted: ${formatDate(postData.date_posted)}</small></p>
                </div>
            </div>
        `

        const url3 = `http://localhost:3000/replies/post/${id}`
        const response3 = await fetch(url3)
        const replyData = await response3.json()
        const replyDiv = document.getElementById('reply')
        replyData.forEach(reply => {
            const isCurrentUserReply = reply.account_id === userData.account_id
            const deleteButton = isCurrentUserReply ? `<button onclick="deleteReply(${reply.reply_id})">Delete</button>` : ''
            replyDiv.innerHTML += `
                <div class="reply-card mb-3">
                    <div class="reply-card-header">${reply.author_username}</div>
                    <div class="reply-card-body">
                        <p class="card-text">${reply.content}</p>
                        <p class="card-text"><small>Date Posted: ${formatDate(reply.date_posted)}</small></p>
                        ${deleteButton}
                    </div>
                </div>
            `
        })

    } catch (error) {
        console.error('Error fetching data:', error)
    }
})

async function deleteReply(replyId) {
    try {
        const response = await fetch(`http://localhost:3000/replies/${replyId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            location.reload()
        } else {
            console.error('Failed to delete reply')
        }
    } catch (error) {
        console.error('Error deleting reply:', error)
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' }
    return new Date(dateString).toLocaleDateString(undefined, options)
}

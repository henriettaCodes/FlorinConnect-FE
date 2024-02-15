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
            <div class="cc">
                <div class="post-card-header top">${postData.title}</div>
                <div class="post-card-body">
                    <h5 class="card-title mid1">${postData.content}</h5>
                    <p class="card-text mid2">Category: ${postData.category}</p>
                    <p class="card-text mid3"><small class="text-muted">Posted By: ${postData.author_username}</small></p>
                    <p class="card-text bottom"><small class="text-muted">Date Posted: ${formatDate(postData.date_posted)}</small></p>
                    <a class="btn2" href="./user-posts.html">Back to Posts</a>
                    </div>
                </div>
            </div>
        `

        const url3 = `http://localhost:3000/replies/post/${id}`
        const response3 = await fetch(url3)
        const replyData = await response3.json()
        const replyDiv = document.getElementById('reply');
        let replyRowContainer = document.createElement('div');
        replyRowContainer.className = 'reply-row-container';

        replyData.forEach((reply, index) => {
            const isCurrentUserReply = reply.account_id === userData.account_id;
            const deleteButton = isCurrentUserReply ? `<button class="btn2" onclick="deleteReply(${reply.reply_id})">Delete</button>` : '';

            const replyHTML = `
        <div class="reply-card mb-3">
        <div class="cr">
            <div class="t reply-card-header">${reply.author_username}:</div>
            <div class="reply-card-body">
                <p class="m card-text">${reply.content}</p>
                <p class="b card-text"><small>Date Posted: ${formatDate(reply.date_posted)}</small></p>
                ${deleteButton}
            </div>
            </div>
        </div>
    `

            replyRowContainer.innerHTML += replyHTML

            if ((index + 1) % 2 === 0 || index === replyData.length - 1) {
                replyDiv.appendChild(replyRowContainer)
                replyRowContainer = document.createElement('div')
                replyRowContainer.className = 'reply-row-container'
            }
        })

    } catch (error) {
        console.error('Error fetching data:', error)
    }
})

async function deleteReply(replyId) {
    const confirmation = window.confirm("Are you sure you want to delete this reply?")

    if (confirmation) {
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
    } else {
        return
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' }
    return new Date(dateString).toLocaleDateString(undefined, options)
}

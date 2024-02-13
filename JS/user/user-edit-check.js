const userEditCheck = async () => {
    try {
        let token = localStorage.getItem("token")
        const url = `http://localhost:3000/users/${token}`
        const response = await fetch(url)
        const userData = await response.json()
        console.log("User found:", userData)
        if (!userData.account_id) {
            localStorage.removeItem("token")
            window.location.href = '../public/index.html'
        }
        let id = localStorage.getItem("postId")
        const url2 = `http://localhost:3000/posts/${id}`
        const response2 = await fetch(url2)
        const postData = await response2.json()
        if (postData.account_id !== userData.account_id) {
            window.location.href = './dashboard.html'
        }
    } catch (error) {
        console.log("No user matching token")
        localStorage.removeItem("token")
        window.location.href = '../public/index.html'
    }
}

userEditCheck()
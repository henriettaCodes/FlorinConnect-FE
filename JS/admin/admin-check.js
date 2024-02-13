const userPageCheck = async () => {
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
        if (!userData.isAdmin === true) {
            window.location.href = '../user/dashboard.html'
        }
    } catch (error) {
        console.log("No user matching token")
        localStorage.removeItem("token")
        window.location.href = '../public/index.html'
    }
}

userPageCheck()
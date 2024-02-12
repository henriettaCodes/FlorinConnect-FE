const checkToken = () => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
        window.location.href = '../user/dashboard.html'
    }
}

checkToken()
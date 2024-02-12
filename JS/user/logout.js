const logout = () => {
    localStorage.removeItem("token")
}

document.getElementById("logoutBtn").addEventListener("click", () => {
    logout()
})
document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault()

    const form = new FormData(e.target)

    const isAdmin = form.get("isAdmin") === "on"

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form.get("username"),
            password: form.get("password"),
            is_admin: isAdmin
        })
    }

    const response = await fetch("http://localhost:3000/users/register", options)
    const data = await response.json()

    if (response.status == 201) {
        window.location.assign("./index.html")
    } else {
        alert(data.error)
    }
})
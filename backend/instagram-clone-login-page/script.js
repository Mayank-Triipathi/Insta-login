const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = form.email.value;
    const password = form.password.value;

    const response = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "/home.html";
    } else {
        alert(data.message);
    }
});
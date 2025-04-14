document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let username = document.getElementById('username').value.trim();
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value;

    if (username === "" || email === "" || password === "") {
        document.getElementById('message').textContent = "All fields are required!";
    } else {
        document.getElementById('message').style.color = "green";
        document.getElementById('message').textContent = "Registration Successful!";
        // You can add backend integration here.
    }
});

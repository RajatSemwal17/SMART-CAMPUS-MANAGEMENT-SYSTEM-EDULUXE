document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    console.log("Response from server:", data); // 🧩 check in console

    if (data.success) {
      localStorage.setItem("loggedInUser", JSON.stringify(data.user));
      alert("Login successful!");
      window.location.href = "index.html";
    }
    else {
      alert("Invalid username or password!");
    }
  } catch (error) {
    console.error("Error connecting to server:", error);
    alert("Server error. Please try again later.");
  }
}); 
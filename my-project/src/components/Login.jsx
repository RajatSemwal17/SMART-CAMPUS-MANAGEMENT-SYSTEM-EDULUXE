import "./login-signup.css";


import { useState } from "react";
import "./login-signup.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log("Response from server:", data);

      if (data.success) {
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
        alert("Login successful!");
        window.location.replace("/index.html");
      } else {
        alert("Invalid username or password!");
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <form id="loginForm" onSubmit={handleSubmit}>
      <h1
        style={{
          color: "white",
          textAlign: "center",
          marginBottom: "10px",
          fontWeight: "400",
        }}
      >
        LOGIN <span style={{ color: "rgb(0, 17, 255)" }}>FORM</span>
      </h1>
      <img 
  src="/images/eduluxe.png" 
  alt="Eduluxe Logo" 
  style={{
    width: "120px",
    height: "auto",
    display: "block",
    margin: "0 auto 20px",
    objectFit: "contain"
  }}
/>


      <input
        type="text"
        id="username"
        placeholder="Username"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        id="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
}
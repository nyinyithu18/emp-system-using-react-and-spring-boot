import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { api } from "../../api/ApiResources";
import { useNavigate } from "react-router";
import axios from "axios";

const LoginSignUp = () => {
  const [action, setAction] = useState("Login");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setErrors] = useState("");
  const navigate = useNavigate('')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8080/login", credentials);
      const token = res.data;
      
      localStorage.setItem("token", token);       
  
      setCredentials({ username: "", password: "" });
      setErrors("");

      alert("Login successful!");
    } catch (error) {
      setErrors("Invalid Username or Password");
    }
  };

  const handleClick = () => {
    if (action === "Login") {
      handleLogin();
     // navigate('/')
    } else {
      console.log("Sign Up action is not implemented yet");
    }
  };

  return (
    <div className="w-full h-dvh">
      <div className="h-full flex justify-center items-center">
        <div className="w-72 bg-blue-300 p-5 border rounded">
          <h1 className="flex justify-center text-3xl font-medium">{action}</h1>
          <div>
            <div className="block">
              <Label className="text-lg" htmlFor="username">
                Username
              </Label>
            </div>
            <TextInput
              name="username"
              type="text"
              placeholder="Your name....."
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-2">
            <div className="block">
              <Label className="text-lg" htmlFor="password">
                Password
              </Label>
            </div>
            <TextInput
              name="password"
              type="password"
              placeholder="Your password....."
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          {action === "Sign Up" ? (
            <div className="mb-2">
              <div className="block">
                <Label className="text-lg" htmlFor="email">
                  Email
                </Label>
              </div>
              <TextInput
                name="email"
                type="email"
                placeholder="name@gmail.com"
                required
              />
            </div>
          ) : (
            <div></div>
          )}
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          {action === "Login" ? (
            <div className="mb-4">
              Lost Password?{" "}
              <span className="font-medium cursor-pointer">Click Here!</span>
            </div>
          ) : (
            <div></div>
          )}
          <div className="flex justify-around">
            <div>
              <button
                className={
                  action === "Sign Up"
                    ? "p-2 px-3 bg-blue-600 text-white border rounded"
                    : "p-2 px-3 bg-gray-500 text-white border rounded"
                }
                type="button"
                onClick={() => setAction("Sign Up")}
              >
                Sign Up
              </button>
            </div>
            <div>
              <button
                className={
                  action === "Login"
                    ? "p-2 px-3 bg-blue-600 text-white border rounded"
                    : "p-2 px-3 bg-gray-500 text-white border rounded"
                }
                type="button"
                onClick={handleClick}
              >
                Login 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerWithEmailAndPassword } from "../../../firebase/auth";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const user = localStorage.getItem('flash-card-user');

  const register = async () => {
    if (!name) alert("Please enter name");
    const user = await registerWithEmailAndPassword(name, email, password);
    console.log('user after handle register: ', user);
    localStorage.setItem('flash-card-user', JSON.stringify(user));
    navigate('/');
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="register__btn" onClick={register}>
          Register
        </button>

        <div>
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Register;
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logInWithEmailAndPassword } from "../../../firebase/auth";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = localStorage.getItem('flash-card-user');

  const navigate = useNavigate();

  useEffect(() => {
    if(user) {
      navigate('/');
    }
  }, [user])

  const handleLogin = async () => {
    const user = await logInWithEmailAndPassword(email, password);
    console.log('user after handle login: ', user);
    if(!user) {
      return;
    }
    localStorage.setItem('flash-card-user', JSON.stringify(user));
    navigate('/');
  }

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu"
        />
        <button
          className="login__btn"
          onClick={handleLogin}
        >
          Đăng nhập
        </button>

        <div>
          Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link> tại đây.
        </div>
      </div>
    </div>
  );
}

export default Login;
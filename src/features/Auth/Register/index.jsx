import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerWithEmailAndPassword } from '../../../firebase/auth';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const user = localStorage.getItem('flash-card-user');

  const register = async () => {
    if (!name) alert('Please enter name');
    const user = await registerWithEmailAndPassword(name, email, password);
    if (!user) return;
    localStorage.setItem('flash-card-user', JSON.stringify(user));
    navigate('/');
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu"
        />
        <button className="register__btn" onClick={register}>
          Đăng ký
        </button>

        <div>
          Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link> tại đây.
        </div>
      </div>
    </div>
  );
}

export default Register;

import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../shared/logo.jpg';
import './header-style.scss';

function Header() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('user');
  const altLogo = 'logo';
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUsername(user.username);
  }, [username]);
  const navigateHome = () => navigate('/home');
  return (
    <header className="header-container">
      <h1 onClick={navigateHome} className="app-name">
        {' '}
        <img className="logo" alt={altLogo.toString()} src={logo} />
        The Taste Council
      </h1>
      <h3 className="user-name">{username}</h3>
    </header>
  );
}

export default Header;

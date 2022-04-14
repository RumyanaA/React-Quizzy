import { useEffect, useState } from "react";
import logo from '../../../shared/logo.jpg'
import './header-style.scss'
const Header = () =>{
    const [username, setUsername] = useState('user')
    const altLogo='logo';
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUsername(user.username);
    },[username]);

    return (<header className="header-container">
        <h1 className="app-name"> <img className="logo" alt={altLogo.toString()} src={logo}/>The Taste Council</h1>
        <h3 className="user-name">{username}</h3>
    </header>
    )
    }

export default Header;
import { useEffect, useState } from "react";
import './header-style.scss'
const Header = () =>{
    const [username, setUsername] = useState('user')
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUsername(user.username);
    },[username]);

    return (<header className="header-container">
        <h1 className="app-name">The Taste Council</h1>
        <h2 className="user-name">{username}</h2>
    </header>
    )
    }

export default Header;
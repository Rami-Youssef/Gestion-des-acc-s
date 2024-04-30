import { Outlet,Link } from "react-router-dom";
import "./header.css"
import axios from "axios";
import Icon from './icon.jsx';

import { useEffect, useState } from "react";
export default function Header() {
    const [Post, setPost] = useState([]);
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:5000/verify')
            .then((res) => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setPost(res.data.token.Poste)
                } else {
                    setMessage(res.data.Message);
                }
            })
            .catch((error) => {
                console.error('Error verifying authentication:', error);
                setMessage('An error occurred while verifying authentication.');
            });
    }, []);
    
    return(
        <>
        <nav id="Header">
            <div id="links">

            <Link to='/GDA/List'>List</Link>
            {
                Post ==="manager"&&
                <Link to='/GDA/demande'>Demande</Link>
            }
            </div>
            <div><Icon/></div>
            <div><Link to='/'>Déconnexion</Link></div>
            
        </nav>
        <Outlet />
        </>
    )
    
}
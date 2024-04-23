import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from './Input.jsx';
import Button from './button.jsx';
import Icon from './icon.jsx';
import { MainContainer, HorizontalRule, WelcomeText, InputContainer, ButtonContainer, IconsContainer } from './log-in.js';
import './log-in.scss';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Fetch CSRF token on component mount
    useEffect(() => {
        fetchCsrfToken();
    }, []);

    const fetchCsrfToken = () => {
        axios.get('http://localhost:8080/http://127.0.0.1:8000/csrf-token')
            .then(response => {
                setCsrfToken(response.data.csrf_token);
            })
            .catch(error => {
                console.error('Failed to fetch CSRF token:', error);
                // Handle error
            });
    };

    const [csrfToken, setCsrfToken] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/http://127.0.0.1:8000/login', { email, password }, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                }
            });
            console.log(response.data);
            // Handle successful login (e.g., redirect user)
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            // Handle login error (e.g., display error message to user)
        }
    };

    return (
        <div id='login'>
            <MainContainer>
                <WelcomeText>
                    <p>{email} yo{password}</p>
                    Log-in
                    <HorizontalRule />
                </WelcomeText>

                <InputContainer>
                    <Input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </InputContainer>

                <ButtonContainer>
                    <Button content="Login" onClick={handleLogin} />
                </ButtonContainer>

                <IconsContainer>
                    <Icon>
                        qzd
                    </Icon>
                </IconsContainer>
            </MainContainer>
        </div>
    );
};

export default Login;

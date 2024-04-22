import {MainContainer,HorizontalRule,LoginWith,ButtonContainer,IconsContainer,InputContainer,WelcomeText} from './log-in.js'
import  "./log-in.scss";
import Icon from "./icon.jsx";
import  Button  from "./button.jsx";
import Input from "./Input.jsx";
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [test, setTest] = useState("");

    

const handleLogin = async () => {
    try {
        const response = await axios.get('http://localhost:8080/http://localhost:3000/login', {
            email: email,
            password: password
        });

        const data = response.data;

        // Assuming your Laravel backend returns a JWT token upon successful login
        const token = data.access_token;

        // Store the token in local storage or session storage for future use
        localStorage.setItem('token', token);

        // Redirect the user to the dashboard or any other page
        // Replace '/dashboard' with the desired redirect URL
        window.location.href = '/dashboard';
    } catch (error) {
        // Handle login error
        console.error('Login failed:', error);
    }
};


    return (
        <div id='login'>
            <MainContainer>
                <WelcomeText>
                    <p>{email} yo{password}--{test}</p>
                    Log-in
                    <HorizontalRule />
                </WelcomeText>

                <InputContainer>
                <Input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                    <Input type="password" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)}/>
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
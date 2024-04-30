import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from './Input.jsx';
import Button from './button.jsx';
import Icon from './icon.jsx';
import { MainContainer, HorizontalRule, WelcomeText, InputContainer, ButtonContainer, IconsContainer } from './log-in.js';
import './log-in.scss';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Status,SetStatus]=useState("")
    const Navigate=useNavigate()
    const [value,setValue]=useState({
        Email: email,
        Password:password
    })

    useEffect(() => {
        setValue({
            "Email": email,
            "Password": password
        });
    }, [email, password]);

    axios.defaults.withCredentials= true;

    const send = () => {
        axios.post('http://localhost:5000/login', value)
            .then((res) => {
                if(res.data.Status=== "Success"){
                    console.log(res.data.Password)
                    Navigate('/GDA/List')
                }else{
                    SetStatus(res.data.Status)
                    console.log('wtf')
                }
                
            })
            .catch((err) => {
                console.log('Your error:', err);
            });
    };

    return (
        <div id='login'>
            <MainContainer>
                <WelcomeText>
                Se identifier            
                <HorizontalRule />
                </WelcomeText>

                <InputContainer>
                    <Input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </InputContainer>
                <div style={{color: '#cc0000'}}>{Status}</div>
                <ButtonContainer>
                    <Button content="Login" onClick={send}/>
                </ButtonContainer>

                <IconsContainer>
                    <Icon >
                    </Icon>
                </IconsContainer>
            </MainContainer>
        </div>
    );
};

export default Login;

import Header from "../Header";
import { CardBody, Container, FormGroup } from "reactstrap";
import { Card, CardHeader } from "reactstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import "../../index.css"
import { tokenGetter } from "../../services/User_Service";
import { toast } from 'react-toastify';
import { NavLink } from "react-router-dom";
function AdminSignIn() {
    const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const [captcha, setCaptcha] = useState("weXYgy")
    const [inputCaptcha, setInputCatcha] = useState('');
    const [validCaptcha, setValidCaptcha] = useState(false);
    let [userData, setUserData] = useState({
        rollno: "",
        password: ""
    });

    let pass = '';
    const randomGenerator = (event) => {
        event.preventDefault(); // to prevent the page reload if user clicked reload for the captcha generation
        for (let i = 0; i < 6; i++) {
            pass += str[Math.floor(Math.random() * str.length)];
        }

        setCaptcha(pass);
    }
    const checkCaptcha = (event) => {
        setInputCatcha(event.target.value);
        // console.log(event.target.value);
    }

    const check = (event) => { //passing event from here to the actual generator
        console.log(inputCaptcha);
        console.log(captcha);
        if (inputCaptcha === captcha) {
            setValidCaptcha(true);
            console.log(true);
        } else {
            console.log("inside else of captcha")
            setValidCaptcha(false);
            if (validCaptcha === false) {
                randomGenerator(event); //passing event from here to the actual generator
            }
        }
    }
    const handleChange = (event, property) => {
        setUserData({ ...userData, [property]: event.target.value });
    }

    const login = (event) => {
        event.preventDefault();
        tokenGetter(userData).then((data) => {
            console.log(data);
            console.log("logged in successfully!");
            toast.success("user logged in successfully");
        }).catch((err) => {
            console.log(err);
            toast.error("login failed")
            randomGenerator(event);
            setValidCaptcha(false);
        });
        setUserData({
            rollno: "",
            password: ""
        })
    }
    return (
        <>
            <Header />
            <Container style={{ width: '550px', fontSize: 'medium' }}>
                <Card>
                    <CardHeader>
                        <h3>Admin Login</h3>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Form.Label>ID</Form.Label>
                                <Form.Control id="rollno" type="text" placeholder="Enter rollno" style={{ fontSize: 'small' }} value={userData.rollno} onChange={(e) => handleChange(e, 'rollno')} />
                                <Form.Label>Password</Form.Label>
                                <Form.Control id="pass" type="password" placeholder="Enter password" style={{ fontSize: 'small' }} value={userData.password} onChange={(e) => handleChange(e, 'password')} />
                                <span>{captcha}</span>
                                <Form>
                                    <FormGroup>
                                        <input type='text' value={inputCaptcha} onChange={checkCaptcha} />
                                        <span style={{ color: 'red', display: validCaptcha ? 'none' : 'block' }}>Invalid Captcha!</span>
                                    </FormGroup>
                                </Form>

                                <button onClick={randomGenerator}>Reload</button>
                                <button type='button' onClick={check}>Check</button>
                            </FormGroup>

                            <Container className="text-center">
                                <Button type="submit" variant="dark" style={{ fontSize: 'medium' }} onClick={login} disabled={!validCaptcha}>Login</Button>
                                <NavLink to={'/otpSend'}>Forgot password ?</NavLink>
                            </Container>
                        </Form>
                        <Container className="text-center">
                            <div> Not a member ? <NavLink to={'/signup'}>Register</NavLink> </div>
                        </Container>
                    </CardBody>

                </Card>

            </Container>
        </>
    )
}
export default AdminSignIn;
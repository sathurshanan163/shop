import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";
import Form_Container from "../components/Form_Container";

const Login = () => {
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");

    return (
        <Form_Container>
            <h1>Log In</h1>
            <Form>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(event) => set_email(event.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) => set_password(event.target.value)}
                    ></Form.Control>
                    <Button type="submit" variant="primany">Log In</Button>
                </Form.Group>
            </Form>
            <Row className="py-3">
                <Col>
                    New customer?
                    <Link to ="/register">Register</Link>
                </Col>
            </Row>
        </Form_Container>
    );
};

export default Login;
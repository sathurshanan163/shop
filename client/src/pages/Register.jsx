import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const Register = () => {
    const [name, set_name] = useState("");
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");

    return (
        <FormContainer>
            <h1>Register</h1>
            <Form>
                <Form.Group controlId="name" className="my-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    type="text"
                    value={name}
                    onChange={(event) => set_name(event.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email" className="my-2">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                    type="email"
                    value={email}
                    onChange={(event) => set_email(event.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password" className="my-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    value={password}
                    onChange={(event) => set_password(event.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Register</Button>
            </Form>
            <Row className="py-3">
                <Col>
                    Already have an account?{" "}<Link to="/login" >Login</Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default Register;
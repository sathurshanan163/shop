import { useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../actions/user";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";

const Login = ({history}) => {
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");
    
    const dispatch = useDispatch();

    const submit_handler = (event) => {
        event.preventDefault();
        dispatch(login(email, password));
    };

    const user_login = useSelector((state) => state.user_login);
    const {loading, error, user_info} = user_login;

    useEffect(() => {
        if (user_info) {
            history.push("/");
        };
    }, [history, user_info]);    

    return (
        <FormContainer>
            <h1>Login</h1>
            {error && <Message variant="danger">{error}</Message>}
            <Form onSubmit={submit_handler}>
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
                <Button disabled={loading} type="submit" variant="primary">Login</Button>
                {loading && <Loader />}
            </Form>
            <Row className="py-3">
                <Col>
                    New customer?{" "}<Link to="/register" >Register</Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default Login;
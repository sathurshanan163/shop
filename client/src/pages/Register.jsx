import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../actions/user";
import {Form, Button, Row, Col} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Register = ({history}) => {
    const [name, set_name] = useState("");
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");

    const dispatch = useDispatch();
    const user_register = useSelector((state) => state.user_register);
    const user_login = useSelector((state) => state.user_login);
    const {is_loading, error} = user_register;
    const {user_info} = user_login;

    const submit_handler = (event) => {
        event.preventDefault();
        dispatch(register(name, email, password));
    };

    useEffect(() => {
        if (user_info) {
            history.push("/");
        }
    }, [history, user_info]);    

    return (
        <FormContainer>
            <h1 className="text-center">Register</h1>
            {error && <Message variant="danger">{error}</Message>}
            {is_loading && <Loader />}
            <Form onSubmit={submit_handler}>
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
                <Button type="submit" variant="primary" className="w-100">Register</Button>
            </Form>
            <Row className="py-3">
                <Col className="text-center">
                    Already have an account?{" "}<Link to="/login" >Login</Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default Register;
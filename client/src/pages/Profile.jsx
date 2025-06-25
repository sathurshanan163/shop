import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {Table, Form, Button, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import {profile} from "../actions/user";

const Profile = ({history}) => {
    const dispatch = useDispatch();
    const {user_info} = useSelector((state) => state.user_login);

    useEffect(() => {
        if (!user_info) {
            history.push("/login");
        } else {
            dispatch(profile(user_info._id));
        }
    });

    return <h1>Profile Page</h1>
};

export default Profile;
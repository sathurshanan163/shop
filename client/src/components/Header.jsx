import {Link} from "react-router-dom";
import {Container} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../actions/user";

const Header = () => {
    const {user_info} = useSelector((state) => state.user_login);

    const dispatch = useDispatch();

    const logout_handler = () => {
        dispatch(logout());
    };
    
    return (
        <header>
            <Container>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Link to="/" style={{textDecoration: "none", color: "#000000"}}><h4>Shop</h4></Link>
                    {user_info ? (
                        <div>
                            <Link to="/profile" style={{textDecoration: "none", color: "#000000"}}>{user_info.name}</Link>                            
                            <button type="button" onClick={logout_handler}>Logout</button>
                        </div>
                    ) : (
                        <Link to="/login" style={{textDecoration: "none", color: "#000000"}}>Login</Link>
                    )
                    }
                </div>
            </Container>
        </header>
    );
};

export default Header;
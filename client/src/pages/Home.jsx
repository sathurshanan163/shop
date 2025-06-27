import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {Row, Col} from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {list_products} from "../actions/products";

const Home = () => {
    const dispatch = useDispatch();
    const product_list = useSelector((state) => state.product_list);
    const {is_loading, error, products} = product_list;
    
    useEffect(() => {
        dispatch(list_products());
    }, [dispatch]);

    return (
        <>
            {is_loading ? (<Loader />) :
            error? (<Message variant="danger">{error}</Message>) :
            (
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )
            }
        </>
    );
};

export default Home;
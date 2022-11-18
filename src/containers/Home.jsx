import React, {useEffect} from 'react';
import Layout from "../hocs/Layout";
import SummaryStock from "../components/home/Summary";
import {useDispatch, useSelector} from "react-redux";
import {get_fruits} from "../redux/actions/products";

const Home = () => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.Products.categories);
    const day = useSelector(state => state.Products.day);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(get_fruits());
    }, []);
    return (<Layout>
            <SummaryStock products={products} day={day}/>
        </Layout>);
};

export default Home;

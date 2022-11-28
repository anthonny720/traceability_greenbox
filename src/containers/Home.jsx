import React, {useEffect, useState} from 'react';
import Layout from "../hocs/Layout";
import SummaryStock from "../components/home/Summary";
import {useDispatch, useSelector} from "react-redux";
import {get_fruits} from "../redux/actions/products";
import {get_providers} from "../redux/actions/business_partners";
import Modal from "../components/util/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import Form from "../components/home/Form";
import {get_lots, get_lots_page} from "../redux/actions/raw_material";
import SetPagination from "../components/util/Pagination";
import Table from "../components/home/Table";
import Filter from "../components/home/Filter";

const Home = () => {

    const dispatch = useDispatch();
    const [params, setParams] = useState({lot: '', category: '', variety: ''});
    const providers = useSelector(state => state.Business.providers)
    const products = useSelector(state => state.Products.categories);
    const day = useSelector(state => state.Products.day);
    const lots = useSelector(state => state.RawMaterial.lots);
    const count = useSelector(state => state.RawMaterial.count);


    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)


    const openModal = () => {
        setIsOpen((prev) => !prev)
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(get_fruits());
        dispatch(get_providers());
        dispatch(get_lots(params))
    }, []);

    const handleOpenModalAdd = () => {
        setTitle("Registrar lote de materia prima")
        setIsOpen(true)
        setContent(<Form providers={providers} categories={products} close={openModal}/>)
    }

    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>
        <SummaryStock products={products} day={day}/>
        <div className="flex flex-wrap flex-row  w-full justify-around   items-center ">

            <div className="w-full">

                <FontAwesomeIcon icon={faPlusCircle} className={"mx-[50%] text-red-400 text-xl cursor-pointer"}
                                 onClick={handleOpenModalAdd}/>
                <Filter dispatch={dispatch} setParams={setParams} products={products}  />
                <Table data={lots}/>
                <SetPagination count={count} get_data_page={get_lots_page} data={lots} params={params}/>

            </div>
        </div>
    </Layout>);
};

export default Home;

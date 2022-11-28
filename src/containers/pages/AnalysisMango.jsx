import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import FormAnalysisMango from "../../components/quality/FormAnalysisMango";
import Modal from "../../components/util/Modal";
import Layout from "../../hocs/Layout";
import Table from "../../components/quality/TableMango";
import {get_analysis_mango, get_analysis_mango_page} from "../../redux/actions/quality";
import SetPagination from "../../components/util/Pagination";


const AnalysisMango = () => {
    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const dispatch = useDispatch();
    const mango = useSelector(state => state.Quality?.mango)
    const count = useSelector(state => state.Quality.count_mango);


    const openModal = () => {
        setIsOpen((prev) => !prev)
    }

    useEffect(() => {
        dispatch(get_analysis_mango())
    }, []);

    const handleUpdateMango = (data) => {
        setTitle("Actualizar análisis de Mango")
        setIsOpen(true)
        setContent(<FormAnalysisMango dispatch={dispatch} data={data} close={openModal}/>)
    }


    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>
        <Table data={mango ? mango : []} update={handleUpdateMango}/>
        <SetPagination count={count} get_data_page={get_analysis_mango_page} data={mango ? mango : []}/>
    </Layout>);
};

export default AnalysisMango;

import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import FormAnalysisPineapple from "../../components/quality/FormAnalysisPineapple";
import Modal from "../../components/util/Modal";
import Layout from "../../hocs/Layout";
import Table from "../../components/quality/TablePineapple";
import {get_analysis_pineapple, get_analysis_pineapple_page} from "../../redux/actions/quality";
import SetPagination from "../../components/util/Pagination";


const AnalysisPineapple = () => {
    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const dispatch = useDispatch();
    const pineapple = useSelector(state => state.Quality?.pineapple)
    const count = useSelector(state => state.Quality.count_pineapple);


    useEffect(() => {
        dispatch(get_analysis_pineapple())
    }, []);


    const openModal = () => {
        setIsOpen((prev) => !prev)
    }

    const handleUpdatePineapple = (data) => {
        setTitle("Actualizar análisis de Piña")
        setIsOpen(true)
        setContent(<FormAnalysisPineapple dispatch={dispatch} data={data} close={openModal}/>)
    }


    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>
        <Table data={pineapple ? pineapple : []} update={handleUpdatePineapple}/>
        <SetPagination count={count} get_data_page={get_analysis_pineapple_page} data={pineapple ? pineapple : []}/>
    </Layout>);
};

export default AnalysisPineapple;

import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import FormAnalysisAguaymanto from "../../components/quality/FormAnalysisAguaymanto";
import Modal from "../../components/util/Modal";
import Layout from "../../hocs/Layout";
import Table from "../../components/quality/TableAguaymanto";
import {get_analysis_aguaymanto, get_analysis_aguaymanto_page} from "../../redux/actions/quality";
import SetPagination from "../../components/util/Pagination";


const AnalysisAguaymanto = () => {
    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const dispatch = useDispatch();
    const aguaymanto = useSelector(state => state.Quality?.aguaymanto)
    const count = useSelector(state => state.Quality.count_aguaymanto);


    const openModal = () => {
        setIsOpen((prev) => !prev)
    }

    useEffect(() => {
        dispatch(get_analysis_aguaymanto())
    }, []);


    const handleUpdateAguaymanto = (data) => {
        setTitle("Actualizar análisis de Aguaymanto")
        setIsOpen(true)
        setContent(<FormAnalysisAguaymanto dispatch={dispatch} data={data} close={openModal}/>)
    }

    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>
        <Table data={aguaymanto ? aguaymanto : []} update={handleUpdateAguaymanto}/>
        <SetPagination count={count} get_data_page={get_analysis_aguaymanto_page} data={aguaymanto ? aguaymanto : []}/>
    </Layout>);
};

export default AnalysisAguaymanto;

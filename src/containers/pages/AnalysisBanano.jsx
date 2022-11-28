import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import FormAnalysisBanano from "../../components/quality/FormAnalysisBanano";
import Modal from "../../components/util/Modal";
import Layout from "../../hocs/Layout";
import Table from "../../components/quality/TableBanano";
import {get_analysis_banano, get_analysis_banano_page} from "../../redux/actions/quality";
import SetPagination from "../../components/util/Pagination";


const AnalysisBanano = () => {
    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const dispatch = useDispatch();
    const banano = useSelector(state => state.Quality?.banano)
    const count = useSelector(state => state.Quality.count_banano);


    useEffect(() => {
        dispatch(get_analysis_banano())
    }, []);

    const openModal = () => {
        setIsOpen((prev) => !prev)
    }

    const handleUpdateBanano = (data) => {
        setTitle("Actualizar análisis de Banano")
        setIsOpen(true)
        setContent(<FormAnalysisBanano dispatch={dispatch} data={data} close={openModal}/>)
    }

    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>
        <Table data={banano ? banano : []} update={handleUpdateBanano}/>
        <SetPagination count={count} get_data_page={get_analysis_banano_page} data={banano ? banano : []}/>
    </Layout>);
};

export default AnalysisBanano;

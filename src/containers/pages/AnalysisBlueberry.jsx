import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import FormAnalysisBlueberry from "../../components/quality/FormAnalysisBlueberry";
import Modal from "../../components/util/Modal";
import Layout from "../../hocs/Layout";
import Table from "../../components/quality/TableBlueberry";
import {get_analysis_blueberry, get_analysis_blueberry_page} from "../../redux/actions/quality";
import SetPagination from "../../components/util/Pagination";


const AnalysisBlueberry = () => {
    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const dispatch = useDispatch();
    const blueberry = useSelector(state => state.Quality?.blueberry)
    const count = useSelector(state => state.Quality.count_blueberry);


    useEffect(() => {
        dispatch(get_analysis_blueberry())
    }, []);

    const openModal = () => {
        setIsOpen((prev) => !prev)
    }


    const handleUpdateBlueberry = (data) => {
        setTitle("Actualizar análisis de Arándano")
        setIsOpen(true)
        setContent(<FormAnalysisBlueberry dispatch={dispatch} data={data} close={openModal}/>)
    }


    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>
        <Table data={blueberry ? blueberry : []} update={handleUpdateBlueberry}/>
        <SetPagination count={count} get_data_page={get_analysis_blueberry_page} data={blueberry ? blueberry : []}/>
    </Layout>);
};

export default AnalysisBlueberry;

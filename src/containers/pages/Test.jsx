import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Layout from "../../hocs/Layout";
import Modal from "../../components/util/Modal";
import {get_cut_test, get_cut_test_page} from "../../redux/actions/quality";
import Form from "../../components/quality/FormCutTest";
import Table from "../../components/quality/TableTest";
import SetPagination from "../../components/util/Pagination";

const Test = () => {

    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const dispatch = useDispatch()

    const lot_list = useSelector(state => state.RawMaterial?.lots)
    const cut_test = useSelector(state => state.Quality.cut_test)
    const count = useSelector(state => state.Quality.count_cut_test);


    const openModal = () => {
        setIsOpen((prev) => !prev)
    }

    const handleOpenModalUpdate = (rowData) => {
        setTitle("Editar registro")
        setIsOpen(true)
        setContent(<Form lots={lot_list} data={rowData} dispatch={dispatch} close={openModal}/>)
    }


    useEffect(() => {
        dispatch(get_cut_test())
    }, []);


    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>
        <Table data={cut_test ? cut_test : []}
               update={handleOpenModalUpdate}/>
        <SetPagination count={count} get_data_page={get_cut_test_page} data={cut_test ? cut_test : []}/>
    </Layout>);
};

export default Test;

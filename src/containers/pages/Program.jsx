import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import Modal from "../../components/util/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {get_programs, get_programs_page} from "../../redux/actions/logistic";
import {useDispatch, useSelector} from "react-redux";
import {get_clients} from "../../redux/actions/business_partners";
import Form from "../../components/logistic/Form";
import Table from "../../components/logistic/TableProgram";
import SetPagination from "../../components/util/Pagination";

const Program = () => {
    const dispatch = useDispatch();
    const programs = useSelector(state => state.Logistic.programs)
    const count = useSelector(state => state.Logistic.count_programs);


    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen((prev) => !prev)
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(get_programs())
        dispatch(get_clients())
    }, []);


    const handleOpenModalAdd = () => {
        setTitle("Registrar programa de recepción")
        setIsOpen(true)
        setContent(<Form close={openModal}/>)
    }

    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>
        <div className="flex flex-wrap flex-row  w-full justify-around   items-center ">
            <div className="w-full">
                <FontAwesomeIcon icon={faPlusCircle} className={"mx-[50%] text-red-400 text-xl cursor-pointer"}
                                 onClick={handleOpenModalAdd}/>
                <Table data={programs ? programs : []}/>
                <SetPagination count={count} get_data_page={get_programs_page} data={programs ? programs : []}/>

            </div>
        </div>
    </Layout>);
};

export default Program;

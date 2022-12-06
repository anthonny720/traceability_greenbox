import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import {useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {delete_data_program, get_data_program, get_program} from "../../redux/actions/logistic";
import Modal from "../../components/util/Modal";
import Form from "../../components/logistic/FormDataProgram";
import {MySwal} from "../../helpers/util";
import {get_reception_released} from "../../redux/actions/process_line";
import {GET_DATA_PROGRAM_FAIL} from "../../redux/actions/types";
import Table from "../../components/logistic/TableProgramData";

const ProgramDetail = () => {
    const {slug} = useParams();
    const dispatch = useDispatch();
    const data_program = useSelector(state => state.Logistic.data_program)
    const program = useSelector(state => state.Logistic.program)
    const reception = useSelector(state => state.Process.reception)


    useEffect(() => {
        dispatch({type: GET_DATA_PROGRAM_FAIL})
        dispatch(get_data_program(slug))
        dispatch(get_program(slug))
        dispatch(get_reception_released())
    }, []);

    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen((prev) => !prev)
    }

    const handleOpenModalAdd = () => {
        setTitle("Registrar lotes liberados")
        setIsOpen(true)
        setContent(<Form close={openModal} reception={reception} slug={slug} id={program.id}/>)
    }
    const handleDeleteData = (pk) => {
        MySwal.fire({
            title: '¿Desea eliminar este registro?', icon: 'warning', showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_data_program(pk, slug))
            }
        })
    }

    return (<Layout>

        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>
        <div className="flex flex-wrap flex-row  w-full justify-around   items-center ">
            <h1 className={"p-4 w-max m-4 rounded-full text-3xl flex fex-col italic font-bold text-black hover:text-green-400 items-center"}>
                {program?.name} <img width={100} src={require('../../assets/packers-and-movers.gif')} alt=""/></h1>
            {program && <FontAwesomeIcon icon={faPlusCircle} className={"mx-[50%] text-red-400 text-xl cursor-pointer"}
                                         onClick={handleOpenModalAdd}/>}
            <div className="w-full">

                <Table data={data_program ? data_program : []} remove={handleDeleteData}/>


            </div>
        </div>
    </Layout>);
};

export default ProgramDetail;

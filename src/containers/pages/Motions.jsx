import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {MySwal} from "../../helpers/util";
import Modal from "../../components/util/Modal";
import Layout from "../../hocs/Layout";
import Form from "../../components/management/FormMotion";
import {delete_motion, get_motions, get_motions_page} from "../../redux/actions/management";
import {get_providers} from "../../redux/actions/business_partners";
import Table from "../../components/management/TableMotions";
import SetPagination from "../../components/util/Pagination";


const Motions = () => {

    const dispatch = useDispatch();
    /*Modal*/
    const [title, setTitle] = useState("");
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const motions = useSelector(state => state.Management.motions)
    const count = useSelector(state => state.Management.count_motions);


    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(get_providers());
        dispatch(get_motions());
    }, []);


    const openModal = () => {
        setIsOpen((prev) => !prev)
    }
    const handleOpenModalAdd = () => {
        setTitle("Agregar movimiento")
        setIsOpen(true)
        setContent(<Form close={openModal}/>)
    }

    const handleDelete = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar este movimiento?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_motion(id));
            }
        })
    }


    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>
        <div className="flex flex-wrap flex-row  w-full justify-around   items-center ">
            <div className="w-full h-full mt-6 ">
                <FontAwesomeIcon icon={faPlusCircle} className={"mx-[50%] text-red-400 text-xl cursor-pointer"}
                                 onClick={handleOpenModalAdd}/>

                <Table data={motions ? motions : []} remove={handleDelete}/>
                <SetPagination count={count} get_data_page={get_motions_page} data={motions ? motions : []}/>
            </div>
        </div>

    </Layout>);
};

export default Motions;

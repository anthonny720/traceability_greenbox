import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {delete_contact, get_contacts, get_contacts_page} from "../../redux/actions/business_partners";
import Layout from "../../hocs/Layout";
import Modal from "../../components/util/Modal";
import Form from "../../components/business/Form";
import {MySwal} from "../../helpers/util";
import Table from "../../components/business/TableContact";
import SetPagination from "../../components/util/Pagination";


const Drivers = () => {
    const dispatch = useDispatch();

    const contacts = useSelector(state => state.Business.contacts);
    const count = useSelector(state => state.Business.count_contacts);

    /*Modal*/
    const [title, setTitle] = useState("");
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen((prev) => !prev)
    }
    const handleOpenModalAdd = () => {
        setTitle("Registrar contacto")
        setIsOpen(true)
        setContent(<Form close={openModal}/>)
    }
    const handleOpenModalUpdate = (rowData) => {
        setTitle("Editar contacto")
        setIsOpen(true)
        setContent(<Form data={rowData} close={openModal}/>)
    }
    const handleDelete = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar este contacto?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_contact(id));
            }
        })
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(get_contacts())
    }, []);


    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>
        <div className="w-full h-full mt-6">
            <FontAwesomeIcon icon={faPlusCircle} className={"mx-[50%] text-red-400 text-xl cursor-pointer"}
                             onClick={handleOpenModalAdd}/>
            <Table data={contacts ? contacts : []} edit={handleOpenModalUpdate} remove={handleDelete}/>
            <SetPagination scroll={true} count={count} get_data_page={get_contacts_page}
                           data={contacts ? contacts : []}/>

        </div>
    </Layout>);
};

export default Drivers;

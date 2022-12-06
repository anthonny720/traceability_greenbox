import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {MySwal} from "../../helpers/util";
import {delete_user, get_users} from "../../redux/actions/auth";
import Layout from "../../hocs/Layout";
import Modal from "../../components/util/Modal";
import Form from "../../components/auth/Form";
import Table from "../../components/auth/Table";

const Users = () => {

    const dispatch = useDispatch();
    const users = useSelector(state => state.Auth?.users);
    const me = useSelector(state => state.Auth?.user?.get_admin);

    /*Modal*/
    const [title, setTitle] = useState("");
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen((prev) => !prev)
    }
    const handleOpenModalAdd = () => {
        setTitle("Agregar usuario")
        setIsOpen(true)
        setContent(<Form close={openModal}/>)
    }
    const handleOpenModalUpdate = (row) => {
        setTitle("Editar usuario")
        setIsOpen(true)
        setContent(<Form data={row} close={openModal}/>)
    }
    const handleDelete = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar este usuario?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_user(id));
            }
        })
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(get_users())
    }, []);

    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>

        <div className="w-full h-full mt-6">

            <FontAwesomeIcon icon={faPlusCircle} className={"mx-[50%] text-red-400 text-xl cursor-pointer"}
                             onClick={me && handleOpenModalAdd}
            />
            <Table data={users ? users : []} update={handleOpenModalUpdate} remove={handleDelete}/>
        </div>
    </Layout>);
};

export default Users;

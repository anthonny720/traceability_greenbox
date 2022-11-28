import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {delete_carrier, get_carriers, get_carriers_page} from "../../redux/actions/business_partners";
import Layout from "../../hocs/Layout";
import Modal from "../../components/util/Modal";
import {MySwal} from "../../helpers/util";
import FormCarrier from "../../components/business/FormCarrier";
import Table from "../../components/business/TableCarrier";
import SetPagination from "../../components/util/Pagination";


const Carrier = () => {
    const dispatch = useDispatch();

    const carriers = useSelector(state => state.Business.carriers);
    const count = useSelector(state => state.Business.count_carriers);


    /*Modal*/
    const [title, setTitle] = useState("");
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen((prev) => !prev)
    }
    const handleOpenModalAdd = () => {
        setTitle("Registrar transporte")
        setIsOpen(true)
        setContent(<FormCarrier close={openModal}/>)
    }
    const handleOpenModalUpdate = (rowData) => {
        setTitle("Editar transporte")
        setIsOpen(true)
        setContent(<FormCarrier data={rowData} close={openModal}/>)
    }
    const handleDelete = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar este transporte?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_carrier(id));
            }
        })
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(get_carriers())
    }, []);


    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>
        <div className="w-full h-full mt-6">
            <FontAwesomeIcon icon={faPlusCircle} className={"mx-[50%] text-red-400 text-xl cursor-pointer"}
                             onClick={handleOpenModalAdd}/>
            <Table data={carriers ? carriers : []} remove={handleDelete} edit={handleOpenModalUpdate}/>
            <SetPagination scroll={true} count={count} get_data_page={get_carriers_page}
                           data={carriers ? carriers : []}/>
        </div>
    </Layout>);
};

export default Carrier;

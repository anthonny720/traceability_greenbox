import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {delete_payment, get_payments, get_payments_page} from "../../redux/actions/management";
import {MySwal} from "../../helpers/util";
import FormPayment from "../../components/management/FormPayment";
import Layout from "../../hocs/Layout";
import Modal from "../../components/util/Modal";
import Table from "../../components/management/TablePayments";
import SetPagination from "../../components/util/Pagination";
import Filter from "../../components/management/FilterPayments";

const Payments = () => {
    const [params, setParams] = useState({cancelled: ''});
    const payments = useSelector(state => state.Management.payments);
    const count = useSelector(state => state.Management.count_payments);

    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(get_payments(params));
    }, []);

    const handleDeletePayment = (row) => {
        MySwal.fire({
            title: '¿Desea eliminar este pago?', icon: 'warning', showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_payment(row))
            }
        })
    }

    /*Modal*/
    const [title, setTitle] = useState("");
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen((prev) => !prev)
    }

    const handleUpdatePayment = (row) => {
        setTitle("Editar transacción")
        setIsOpen(true)
        setContent(<FormPayment data={row} close={openModal}/>)
    }
    const handleOpenModalAddInfo = () => {
        setTitle("Agregar transaccion")
        setIsOpen(true)
        setContent(<FormPayment close={openModal}/>)
    }
    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>

        <div className="flex flex-wrap flex-row  w-full justify-around   items-start ">
            <div className="w-full items-start h-full mt-6">
                <FontAwesomeIcon icon={faPlusCircle} color={"red"} className={"hover:cursor-pointer mx-[50%]"}
                                 onClick={handleOpenModalAddInfo}/>
                <Filter dispatch={dispatch} setParams={setParams}/>
                <Table data={payments ? payments : []} update={handleUpdatePayment} remove={handleDeletePayment}/>
                <SetPagination count={count} get_data_page={get_payments_page} params={params} data={payments ? payments : []}/>
            </div>
        </div>

    </Layout>);
};

export default Payments;

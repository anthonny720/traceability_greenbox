import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import {useNavigate, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";

import {useDispatch, useSelector} from "react-redux";
import FormCrown from "../../components/production/pineapple/FormCrown";
import {MySwal} from "../../helpers/util";
import TableProduction from "../../components/production/Table";
import FormPeel from "../../components/production/pineapple/FormPeel";
import Summary from "../../components/production/Summary";
import FormPineapple from "../../components/production/FormPineapple";
import Skeleton from "react-loading-skeleton";
import {
    delete_crown_pineapple,
    delete_peel_pineapple,
    delete_process_pineapple,
    get_process_detail_pineapple
} from "../../redux/actions/production";
import Modal from "../../components/util/Modal";


const DetailProcessPineapple = () => {
    const {lot} = useParams();
    const dispatch = useDispatch();
    const data = useSelector(state => state.Production?.pineapple_data)
    const pallets = useSelector(state => state.Products.pallets)
    const lot_list = useSelector(state => state.RawMaterial?.lot_prod)

    const navigate = useNavigate();
    const crown_columns = ['', 'N°', 'Peso', 'Pallet', 'Tara', 'Peso Neto']
    const peel_columns = ['', 'N°', 'Peso', 'Pallet', 'Cantidad', 'Tara', 'Peso Neto']


    useEffect(() => {
        dispatch({type: 'DETAIL_PRODUCTION_PINEAPPLE_FAIL'})
        dispatch(get_process_detail_pineapple(lot))
    }, []);

    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)


    const openModal = () => {
        setIsOpen((prev) => !prev)
    }

    const handleOpenModalAddCrown = () => {
        setTitle("Agregar registro de corona")
        setIsOpen(true)
        setContent(<FormCrown close={openModal} pallets={pallets} slug={lot} dispatch={dispatch} id={data?.id}/>)
    }
    const handleOpenModalAddPeel = () => {
        setTitle("Agregar registro de cáscara")
        setIsOpen(true)
        setContent(<FormPeel pallets={pallets} slug={lot} dispatch={dispatch} id={data?.id}
                             close={openModal}></FormPeel>)
    }
    const handleDeleteCrown = (row) => {
        MySwal.fire({
            title: '¿Desea eliminar este registro?', icon: 'warning', showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_crown_pineapple(row, lot))
            }
        })
    }
    const handleDeletePeel = (row) => {
        MySwal.fire({
            title: '¿Desea eliminar este registro?', icon: 'warning', showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_peel_pineapple(row, lot))
            }
        })
    }
    const handleDeleteProcess = () => {
        MySwal.fire({
            title: '¿Desea eliminar este proceso?', icon: 'warning', showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_process_pineapple(lot))
                navigate('/production/')
            }
        })
    }
    const handleOpenModalUpdateProduction = () => {
        setTitle("Agregar registro de corona")
        setIsOpen(true)
        setContent(<FormPineapple data={data} lots={lot_list} close={openModal}/>)
    }


    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>

        <div
            className={"flex flex-col lg:flex-row w-full lg:grid-cols-2 gap-4 justify-center  items-center lg:items-start"}>
            <div className={"lg:w-6/12  w-full"}>
                <div className={"max-w-full "}>
                    <div className={"flex flex-row items-center gap-2"}>
                        <FontAwesomeIcon icon={faPlusCircle} className={"text-red-400 text-xl cursor-pointer"}
                                         onClick={handleOpenModalAddCrown}/>
                        <h1 className={"text-center font-semibold text-xl"}>Peso de corona</h1>
                    </div>
                    {data?.crown !== null && data?.crown ?
                        <TableProduction columns={crown_columns} data={data?.crown} delete_info={handleDeleteCrown}/>
                        : <Skeleton count={5}/>
                    }
                </div>
                <div className={"max-w-full"}>
                    <div className={"flex flex-row items-center gap-2"}>
                        <FontAwesomeIcon icon={faPlusCircle} className={"text-red-400 text-xl cursor-pointer"}
                                         onClick={handleOpenModalAddPeel}/>
                        <h1 className={"text-center font-semibold text-xl"}>Peso de
                            cáscara</h1>
                    </div>
                    {data?.peel !== null && data?.peel ?
                        <TableProduction columns={peel_columns} data={data?.peel} delete_info={handleDeletePeel}/>
                        : <Skeleton count={5}/>
                    }


                </div>
            </div>
            <div className={"lg:w-6/12  w-full"}>
                {data !== null ?
                    <Summary data={data}
                             delete_process={handleDeleteProcess} update_process={handleOpenModalUpdateProduction}/>
                    : <Skeleton height={20} count={15}/>}
            </div>

        </div>
    </Layout>);
}


export default DetailProcessPineapple;

import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile, faPaperPlane, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {
    delete_data_packing,
    get_data_packing_list,
    get_lots_by_slug,
    get_packing_list_by_slug
} from "../../redux/actions/logistic";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Cards from "../../components/logistic/Cards";
import Skeleton from "react-loading-skeleton";
import Modal from "../../components/util/Modal";
import FormPacking from "../../components/logistic/FormPacking";
import Form from "../../components/logistic/FormLot";
import {MySwal} from "../../helpers/util";
import Table from "../../components/logistic/TablePackingData";

const PackingListDetail = () => {
    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen((prev) => !prev)
    }
    const {slug} = useParams();
    const dispatch = useDispatch();
    const packing_list = useSelector(state => state.Logistic.pack)
    const data_packing_list = useSelector(state => state.Logistic.data_packing_list)

    const handleOpenModalViewer = () => {
        setTitle("Documentación")
        setIsOpen(true)
        setContent(<iframe className={"h-full w-full"} title={"Documentación"}
                           src={`https://docs.google.com/viewerng/viewer?url=${process.env.REACT_APP_API_URL + packing_list?.doc}&embedded=true`}></iframe>)
    }

    const handleDeleteData = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar este registro?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_data_packing(id, slug));
            }
        })
    }

    useEffect(() => {
        dispatch({type: 'GET_PACKING_LIST_BY_SLUG_FAIL'})
        dispatch(get_packing_list_by_slug(slug))
        dispatch(get_lots_by_slug(slug))
        dispatch(get_data_packing_list(slug))
    }, []);

    const handleOpenModalUpdateInfo = () => {
        setTitle("Actualizar información")
        setIsOpen(true)
        setContent(<FormPacking data={packing_list} slug={slug} close={openModal}/>)
    }

    const handleOpenModalAddLot = () => {
        setTitle("Actualizar información")
        setIsOpen(true)
        setContent(<Form slug={slug} id={packing_list.id} close={openModal}/>)
    }


    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>

        <div
            className={"flex flex-col max-w-full "}>
            <div className="inline-flex mb-4 ml-4">
                <button onClick={() => handleOpenModalUpdateInfo()}
                        className="bg-white hover:bg-[#26d07d] hover:text-white text-gray-800 font-bold py-2 px-4 rounded-l">
                    <FontAwesomeIcon icon={faPaperPlane}/> EDICIÓN
                </button>
                {packing_list?.doc && <button onClick={() => handleOpenModalViewer()}
                                              className="bg-white hover:bg-[#26d07d] hover:text-white text-gray-800 font-bold py-2 px-4 rounded-r">
                    <FontAwesomeIcon icon={faFile}/> COMEX
                </button>}

            </div>
            <div className={"w-full "}>
                {packing_list ? <Cards data={packing_list}/> : <Skeleton count={5} height={10}/>}

                <FontAwesomeIcon icon={faPlusCircle} color={"red"} onClick={() => handleOpenModalAddLot()}
                                 className={"hover:cursor-pointer mx-[50%]"}
                />
                <Table data={data_packing_list ? data_packing_list : []} remove={handleDeleteData}/>
            </div>
        </div>

    </Layout>);
};

export default PackingListDetail;

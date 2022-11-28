import React, {useEffect, useRef, useState} from 'react';
import Layout from "../../hocs/Layout";

import Filter from "../../components/production/Filter";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faPrint} from "@fortawesome/free-solid-svg-icons";
import FormPineapple from "../../components/production/FormPineapple";
import ReportProduction from "../../components/production/Report";
import {filter, size} from "lodash";
import ReactToPrint from "react-to-print";
import Modal from "../../components/util/Modal";
import {get_lots_production} from "../../redux/actions/raw_material";
import Table from "../../components/production/TablePineapple";
import {get_process_pineapple, get_process_pineapple_page} from "../../redux/actions/production";
import SetPagination from "../../components/util/Pagination";

const ProcessProduction = () => {
    const lot_list = useSelector(state => state.RawMaterial.lot_prod)
    const componentReportRef = useRef();
    const process_pineapple = useSelector(state => state.Production?.pineapple_list);
    const summary = useSelector(state => state.Production.summary);
    const count = useSelector(state => state.Production.count);


    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const dispatch = useDispatch();
    const openModal = () => {
        setIsOpen((prev) => !prev)
    }
    useEffect(() => {
        dispatch(get_lots_production())
        dispatch(get_process_pineapple())
        dispatch({type: 'GET_REPORT_PRODUCTION_FAIL'})
    }, []);

    const handleOpenModalAdd = () => {
        setTitle("Agregar Proceso")
        setIsOpen(true)
        setContent(<FormPineapple lots={filter(lot_list, {'category_name': 'Piña'})} close={openModal}/>)
    }

    return (<Layout>
        {summary !== null && size(summary?.data[0]) >= 1 && <>
            <div className={"hidden"}>
                <ReportProduction ref={componentReportRef} data={summary}/>
            </div>
            <ReactToPrint
                trigger={() => <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ">Reporte<FontAwesomeIcon
                    className={"ml-2 hover:cursor-pointer "} icon={faPrint}
                    color={"black"}/></button>}
                content={() => componentReportRef.current}
            /></>}

        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>
        <Filter dispatch={dispatch}/>
        <div className="flex flex-wrap flex-row  w-full justify-around   items-center ">
            <div className="w-full">
                <FontAwesomeIcon icon={faPlusCircle} className={"mx-[50%] py-2 text-red-400 text-xl cursor-pointer"}
                                 onClick={handleOpenModalAdd}/>
                <Table data={process_pineapple ? process_pineapple : []}/>
                <SetPagination count={count} get_data_page={get_process_pineapple_page}
                               data={process_pineapple ? process_pineapple : []}/>

            </div>
        </div>
    </Layout>);
};

export default ProcessProduction;

import React, {useEffect, useState} from 'react';
import Layout from "../hocs/Layout";
import SummaryStock from "../components/home/Summary";
import {useDispatch, useSelector} from "react-redux";
import {get_fruits} from "../redux/actions/products";
import {get_providers} from "../redux/actions/business_partners";
import Modal from "../components/util/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CustomTable from "../components/util/CustomTable";
import {faEye, faPlusCircle, faWorm} from "@fortawesome/free-solid-svg-icons";
import Form from "../components/home/Form";
import Humanize from 'humanize-plus'
import {Link} from "react-router-dom";
import {get_lots} from "../redux/actions/raw_material";

const Home = () => {

    const dispatch = useDispatch();
    const providers = useSelector(state => state.Business.providers)
    const products = useSelector(state => state.Products.categories);
    const day = useSelector(state => state.Products.day);
    const lots = useSelector(state => state.RawMaterial.lots);


    const [columns] = useState([{field: 'id', title: 'Id', filtering: false}, {
        field: 'downloadDate',
        title: 'Fecha de Descarga',
        filtering: false,
        render: (rowData) => <p className={"text-center text-xs"}>{new Date(rowData.downloadDate).toLocaleDateString('es-PE', {
            timeZone: 'UTC',day:'numeric',month:'long',year:'numeric'
        })}</p>
    }, {
        field: 'category_name',
        title: 'Producto',
        filtering: true,
        render: (rowData) => <div className='uppercase text-center'>{rowData.category_name}</div>
    }, {
        field: 'lot', title: 'Lote', filtering: false, render: (rowData) => <p
            className={"cursor-pointer hover:text-[#26d07d] text-center"}>{rowData.lot}</p>
    }, {
        field: 'condition', title: 'Condición', filtering: true
    },
        {
        field: 'variety', title: 'Variedad', filtering: true
    },
        {
        field: 'stock', title: 'Stock', render: (rowData) => <p
            className={rowData.stock > 0 ? 'bg-green-400 text-white p-0.5 text-center rounded-full' : 'text-transparent'}>{Humanize.formatNumber(rowData.stock, 2)}</p>
    }, {
        field: 'net_weight',
        title: 'Peso neto',
        render: (rowData) => <p className={"text-center"}>{Humanize.formatNumber(rowData.net_weight, 2)}</p>
    }, {
        field: "actions", filtering: false, title: "Acciones", render: (rowData) => <div>
            <Link to={`/lot/${rowData.lot}`}>
                <FontAwesomeIcon className={"hover:text-orange-400 text-black"} title={"Detalles"} icon={faEye}/>
            </Link>
            <Link to={`/process-line/${rowData.lot}`}>
                <FontAwesomeIcon className={"text-[#26d07d] ml-2 hover:text-green-600"} title={"Linea de Proceso"}
                                 icon={faWorm}/>
            </Link>
        </div>
    }]);

    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)


    const openModal = () => {
        setIsOpen((prev) => !prev)
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(get_fruits());
        dispatch(get_providers());
        dispatch(get_lots())
    }, []);

    const handleOpenModalAdd = () => {
        setTitle("Registrar lote de materia prima")
        setIsOpen(true)
        setContent(<Form providers={providers} categories={products} close={openModal}/>)
    }

    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>
        <SummaryStock products={products} day={day}/>
        <div className="flex flex-wrap flex-row  w-full justify-around   items-center ">

            <div className="w-full">

                <FontAwesomeIcon icon={faPlusCircle} className={"mx-[50%] text-red-400 text-xl cursor-pointer"}
                                 onClick={handleOpenModalAdd}/>

                <CustomTable title={"Registro de Lotes"} columns={columns} data={lots ? lots : []}/>
            </div>
        </div>
    </Layout>);
};

export default Home;

import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Helmet} from "react-helmet";
import {map} from "lodash";
import Layout from "../../hocs/Layout";
import Modal from "../../components/util/Modal";
import {delete_info, delete_lot, get_data_lot, get_lot} from "../../redux/actions/raw_material";
import Information from "../../components/rawmaterial/Information";
import Summary from "../../components/rawmaterial/Summary";
import ListDetail from "../../components/rawmaterial/Sidebar";
import {MySwal} from "../../helpers/util";
import {get_pallets} from "../../redux/actions/products";
import Form from "../../components/rawmaterial/Form";
import Table from "../../components/util/Table";
import {faPlusCircle, faPrint} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ReactToPrint from "react-to-print";
import Skeleton from "react-loading-skeleton";
import {ComponentToPrint} from "../../components/rawmaterial/Document";
import {ReportToPrint} from "../../components/rawmaterial/Report";
import {Output} from "../../components/rawmaterial/Output";
import {Label} from "../../components/rawmaterial/Label";
import Filter from "../../components/rawmaterial/Filter";
import BarChart from "../../components/util/BarChart";
import {get_locations} from "../../redux/actions/management";

const DetailLot = () => {
    const componentRef = useRef();
    const componentReportRef = useRef();
    const componentOutputRef = useRef();
    const componentLabelRef = useRef();

    const {lot} = useParams();
    const dispatch = useDispatch()
    const pallets = useSelector(state => state.Products.pallets)
    const locations=useSelector(state=>state.Management.location);
    const info = useSelector(state => state.RawMaterial.lot)
    const data = useSelector(state => state.RawMaterial.data)
    const [output, setOutput] = useState({data: null, lot: '', category: '', date: '', quality: 0, net_weight: 0});

    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen((prev) => !prev)
    }


    useEffect(() => {
        dispatch(get_lot(lot))
        dispatch(get_pallets())
        dispatch(get_data_lot(lot))
        dispatch(get_locations());
    }, []);


    const handleOpenModalAddInfo = () => {
        setTitle("Agregar información")
        setIsOpen(true)
        setContent(<Form pallets={pallets} locations={locations} entry={lot} lot={info?.id} close={openModal}/>)
    }
    const handleOpenModalUpdateInfo = (row) => {
        setTitle("Actualizar información")
        setIsOpen(true)
        setContent(<Form pallets={pallets} locations={locations} data={row} entry={lot} lot={info?.id} close={openModal}/>)
    }
    const handleDeleteInfo = (row) => {
        MySwal.fire({
            title: '¿Desea eliminar esta información?', icon: 'warning', showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_info(lot, row))
            }
        })
    }

    const handleOpenModalViewer = () => {
        setTitle("Documentación de las guias")
        setIsOpen(true)
        setContent(<iframe className={"h-full w-full"} title={"Guias"}
                           src={`https://docs.google.com/viewerng/viewer?url=${process.env.REACT_APP_API_URL + info?.document}&embedded=true`}></iframe>)
    }


    const navigate = useNavigate();

    const handleDeleteLot = () => {
        MySwal.fire({
            title: '¿Desea eliminar este lote?', icon: 'warning', showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_lot(lot))
                navigate('/')
            }
        })
    }

    const columns = ['Acciones', 'N°', 'Procesado', 'Fecha', 'Ubicación','Peso inicial bruto', 'Peso inicial neto', 'Tara', 'Peso final bruto', 'Peso final neto', 'GB', 'PAE', 'COL', 'TIB', 'TIB1', 'TIB2', 'GAND', 'MAD', 'C6', 'C8', 'C10', 'C12', 'C14', 'Pallet', 'Jabas']


    return (<Layout>
        <Helmet>
            <title>{lot}</title>
            <meta name="description" content="Greenbox"/>
        </Helmet>

        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>
        <div
             className={"flex flex-col lg:flex-row w-full lg:grid-cols-2 justify-center items-center lg:items-start"}>
            <div className={"lg:max-w-2xl sm:max-w-lg max-w-xs "}>
                {pallets && <FontAwesomeIcon icon={faPlusCircle} color={"red"}
                                             className={"hover:cursor-pointer mx-[50%]"}
                                             onClick={handleOpenModalAddInfo}/>}

                <div className={"inline-flex"}>

                    <div className={"hidden"}>
                        <Output ref={componentOutputRef} info={output}/>
                        <Label ref={componentLabelRef} lot={info}/>

                    </div>
                    {info?.closed ? <>
                        <div className={"hidden"}>
                            <ComponentToPrint ref={componentRef} info={info} data={data}/>
                            <ReportToPrint ref={componentReportRef} info={info}/>
                        </div>
                        <ReactToPrint
                            trigger={() => <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ">Registro<FontAwesomeIcon
                                className={"ml-2 hover:cursor-pointer "} icon={faPrint}
                                color={"black"}/></button>}
                            content={() => componentRef.current}
                        />
                        <ReactToPrint
                            trigger={() => <button
                                className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">Informe<FontAwesomeIcon
                                className={"ml-2 hover:cursor-pointer"} icon={faPrint}
                                color={"black"}/></button>}
                            content={() => componentReportRef.current}
                        />
                    </> : <Skeleton count={2}/>}
                </div>
                {output.data !== null && <ReactToPrint
                    trigger={() => <button
                        className="bg-gray-200 mt-2 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">Vale
                        de
                        salida<FontAwesomeIcon
                            className={"ml-2 hover:cursor-pointer"} icon={faPrint}
                            color={"black"}/></button>}
                    content={() => componentOutputRef.current}
                />}
                <ReactToPrint
                    trigger={() => <button
                        className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">Rótulos<FontAwesomeIcon
                        className={"ml-2 hover:cursor-pointer"} icon={faPrint}
                        color={"black"}/></button>}
                    content={() => componentLabelRef.current}
                />
                <Filter data={data ? data : []} lot={info ? info : []} ft={setOutput}/>

                <Table  omit_data={['pallet', 'id', 'indicted','location']} data={data} columns={columns}
                       edit={handleOpenModalUpdateInfo} remove={handleDeleteInfo}/>
                <Information data={info ? info : []}/>
                <Summary info={info ? info : []}/>
            </div>
            <div className={"flex justify-center max-w-lg flex-col items-center lg:flex-col"}>
                <ListDetail handleDelete={handleDeleteLot} handleViewer={handleOpenModalViewer} lot={info}/>
                 {info ? <BarChart title={"CALIBRES"} scores={map(info.calibers, (l, index) => l)}
                                        labels={["c6", "c8", "c10", "c12", "c14"]}/> : <Skeleton count={10}/>}
                {info ? <BarChart title={"JABAS"} scores={map(info.boxes, (l, index) => l)}
                                        labels={["GB", "CO", "T0", "T1", "T2", "Gn", "PAE", "MA"]}/> :
                    <Skeleton count={10}/>}
            </div>
        </div>


    </Layout>)

};

export default DetailLot;

import React, {useEffect, useState} from 'react';
import {Tab} from '@headlessui/react'
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    delete_process_conditioning,
    delete_process_released,
    delete_process_terminated,
    get_cuts,
    get_process_conditioning,
    get_process_released,
    get_process_terminated
} from "../../redux/actions/process_line";
import {get_lot} from "../../redux/actions/raw_material";
import {MySwal} from "../../helpers/util";

import Modal from "../../components/util/Modal";
import Table from "../../components/util/Table";
import Layout from "../../hocs/Layout";
import FormConditioning from "../../components/process_line/FormConditioning";
import FormTerminated from "../../components/process_line/FormTerminated";
import FormReleased from "../../components/process_line/FormReleased";
import Cards from "../../components/process_line/Cards";
import Skeleton from "react-loading-skeleton";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const ProcessLine = () => {
    const {lot} = useParams()
    const dispatch = useDispatch()
    const info = useSelector(state => state.RawMaterial.lot)
    let [categories] = useState(["Acondicionado", "Envasado", "Liberación de Producto Terminado"])
    const conditioning = useSelector(state => state.Process.conditioning)
    const terminated = useSelector(state => state.Process.terminated)
    const released = useSelector(state => state.Process.released)
    const cuts = useSelector(state => state.Process.cuts)
    useEffect(() => {
        dispatch(get_cuts())
        dispatch(get_lot(lot))
        dispatch(get_process_conditioning(lot))
        dispatch(get_process_terminated(lot))
        dispatch(get_process_released(lot))
    }, []);
    /*Modal*/
    const [title, setTitle] = useState("");
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen((prev) => !prev)
    }

    const handleDeleteConditioning = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar este proceso?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_process_conditioning(id, lot));
            }
        })
    }
    const handleDeleteTerminated = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar este proceso?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_process_terminated(id, lot));
            }
        })
    }
    const handleDeleteReleased = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar este proceso?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_process_released(id, lot));
            }
        })
    }


    const handleAddConditioning = () => {
        setTitle("Agregar registro de acondicionado")
        setIsOpen(true)
        setContent(<FormConditioning close={openModal} lot={lot} id={info.id}/>)
    }
    const handleUpdateConditioning = (data) => {
        setTitle("Actualizar registro de acondicionado")
        setIsOpen(true)
        setContent(<FormConditioning data={data} close={openModal} lot={lot}/>)
    }

    const handleAddTerminated = () => {
        setTitle("Agregar registro de envasado")
        setIsOpen(true)
        setContent(<FormTerminated close={openModal} cuts={cuts} process={conditioning} lot={lot}/>)
    }
    const handleUpdateTerminated = (data) => {
        setTitle("Actualizar registro de envasado")
        setIsOpen(true)
        setContent(<FormTerminated data={data} close={openModal} cuts={cuts} process={conditioning} lot={lot}/>)
    }

    const handleAddReleased = () => {
        setTitle("Agregar registro de liberación")
        setIsOpen(true)
        setContent(<FormReleased close={openModal} lot={lot} process={terminated}/>)
    }
    const handleUpdateReleased = (data) => {
        setTitle("Actualizar registro de liberación")
        setIsOpen(true)
        setContent(<FormReleased data={data} close={openModal} lot={lot} process={terminated}/>)
    }


    const columns_conditioning = ['Acciones', 'Fecha de Proceso', 'Lote', 'Cloro en red', 'Cloro en tina', 'Brix', 'pH', 'Espesor', 'Aspecto', 'Horno', '1hr', '2hr', '3hr', '4hr', '5hr', '6hr', '7hr', '8hr', '9hr', '10hr', '11hr', '12hr', '13hr', '14hr', '15hr', '16hr', '17hr', '18hr', '19hr', '20hr', '21hr', '22hr', '23hr', '24hr']
    const columns_terminated = ['Acciones', 'Fecha de Proceso', 'Fecha de Envasado', 'Lote', 'Brix', 'pH', 'Humedad', 'Aroma', 'Color', 'Sabor', 'Textura', 'Espesor', 'Defectos', 'Cantidad']
    const columns_liberated = ['Acciones', 'Fecha de Envasado', 'Fecha de Liberación', 'Lote', 'Cantidad', 'Cliente', 'Fecha de vencimiento', 'Cajas', 'Bolsas', 'Observaciones']

    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>

        <div className="w-full flex flex-col px-2  sm:px-0 justify-center">
            <h1 className={"bg-white p-4 w-max m-4 rounded-full text-[#26d07d]"}>Linea de proceso: <Link
                className={"font-bold text-[#26d07d]"} to={`/lot/${lot}`}>{lot}</Link></h1>
            {info && info !== null ? <Cards data={info}/> : <Skeleton count={3} className={"m-4"}/>}

            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    {categories.map((category) => (<Tab
                        key={category}
                        className={({selected}) => classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2', selected ? 'bg-[#26d07d] shadow' : 'text-white    hover:bg-white/[0.12] hover:text-white')}
                    >
                        {category}
                    </Tab>))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                    <Tab.Panel

                        className={classNames('rounded-xl bg-white p-3', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2')}
                    ><FontAwesomeIcon icon={faPlusCircle} className={"mx-[50%] text-red-400 text-xl cursor-pointer"}
                                      onClick={handleAddConditioning}/>
                        <Table humanize={true}
                               omit_data={['id', 'week', 'month', 'year', 'lot_mp', 'lot_id', 'process_id', 'type_id', 'client_id', 'lot_bags_id', 'lot_boxes_id']}
                               columns={columns_conditioning} data={conditioning}
                               remove={handleDeleteConditioning} edit={handleUpdateConditioning}/>
                    </Tab.Panel>

                    <Tab.Panel

                        className={classNames('rounded-xl bg-white p-3', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2')}
                    ><FontAwesomeIcon icon={faPlusCircle} className={"mx-[50%] text-red-400 text-xl cursor-pointer"}
                                      onClick={handleAddTerminated}/>
                        <Table humanize={true}
                               omit_data={['id', 'week', 'month', 'year', 'lot_mp', 'lot_id', 'process_id', 'type_id', 'client_id', 'lot_bags_id', 'lot_boxes_id']}
                               columns={columns_terminated} data={terminated} edit={handleUpdateTerminated}
                               remove={handleDeleteTerminated}/>
                    </Tab.Panel>
                    <Tab.Panel

                        className={classNames('rounded-xl bg-white p-3', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2')}
                    ><FontAwesomeIcon icon={faPlusCircle} className={"mx-[50%] text-red-400 text-xl cursor-pointer"}
                                      onClick={handleAddReleased}/>
                        <Table humanize={true}
                               omit_data={['id', 'week', 'month', 'year', 'lot_mp', 'lot_id', 'process_id', 'type_id', 'client_id', 'lot_bags_id', 'lot_boxes_id']}
                               data={released} columns={columns_liberated} remove={handleDeleteReleased}
                               edit={handleUpdateReleased}/>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    </Layout>);
};

export default ProcessLine;

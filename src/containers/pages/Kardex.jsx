import React, {useEffect, useState} from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import Layout from "../../hocs/Layout";
import Modal from "../../components/util/Modal";
import {useDispatch, useSelector} from "react-redux";
import Form from "../../components/management/Form";
import Filter from "../../components/management/Filter";
import {setAlert} from "../../redux/actions/alert";

const Kardex = () => {
    const dispatch = useDispatch();
    const events = useSelector(state => state.Management.events);
    const [category, setCategory] = useState(null);
    const fruits = useSelector(state => state.Products.categories);


    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen((prev) => !prev)
    }
    const handleOpenModalAdd = (date) => {
        setTitle("Agregar registro")
        setIsOpen(true)
        setContent(<Form close={openModal} category={category} date={date}/>)
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch({type: "GET_KARDEX_FAIL"})
    }, []);

    return (<Layout>
        <div className="flex justify-around items-center mb-6 flex-col md:flex-row">
            <div className={' w-full h-full mt-6 bg-white p-4 rounded-xl'}>
                <Filter categories={fruits} action={setCategory}/>
            </div>
        </div>

        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            selectable={true}
            initialView="dayGridMonth"
            headerToolbar={{center: "title", left: "prev", right: "next,today"}}
            events={events !== null && events && events}
            select={category !== null && function (start) {
                handleOpenModalAdd(start.startStr)
            }}
            eventClick={function (info) {
                dispatch(setAlert(info.event.title, "info"))
            }}


        />

    </Layout>);
};

export default Kardex;

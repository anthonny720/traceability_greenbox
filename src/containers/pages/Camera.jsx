import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import {useDispatch, useSelector} from "react-redux";
import {get_locations} from "../../redux/actions/management";
import Filter from "../../components/management/FilterCamera";
import Modal from "../../components/util/Modal";
import Table from "../../components/management/TableCameras";

const Camera = () => {
    const dispatch = useDispatch();
    const locations = useSelector(state => state.Management.location);
    const data = useSelector(state => state.Management.data);
    useEffect(() => {
        dispatch(get_locations());
    }, []);

    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)


    const openModal = () => {
        setIsOpen((prev) => !prev)
    }


    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>
        <Filter dispatch={dispatch} locations={locations}/>
        <div className="flex flex-wrap flex-row  w-full justify-around   items-center ">

            <div className="w-full">
                <Table data={data ? data : []}/>
            </div>
        </div>

    </Layout>);
};

export default Camera;

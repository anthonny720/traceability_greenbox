import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import SummaryStock from "../../components/commercial/Summary";
import {useDispatch, useSelector} from "react-redux";
import {
    get_business_maquila,
    get_client,
    get_condition,
    get_cut,
    get_family,
    get_group,
    get_lots,
    get_lots_page,
    get_packaging,
    get_packing,
    get_presentation,
    get_products,
    get_type,
    get_variety
} from "../../redux/actions/commercial";
import Table from "../../components/commercial/Table";
import SetPagination from "../../components/util/Pagination";
import Modal from "../../components/util/Modal";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Form from "../../components/commercial/Form";

const Commercial = () => {
    const dispatch = useDispatch();
    const [params, setParams] = useState({})
    const products = useSelector(state => state.Commercial.products);
    const count = useSelector(state => state.Commercial.count);
    const lots = useSelector(state => state.Commercial.lots);
    const family = useSelector(state => state.Commercial.family);
    const group = useSelector(state => state.Commercial.group);
    const variety = useSelector(state => state.Commercial.variety);
    const type_inf = useSelector(state => state.Commercial.type_inf);
    const cut = useSelector(state => state.Commercial.cut);
    const condition = useSelector(state => state.Commercial.condition);
    const presentation = useSelector(state => state.Commercial.presentation);
    const packaging = useSelector(state => state.Commercial.packaging);
    const packing = useSelector(state => state.Commercial.packing);
    const provider = useSelector(state => state.Commercial.maquila);
    const client = useSelector(state => state.Commercial.client);


    useEffect(() => {
        dispatch(get_products());
        dispatch(get_family());
        dispatch(get_group());
        dispatch(get_type());
        dispatch(get_cut());
        dispatch(get_variety());
        dispatch(get_client());
        dispatch(get_presentation());
        dispatch(get_packaging());
        dispatch(get_packing());
        dispatch(get_business_maquila());
        dispatch(get_condition());
        dispatch(get_lots(params));
    }, [dispatch]);

    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)


    const openModal = () => {
        setIsOpen((prev) => !prev)
    }


    const handleOpenModalAdd = () => {
        setTitle("Registrar")
        setIsOpen(true)
        setContent(<Form products={products ? products : []} close={openModal} packaging={packaging ? packaging : []}
                         group={group ? group : []} variety={variety ? variety : []}
                         client={client ? client : []} condition={condition ? condition : []} cut={cut ? cut : []}
                         family={family ? family : []} packing={packing ? packing : []}
                         presentation={presentation ? presentation : []} provider={provider ? provider : []}
                         type_inf={type_inf ? type_inf : []}/>)
    }

    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>

        <SummaryStock products={products}/>
        <div className={"lg:w-8/12 w-full"}>
            <FontAwesomeIcon icon={faPlusCircle} className={"mx-[50%] text-red-400 text-xl cursor-pointer"}
                             onClick={handleOpenModalAdd}/>
            <Table data={lots}/>
            <SetPagination count={count} get_data_page={get_lots_page} data={lots ? lots : []} params={params}/>
        </div>

    </Layout>);
};

export default Commercial;

import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {get_clients, get_clients_page} from "../../redux/actions/business_partners";
import Layout from "../../hocs/Layout";
import Table from "../../components/business/Table";
import SetPagination from "../../components/util/Pagination";

const Clients = () => {

    const clients = useSelector(state => state.Business.clients)
    const dispatch = useDispatch();
    const count = useSelector(state => state.Business.count_clients);


    useEffect(() => {
        dispatch(get_clients())
    }, [])

    return (<Layout>
        <div className="w-full h-full mt-6">
            <Table data={clients ? clients : []} type={"clients"}/>
            <SetPagination scroll={true} count={count} get_data_page={get_clients_page} data={clients ? clients : []}/>
        </div>
    </Layout>);
};

export default Clients;

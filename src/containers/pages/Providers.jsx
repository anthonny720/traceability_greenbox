import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {get_providers, get_providers_page} from "../../redux/actions/business_partners";
import Layout from "../../hocs/Layout";
import Table from "../../components/business/Table";
import SetPagination from "../../components/util/Pagination";

const Providers = () => {
    const dispatch = useDispatch();

    const providers = useSelector(state => state.Business.providers)
    const count = useSelector(state => state.Business.count_providers);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(get_providers())
    }, []);


    return (<Layout>
        <div className="w-full h-full mt-6">
            <Table data={providers ? providers : []} type={'providers'}/>
            <SetPagination scroll={true} count={count} get_data_page={get_providers_page} data={providers ? providers : []}/>
        </div>
    </Layout>);
};

export default Providers;

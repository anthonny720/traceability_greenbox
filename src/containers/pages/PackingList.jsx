import React, {useEffect} from 'react';
import Layout from "../../hocs/Layout";
import {get_packing_list, get_packing_list_page} from "../../redux/actions/logistic";
import {useDispatch, useSelector} from "react-redux";
import Table from "../../components/logistic/TablePacking";
import SetPagination from "../../components/util/Pagination";

const PackingList = () => {
    const dispatch = useDispatch();
    const packing_list = useSelector(state => state.Logistic.packing_list)
    const count = useSelector(state => state.Logistic.count_packing_list);


    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(get_packing_list())
    }, []);


    return (<Layout>
        <div className="w-full">
            <Table data={packing_list ? packing_list : []}/>
            <SetPagination count={count} get_data_page={get_packing_list_page} data={packing_list ? packing_list : []}/>

        </div>
    </Layout>);
};

export default PackingList;

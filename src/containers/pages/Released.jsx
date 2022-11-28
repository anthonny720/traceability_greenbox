import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {get_process_general_released, get_process_general_released_page} from "../../redux/actions/process_line";
import Layout from "../../hocs/Layout";
import Filter from "../../components/process_line/Filter";
import Table from "../../components/process_line/TableReleased";
import SetPagination from "../../components/util/Pagination";

const Released = () => {
    const dispatch = useDispatch()
    const [params, setParams] = useState({year: "", month: "", category: ""});
    const released = useSelector(state => state.Process.general_released)
    const count = useSelector(state => state.Process.count_released)

    useEffect(() => {
        dispatch(get_process_general_released(params))
    }, []);
    return (<Layout>
        <Filter action={get_process_general_released} dispatch={dispatch} setParams={setParams}/>
        <div className="w-full">
            <Table data={released ? released : []}/>
            <SetPagination count={count} get_data_page={get_process_general_released_page} params={params}
                           data={released ? released : []}/>
        </div>
    </Layout>);
};

export default Released;

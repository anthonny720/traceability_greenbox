import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {get_process_general_terminated, get_process_general_terminated_page} from "../../redux/actions/process_line";
import Layout from "../../hocs/Layout";
import Filter from "../../components/process_line/Filter";
import Table from "../../components/process_line/TableTerminated";
import SetPagination from "../../components/util/Pagination";

const Terminated = () => {
    const dispatch = useDispatch()
    const [params, setParams] = useState({year: "", month: "", category: ""});

    const terminated = useSelector(state => state.Process.general_terminated)
    const count = useSelector(state => state.Process.count_terminated);


    useEffect(() => {
        dispatch(get_process_general_terminated(params))
    }, []);
    return (<Layout>
        <Filter action={get_process_general_terminated} dispatch={dispatch} setParams={setParams}/>
        <div className="w-full">
            <Table data={terminated ? terminated : []}/>
            <SetPagination count={count} get_data_page={get_process_general_terminated_page} params={params}
                           data={terminated ? terminated : []}/>

        </div>
    </Layout>);
};

export default Terminated;

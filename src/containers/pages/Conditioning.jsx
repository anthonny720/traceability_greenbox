import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import Layout from "../../hocs/Layout";
import Filter from "../../components/process_line/Filter";
import {
    get_process_general_conditioning,
    get_process_general_conditioning_page
} from "../../redux/actions/process_line";
import Table from "../../components/process_line/TableConditioning";
import SetPagination from "../../components/util/Pagination";

const Conditioning = () => {
    const [params, setParams] = useState({year: "", month: "", category: ""});
    const dispatch = useDispatch()
    const conditioning = useSelector(state => state.Process.general_conditioning)
    const count = useSelector(state => state.Process.count_conditioning);


    useEffect(() => {
        dispatch(get_process_general_conditioning(params))
    }, []);

    return (<Layout>
        <Filter action={get_process_general_conditioning} dispatch={dispatch} setParams={setParams}/>
        <div className="w-full">
            <Table data={conditioning ? conditioning : []}/>
            <SetPagination count={count} get_data_page={get_process_general_conditioning_page} params={params}
                           data={conditioning ? conditioning : []}/>

        </div>
    </Layout>);
};

export default Conditioning;

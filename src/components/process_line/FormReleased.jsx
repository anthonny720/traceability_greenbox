import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {get_clients} from "../../redux/actions/business_partners";
import {add_process_released, update_process_released} from "../../redux/actions/process_line";
import {get_bags, get_boxes} from "../../redux/actions/products";


const FormReleased = ({close, data, process, lot}) => {
    const dispatch = useDispatch();
    const clients = useSelector(state => state.Business.clients)
    const boxes = useSelector(state => state.Products.boxes)
    const bags = useSelector(state => state.Products.bags)
    useEffect(() => {
        dispatch(get_clients());
        dispatch(get_boxes());
        dispatch(get_bags());
    }, []);


    const columns = [{name: 'release_date', title: 'Fecha de liberación', type: 'date', maxLength: 50,}, {
        name: 'quantity', title: 'Cantidad', type: 'text', maxLength: 5,
    }, {name: 'expiration_date', title: 'Fecha de vencimiento', type: 'date', maxLength: 50,},]


    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            data ? dispatch(update_process_released(form, data.id, lot), close()) : dispatch(add_process_released(form, lot), close());
        }
    })


    return (<form className="bg-white px-8 pt-6 pb-8 mb-4">
        <div className={"w-full  z-30"}>
            {/*Proceso*/}
            <p className={`${formik.errors.process ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Proceso:</p>

            <select value={formik.values.process}
                    onChange={(value) => {
                        formik.setFieldValue('process', value.target.value);
                    }}
                    className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example">
                <option value={''}>Seleccione una fecha del proceso previo</option>
                {map(process, p => (<option key={p.id} value={p.id}>{p.packing_date}</option>))}
            </select>

        </div>
        <div className={"w-full  z-30"}>
            {/*Cliente*/}
            <p className={`${formik.errors.client ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Cliente:</p>
            <select value={formik.values.client}
                    onChange={(value) => {
                        formik.setFieldValue('client', value.target.value);
                    }}
                    className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example">
                <option value={''}>Seleccione un cliente</option>
                {clients !== null && map(clients, c => (<option key={c.id} value={c.id}>{c.name}</option>))}
            </select>
        </div>
        {map(columns, (column, index) => (<div key={index}>
            <p className={`${formik.errors[column.name] ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>{column.title}:</p>
            <input type={column.type} maxLength={column.maxLength}
                   className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase"
                   value={`${formik.values[column.name]}`}
                   onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
        </div>))}
        <div className={"w-full  z-30"}>
            {/*Boxes*/}
            <p className={`${formik.errors.lot_boxes ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Lote
                de cajas:</p>
            <select value={formik.values.lot_boxes}
                    onChange={(value) => {
                        formik.setFieldValue('lot_boxes', value.target.value);
                    }}
                    className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example">
                <option value={''}>Seleccione un lote de cajas</option>
                {boxes !== null && map(boxes, b => (<option key={b.id} value={b.id}>{b.lot}</option>))}
            </select>
        </div>
        <div className={"w-full  z-30"}>
            {/*Bags*/}
            <p className={`${formik.errors.lot_bags ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Lote
                de bolsas:</p>
            <select value={formik.values.lot_bags}
                    onChange={(value) => {
                        formik.setFieldValue('lot_bags', value.target.value);
                    }}
                    className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example">
                <option value={''}>Seleccione un lote de bolsas</option>
                {bags !== null && map(bags, b => (<option key={b.id} value={b.id}>{b.lot}</option>))}
            </select>
        </div>
        <div>
            <p className="text-base mt-4 font-medium leading-none text-gray-800">Observación:</p>
            <select onChange={(value) => formik.setFieldValue('observations', value.target.value)}
                    value={formik.values.observations} className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example">
                <option value={1}>{"Producto apto"}</option>
                <option  value={2}>{"Producto en transición"}</option>
                <option value={3}>{"Producto no conforme"}</option>
            </select>
        </div>
        <div className="w-full flex justify-center">
            <button onClick={formik.handleSubmit} type="button"
                    className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                <FontAwesomeIcon icon={faPaperPlane}/>
            </button>
        </div>
    </form>);
};

const initialValues = (data) => {
    return {
        release_date: data?.release_date || "",
        process: data?.process_id || "",
        quantity: data?.quantity || 0,
        client: data?.client_id || "",
        expiration_date: data?.expiration_date || "",
        lot_bags: data?.lot_bags_id || "",
        lot_boxes: data?.lot_boxes_id || "",
        observations: data?.observations || 1
    }
}
const newSchema = () => {
    return {
        release_date: Yup.string().required(true),
        process: Yup.number().required(true),
        quantity: Yup.number().min(1).integer().required(true),
        client: Yup.number().required(true),
        expiration_date: Yup.string().required(true),
        lot_bags: Yup.number().required(true),
        lot_boxes: Yup.number().required(true),
        observations: Yup.number()
    }
}
export default FormReleased;

import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {map} from "lodash";
import {Switch} from "@headlessui/react";
import {add_process_pineapple, update_process_pineapple} from "../../redux/actions/production";


const FormPineapple = ({data, close, lots}) => {
    const dispatch = useDispatch()

    const columns = [
        {name: 'juice', title: 'Jugo', type: 'text', maxLength: 5},
        {name: 'discard', title: 'Descarte', type: 'text', maxLength: 5},
        {name: 'start_washed', title: 'Inicio de lavado', type: 'time', maxLength: 8},
        {name: 'finish_washed', title: 'Fin de lavado', type: 'time', maxLength: 8},
        {name: 'start_bare', title: 'Inicio de pelado', type: 'time', maxLength: 8},
        {name: 'finish_bare', title: 'Fin de pelado', type: 'time', maxLength: 8},
        {name: 'start_chopped', title: 'Inicio de picado', type: 'time', maxLength: 8},
        {name: 'finish_chopped', title: 'Fin de picado', type: 'time', maxLength: 8},
        {name: 'start_loaded', title: 'Inicio de cargado', type: 'time', maxLength: 8},
        {name: 'finish_loaded', title: 'Fin de cargado', type: 'time', maxLength: 8},
        {name: 'start_cleaning', title: 'Inicio de limpieza', type: 'time', maxLength: 8},
        {name: 'finish_cleaning', title: 'Fin de lavado', type: 'time', maxLength: 8},
        {name: 'people', title: 'Personas', type: 'text', maxLength: 3},
        {name: 'kg_unpeeled', title: 'Kg sin pelar', type: 'text', maxLength: 5},
        {name: 'cars', title: 'Coches', type: 'text', maxLength: 2},
    ]
    console.log(lots)

    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            data ? dispatch(update_process_pineapple(form, data.slug), close()) : dispatch(add_process_pineapple(form), close())
        }
    })
    return (
        <div className="w-full z-20">
            <form className="bg-white px-8 pt-6 pb-8 mb-4">
                {/*Fecha*/}
                <div>
                    <p className={`${formik.errors.date ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Fecha:</p>
                    <input type={'date'} maxLength={10} disabled={data && true}
                           className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase"
                           value={`${formik.values.date}`}
                           onChange={text => formik.setFieldValue('date', text.target.value)}/>
                </div>
                {/*Lote*/}
                <div>
                    <p className={`${formik.errors.lot ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Lote:</p>
                    <select value={formik.values.lot} disabled={data && true}
                            onChange={(value) => formik.setFieldValue('lot', value.target.value)}
                            className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        <option value={''}>Seleccione un lote</option>
                        {lots !== null && map(lots, lot => (
                            <option key={lot.id} value={lot.id}>{lot.lot}</option>))}
                    </select>
                </div>
                {data &&
                    <div className={"grid grid-cols-2 gap-2"}>
                        {map(columns, (column, index) => (<div key={index}>
                            <p className={`${formik.errors[column.name] ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>{column.title}:</p>
                            <input type={column.type} maxLength={column.maxLength}
                                   className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase"
                                   value={`${formik.values[column.name]}`}
                                   onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                        </div>))}
                        <div className={"w-full  mx-2"}>
                            <p className={`${formik.errors.status ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Estado:</p>
                            <Switch
                                checked={formik.values.status}
                                onChange={value => formik.setFieldValue('status', value)}
                                className={`${formik.values.status ? 'bg-blue-600' : 'bg-gray-200'} relative md:my-[15%] lg:my-[10%] inline-flex h-6 w-11 items-center rounded-full `}
                            >
                                <span className="sr-only">Procesado</span>
                                <span
                                    className={`${formik.values.status ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white`}
                                />
                            </Switch>
                        </div>
                    </div>

                }


                <div className="w-full flex justify-center">
                    <button onClick={formik.handleSubmit} type="button"
                            className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                        <FontAwesomeIcon icon={faPaperPlane}/>
                    </button>
                </div>
            </form>

        </div>
    );
};

const initialValues = (data) => {
    return {
        date: data?.date || '',
        juice: data?.summary.data['Jugo'] || 0,
        discard: data?.summary.data['Descarte'] || 0,
        start_washed: data?.start_washed || "00:00",
        start_bare: data?.start_bare || "00:00",
        start_chopped: data?.start_chopped || '00:00',
        start_loaded: data?.start_loaded || '00:00:00',
        start_cleaning: data?.start_cleaning || "00:00",
        finish_washed: data?.finish_washed || '00:00',
        finish_bare: data?.finish_bare || '00:00',
        finish_chopped: data?.finish_chopped || '00:00',
        finish_loaded: data?.finish_loaded || '00:00',
        finish_cleaning: data?.finish_cleaning || '00:00',
        people: data?.summary.data['Personas'] || 1,
        kg_unpeeled: data?.summary.data['Sin pelar'] || 0,
        cars: data?.summary.data['Coches'] || 1,
        lot: data?.lot || '',
        status: data?.status || false,

    }
}


const newSchema = () => {
    return {
        date: Yup.date().required(true),
        juice: Yup.number().min(0),
        discard: Yup.number().min(0),
        start_washed: Yup.string().min(1),
        start_bare: Yup.string().min(1),
        start_chopped: Yup.string().min(1),
        start_loaded: Yup.string().min(1),
        start_cleaning: Yup.string().min(1),
        finish_washed: Yup.string().min(1),
        finish_bare: Yup.string().min(1),
        finish_chopped: Yup.string().min(1),
        finish_loaded: Yup.string().min(1),
        finish_cleaning: Yup.string().min(1),
        people: Yup.number().min(1).max(200),
        kg_unpeeled: Yup.number().min(0),
        cars: Yup.number().min(1).max(99),
        status: Yup.boolean().required(true),
        lot: Yup.number().min(1).required(true),
    }
}
export default FormPineapple;

import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {useDispatch} from "react-redux";
import {update_packing} from "../../redux/actions/report";


const Form = ({close, data, category}) => {

    const dispatch = useDispatch()
    const columns = [
        {name: 'price_camp', title: 'Precio Campo', type: 'text', maxLength: 5},
        {name: 'freight', title: 'Flete', type: 'text', maxLength: 10},
        {name: 'observations', title: 'Observaciones', type: 'text', maxLength: 100},
    ]
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            dispatch(update_packing(form, data.id, category))
            close()
        }
    })


    return (
        <div className="w-full z-20">
            <form className="bg-white px-8 pt-6 pb-8 mb-4">

                {map(columns, (column, index) => (<div key={index}>
                    <p className={`${formik.errors[column.name] ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>{column.title}:</p>
                    <input type={column.type} maxLength={column.maxLength}
                           className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                           value={`${formik.values[column.name]}`}
                           onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                </div>))}

                {/*type*/}
                <div>
                    <p className={`${formik.errors.type ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Referencia
                        de precio:</p>
                    <select value={formik.values.type}
                            onChange={(value) => formik.setFieldValue('type', value.target.value)}
                            className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        <option value={'campo'}>Campo</option>
                        <option value={'planta'}>Planta</option>

                    </select>
                </div>
                {/*type_kg*/}
                <div>
                    <p className={`${formik.errors.type_kg ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Referencia
                        de kg aprovechables:</p>
                    <select value={formik.values.type_kg}
                            onChange={(value) => formik.setFieldValue('type_kg', value.target.value)}
                            className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        <option value={'neto'}>Peso Neto</option>
                        <option value={'guia'}>Peso Guía</option>
                        <option value={'bruto'}>Peso Bruto</option>

                    </select>
                </div>
                {/*type_discount*/}
                <div>
                    <p className={`${formik.errors.type_discount ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Referencia
                        de descuento:</p>
                    <select value={formik.values.type_discount}
                            onChange={(value) => formik.setFieldValue('type_discount', value.target.value)}
                            className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        <option value={'neto'}>Peso Neto</option>
                        <option value={'guia'}>Peso Guía</option>
                        <option value={'bruto'}>Peso Bruto</option>

                    </select>
                </div>


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
        price_camp: data?.price_camp || 0,
        freight: data?.freight || 0,
        observations: data?.observations || "",
        type: data?.type || "planta",
        type_kg: data?.type_kg || 'neto',
        type_discount: data?.type_discount || 'neto',
    }
}
const newSchema = () => {
    return {
        price_camp: Yup.number().min(0).required(),
        freight: Yup.number().min(0).required(),
        observations: Yup.string().min(1).max(100),
        type: Yup.string().min(1).required(),
        type_kg: Yup.string().min(1).required(),
        type_discount: Yup.string().min(1).required(),
    }
}
export default Form;
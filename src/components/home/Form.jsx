import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {useDispatch} from "react-redux";
import {add_lot} from "../../redux/actions/raw_material";


const Form = ({close, providers, categories}) => {
    const dispatch = useDispatch()

    const columns = [
        {name: 'origin', title: 'Origen', type: 'text', maxLength: 50},
        {name: 'parcel', title: 'Parcela', type: 'text', maxLength: 50},
        {name: 'carrierGuide', title: 'Guia de transportista', type: 'text', maxLength: 12},
        {name: 'providerGuide', title: 'Guia de proveedor', type: 'text', maxLength: 12},
        {name: 'entryDate', title: 'Fecha de ingreso', type: 'date', maxLength: 10},
        {name: 'downloadDate', title: 'Fecha de descarga', type: 'date', maxLength: 10},
        {name: 'lot', title: 'Lote', type: 'text', maxLength: 13},
    ]
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            dispatch(add_lot(form), close())
        }
    })
    return (
        <div className="w-full z-20">
            <form className="bg-white px-8 pt-6 pb-8 mb-4">
                {/*CATEGORY*/}
                <div>
                    <p className={`${formik.errors.category ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Producto:</p>
                    <select value={formik.values.category}
                            onChange={(value) => formik.setFieldValue('category', value.target.value)}
                            className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        <option value={null}>Seleccione un producto</option>
                        {categories !== null && map(categories, category => (
                            <option key={category.id} value={category.id}>{category.name}</option>))}
                    </select>
                </div>

                {/*Provider*/}
                <div>
                    <p className={`${formik.errors.provider ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Proveedor:</p>
                    <select onChange={(value) => formik.setFieldValue('provider', value.target.value)}
                            defaultValue={formik.values.provider} className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        <option value={null}>Seleccione un proveedor</option>
                        {providers !== null && map(providers, provider => (
                            <option key={provider.id} value={provider.id}>{provider.name}</option>))}
                    </select>
                </div>

                {map(columns, (column, index) => (<div key={index}>
                    <p className={`${formik.errors[column.name] ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>{column.title}:</p>
                    <input type={column.type} maxLength={column.maxLength}
                           className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                           value={`${formik.values[column.name]}`}
                           onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                    <p className="text-red-500 text-xs italic">{formik.errors[column.name]}</p>
                </div>))}


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
const initialValues = () => {
    return {
        provider: '',
        origin: "",
        carrierGuide: "",
        providerGuide: "",
        entryDate: '',
        downloadDate: '',
        parcel: "No hay datos",
        lot: "",
        category: '',
    }
}
const newSchema = () => {
    return {
        provider: Yup.number().required(true),
        origin: Yup.string().min(3, "Ingrese correctamente").required(true),
        carrierGuide: Yup.string().min(6, "Ingrese correctamente un mínimo de 6 caracteres").required(true),
        providerGuide: Yup.string().min(6, "Ingrese correctamente un mínimo de 6 caracteres").required(true),
        entryDate: Yup.string().min(8, "Ingrese correctamente una fecha de ingreso").required(true),
        downloadDate: Yup.string().min(8, "Ingrese correctamente una fecha de descarga").required(true),
        lot: Yup.string().min(12, "Debe contener un mínimo de 12 caracteres").max(13, "Debe contener un máximo de 13 caracteres").required(true),
        parcel: Yup.string().min(1).required(true),
        category: Yup.number().required(true),
    }
}
export default Form;
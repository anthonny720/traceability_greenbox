import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map, size} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {add_program} from "../../redux/actions/logistic";


const Form = ({close, data}) => {
    const handleChangeNormalSelect = e => {
        const updatedOptions = [...e.target.options]
            .filter(option => option.selected)
            .map(x => x.value);
        formik.setFieldValue('client', updatedOptions)
    };

    const dispatch = useDispatch()
    const clients = useSelector(state => state.Business.clients)
    const columns = [
        {name: 'date', title: 'Fecha', type: 'date', maxLength: 50},
        {name: 'number', title: 'Número', type: 'text', maxLength: 4},
        {name: 'denomination', title: 'Denominación', type: 'text', maxLength: 12},
    ]
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            if (size(form.client) === 0) {
                toast.error('Seleccione al menos un cliente')
            } else {
                dispatch(add_program(form), close())
            }

        }
    })


    return (
        <div className="w-full z-20">
            <form className="bg-white px-8 pt-6 pb-8 mb-4">
                {/*Clients*/}
                <div>
                    <p className={`${formik.errors.client ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Clientes:</p>
                    <select multiple={true}
                            onChange={handleChangeNormalSelect}
                            value={formik.values.client}
                            className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        {clients !== null && map(clients, client => (
                            <option key={client.id} value={client.id}>{client.name}</option>))}
                    </select>
                </div>
                {/*Type*/}
                <div>
                    <p className={`${formik.errors.type ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Tipo
                        de envio:</p>
                    <select value={formik.values.type}
                            onChange={(value) => formik.setFieldValue('type', value.target.value)}
                            className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        <option value={null}>Seleccionar un tipo de envío</option>
                        <option value={'FCL'}>FCL</option>
                        <option value={'LCL'}>LCL</option>

                    </select>
                </div>
                {/*Method*/}
                <div>
                    <p className={`${formik.errors.method ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Método:</p>
                    <select value={formik.values.method}
                            onChange={(value) => formik.setFieldValue('method', value.target.value)}
                            className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        <option value={null}>Seleccionar un método</option>
                        <option value={'PEPS'}>PEPS</option>
                        <option value={'UEPS'}>UEPS</option>

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
const initialValues = (data) => {
    return {
        client: data?.client || [],
        method: data?.method || "",
        type: data?.type || "",
        date: data?.date || "",
        number: data?.number || '',
        denomination: data?.denomination || '',
    }
}
const newSchema = () => {
    return {
        method: Yup.string().min(4).max(4).required('Se requiere un método'),
        type: Yup.string().min(3).max(3).required('Se requiere un tipo'),
        date: Yup.string().min(1).required('Se requiere una fecha'),
        number: Yup.number().integer('Debe ingresar un número entero').min(1, 'Ingrese un número valido').required('Se requiere un número'),
        denomination: Yup.string()
    }
}
export default Form;
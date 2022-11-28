import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {filter, map} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {add_data_packing} from "../../redux/actions/logistic";


const Form = ({close, slug, id}) => {


    const dispatch = useDispatch()
    const lots = useSelector(state => state.Logistic.lots)
    const columns = [
        {name: 'number', title: 'Número de pallet', type: 'text', maxLength: 2},
        {name: 'boxes', title: 'Cantidad de cajas', type: 'text', maxLength: 2},
        {name: 'bags', title: 'Cantidad de bolsas por caja', type: 'text', maxLength: 2},
        {name: 'weight', title: 'Peso referencial', type: 'text', maxLength: 7},
    ]
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            const lot = filter(lots, {'id': parseInt(form.lot)})[0]
            if (form.boxes > lot.stock) {
                toast.info('La cantidad de cajas excede el stock actual del lote')
            }
            if (id !== 0 && id !== undefined && id !== null) {
                form.id = id
                // console.log(form)
                dispatch(add_data_packing(form, slug))
            }
            close()


        }
    })


    return (
        <div className="w-full z-20">
            <form className="bg-white px-8 pt-6 pb-8 mb-4">
                <div>
                    <p className={`${formik.errors.lot ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Lote
                        Producto Terminado:</p>
                    <select value={formik.values.lot}
                            onChange={(value) => formik.setFieldValue('lot', value.target.value)}
                            className="scrollbar-hide form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        <option value={null}>Seleccione un lote</option>
                        {lots !== null && map(lots, lot => (
                            <option key={lot.id} value={lot.id}>{lot.lot} - Stock: {lot.stock} </option>))}
                    </select>
                </div>
                {map(columns, (column, index) => (<div key={index}>
                    <p className={`${formik.errors[column.name] ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>{column.title}:</p>
                    <input type={column.type} maxLength={column.maxLength}
                           className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                           value={`${formik.values[column.name]}`}
                           onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
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
        number: "",
        lot: "",
        boxes: "",
        bags: "",
        weight: '',
    }
}
const newSchema = () => {
    return {
        number: Yup.number().integer().min(1).max(50).required(),
        lot: Yup.number().min(1).required(),
        boxes: Yup.number().integer().min(1).required(),
        bags: Yup.number().integer().min(1).required(),
        weight: Yup.number().required(),
    }
}
export default Form;
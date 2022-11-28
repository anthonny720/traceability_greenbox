import React from 'react';
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {add_process_conditioning, update_process_conditioning} from "../../redux/actions/process_line";

const FormConditioning = ({close, data, lot, id}) => {
    const dispatch = useDispatch();

    const columns = [// lote
        {name: 'process_date', title: 'Fecha de proceso', type: 'date', maxLength: 50,}, {
            name: 'chlorine', title: 'Cloro en red', type: 'text', maxLength: 3,
        }, {name: 'disinfection', title: 'Linea de desinfección', type: 'text', maxLength: 3,}, {
            name: 'brix', title: 'Brix', type: 'text', maxLength: 5,
        }, {name: 'ph', title: 'pH', type: 'text', maxLength: 5,}, {
            name: 'width', title: 'Espesor', type: 'text', maxLength: 5,
        }, {name: 'aspect', title: 'Aspecto', type: 'text', maxLength: 1,}, {
            name: 'oven', title: 'Horno', type: 'text', maxLength: 1,
        }, {name: 'h1', title: '1 hrs', type: 'text', maxLength: 2,}, {
            name: 'h2', title: '2 hrs', type: 'text', maxLength: 2,
        }, {name: 'h3', title: '3 hrs', type: 'text', maxLength: 2,}, {
            name: 'h4', title: '4 hrs', type: 'text', maxLength: 2,
        }, {name: 'h5', title: '5 hrs', type: 'text', maxLength: 2,}, {
            name: 'h6', title: '6 hrs', type: 'text', maxLength: 2,
        }, {name: 'h7', title: '7 hrs', type: 'text', maxLength: 2,}, {
            name: 'h8', title: '8 hrs', type: 'text', maxLength: 2,
        }, {name: 'h9', title: '9 hrs', type: 'text', maxLength: 2,}, {
            name: 'h10', title: '10 hrs', type: 'text', maxLength: 2,
        }, {name: 'h11', title: '11 hrs', type: 'text', maxLength: 2,}, {
            name: 'h12', title: '12 hrs', type: 'text', maxLength: 2,
        }, {name: 'h13', title: '13 hrs', type: 'text', maxLength: 2,}, {
            name: 'h14', title: '14 hrs', type: 'text', maxLength: 2,
        }, {name: 'h15', title: '15 hrs', type: 'text', maxLength: 2,}, {
            name: 'h16', title: '16 hrs', type: 'text', maxLength: 2,
        }, {name: 'h17', title: '17 hrs', type: 'text', maxLength: 2,}, {
            name: 'h18', title: '18 hrs', type: 'text', maxLength: 2,
        }, {name: 'h19', title: '19 hrs', type: 'text', maxLength: 2,}, {
            name: 'h20', title: '20 hrs', type: 'text', maxLength: 2,
        }, {name: 'h21', title: '21 hrs', type: 'text', maxLength: 2,}, {
            name: 'h22', title: '22 hrs', type: 'text', maxLength: 2,
        }, {name: 'h23', title: '23 hrs', type: 'text', maxLength: 2,}, {
            name: 'h24', title: '24 hrs', type: 'text', maxLength: 2,
        },]

    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            form.lot = id
            data ? dispatch(update_process_conditioning(form, data.id, lot), close()) : dispatch(add_process_conditioning(form, lot), close());
        }
    })


    return (<form className="bg-white px-8 pt-6 pb-8 mb-4">
        <div className={`grid grid-cols-2 gap-3 justify-center items-center`}>
            {map(columns, (column, index) => (<div key={index}>
                <p className={`${formik.errors[column.name] ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>{column.title}:</p>
                <input type={column.type} maxLength={column.maxLength}
                       className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase"
                       value={`${formik.values[column.name]}`}
                       onChange={text => formik.setFieldValue(column.name, text.target.value)}/>

            </div>))}
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
        process_date: data?.process_date || "",
        chlorine: data?.chlorine || 0,
        disinfection: data?.disinfection || 0,
        brix: data?.brix || 0,
        ph: data?.ph || 0,
        width: data?.width || 0,
        aspect: data?.aspect || 1,
        oven: data?.oven || 1,
        h1: data?.h1 || 0,
        h2: data?.h2 || 0,
        h3: data?.h3 || 0,
        h4: data?.h4 || 0,
        h5: data?.h5 || 0,
        h6: data?.h6 || 0,
        h7: data?.h7 || 0,
        h8: data?.h8 || 0,
        h9: data?.h9 || 0,
        h10: data?.h10 || 0,
        h11: data?.h11 || 0,
        h12: data?.h12 || 0,
        h13: data?.h13 || 0,
        h14: data?.h14 || 0,
        h15: data?.h15 || 0,
        h16: data?.h16 || 0,
        h17: data?.h17 || 0,
        h18: data?.h18 || 0,
        h19: data?.h19 || 0,
        h20: data?.h20 || 0,
        h21: data?.h21 || 0,
        h22: data?.h22 || 0,
        h23: data?.h23 || 0,
        h24: data?.h24 || 0,


    }
}
const newSchema = () => {
    return {
        process_date: Yup.string().required(true),
        chlorine: Yup.number().min(0).integer().max(100).required(true),
        disinfection: Yup.number().integer().min(0).max(100).required(true),
        brix: Yup.number().min(0).max(100).required(true),
        ph: Yup.number().min(0).max(100).required(true),
        width: Yup.number().min(0).max(100).required(true),
        aspect: Yup.number().min(1).max(3).required(true),
        oven: Yup.number().min(1).max(7).required(true),
        h1: Yup.number().integer().min(0).max(100).required(true),
        h2: Yup.number().integer().min(0).max(100).required(true),
        h3: Yup.number().integer().min(0).max(100).required(true),
        h4: Yup.number().integer().min(0).max(100).required(true),
        h5: Yup.number().integer().min(0).max(100).required(true),
        h6: Yup.number().integer().min(0).max(100).required(true),
        h7: Yup.number().integer().min(0).max(100).required(true),
        h8: Yup.number().integer().min(0).max(100).required(true),
        h9: Yup.number().integer().min(0).max(100).required(true),
        h10: Yup.number().integer().min(0).max(100).required(true),
        h11: Yup.number().integer().min(0).max(100).required(true),
        h12: Yup.number().integer().min(0).max(100).required(true),
        h13: Yup.number().integer().min(0).max(100).required(true),
        h14: Yup.number().integer().min(0).max(100).required(true),
        h15: Yup.number().integer().min(0).max(100).required(true),
        h16: Yup.number().integer().min(0).max(100).required(true),
        h17: Yup.number().integer().min(0).max(100).required(true),
        h18: Yup.number().integer().min(0).max(100).required(true),
        h19: Yup.number().integer().min(0).max(100).required(true),
        h20: Yup.number().integer().min(0).max(100).required(true),
        h21: Yup.number().integer().min(0).max(100).required(true),
        h22: Yup.number().integer().min(0).max(100).required(true),
        h23: Yup.number().integer().min(0).max(100).required(true),
        h24: Yup.number().integer().min(0).max(100).required(true),
    }
}
export default FormConditioning;

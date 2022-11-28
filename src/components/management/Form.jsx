import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {add_kardex} from "../../redux/actions/management";


const Form = ({close, category, date}) => {
    const dispatch = useDispatch()
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            form["category"] = category;
            form["date"] = date;
            dispatch(add_kardex(form, form), close())
        }
    })
    return (
        <div className="w-full z-20">
            <form className="bg-white px-8 pt-6 pb-8 mb-4">


                {/*Input*/}
                <div>
                    <p className={`${formik.errors.input ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Entrada:</p>
                    <input
                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase"
                        value={formik.values.input}
                        onChange={text => formik.setFieldValue('input', text.target.value)}/>
                </div>


                {/*Output*/}
                <div>
                    <p className={`${formik.errors.output ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Salida:</p>
                    <input className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                           value={formik.values.output}
                           onChange={text => formik.setFieldValue('output', text.target.value)}/>
                </div>
                {/*Stock*/}
                <div>
                    <p className={`${formik.errors.stock ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Stock:</p>
                    <input className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                           value={formik.values.stock}
                           onChange={text => formik.setFieldValue('stock', text.target.value)}/>
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
        input: 0,
        output: 0,
        stock: 0,
    }
}
const newSchema = () => {
    return {
        input: Yup.number().min(0).max(99999).required(),
        output: Yup.number().min(0).max(99999).required(),
        stock: Yup.number().min(0).max(99999).required(),
    }
}
export default Form;

import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {map} from "lodash";
import {add_motion} from "../../redux/actions/management";

const Form = ({close}) => {
    const dispatch = useDispatch();
    const providers = useSelector(state => state.Business.providers);

    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            dispatch(add_motion(form), close())
        }
    })
    return (<form>
            <div>
                <p className={`${formik.errors.to ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Remitente:</p>
                <select onChange={(value) => formik.setFieldValue('to', value.target.value)}
                        defaultValue={formik.values.to} className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="Default select example">
                    <option value={null}>Seleccione un remitente</option>
                    {providers !== null && map(providers, provider => (
                        <option key={provider.id} value={provider.id}>{provider.name}</option>))}
                </select>
            </div>
            <div>
                <p className={`${formik.errors.fr ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Destinatario:</p>
                <select onChange={(value) => formik.setFieldValue('fr', value.target.value)}
                        defaultValue={formik.values.fr} className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="Default select example">
                    <option value={null}>Seleccione un destinatario</option>
                    {providers !== null && map(providers, provider => (
                        <option key={provider.id} value={provider.id}>{provider.name}</option>))}
                </select>
            </div>
            <div>
                <p className="text-base mt-4 font-medium leading-none text-gray-800">Cantidad:</p>
                <input type={"number"} min={1}
                       className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                       value={formik.values.quantity}
                       onChange={text => formik.setFieldValue('quantity', text.target.value)}/>
            </div>
            <div className="w-full flex justify-center">
                <button onClick={formik.handleSubmit} type="button"
                        className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                    <FontAwesomeIcon icon={faPaperPlane}/>
                </button>
            </div>
        </form>

    );
};


const initialValues = () => {
    return {
        to: null, fr: null, quantity: 1
    }
}
const newSchema = () => {
    return {
        to: Yup.number().required(true),
        fr: Yup.number().required(true),
        quantity: Yup.number().min(1).integer().required(true)
    }
}

export default Form;

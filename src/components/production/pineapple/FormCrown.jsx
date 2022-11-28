import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {map} from "lodash";
import {add_crown_pineapple} from "../../../redux/actions/production";


const FormCrown = ({close, pallets,slug,dispatch,id}) => {
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            form.process=id
            dispatch(add_crown_pineapple(form,slug),close())
        }
    })
    return (
        <div className="w-full z-20">
            <form className="bg-white px-8 pt-6 pb-8 mb-4">
                {/*Weight*/}
                <div>
                    <p className={`${formik.errors.weight ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Peso:</p>
                    <input
                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase"
                        value={formik.values.weight}
                        onChange={text => formik.setFieldValue('weight', text.target.value)}/>
                </div>
                {/*Pallet*/}
                <div>
                    <p className={`${formik.errors.pallet ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Pallet:</p>
                    <select value={formik.values.pallet}
                            onChange={(value) => formik.setFieldValue('pallet', value.target.value)}
                            className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        <option value={null}>Seleccione una pallet</option>
                        {pallets !== null && map(pallets, pallet => (
                            <option key={pallet.id} value={pallet.id}>{pallet.name}</option>))}
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
const initialValues = () => {
    return {
        weight: 0,
        pallet: 0,
    }
}
const newSchema = () => {
    return {
        weight: Yup.number().min(0).max(1000).required(),
        pallet: Yup.number().min(1).max(99).required(),
    }
}
export default FormCrown;

import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {update_analysis_pineapple} from "../../redux/actions/quality";
import {map} from 'lodash'

const FormAnalysisPineapple = ({dispatch, close, data}) => {
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            dispatch(update_analysis_pineapple(data.id, form), close())
        }
    })
    const columns = [{name: 'maturation_0_plant', title: 'Maduración 0 %', type: 'text', maxLength: 4}, {
        name: 'maturation_1_plant', title: 'Maduración 1 %', type: 'text', maxLength: 4,
    }, {
        name: 'maturation_2_plant', title: 'Maduración 2 %', type: 'text', maxLength: 4,
    }, {
        name: 'maturation_3_plant', title: 'Maduración 3 %', type: 'text', maxLength: 4,
    }, {
        name: 'maturation_4_plant', title: 'Maduración 4 %', type: 'text', maxLength: 4,
    }, {
        name: 'maturation_5_plant', title: 'Maduración 5 %', type: 'text', maxLength: 4,
    },]
    return (<div className="w-full z-20">
        <form className="bg-white px-8 pt-6 pb-8 mb-4 ">
            <div className={"grid grid-cols-2 gap-2"}>
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


        </form>

    </div>);
};

const initialValues = (data) => {
    return {
        maturation_0_plant: data?.maturation_0_plant || 0,
        maturation_1_plant: data?.maturation_1_plant || 0,
        maturation_2_plant: data?.maturation_2_plant || 0,
        maturation_3_plant: data?.maturation_3_plant || 0,
        maturation_4_plant: data?.maturation_4_plant || 0,
        maturation_5_plant: data?.maturation_5_plant || 0,
    }

}
const newSchema = () => {
    return {
        maturation_0_plant: Yup.number().min(0).max(100).required(),
        maturation_1_plant: Yup.number().min(0).max(100).required(),
        maturation_2_plant: Yup.number().min(0).max(100).required(),
        maturation_3_plant: Yup.number().min(0).max(100).required(),
        maturation_4_plant: Yup.number().min(0).max(100).required(),
        maturation_5_plant: Yup.number().min(0).max(100).required(),

    }
}

export default FormAnalysisPineapple;


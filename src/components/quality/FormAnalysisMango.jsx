import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {update_analysis_mango} from "../../redux/actions/quality";
import {map} from "lodash";

const FormAnalysisMango = ({close, data, dispatch}) => {

    const columns = [{name: 'color_1', title: 'Color 1 %', type: 'text', maxLength: 4,}, {
        name: 'color_1_5',
        title: 'Color 1,5  %',
        type: 'text',
        maxLength: 4,
    }, {name: 'color_2', title: 'Color 2 %', type: 'text', maxLength: 4,}, {
        name: 'color_2_5',
        title: 'Color 2,5 %',
        type: 'text',
        maxLength: 4,
    }, {name: 'color_3', title: 'Color 3 %', type: 'text', maxLength: 4,}, {
        name: 'brix_7_9', title: 'Brix 7-9 %', type: 'text', maxLength: 4,
    }, {name: 'brix_10_12', title: 'Brix 10-12 %', type: 'text', maxLength: 4,}, {
        name: 'brix_13', title: 'Brix >13 %', type: 'text', maxLength: 4,
    }, {name: 'weight_280', title: 'Peso <280 gr %', type: 'text', maxLength: 4,}, {
        name: 'weight_280_300', title: 'Peso 280-300 gr %', type: 'text', maxLength: 4,
    }, {name: 'weight_300', title: 'Peso >300 gr %', type: 'text', maxLength: 4,},
        {name: 'mechanical_damage', title: 'Daños mecanicos %', type: 'text', maxLength: 4,},
        {name: 'cracked', title: 'Rajado %', type: 'text', maxLength: 4,},
        {name: 'sun_damage', title: 'Daños de sol %', type: 'text', maxLength: 4,}, {
        name: 'anthracnose', title: 'Antracnosis %', type: 'text', maxLength: 4,
    },
        {name: 'rot', title: 'Pudricion %', type: 'text', maxLength: 4,},
        {name: 'mature', title: 'Sobre maduro %', type: 'text', maxLength: 4,},
        {name: 'latex', title: 'Latex %', type: 'text', maxLength: 4,},
        {name: 'queresa', title: 'Queresa %', type: 'text', maxLength: 4,},
        {name: 'insect_bite', title: 'Picadura de insectos %', type: 'text', maxLength: 4,},
        {
        name: 'soft', title: 'Blando %', type: 'text', maxLength: 4,
    }, {name: 'advanced', title: 'Avanzado %', type: 'text', maxLength: 4,},]
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            dispatch(update_analysis_mango(data?.id, form), close())
        }
    })
    return (<div className="w-full z-20">
        <form className="bg-white px-8 pt-6 pb-8 mb-4">
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
        color_1: data?.color_1 || 0,
        color_1_5: data?.color_1_5 || 0,
        color_2: data?.color_2 || 0,
        color_2_5: data?.color_2_5 || 0,
        color_3: data?.color_3 || 0,
        brix_7_9: data?.brix_7_9 || 0,
        brix_10_12: data?.brix_10_12 || 0,
        brix_13: data?.brix_13 || 0,
        weight_280: data?.weight_280 || 0,
        weight_280_300: data?.weight_280_300 || 0,
        weight_300: data?.weight_300 || 0,
        mechanical_damage: data?.mechanical_damage || 0,
        cracked: data?.cracked || 0,
        sun_damage: data?.sun_damage || 0,
        anthracnose: data?.anthracnose || 0,
        rot: data?.rot || 0,
        mature: data?.mature || 0,
        latex: data?.latex || 0,
        queresa: data?.queresa || 0,
        insect_bite: data?.insect_bite || 0,
        soft: data?.soft || 0,
        advanced: data?.advanced || 0,

    }

}
const newSchema = () => {
    return {
        color_1: Yup.number().min(0).max(100).required(),
        color_1_5: Yup.number().min(0).max(100).required(),
        color_2: Yup.number().min(0).max(100).required(),
        color_2_5: Yup.number().min(0).max(100).required(),
        color_3: Yup.number().min(0).max(100).required(),
        brix_7_9: Yup.number().min(0).max(100).required(),
        brix_10_12: Yup.number().min(0).max(100).required(),
        brix_13: Yup.number().min(0).max(100).required(),
        weight_280: Yup.number().min(0).max(100).required(),
        weight_280_300: Yup.number().min(0).max(100).required(),
        weight_300: Yup.number().min(0).max(100).required(),
        mechanical_damage: Yup.number().min(0).max(100).required(),
        cracked: Yup.number().min(0).max(100).required(),
        sun_damage: Yup.number().min(0).max(100).required(),
        anthracnose: Yup.number().min(0).max(100).required(),
        rot: Yup.number().min(0).max(100).required(),
        mature: Yup.number().min(0).max(100).required(),
        latex: Yup.number().min(0).max(100).required(),
        queresa: Yup.number().min(0).max(100).required(),
        insect_bite: Yup.number().min(0).max(100).required(),
        soft: Yup.number().min(0).max(100).required(),
        advanced: Yup.number().min(0).max(100).required(),


    }
}

export default FormAnalysisMango;


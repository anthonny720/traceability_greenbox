import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {update_analysis_blueberry} from "../../redux/actions/quality";
import {useDispatch} from "react-redux";
import {map} from "lodash";

const FormAnalysisBlueberry = ({close, data}) => {
    const columns = [{name: 'average_brix', title: 'Brix promedio', type: 'text', maxLength: 4,}, {
        name: 'max_brix', title: 'Brix máximo', type: 'text', maxLength: 4,
    }, {name: 'min_brix', title: 'Brix mínimo', type: 'text', maxLength: 4,}, {
        name: 'caliber_1', title: 'Calibre 1 <=11', type: 'text', maxLength: 4,
    }, {name: 'caliber_2', title: 'Calibre 2 12 -18', type: 'text', maxLength: 4,}, {
        name: 'caliber_3', title: 'Calibre 3 >=19', type: 'text', maxLength: 4,
    }, {name: 'green', title: 'Verde', type: 'text', maxLength: 4,}, {
        name: 'crushed', title: 'Aplastado', type: 'text', maxLength: 4,
    }, {name: 'mechanical_damages', title: 'Daños mecánicos', type: 'text', maxLength: 4,},]
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            dispatch(update_analysis_blueberry(data.id, form), close())
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
        average_brix: data?.average_brix || 0,
        max_brix: data?.max_brix || 0,
        min_brix: data?.min_brix || 0,
        caliber_1: data?.caliber_1 || 0,
        caliber_2: data?.caliber_2 || 0,
        caliber_3: data?.caliber_3 || 0,
        green: data?.green || 0,
        crushed: data?.crushed || 0,
        mechanical_damages: data?.mechanical_damages || 0,
    }

}
const newSchema = () => {
    return {
        average_brix: Yup.number().min(0).max(100).required(),
        max_brix: Yup.number().min(0).max(100).required(),
        min_brix: Yup.number().min(0).max(100).required(),
        caliber_1: Yup.number().min(0).max(100).required(),
        caliber_2: Yup.number().min(0).max(100).required(),
        caliber_3: Yup.number().min(0).max(100).required(),
        green: Yup.number().min(0).max(100).required(),
        crushed: Yup.number().min(0).max(100).required(),
        mechanical_damages: Yup.number().min(0).max(100).required(),


    }
}

export default FormAnalysisBlueberry;


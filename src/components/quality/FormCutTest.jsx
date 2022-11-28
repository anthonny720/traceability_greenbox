import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {update_cut_test} from "../../redux/actions/quality";
import {map} from "lodash";

const Form = ({dispatch, close, data, lots}) => {

    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            dispatch(update_cut_test(data.id, form), close())
        }
    })

    const columns = [{
        name: 'cut_fresh_1_8', title: 'Peso en fresco (corte 1/8)', type: 'text', maxLength: 5,
    }, {name: 'cut_1_8', title: 'Peso corte 1/8', type: 'text', maxLength: 5,}, {
        name: 'eyes', title: '% Ojitos', type: 'text', maxLength: 6,
    },

    ]
    return (<div className="w-full z-20">
        <form className="bg-white px-8 pt-6 pb-8 mb-4">
            {/*lot*/}
            <div className={data && 'hidden'}>
                <p className={`${formik.errors.lot ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Lote:</p>
                <select value={formik.values.lot} disabled={data && true}
                        onChange={(value) => formik.setFieldValue('lot', value.target.value)}
                        className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="Default select example">
                    <option value={''}>Seleccione un lote</option>
                    {lots !== null && map(lots, lot => (<option key={lot.id} value={lot.id}>{lot.lot}</option>))}
                </select>
            </div>

            {/*caliber*/}
            <div>
                <p className={`${formik.errors.caliber ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Calibre:</p>
                <select value={formik.values.caliber}
                        onChange={(value) => formik.setFieldValue('caliber', value.target.value)}
                        className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="Default select example">
                    <option value={""}>Seleccione el numero de calibre</option>
                    <option value={"6"}>6</option>
                    <option value={"8"}>8</option>
                    <option value={"10"}>10</option>
                    <option value={"12"}>12</option>
                    <option value={"14"}>14</option>
                </select>
            </div>
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
        lot: data?.lot || "",
        caliber: data?.caliber || "",
        cut_fresh_1_8: data?.cut_fresh_1_8 || 0,
        cut_1_8: data?.cut_1_8 || 0,
        eyes: data?.eyes || 0,
    }
}
const newSchema = () => {
    return {
        lot: Yup.string().required(true),
        caliber: Yup.string().min(1).required(true),
        cut_fresh_1_8: Yup.number().min(0).max(10000).required(true),
        cut_1_8: Yup.number().min(0).max(10000).required(true),
        eyes: Yup.number().min(0).max(100).required(true),
    }
}

export default Form;

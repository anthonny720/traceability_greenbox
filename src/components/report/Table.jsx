import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faFileExcel} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import {map, size} from "lodash";
import {DownloadTableExcel} from 'react-export-table-to-excel';
import React, {useRef} from "react";
import Humanize from "humanize-plus";

const Table = ({data, edit}) => {
    const columns = ['Acciones', 'Semana', 'Mes', 'Año', 'Lote', 'Fecha de entrada', 'Fecha de descarga', 'Hora de salida Campo', 'Hora de llegada', 'Variedad', 'Condicion', 'Conductor', 'Transporte', 'Placa', 'Guia de transportista', 'Guia de proveedor', 'Certificado', 'Proveedor', 'Procedencia', 'Parcela', 'Certificado', 'Cantidad de jabas', 'Peso bruto', 'Tara', 'Peso neto', 'Peso guia', 'Diferencia netos con guia', '% Descuento', 'Kg descontados', 'Kg aprovechables', 'Precio Campo', 'Precio planta', 'Flete', 'Total a pagar', 'Observaciones']
    const tableRef = useRef(null);
    return (<div className="overflow-x-auto relative scrollbar-hide">
        <DownloadTableExcel
            filename="reporte"
            sheet="reporte"
            currentTableRef={tableRef.current}
        >
            <button
                className=" border-0 text-lg h-12 w-36 bg-green-400 hover:bg-green-500 text-white mt-2 px-3 rounded-md">
                <span>Descargar</span>
                <FontAwesomeIcon icon={faFileExcel} className={"ml-2"}/>
            </button>

        </DownloadTableExcel>
        <table ref={tableRef} className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {map(columns, (column, index) => (<th key={index} className={`px-6 py-3 text-center`}>{column}</th>))}
            </tr>
            </thead>
            <tbody>

            {data !== null && size(data) > 0 ? map(data, (row, index) => (<tr key={index} className="bg-white border-b">
                <td className="py-4 px-6 whitespace-nowrap text-center"><FontAwesomeIcon
                    className={"text-blue-400 ml-2 hover:text-green-600"} title={"Editar"}
                    onClick={() => edit(row)}
                    icon={faEdit}/>
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.week}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.month}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.year}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.lot}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{new Date(row.entry_date).toLocaleDateString('es-PE', {
                    timeZone: 'UTC',
                })}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{new Date(row.download_date).toLocaleDateString('es-PE', {
                    timeZone: 'UTC',
                })}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.departure_time}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.arrival_time}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.variety}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.condition}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.driver}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.carrier}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.code}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.carrier_guide}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.provider_guide}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.certificate}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.provider}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.origin}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.parcel}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.certificate}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.number_boxes}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.brute_weight, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.tare, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.net_weight, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.weight_guide, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.net_difference, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.discount_percentage, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.kg_discounted, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.kg_usable, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.price_camp, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.price_plant, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.freight, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{Humanize.formatNumber(row?.total_amount, 2)}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{row?.observations}</td>

                <td scope="row"
                    className="py-4 px-6  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div>
                        {/*<Link to={`/lot/${row.lot}`}>*/}
                        {/*    <FontAwesomeIcon className={"hover:text-orange-400 text-black"} title={"Detalles"}*/}
                        {/*                     icon={faEye}/>*/}
                        {/*</Link>*/}
                        {/*<Link to={`/process-line/${row.lot}`}>*/}
                        {/*    <FontAwesomeIcon className={"text-[#26d07d] ml-2 hover:text-green-600"}*/}
                        {/*                     title={"Linea de Proceso"}*/}
                        {/*                     icon={faWorm}/>*/}
                        {/*</Link>*/}
                    </div>
                </td>

            </tr>)) : <tr>
                {map(columns, (column, index) => (
                    <th key={index} className="px-6 py-3 text-center"><Skeleton count={10}/></th>))}
            </tr>}


            </tbody>
        </table>
    </div>);
};
export default Table;
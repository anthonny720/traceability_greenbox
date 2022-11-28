import React from 'react';
import Humanize from "humanize-plus";

const Summary = ({info}) => {
    return (<div className={"flex  w-full flex-wrap gap-2 my-2 justify-center"}>

        <div
            className="cursor-pointer bg-white hover:shadow sh lg:w-72  w-72 sm:w-52 py-6 xl:px-4 rounded  w-max flex justify-center items-center flex-col">
            <div className="mb-6">
                <svg width={32} height={32} viewBox="0 0 32 32" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 13.3333H32L28 8L24 13.3333ZM24 18.6667H32L28 24L24 18.6667Z" fill="#C7D2FE"/>
                    <path
                        d="M1.33333 0H9.33333V32H1.33333C0.979711 32 0.640572 31.8595 0.390523 31.6095C0.140475 31.3594 0 31.0203 0 30.6667V1.33333C0 0.979711 0.140475 0.640572 0.390523 0.390523C0.640572 0.140475 0.979711 0 1.33333 0Z"
                        fill="#818CF8"/>
                    <path
                        d="M12 0H20C20.3536 0 20.6928 0.140475 20.9428 0.390523C21.1929 0.640572 21.3333 0.979711 21.3333 1.33333V30.6667C21.3333 31.0203 21.1929 31.3594 20.9428 31.6095C20.6928 31.8595 20.3536 32 20 32H12V0Z"
                        fill="#6366F1"/>
                </svg>
            </div>
            <div className="text-gray-800  text-sm font-extrabold text-center">
                <hr/>
                <h2>TOTAL PESO BRUTO: {Humanize.formatNumber(info?.brute_weight, 2)}</h2>
                <hr/>
            </div>
            <div className="text-gray-800  mt-2 text-sm font-semibold ">
                <h2 className={"font-bold"}>TOTAL DE JABAS: {info?.quantity_boxes}</h2>
                <h2 className={"font-light"}>JABAS GREENBOX: {info?.boxes?.gb}</h2>
                <h2 className={"font-light"}>JABAS PAE: {info?.boxes?.pa}</h2>
                <h2 className={"font-light"}>JABAS TIBANA: {info?.boxes?.t0}</h2>
                <h2 className={"font-light"}>JABAS TIBANA 1: {info?.boxes?.t1}</h2>
                <h2 className={"font-light"}>JABAS TIBANA 2: {info?.boxes?.t2}</h2>
                <h2 className={"font-light"}>JABAS GANDULES: {info?.boxes?.gn}</h2>
                <h2 className={"font-light"}>JABAS COLORES: {info?.boxes?.co}</h2>
                <h2 className={"font-light"}>JABAS MADERA: {info?.boxes?.ma}</h2>
                <hr/>
            </div>
            <div className="text-gray-800  text-sm font-extrabold text-center">
                <hr/>
                <h2>TOTAL PESO NETO: {Humanize.formatNumber(info?.net_weight, 2)}</h2>
                <hr/>
            </div>

        </div>
        <div
            className="cursor-pointer bg-white hover:shadow sh lg:w-72  w-72 sm:w-52 py-6 xl:px-4 rounded  w-max flex justify-center items-center flex-col">
            <div className="mb-6">
                <svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.33325 1.33337H30.6666L26.6666 9.33337H1.33325L5.33325 1.33337Z" fill="#818CF8"/>
                    <path d="M5.33325 12H30.6666L26.6666 20H1.33325L5.33325 12Z" fill="#6366F1"/>
                    <path d="M5.33325 22.6667H30.6666L26.6666 30.6667H1.33325L5.33325 22.6667Z" fill="#C7D2FE"/>
                </svg>
            </div>
            <div className="text-gray-800  text-sm font-extrabold text-center">
                <hr/>
                <h2>TIPO DE PARIHUELA - CANTIDAD</h2>
                <hr/>
            </div>
            <div className="text-gray-800  mt-2 text-sm font-semibold ">
                <h2 className={"font-light"}>PARIHUELA NEGRO: {info?.pallets?.Negro}</h2>
                <h2 className={"font-light"}>PARIHUELA VERDE: {info?.pallets?.Verde}</h2>
                <h2 className={"font-light"}>PARIHUELA AZUL: {info?.pallets?.Azul}</h2>
                <h2 className={"font-light"}>PARIHUELA CELESTE: {info?.pallets?.Celeste}</h2>
                <h2 className={"font-light"}>PARIHUELA ROJO: {info?.pallets?.Rojo}</h2>
                <h2 className={"font-light"}>PARIHUELA MADERA: {info?.pallets?.Madera}</h2>
                <hr/>
            </div>
            <div className="text-gray-800  text-sm font-extrabold text-center">
                <hr/>
                <h2>TOTAL DE PARIHUELAS
                    : {info?.pallets?.Negro + info?.pallets?.Azul + info?.pallets?.Celeste + info?.pallets?.Rojo + info?.pallets?.Verde + info?.pallets?.Madera}</h2>
                <hr/>
            </div>

        </div>
        <div
            className="cursor-pointer bg-white hover:shadow sh lg:w-72  w-72 sm:w-52 py-6 xl:px-4 rounded  w-max flex justify-center items-center flex-col">
            <div className="mb-6">
                <svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M30.6667 8.00004V2.66671C30.6667 2.31309 30.5262 1.97395 30.2762 1.7239C30.0261 1.47385 29.687 1.33337 29.3334 1.33337H2.66671C2.31309 1.33337 1.97395 1.47385 1.7239 1.7239C1.47385 1.97395 1.33337 2.31309 1.33337 2.66671V8.00004H30.6667Z"
                        fill="#6366F1"/>
                    <path
                        d="M1.33337 10.6667V29.3334C1.33337 29.687 1.47385 30.0262 1.7239 30.2762C1.97395 30.5263 2.31309 30.6667 2.66671 30.6667H9.33337V10.6667H1.33337Z"
                        fill="#C7D2FE"/>
                    <path
                        d="M12 30.6667H29.3333C29.687 30.6667 30.0261 30.5263 30.2761 30.2762C30.5262 30.0262 30.6667 29.687 30.6667 29.3334V10.6667H12V30.6667Z"
                        fill="#818CF8"/>
                </svg>
            </div>
            <div className="text-gray-800  text-sm font-extrabold text-center">
                <hr/>
                <h2>ITEM - KG</h2>
                <hr/>
            </div>
            <div className="text-gray-800  mt-2 text-sm font-semibold ">
                <h2 className={"font-light"}>PESO DE JABAS: {Humanize.formatNumber(info?.weight_boxes, 2)}</h2>
                <h2 className={"font-light"}>PESO DE
                    PALLETS: {Humanize.formatNumber(info?.weight_pallets, 2)}</h2>
                <hr/>
            </div>
            <div className="text-gray-800  text-sm font-extrabold text-center">
                <hr/>
                <h2>TOTAL {Humanize.formatNumber(info?.total_tare, 2)}</h2>
                <hr/>
            </div>

        </div>
        <div
            className="cursor-pointer bg-white hover:shadow sh w-72 lg:w-72   sm:w-52  py-6 xl:px-4 rounded  w-max flex justify-center items-center flex-col">
            <div className="mb-6">
                <svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M28.0001 32H16.0001C15.6465 32 15.3073 31.8595 15.0573 31.6095C14.8072 31.3594 14.6667 31.0203 14.6667 30.6667V28C14.6667 27.6464 14.8072 27.3073 15.0573 27.0572C15.3073 26.8072 15.6465 26.6667 16.0001 26.6667H28.0001C28.3537 26.6667 28.6928 26.8072 28.9429 27.0572C29.1929 27.3073 29.3334 27.6464 29.3334 28V30.6667C29.3334 31.0203 29.1929 31.3594 28.9429 31.6095C28.6928 31.8595 28.3537 32 28.0001 32Z"
                        fill="#C7D2FE"/>
                    <path
                        d="M28.0001 0H4.00008C3.64646 0 3.30732 0.140475 3.05727 0.390523C2.80722 0.640572 2.66675 0.979711 2.66675 1.33333V4C2.66675 4.35362 2.80722 4.69276 3.05727 4.94281C3.30732 5.19286 3.64646 5.33333 4.00008 5.33333H28.0001C28.3537 5.33333 28.6928 5.19286 28.9429 4.94281C29.1929 4.69276 29.3334 4.35362 29.3334 4V1.33333C29.3334 0.979711 29.1929 0.640572 28.9429 0.390523C28.6928 0.140475 28.3537 0 28.0001 0Z"
                        fill="#6366F1"/>
                    <path
                        d="M28.0001 8H4.00008C3.64646 8 3.30732 8.14047 3.05727 8.39052C2.80722 8.64057 2.66675 8.97971 2.66675 9.33333V22.6667C2.66675 23.0203 2.80722 23.3594 3.05727 23.6095C3.30732 23.8595 3.64646 24 4.00008 24H28.0001C28.3537 24 28.6928 23.8595 28.9429 23.6095C29.1929 23.3594 29.3334 23.0203 29.3334 22.6667V9.33333C29.3334 8.97971 29.1929 8.64057 28.9429 8.39052C28.6928 8.14047 28.3537 8 28.0001 8Z"
                        fill="#818CF8"/>
                </svg>
            </div>
            <div className="text-gray-800  mt-2 text-sm font-semibold ">
                <h2 className={"font-light"}>PESO PROMEDIO
                    BRUTO: {Humanize.formatNumber(info?.avg_brute, 2)}</h2>
                <h2 className={"font-light"}>PESO PROMEDIO
                    NETO: {Humanize.formatNumber(info?.avg_net, 2)}</h2>
                <hr/>
            </div>

        </div>
        {info?.category_name === "Piña" && <div
            className="cursor-pointer bg-white hover:shadow sh w-72 lg:w-72   sm:w-52  py-6 xl:px-4 rounded  w-max flex justify-center items-center flex-col">
            <div className="mb-6">
                <svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.66658 1.33331H2.66659C2.31296 1.33331 1.97382 1.47379 1.72378 1.72384C1.47373 1.97388 1.33325 2.31302 1.33325 2.66665V29.3333C1.33325 29.6869 1.47373 30.0261 1.72378 30.2761C1.97382 30.5262 2.31296 30.6666 2.66659 30.6666H6.66658V1.33331Z"
                        fill="#C7D2FE"/>
                    <path
                        d="M9.33325 30.6666H22.6666V1.33331H9.33325V30.6666ZM15.9999 25.3333C15.6463 25.3333 15.3072 25.1928 15.0571 24.9428C14.8071 24.6927 14.6666 24.3536 14.6666 24C14.6666 23.6464 14.8071 23.3072 15.0571 23.0572C15.3072 22.8071 15.6463 22.6666 15.9999 22.6666C16.3535 22.6666 16.6927 22.8071 16.9427 23.0572C17.1928 23.3072 17.3333 23.6464 17.3333 24C17.3333 24.3536 17.1928 24.6927 16.9427 24.9428C16.6927 25.1928 16.3535 25.3333 15.9999 25.3333ZM15.9999 6.66665C16.3535 6.66665 16.6927 6.80712 16.9427 7.05717C17.1928 7.30722 17.3333 7.64636 17.3333 7.99998C17.3333 8.3536 17.1928 8.69274 16.9427 8.94279C16.6927 9.19284 16.3535 9.33331 15.9999 9.33331C15.6463 9.33331 15.3072 9.19284 15.0571 8.94279C14.8071 8.69274 14.6666 8.3536 14.6666 7.99998C14.6666 7.64636 14.8071 7.30722 15.0571 7.05717C15.3072 6.80712 15.6463 6.66665 15.9999 6.66665ZM15.9999 14.6666C16.3535 14.6666 16.6927 14.8071 16.9427 15.0572C17.1928 15.3072 17.3333 15.6464 17.3333 16C17.3333 16.3536 17.1928 16.6927 16.9427 16.9428C16.6927 17.1928 16.3535 17.3333 15.9999 17.3333C15.6463 17.3333 15.3072 17.1928 15.0571 16.9428C14.8071 16.6927 14.6666 16.3536 14.6666 16C14.6666 15.6464 14.8071 15.3072 15.0571 15.0572C15.3072 14.8071 15.6463 14.6666 15.9999 14.6666Z"
                        fill="#818CF8"
                    />
                    <path
                        d="M29.3333 1.33331H25.3333V30.6666H29.3333C29.6869 30.6666 30.026 30.5262 30.2761 30.2761C30.5261 30.0261 30.6666 29.6869 30.6666 29.3333V2.66665C30.6666 2.31302 30.5261 1.97388 30.2761 1.72384C30.026 1.47379 29.6869 1.33331 29.3333 1.33331Z"
                        fill="#6366F1"/>
                </svg>
            </div>
            <div className="text-gray-800  text-sm font-extrabold text-center">
                <hr/>
                <h2>CALIBRE</h2>
                <hr/>
            </div>
            <div className="text-gray-800  mt-2 text-sm font-semibold ">
                <h2 className={"font-light"}>CALIBRE
                    6: {Humanize.formatNumber(info?.net_weight * (info?.calibers.c6 / info?.quantity_boxes), 2)} kg
                    | {Humanize.formatNumber((info?.calibers.c6 / info?.quantity_boxes) * 100, 2)}% </h2>
                <h2 className={"font-light"}>CALIBRE
                    8: {Humanize.formatNumber(info?.net_weight * (info?.calibers.c8 / info?.quantity_boxes), 2)} kg
                    | {Humanize.formatNumber((info?.calibers.c8 / info?.quantity_boxes) * 100, 2)}%</h2>
                <h2 className={"font-light"}>CALIBRE
                    10: {Humanize.formatNumber(info?.net_weight * (info?.calibers.c10 / info?.quantity_boxes), 2)} kg
                    | {Humanize.formatNumber((info?.calibers.c10 / info?.quantity_boxes) * 100, 2)}%</h2>
                <h2 className={"font-light"}>CALIBRE
                    12: {Humanize.formatNumber(info?.net_weight * (info?.calibers.c12 / info?.quantity_boxes), 2)} kg
                    | {Humanize.formatNumber((info?.calibers.c12 / info?.quantity_boxes) * 100, 2)}%</h2>
                <h2 className={"font-light"}>CALIBRE
                    14: {Humanize.formatNumber(info?.net_weight * (info?.calibers.c14 / info?.quantity_boxes), 2)} kg
                    | {Humanize.formatNumber((info?.calibers.c14 / info?.quantity_boxes) * 100, 2)}%</h2>
                <hr/>
            </div>
            <div className="text-gray-800  text-sm font-extrabold text-center">
                <hr/>
                <h2 className={"font-extrabold"}>TOTAL: {Humanize.formatNumber((info?.calibers.c6 / info?.quantity_boxes) * 100 + (info?.calibers.c8 / info?.quantity_boxes) * 100 + (info?.calibers.c10 / info?.quantity_boxes) * 100 + (info?.calibers.c12 / info?.quantity_boxes) * 100 + (info?.calibers.c14 / info?.quantity_boxes) * 100, 2)} %</h2>
                <hr/>
            </div>

        </div>}

        <div
            className="cursor-pointer bg-white hover:shadow sh w-max p-6 lg:w-72   sm:w-52  py-6 xl:px-4 rounded  flex justify-center items-center flex-col">
            <div className="mb-6">
                <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path fill="#C7D2FE"
                          d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z"/>
                </svg>
            </div>

            <div className="text-gray-800  text-sm font-extrabold text-center">
                <hr/>
                <h2>OBSERVACIONES</h2>
                <hr/>
            </div>


            <div className="text-gray-800  mt-2 text-sm font-semibold ">
                <h2 className={"font-light"}>TOTAL PESO
                    NETO: {Humanize.formatNumber(info?.net_weight, 2)} kg</h2>
                <h2 className={"font-light"}>KG DESCONTADOS
                    ({Humanize.formatNumber(info?.discount_percentage, 2)}%): {Humanize.formatNumber(info?.discount_net_kg, 2)} kg</h2>
                <hr/>
            </div>

            <div className="text-gray-800  text-sm font-extrabold text-center">
                <hr/>
                <h2 className={"font-extrabold"}>TOTAL: {Humanize.formatNumber(info?.amount_net_kg, 2)}</h2>
                <hr/>
            </div>

            <div className="text-gray-800  mt-2 text-sm font-semibold ">
                <h2 className={"font-light"}>TOTAL PESO GUIA: {Humanize.formatNumber(info?.weight_guide, 2)} kg</h2>
                <h2 className={"font-light"}>KG DESCONTADOS
                    ({Humanize.formatNumber(info?.discount_percentage, 2)}%): {Humanize.formatNumber(info?.discount_guide_kg, 2)} kg</h2>
                <hr/>
            </div>

            <div className="text-gray-800  text-sm font-extrabold text-center">
                <hr/>
                <h2 className={"font-extrabold"}>TOTAL: {Humanize.formatNumber(info?.amount_guide_kg, 2)}</h2>
                <hr/>
            </div>

        </div>


    </div>);
};

export default Summary;

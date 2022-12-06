import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBagShopping,
    faBarcode,
    faBoxes,
    faCartShopping,
    faCircleInfo,
    faLocationPin,
    faTruckFast,
    faWeight
} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-styled-carousel";
import Humanize from 'humanize-plus'

const responsive = [{breakPoint: 1280, cardsToShow: 4}, {breakPoint: 760, cardsToShow: 2}, {
    breakPoint: 600,
    cardsToShow: 1
}];

const Data = ({Children}) => {
    return (
        <h1 className={"bg-white font-bold hover:text-white text-[#26d07d]  p-3 w-11/12 bg-white hover:bg-[#26d07d] rounded-md h-max text-center"}>
            {Children}
        </h1>)
}

const Cards = ({data}) => {
    return (<div className={"w-full"}>
        <Slider responsive={responsive} rightArrow={true} pauseOnMouseOver={true}>
            <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                icon={faTruckFast} className={"block h-4 sm:h-8"}/>Carga<p
                className={"text-xs font-light"}>{data?.reception}</p></p>}/>
            <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                icon={faCircleInfo} className={"block h-4 sm:h-8"}/>Programa<p
                className={"text-xs font-light"}>{new Date(data?.date).toLocaleDateString('es-PE', {
                timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric'
            })}</p></p>}/>
            <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                icon={faBarcode} className={"block h-4 sm:h-8"}/>Guia<p
                className={"text-xs font-light"}>{data?.guide}</p></p>}/>
            <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                icon={faCartShopping} className={"block h-4 sm:h-8"}/>Orden de Pedido<p
                className={"text-xs font-light"}>{data?.order}</p></p>}/>
            <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                icon={faLocationPin} className={"block h-4 sm:h-8"}/>Destino<p
                className={"text-xs font-light"}>{data?.destine}</p></p>}/>
            <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                icon={faBagShopping} className={"block h-4 sm:h-8"}/>Bolsas<p
                className={"text-xs font-light"}>{data?.bag}</p>
            </p>}/>
            <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                icon={faBoxes} className={"block h-4 sm:h-8"}/> Cajas<p
                className={"text-xs font-light"}>{data?.box}</p></p>}/>
            <Data Children={<p className={"flex justify-center flex-col text-xs md:text-lg"}><FontAwesomeIcon
                icon={faWeight} className={"block h-4 sm:h-8"}/> Peso<p
                className={"text-xs font-light"}>{Humanize.formatNumber(data?.weight, 2)}</p></p>}/>
        </Slider>
    </div>);
};

export default Cards;

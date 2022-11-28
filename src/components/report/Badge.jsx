import React from 'react';
import Humanize from 'humanize-plus';

const Badge = ({report}) => {
    return (<div className="w-full flex mt-4 flex-wrap gap-2">

        <div
            className="flex flex-row m-auto bg-gradient-to-r from-green-400 via-green-500 to-green-600 p-4 gap-8 rounded-lg border-2 border-green-300">
            <div className="my-auto">
                <div className="text-lg text-green-200">Kg aprovechables:</div>
                <div className="text-2xl text-green-100">{Humanize.formatNumber(report?.kg || 0, 2)} kg</div>
            </div>
            <div
                className="text-green-300 my-auto bg-gradient-to-l from-green-700 via-green-800 to-green-900 rounded-full p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="currentColor" viewBox="0 0 640 512">
                    <path
                        d="M384 32H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H398.4c-5.2 25.8-22.9 47.1-46.4 57.3V448H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H320 128c-17.7 0-32-14.3-32-32s14.3-32 32-32H288V153.3c-23.5-10.3-41.2-31.6-46.4-57.3H128c-17.7 0-32-14.3-32-32s14.3-32 32-32H256c14.6-19.4 37.8-32 64-32s49.4 12.6 64 32zM125.8 177.3L51.1 320H204.9L130.2 177.3c-.4-.8-1.3-1.3-2.2-1.3s-1.7 .5-2.2 1.3zM128 128c18.8 0 36 10.4 44.7 27l77.8 148.5c3.1 5.8 6.1 14 5.5 23.8c-.7 12.1-4.8 35.2-24.8 55.1C210.9 402.6 178.2 416 128 416s-82.9-13.4-103.2-33.5c-20-20-24.2-43-24.8-55.1c-.6-9.8 2.5-18 5.5-23.8L83.3 155c8.7-16.6 25.9-27 44.7-27zm384 48c-.9 0-1.7 .5-2.2 1.3L435.1 320H588.9L514.2 177.3c-.4-.8-1.3-1.3-2.2-1.3zm-44.7-21c8.7-16.6 25.9-27 44.7-27s36 10.4 44.7 27l77.8 148.5c3.1 5.8 6.1 14 5.5 23.8c-.7 12.1-4.8 35.2-24.8 55.1C594.9 402.6 562.2 416 512 416s-82.9-13.4-103.2-33.5c-20-20-24.2-43-24.8-55.1c-.6-9.8 2.5-18 5.5-23.8L467.3 155z"/>
                </svg>
            </div>
        </div>
        <div
            className="flex flex-row m-auto bg-gradient-to-r from-green-400 via-green-500 to-green-600 p-4 gap-8 rounded-lg border-2 border-green-300">
            <div className="my-auto">
                <div className="text-lg text-green-200">Precio promedio:</div>
                <div className="text-2xl text-green-100">S/ {Humanize.formatNumber(report?.price || 0, 2)}</div>
            </div>
            <div
                className="text-green-300 my-auto bg-gradient-to-l from-green-700 via-green-800 to-green-900 rounded-full p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="currentColor" viewBox="0 0 448 512">
                    <path
                        d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z"/>
                </svg>
            </div>
        </div>
        <div
            className="flex flex-row m-auto bg-gradient-to-r from-green-400 via-green-500 to-green-600 p-4 gap-8 rounded-lg border-2 border-green-300">
            <div className="my-auto">
                <div className="text-lg text-green-200">Total a pagar:</div>
                <div className="text-2xl text-green-100">S/ {Humanize.formatNumber(report?.total || 0, 2)}</div>
            </div>
            <div
                className="text-green-300 my-auto bg-gradient-to-l from-green-700 via-green-800 to-green-900 rounded-full p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="currentColor" viewBox="0 0 576 512">
                    <path
                        d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zM272 192H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16s7.2-16 16-16zM256 304c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16zM164.1 160v6.3c6.6 1.2 16.6 3.2 21 4.4c10.7 2.8 17 13.8 14.2 24.5s-13.8 17-24.5 14.2c-3.8-1-17.4-3.7-21.7-4.3c-12.2-1.9-22.2-.3-28.6 2.6c-6.3 2.9-7.9 6.2-8.2 8.1c-.6 3.4 0 4.7 .1 5c.3 .5 1 1.8 3.6 3.5c6.1 4.2 15.7 7.2 29.9 11.4l.8 .2c12.1 3.7 28.3 8.5 40.4 17.4c6.7 4.9 13 11.4 16.9 20.5c4 9.1 4.8 19.1 3 29.4c-3.3 19-15.9 32-31.6 38.7c-4.9 2.1-10 3.6-15.4 4.6V352c0 11.1-9 20.1-20.1 20.1s-20.1-9-20.1-20.1v-6.4c-9.5-2.2-21.9-6.4-29.8-9.1c-1.7-.6-3.2-1.1-4.4-1.5c-10.5-3.5-16.1-14.8-12.7-25.3s14.8-16.1 25.3-12.7c2 .7 4.1 1.4 6.4 2.1l0 0 0 0c9.5 3.2 20.2 6.9 26.2 7.9c12.8 2 22.7 .7 28.8-1.9c5.5-2.3 7.4-5.3 8-8.8c.7-4 .1-5.9-.2-6.7c-.4-.9-1.3-2.2-3.7-4c-5.9-4.3-15.3-7.5-29.3-11.7l-2.2-.7c-11.7-3.5-27-8.1-38.6-16c-6.6-4.5-13.2-10.7-17.3-19.5c-4.2-9-5.2-18.8-3.4-29c3.2-18.3 16.2-30.9 31.1-37.7c5-2.3 10.3-4 15.9-5.1v-6c0-11.1 9-20.1 20.1-20.1s20.1 9 20.1 20.1z"/>
                </svg>
            </div>
        </div>

    </div>)

};

export default Badge;

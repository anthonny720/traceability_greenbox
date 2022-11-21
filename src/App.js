import React from 'react';
import store, {Persistor} from "./store";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import Home from "./containers/Home";
import Error404 from "./containers/errors/Error404";
import Kardex from "./containers/pages/Kardex";
import Motions from "./containers/pages/Motions";
import Drivers from "./containers/pages/Contacts";
import Clients from "./containers/pages/Clients";
import Providers from "./containers/pages/Providers";
import Client from "./containers/pages/Client";
import ProviderDetail from "./containers/pages/Provider";
import ChangePassword from "./containers/pages/Password";
import Users from "./containers/pages/Users";
import Login from "./containers/authentication/Login";
import DetailLot from "./containers/pages/LotDetail";
import Test from "./containers/pages/Test";
import Analysis from "./containers/pages/Analysis";
import Conditioning from "./containers/pages/Conditioning";
import Terminated from "./containers/pages/Terminated";
import Released from "./containers/pages/Released";
import ProcessLine from "./containers/pages/ProcessLine";
import Carrier from "./containers/pages/Carrier";
import Payments from "./containers/pages/Payments";


const App = () => {

    return (<Provider store={store}>
        <PersistGate loading={null} persistor={Persistor}>

            <Router>
                <Routes>
                    {/*Error Display*/}
                    <Route path="*" element={<Error404/>}/>

                    <Route exact path="/" element={<Home/>}/>

                    {/* Management */}
                    <Route path="/management/kardex" element={<Kardex/>}/>
                    <Route path="/management/motions" element={<Motions/>}/>
                    <Route path="/management/payments" element={<Payments/>}/>

                    {/*Business partners*/}
                    <Route path="/business-partners/driver" element={<Drivers/>}/>
                    <Route path="/business-partners/carrier" element={<Carrier/>}/>
                    <Route path="/business-partners/clients" element={<Clients/>}/>
                    <Route path="/business-partners/clients/:slug" element={<Client/>}/>
                    <Route path="/business-partners/providers" element={<Providers/>}/>
                    <Route path="/business-partners/providers/:slug" element={<ProviderDetail/>}/>


                    {/*Logistic*/}

                    <Route exact path="lot/:lot" element={<DetailLot/>}/>

                    {/*Quality*/}
                    <Route exact path="quality/cut-test" element={<Test/>}/>
                    <Route exact path="quality/analysis" element={<Analysis/>}/>
                    {/*Process Line*/}
                    <Route exact path="quality/conditioning" element={<Conditioning/>}/>
                    <Route exact path="quality/terminated" element={<Terminated/>}/>
                    <Route exact path="quality/released" element={<Released/>}/>
                    <Route exact path="process-line/:lot" element={<ProcessLine/>}/>

                    {/*Authentication*/}
                    <Route path="login/" element={<Login/>}/>
                    <Route exact path="users/" element={<Users/>}/>
                    <Route exact path="me/change-password/" element={<ChangePassword/>}/>

                </Routes>
            </Router>
        </PersistGate>

    </Provider>);
}

export default App;

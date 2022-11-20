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
import Login from "./containers/pages/Login";
import DetailLot from "./containers/pages/LotDetail";


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

                    {/*Business partners*/}
                    <Route path="/business-partners/driver" element={<Drivers/>}/>
                    <Route path="/business-partners/clients" element={<Clients/>}/>
                    <Route path="/business-partners/clients/:slug" element={<Client/>}/>
                    <Route path="/business-partners/providers" element={<Providers/>}/>
                    <Route path="/business-partners/providers/:slug" element={<ProviderDetail/>}/>


                    {/*Logistic*/}

                    <Route exact path="lot/:lot" element={<DetailLot/>}/>

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

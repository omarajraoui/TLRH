import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React, {createContext, useState} from "react";
import {Header, SideBar} from "./Collabs/Containers";
import CollabListPage from "./Collabs/CollabListPage";
import CollabAddPage from "./Collabs/CollabAddPage";
import CollabMListPage from "./ManagersRH/CollabListPage";
import ManagerRHPage from "./ManagersRH/ManagerRHPage";
import Landing from "./Landing/Landing";
import Login from "./Landing/Infos/Login";
import ResetPassword from "./Landing/Infos/ResetPassword";
import {Rapports, RatioFemininMasculin, Etudes, Technologie, Recrutement} from "./Reporting";
import Salaire from "./Reporting/Components/Salaire";
import PosteAPPEvolution from "./Reporting/Components/PosteAPPEvolution";
import MatriceCompetence from "./Reporting/Components/MatriceCompetence";


function Routing() {

    let landingVar =true ;
    
    return (
        <Router>
            {}
                 <Route path="/landing" key={"landing"}>
                            <Landing/>
                </Route>

                <Route path="/login" key={"login"}>
                <Login/>
                </Route>

                <Route path="/resetPassword" key={"resetPassword"}>
                <ResetPassword />
                </Route>


             
            <div className="CollabPage">
        

           <SideBar/>


                
                <div className="CollabPage__stretch">
                    <Header/>
                    <Switch>
                    
            
                        <Route exact path="/" key={"home"}>
                            <CollabListPage/>
                        </Route>
                        <Route path="/add" key={"add"}>
                            <CollabAddPage/>
                        </Route>
                        <Route path="/collabm" key={"notmanager"}>
                            <CollabMListPage/>
                        </Route>
                        <Route path="/manager" key={"manager"}>
                            <ManagerRHPage/>
                        </Route>
                        <Route exact path="/reports" key={"reports"}>
                            <Rapports/>
                        </Route>
                        <Route path="/reports/recrutement" key={"reports/recrutement"}>
                            <Recrutement/>
                        </Route>

                        <Route path="/reports/technologie"> <Technologie/></Route>
                        <Route path="/reports/etudes"> <Etudes/></Route>
                        <Route path="/reports/ratioFemininMasculin"><RatioFemininMasculin/></Route>
                        <Route path="/reports/salaire"><Salaire/></Route>
                        <Route path="/reports/posteApp"><PosteAPPEvolution/></Route>
                        <Route path="/reports/competence"><MatriceCompetence/></Route>
                        <Route path="/reports/competence"><MatriceCompetence/></Route>
                    </Switch>
                </div>
            </div>
        </Router>
)
}

export default Routing;
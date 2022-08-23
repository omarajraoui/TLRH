import React, {useState, useEffect, Fragment} from 'react';

import './tbody.css';
import {BsPencil} from "react-icons/bs";
import {FiTrash2} from "react-icons/fi";
import {IoStatsChart} from "react-icons/io5";
import {useHistory} from "react-router-dom";
import * as path from "path";


const API_URL = 'http://localhost:8080/getCollabs'

const Tbody = () => {
    const [collabs, setCollabs] = useState([]);
    const [collabForModal, setCollabForModal] = useState();
    const [collabsExists, setCollabsExists] = useState(false);
    const [searchTerm, setSearchTerm] = useState([]);

    useEffect(() => {
        if (collabsExists === false) {
            searchCollabs("");
        }
    })
    const searchCollabs = async (title) => {
        const response = await fetch('http://localhost:8080/getCollabs')
        const data = await response.json()
        console.log(data);
        setCollabsExists(true);
        setCollabs(data);
    }
    const history = useHistory();
    const sendToAdd = (collaborateur) => {
        history.push("/add", {collaborateur: collaborateur.matricule})
    }

    const Clicked = (e) => {
        console.log(e.target.parentElement.id)
        setCollabForModal(e.target.parentElement.id)
        const modal = document.querySelector(".modal");
        modal.style.display = "flex";

        const closeModalBtn = document.querySelectorAll(".close-modal");
        console.log(closeModalBtn)
        closeModalBtn.forEach(item => {
            item.addEventListener("click", function () {
                modal.style.display = "none";
            });
        })
    }
    return [
        collabs.map((collab) => {
                return (<div className="tlrh__list-tbody">
                    <p style={{padding: "0 0 0 10px", fontWeight: "bold"}}>{collab.matricule}</p>
                    <div className="tlrh__list-tbody_td">
                        <p>{collab.nom} {collab.prenom}</p>
                        <p>{collab.nouveauRH}</p>
                        <p>{collab.site}</p>
                        <p>{collab.bu}</p>
                        <p>{collab.embauche}</p>
                        <p>{collab.depart}</p>
                        <p>{collab.poste}</p>
                        <p>{collab.salaire}</p>
                    </div>
                    <div className="tlrh__list-tbody_icons">
                        <IoStatsChart id={collab.matricule} onClick={(e) => Clicked(e)} size="25px"/>
                        <BsPencil onClick={() => {
                            sendToAdd(collab)
                        }} size="25px"/>
                        <FiTrash2 size="25px"/>
                    </div>
                </div>)
            }
        ),
        <ModalStats matricule={collabForModal}/>
    ]
}
export default Tbody

const ModalStats = matricule => {

    const history = useHistory();

    return (
        <Fragment>
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close-modal">&times;</span>
                        <h3>Rapport Collaborateur</h3>
                    </div>
                    <div className="modal-body-stat">
                        <BlocStat text={"Evolution du salaire"} handleClick={() => {
                            history.push({
                                pathname: "/reports/salaire",
                                state: {matricule}
                            })
                        }} color={"#CFC7FF"}/>
                        <BlocStat text={"Evolution du poste APP"} handleClick={() => {
                            history.push({
                                pathname: "/reports/posteApp",
                                state: {matricule}
                            })
                        }} color={"#CFFFC7"}/>
                        <BlocStat text={"Matrice de compétence"} handleClick={() => {
                            history.push({
                                pathname: "/reports/competence",
                                state: {matricule}
                            })
                        }} color={"#FFCDC7"}/>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

const BlocStat = ({text, color, numero, handleClick}) => {
    return (
        <div key={numero} id={numero} onClick={handleClick} className="modal-body-stat_selection" style={{background: color}}>
            <span>{text}</span>
        </div>
    )
}

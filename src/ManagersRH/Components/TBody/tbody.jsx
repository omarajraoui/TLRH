import React, {useState, useEffect, Fragment} from 'react';

import './tbody.css';
import {BsPencil} from "react-icons/bs";
import {FiTrash2} from "react-icons/fi";
import {useHistory} from "react-router-dom";


const Tbody = (props) => {
    const [collabs, setCollabs] = useState([]);
    const [collabsExists, setCollabsExists] = useState(false);
    const [manager, setManager] = useState([]);
    const [managerExists, setManagerExists] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        if (collabsExists === false) {
            searchCollabs("");
        }
        if (managerExists) {
            addManager();
        }
    })

    const searchCollabs = async () => {
        let response;
        console.log(props.id);
        if (props.id === 1) {
            response = await fetch('http://localhost:8080/getCollabsNonManagers')
        } else {
            response = await fetch('http://localhost:8080/getManagers')
        }
        const data = await response.json().then(data => setCollabs(data))
        setCollabsExists(true);
    }


    const addManager = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "matricule": manager,
                "matriculeRH": manager,
            })
        };
        console.log(manager)
        await fetch('http://localhost:8080/saveManager', requestOptions).then(response => response.json())
            .then(data => console.log(data));
    }

    const onClick = (e) => {
        if (!managerExists) {
            setManager(e.target.id)
            e.target.className = "tlrh__list-tbody_icons_buttonCancel"
            e.target.innerHTML = "Manager Ajouté"
            setManagerExists(true)
        } else {
            setManager(null)
            e.target.className = "tlrh__list-tbody_icons_buttonAdd"
            e.target.innerHTML = "Ajouter Manager"
            setManagerExists(false)
        }
    }
    const Clicked = (e) => {

        const modal = document.querySelector(".modal");
        modal.style.display = "flex";

        const closeModalBtn = document.querySelectorAll(".close-modal");
        console.log(closeModalBtn)
        closeModalBtn.forEach(item => {
            item.addEventListener("click", function () {
                modal.style.display = "none";
            });
        })
        setManager(e.target.id)
        console.log("new: " + manager)
    }
    const changeStatus = async (manager, status) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "matricule": manager,
                "status": status,
            })
        };
        console.log(manager)
        await fetch('http://localhost:8080/saveStatus', requestOptions).then(response => response.json())
            .then(data => console.log(data));
    }
    const statusOnChange = (event) => {
        checkStatusToModifyButton(event)
        changeStatus(event.target.getAttribute("data-matricule"), event.target.checked)
    }
    const checkStatusToModifyButton = (event) => {
        document.getElementById(event.target.getAttribute("data-matricule")).disabled = !event.target.checked;
    }
    return [
        collabs.map((collab) => {
                return (<div className="tlrh__list-tbody">
                    <p style={{padding: "0 0 0 10px", fontWeight: "bold"}}>{collab.matricule}</p>
                    <div key={collab.matricule} className="tlrh__list-tbody_td">
                        <p>{collab.nom} {collab.prenom}</p>
                        <p>{collab.site}</p>
                        <p>{collab.poste}</p>
                        <p>{collab.nouveauRH}</p>
                    </div>
                    <div className="tlrh__list-tbody_icons">
                        {props.id === 1 ?
                            <button id={collab.matricule} className="tlrh__list-tbody_icons_buttonAdd"
                                    onClick={(e) => onClick(e)}>Ajouter Manager
                            </button> :
                            <Fragment>
                                <label className="toggle">
                                    <input className="toggle-checkbox" defaultChecked={collab.statusActif}
                                           data-matricule={collab.matricule} onChange={statusOnChange} type="checkbox"/>
                                    <div className="toggle-switch"/>
                                    <span className="toggle-label">Status</span>
                                </label>
                                        <button id={collab.matricule}  defaultChecked={collab.statusActif} className="tlrh__list-tbody_icons_buttonAdd"
                                                onClick={(e) => Clicked(e)}>Ajouter Collaborateurs
                                        </button>
                            </Fragment>
                        }
                    </div>
                </div>)
            }
        ),
        <Modal matriculeRH={manager}/>,
    ]
}
export default Tbody

const Modal = (props) => {

    const [allCollabs, setAllCollabs] = useState([]);
    const [modalExists, setModalExists] = useState(false);
    const [matricules, setMatricules] = useState([]);

    useEffect(() => {
        console.log("matricules : " + matricules)
    })
    const onClick = (e) => {
        console.log("true false : " + (matricules.includes(e.target.id)))
        if (!(matricules.includes(e.target.id))) {
            setMatricules(oldValues => ([
                ...oldValues, e.target.id,
            ]))
            e.target.className = "modal-tbody_icons_buttonCancel"
            e.target.innerHTML = "Manager Ajouté"
        } else {
            setMatricules(oldValues => (oldValues.filter(item => item !== e.target.id)))
            e.target.className = "modal-tbody_icons_buttonAdd"
            e.target.innerHTML = "Ajouter Manager"
        }
    }

    const addManager = async () => {
        console.log(props.matriculeRH)
        for (const matricule of matricules) {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "matricule": matricule,
                    "matriculeRH": props.matriculeRH,
                })
            };
            const response = await fetch('http://localhost:8080/saveManager', requestOptions).then(response => response.json())
                .then(data => console.log(data));
        }
    }
    const searchCollabs = async () => {
        const response = await fetch('http://localhost:8080/getCollabsNonManagers')
        const data = await response.json()
        console.log(data);
        setModalExists(true)
        setAllCollabs(data);
    }
    if (!modalExists) {
        searchCollabs()
    }
    return (
        <Fragment>
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close-modal">&times;</span>
                        <h3>Liste Collaborateurs</h3>
                    </div>
                    <div className="modal-body">
                        {
                            allCollabs.map((collab) => {
                                    return (<div className="modal-tbody">
                                        <p style={{padding: "0 0 0 10px", fontWeight: "bold"}}>{collab.matricule}</p>
                                        <div className="modal-tbody_td">
                                            <p>{collab.nom} {collab.prenom}</p>
                                        </div>
                                        <div className="modal-tbody_icons">
                                            <button id={collab.matricule} onClick={onClick}
                                                    className="modal-tbody_icons_buttonAdd"
                                            >Ajouter Au Manager
                                            </button>
                                        </div>
                                    </div>)
                                }
                            )
                        }
                    </div>
                    <div className="modal-footer">
                        <button className="close-modal">No, Cancel</button>
                        <button onClick={addManager}>Yes, Confirm</button>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
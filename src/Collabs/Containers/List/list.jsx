import React from 'react';

import './list.css';
import {Tbody} from '../../Components'
import {Link, useHistory} from 'react-router-dom'

const List = () => {
    const history = useHistory();
    return (
        <div className="tlrhc__list">
            <div className="tlrhc__list_header">
                <h2>Liste Collaborateurs</h2>
                <div className="tlrhc__list_header-right">
                    <button onClick={()=>{

                        history.push("/")
                    }} className={"tlrhc__list_header-right_button pressed"}> Tout les Collaborateurs</button>
                    <button onClick={()=>{
                        history.push("/collabm")
                    }} className={"tlrhc__list_header-right_button"}>Collaborateurs Sans Managers</button>
                    <button> <Link to={"/add"}>Ajouter Collaborateur</Link></button>
                </div>
            </div>
            <hr/>
            <div className="tlrhc__list-thead">
                <p>Nom&Prenom</p>
                <p>Manager RH</p>
                <p>Site</p>
                <p>BU</p>
                <p>Date Embauche</p>
                <p>Date Départ</p>
                <p>Poste</p>
                <p>Salaire</p>
            </div>
            <Tbody/>
        </div>
    )
}
export default List
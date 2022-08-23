import React, {Fragment} from 'react';

import './list.css';
import {Tbody} from '../../Components'
import {FiFilter} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'


const ListR = (props) => {
    const history = useHistory();

    return (
        <div className="tlrh__list">
            <div className="tlrh__list_header">
                {props.id === 1 ? <Fragment><h2>Liste Collaborateurs Non Managers</h2>
                <div className="tlrh__list_header-right">
                    <button onClick={()=>{
                        history.push("/")
                    }} className={"tlrh__list_header-right_button pressed"}> Tout les Collaborateurs</button>
                    <button onClick={()=>{
                        history.push("/collabm")
                    }} className={"tlrh__list_header-right_button"}>Collaborateurs Sans Managers</button>
                </div>
                </Fragment>:<h2>Liste Managers</h2>}
            </div>
            <hr/>
            <div className="tlrh__list-thead">
                <p>Nom&Prenom</p>
                <p>Site</p>
                <p>Poste</p>
                <p>Manager Actuel</p>
            </div>
            <Tbody id={props.id}/>
        </div>
    )
}
export default ListR
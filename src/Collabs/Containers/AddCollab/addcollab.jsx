import React, {useEffect, useRef, useState} from 'react';

import {AiOutlinePlus} from 'react-icons/ai'
import './addcollab.css';
import {useLocation} from "react-router-dom";

const AddCollab = () => {
    const location = useLocation();
    const [isActive, setActive] = useState(0);
    const [collab, setCollab] = useState({
        nom: '',
        prenom: '',
        ancienRH: '',
        nouveauRH: '',
        site: '',
        sexe: '',
        salaires: '',
        bu: '',
        embauche: '',
        seminaire: '',
        dateSeminaire: '',
        poste: '',
        posteAPP: ''
    })
    let url = 'saveNewCollab'
    const dateConverter = (str) => {
        console.log("replaced :" + str.replace("undefined/", ""))
        const [day, month, year] = str.split('/');
        return year + "-" + month + "-" + day
    }
    const reverseDateConverter = (str) => {
        console.log("replaced :" + str.replace("undefined/", ""))
        const [year, month, day] = str.split('-');
        console.log(day + "/" + month + "/" + year)
        return day + "/" + month + "/" + year
    }
    const [salaires, setSalaires] = useState([])

    useEffect(() => {
        if (location.state !== undefined) {
            url = 'saveCollab'
            if (location.state.collaborateur !== null && location.state.collaborateur !== undefined) {
                console.log(location.state.collaborateur)
                const requestOptions = {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                }

                const fetchData = async () => {
                    let response;

                    await fetch('http://localhost:8080/getCollab/' + location.state.collaborateur, requestOptions)
                        .then(response => response.json())
                        .then(data => response = data)
                    console.log(response)
                    response.collab.embauche = dateConverter(response.collab.embauche)
                    response.collab.dateSeminaire = dateConverter(response.collab.dateSeminaire)
                    response.diplomes.forEach((dip) => {
                        dip.promotion = dateConverter(dip.promotion)
                    })
                    setSalaires(response.salaires)
                    response.collab.salaires = response.collab.salaires[response.collab.salaires.length - 1].salaire
                    console.log(response.collab)
                    setCollab(response.collab)
                    setDiplome(response.diplomes)
                    setCompetence(response.competences)
                }
                fetchData().catch(console.error)
                location.state.collaborateur = null
            }
        }

    })
    const [diplome, setDiplome] = useState([])
    const [competence, setCompetence] = useState([])
    const handleChangeCollab = e => {
        setCollab(oldValues => ({
            ...oldValues,
            [e.target.name]: e.target.value,
        }));
    }

    const onClick = () => {
        setDiplome([])
        const inputs = document.querySelectorAll(".tlrh__adding_content-diplomes-divs input,.tlrh__adding_content-diplomes-divs select");
        console.log(inputs)
        let diplomes = []
        let dip = {};
        for (let i = 0; i < inputs.length; i = i + 5) {
            if (inputs[i].value === '' && inputs[i + 1].value === '' && inputs[i + 2].value === '' && inputs[i + 3].value === '' && inputs[i + 4].value === '') {
                continue
            }
            dip["niveau"] = inputs[i].value
            dip["ecole"] = inputs[i + 1].value
            dip["typeEcole"] = inputs[i + 2].value
            dip["typeDiplome"] = inputs[i + 3].value
            dip["promotion"] = inputs[i + 4].value
            diplomes.push(dip);
            dip = {}
        }
        console.log(diplomes)
        setDiplome(diplomes);
    }


    const DiplomeBody = () => {
        if (diplome.length !== 0) {
            console.log(diplome.length)
            let Diplomes = []
            let selected;
            diplome.map((dip) => {
                Diplomes.push(<div className="tlrh__adding_content-diplomes-divs">
                    <div>
                        <label htmlFor="niveau">Niveau</label>
                        <input type="text" id="niveau" name="niveau" defaultValue={dip.niveau}
                               placeholder="Niveau"/>
                    </div>
                    <div>
                        <label htmlFor="ecole">Ecole</label>
                        <input type="text" id="ecole" name="ecole" defaultValue={dip.ecole}
                               placeholder="Ecole"/>
                    </div>
                    <div>
                        <label htmlFor="typeEcole">Type &#201;cole</label>
                        <select name="typeEcole" id="typeEcole">
                            {
                                dip.typeEcole === "nationale" ? selected = true : selected = false
                            }
                            <option value="nationale" selected={selected}>Nationale
                            </option>
                            <option value="internationale"
                                    selected={!selected}>Internationale
                            </option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="typeDiplome">Type Diplome</label>
                        <select name="typeDiplome" id="typeDiplome">
                            {
                                dip.typeDiplome === "étatique" ? selected = true : selected = false
                            }
                            <option value="étatique"
                                    selected={selected}>&Eacute;tatique
                            </option>
                            <option value="privé" selected={selected}>Privé
                            </option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="promotion">Promotion</label>
                        <input type="date" id="promotion" name="promotion"
                               defaultValue={dip.promotion} placeholder="dd-mm-yyyy"/>
                    </div>
                </div>)
            })
            return Diplomes;
        } else {
            return (<div className="tlrh__adding_content-diplomes-divs">
                <div>
                    <label htmlFor="niveau">Niveau</label>
                    <input type="text" id="niveau" name="niveau" placeholder="Niveau"/>
                </div>
                <div>
                    <label htmlFor="ecole">Ecole</label>
                    <input type="text" id="ecole" name="ecole" placeholder="Ecole"/>
                </div>
                <div>
                    <label htmlFor="typeEcole">Type &#201;cole</label>
                    <select name="typeEcole" id="typeEcole">
                        <option value="nationale">Nationale</option>
                        <option value="internationale">Internationale</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="typeDiplome">Type Diplome</label>
                    <select name="typeDiplome" id="typeDiplome">
                        <option value="étatique">&Eacute;tatique</option>
                        <option value="privé">Privé</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="promotion">Promotion</label>
                    <input type="date" id="promotion" name="promotion"
                           placeholder="dd-mm-yyyy"/>
                </div>
            </div>)
        }
    }
    const CompetenceBody = () => {
        if (competence.length !== 0) {
            let Competences = []
            competence.map((comp) => {
                Competences.push(<div
                    className="tlrh__adding_content-container tlrh__adding_content-container-comptence">
                    <div>
                        <input style={{width: "70%",}} type="text" id="competence" name="competence"
                               className="scale-up-center"
                               placeholder="competence"
                               defaultValue={comp.name}
                        />
                        <input style={{width: "30%",}} type="text" id="note" name="note"
                               className="scale-up-center"
                               placeholder="note"
                               defaultValue={comp.note}
                        />
                    </div>
                </div>)
            })
            return Competences;
        } else {
            return (<div className="tlrh__adding_content-container tlrh__adding_content-container-comptence">
                <div>
                    <input style={{width: "70%",}} type="text" id="competence" name="competence"
                           className="scale-up-center"
                           placeholder="competence"/>
                    <input style={{width: "30%",}} type="text" id="note" name="note"
                           className="scale-up-center"
                           placeholder="note"/>
                </div>
            </div>)
        }
    }
    const onSubmit = (e) => {
        e.preventDefault()
        setCompetence([])
        const form = e.target;
        let competences = [];
        let comp = {};
        if (form.elements.competence.length === undefined) {
            comp["name"] = form.elements.competence.value
            comp["note"] = form.note.value
            competences.push(comp);
        } else {
            for (let i = 0; i < form.elements.competence.length; i++) {
                comp["name"] = form.elements.competence[i].value
                comp["note"] = form.note[i].value
                competences.push(comp);
                comp = {}
            }
        }
        setCompetence(prevState => [...prevState, ...competences]);
        collab.embauche = reverseDateConverter(collab.embauche)
        collab.dateSeminaire = reverseDateConverter(collab.dateSeminaire)
        diplome.forEach((dip) => {
            dip.promotion = reverseDateConverter(dip.promotion)
        })
        let sals = salaires.push(salairefinal)
        setSalaires(sals)
        let salairefinal = {
            'dateSalaire' : new Date().toLocaleDateString(),
            'salaire' : collab.salaires,
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "collab": collab,
                "competences": competences,
                "diplomes": diplome,
                "salaires": salaires,
            })
        };
        fetch('http://localhost:8080/' + url, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }
    return (
        <div className="tlrh__adding">
            <div className="tlrh__adding_header">
                {collab.matricule === undefined ? <h2>Ajouter Collaborateur</h2> : <h2>Modifier Collaborateur</h2>}
            </div>
            <hr/>
            <form onSubmit={onSubmit}>
                <div className="tlrh__adding_sections">
                    {
                        isActive === 0 &&
                        <section className="tlrh__adding_content">
                            <div className="tlrh__adding_content-head">
                                <h3>Information Personnel</h3>
                                <p>Veuillez remplir les informations personnelles du collaborateur</p>
                            </div>
                            <hr/>
                            <div className="tlrh__adding_content-container">
                                <div>
                                    <label htmlFor="nom">First Name</label>
                                    <input type="text" name="nom" id="nom" defaultValue={collab.nom}
                                           onChange={handleChangeCollab}
                                           placeholder="First Name"/>
                                </div>
                                <div>
                                    <label htmlFor="prenom">Last Name</label>
                                    <input type="text" name="prenom" id="prenom" defaultValue={collab.prenom}
                                           onChange={handleChangeCollab} placeholder="Last Name"/>
                                </div>
                                <div>
                                    <label htmlFor="nouveauRH">Last Manager</label>
                                    <input type="text" name="nouveauRH" id="nouveauRH" defaultValue={collab.nouveauRH}
                                           onChange={handleChangeCollab} placeholder="Last Manager"/>
                                </div>
                                <div>
                                    <label htmlFor="site">Site</label>
                                    <input type="text" name="site" id="site" defaultValue={collab.site}
                                           onChange={handleChangeCollab} placeholder="Site"/>
                                </div>
                                <div>
                                    <label htmlFor="sexe">Sexe</label>
                                    <select name="sexe" id="sexe" placeholder="Sexe">
                                        <option value="Homme">Homme</option>
                                        <option value="Femme">Femme</option>
                                        <option selected value="autre">Pas Précisé</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="salaire">Salaire</label>
                                    <input type="text" name="salaire" id="salaire" defaultValue={collab.salaire}
                                           onChange={handleChangeCollab} placeholder="Salaire"/>
                                </div>
                                <div>
                                    <label htmlFor="bu">BU</label>
                                    <input type="text" name="bu" id="bu" defaultValue={collab.bu}
                                           onChange={handleChangeCollab}
                                           placeholder="BU"/>
                                </div>
                                <div>
                                    <label htmlFor="embauche">Date Embauche</label>
                                    <input type="date" name="embauche" id="embauche" defaultValue={collab.embauche}
                                           onChange={handleChangeCollab}/>
                                </div>
                                <div>
                                    <label htmlFor="seminaire">Participe au Séminaire</label>
                                    <select name="seminaire" id="seminaire" placeholder="V ou F">
                                        <option selected value="1">Vrai</option>
                                        <option value="0">Faux</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="dateSeminaire">Date de participation</label>
                                    <input type="date" name="dateSeminaire" id="dateSeminaire"
                                           defaultValue={collab.dateSeminaire}
                                           onChange={handleChangeCollab}/>
                                </div>
                                <div>
                                    <label htmlFor="poste">Poste APP</label>
                                    <input type="text" name="poste" id="poste" defaultValue={collab.poste}
                                           onChange={handleChangeCollab} placeholder="Poste APP"/>
                                </div>
                                <div>
                                    <label htmlFor="posteAPP">Poste Actuel</label>
                                    <input type="text" name="posteAPP" id="posteAPP" defaultValue={collab.posteAPP}
                                           onChange={handleChangeCollab} placeholder="Poste Actuel"/>
                                </div>
                            </div>
                            <button className="tlrh__adding_content-buttonNext" onClick={() => setActive(1)}>Next
                            </button>
                        </section>
                    }
                    {
                        isActive === 1 &&
                        <section className="tlrh__adding_content">
                            <div className="tlrh__adding_content-head">
                                <h3>Diplomes</h3>
                                <p>Veuillez remplir les informations concernants les diplomes</p>
                            </div>
                            <hr/>
                            <div style={{
                                margin: "0 20px 0 0",
                                width: "100%",
                                display: "flex",
                                justifyContent: "end",
                            }}>
                                <AiOutlinePlus size="35px"
                                               onClick={() => duplicateChildNodes("tlrh__adding_content-diplomes", "tlrh__adding_content-diplomes-divs")}/>
                            </div>
                            <div className="tlrh__adding_content-diplomes">
                                <DiplomeBody/>
                            </div>
                            <div className="tlrh__adding_content-buttons">
                                <button className="tlrh__adding_content-buttonBack" onClick={() => setActive(0)}>Back
                                </button>
                                <button className="tlrh__adding_content-buttonNext" onClick={() => {
                                    setActive(2);
                                    onClick()
                                }}>Next
                                </button>
                            </div>
                        </section>
                    }
                    {
                        isActive === 2 &&
                        <section className="tlrh__adding_content">
                            <div className="tlrh__adding_content-head">
                                <h3>Compétences</h3>
                                <p>Veuillez indiquer le niveau d’expertise de chaque compétence</p>
                            </div>
                            <div style={{
                                margin: "0 20px 0 0",
                                width: "100%",
                                display: "flex",
                                justifyContent: "end",
                            }}>
                                <AiOutlinePlus size="35px"
                                               onClick={() => duplicateChildNodes("tlrh__adding_content-container-comptence")}/>
                            </div>
                            <hr/>
                            <CompetenceBody/>
                            <div className="tlrh__adding_content-buttons">
                                <button className="tlrh__adding_content-buttonBack" onClick={() => setActive(1)}>Back
                                </button>
                                <button type="submit" className="tlrh__adding_content-buttonTerminer">Terminer
                                </button>
                            </div>
                        </section>
                    }
                </div>
            </form>
        </div>
    )
}
export default AddCollab


function duplicateChildNodes(className, addClassName) {
    let parent = document.getElementsByClassName(className);
    let child = document.createElement("div")
    child.classList.add(addClassName)
    child.innerHTML = parent[0].firstChild.innerHTML
    parent[0].appendChild(child);
}
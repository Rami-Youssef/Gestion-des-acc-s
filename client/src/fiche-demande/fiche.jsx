import axios from 'axios';
import './fiche.scss'
import { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
export default function Fiche(){
    let [D,setD]=useState("")
    let [R,setR]=useState("")
    const [auth,setAuth] = useState(false)
    const [HisMAil,setHisMail] = useState("")
    const [HisId,setHisId] = useState("")
    const [Message,SetMessage] = useState("")
    const navigate = useNavigate()
    let [formState, setFormState] = useState({
        id: HisId,
        Demande: "",
        Société: "",
        Prenom: "",
        Nom: "",
        Bénificiare: "",
        Profil: "",
        Adresse: HisMAil,
        Direction: "",
        Site: "",
        Application: "",
        D_R: []
    });
    const send =()=>{
        for (const key in formState) {
            if (formState.hasOwnProperty(key) && formState[key] === "") {
                alert(`Veuillez remplir le champ ${key}.`);
                return;
            }
        }
        axios.post('/Add',formState).then((res)=>{
            
            console.log(res.Status)
            navigate('/GDA/List')
        }).catch(
            (err)=>console.log(err)
            )
            
        }
        axios.defaults.withCredentials= true;
        useEffect(
            ()=>{
                axios.get('http://localhost:5000/verify').then(
                    (res)=>{
                        if (res.data.Status==="Success"){
                            setAuth(true)
                            console.log(res.data.token)
                            setHisMail(res.data.token.Email)
                            setFormState(prevState => ({ ...prevState,id:res.data.token.id , Adresse:  res.data.token.Email}))
                            setHisId(res.data.token.id)
                            
                            
                        }else{
                            console.log("rip")
                            SetMessage(res.data.Message)
                    }
                }
            )
        },[]
        )
    useEffect(() => {
        if (formState.Société === 'Lesieur Cristal') {
            setFormState(prevState => ({ ...prevState, Site: 'Roch Noires 2' }));
        } else if (formState.Société === 'Idusalim') {
            setFormState(prevState => ({ ...prevState, Site: 'Usine' }));
        } else {
            setFormState(prevState => ({ ...prevState, Site: '' }));
        }
    }, [formState.Société]);
    
    const addDomainRole = () => {
        if (D.trim() === '' || R.trim() === '') {
            // If D or R is empty, do nothing
            return;
        }
    
        // Check if the combination already exists
        if (formState.D_R.some(item => item.domaine === D && item.role === R)) {
            // If the combination already exists, do nothing
            return;
        }
        
        console.log('added')
        const newId = formState.D_R.length + 1;
        setFormState(prevState => ({
            ...prevState,
            D_R: [
                ...prevState.D_R,
                {
                    id: newId,
                    domaine: D,
                    role: R
                }
            ]
        }));
    };
    
    

    return(
        
        <>{
        auth === true?
        <div id='fiche'>

            <h1>Gestion des accès SAP /SAGE ERP X3 / BI</h1>

            <h2>Identification de la demande/demandeur</h2>

            <form id='First'>
                <div>
                    <div>
                        <label htmlFor="demand">Demand</label>
                        <select id="demand" name="demand" onChange={(e) => { setFormState(prevState => ({ ...prevState, Demande: e.target.value })) }}>
                            <option></option>
                            <option>Création</option>
                            <option>Modification</option>
                            <option>Désactivation</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="societe">Société</label>
                        <select id="societe" name="societe" onChange={(e) => { setFormState(prevState => ({ ...prevState, Société: e.target.value })) }}>
                            <option></option>
                            <option>Idusalim</option>
                            <option>Lesieur Cristal</option>
                        </select>
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="prenom">Prénom du bénéficiaire</label>
                        <input type="text" id="prenom" name="prenom" onChange={(e) => { setFormState(prevState => ({ ...prevState, Prenom: e.target.value })) }} />
                    </div>
                    <div>
                        <label htmlFor="nom">Nom du bénéficiaire</label>
                        <input type="text" id="nom" name="nom" onChange={(e) => { setFormState(prevState => ({ ...prevState, Nom: e.target.value })) }} />
                    </div>
                </div>

                <div>
                    <label htmlFor="fonction">Fonction du bénéficiaire</label>
                    <input type="text" id="fonction" name="fonction" onChange={(e) => { setFormState(prevState => ({ ...prevState, Bénificiare: e.target.value })) }} />
                </div>
                <div>
                    <div>
                        <label htmlFor="profil">Type du profil</label>
                        <select id="profil" name="profil" onChange={(e) => { setFormState(prevState => ({ ...prevState, Profil: e.target.value })) }}>
                            <option></option>
                            <option>Salarié Lesieur Cristal</option>
                            <option>Salarié Indusalim</option>
                            <option>Consultant externe</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="email">Adresse e-mail</label>
                        <input type="text" value={HisMAil} id="email" name="email" onChange={(e) => { setFormState(prevState => ({ ...prevState, Adresse: e.target.value })) }} disabled/>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="direction">Direction Affectation</label>
                        <select id="direction" name="direction" onChange={(e) => { setFormState(prevState => ({ ...prevState, Direction: e.target.value })) }}>
                            <option>Direction Générale</option>
                            <option>Direction resource Humaine</option>
                            <option>Direction Juridique</option>
                            <option>Direction system informatique</option>
                            <option>Direction Achats</option>
                            <option>Finance  </option>
                            <option>Production</option>
                            <option>maintenace</option>
                            <option>supply chain</option>
                            <option>Audit</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="site">Site Affectation</label>
                        {formState.Société === "Lesieur Cristal" ?
                            <select id="site" name="site" value={"Roch Noires 2"} onChange={(e) => { setFormState(prevState => ({ ...prevState, Site: e.target.value })) }}>
                                <option>Roch Noires 2</option>
                                <option>Ain harrouda</option>
                                <option>Direction system informatique</option>
                                <option>Agence casa nord</option>
                                <option>Agence casa sude </option>
                                <option>Agence Rabat</option>
                                <option>Agence knitra</option>
                                <option>Agence Meknas</option>
                                <option>Agence Fes</option>
                                <option>Agence Tanger</option>
                                <option>Agence Oujda</option>
                                <option>Agence Marrakech</option>
                                <option>Agence Safi</option>
                                <option>Agence Agadir</option>
                                <option>Agence Bani Méllale</option>
                            </select>
                            : formState.Société === 'Idusalim' ?
                                <select id="site" name="site" value={"Usine"} onChange={(e) => { setFormState(prevState => ({ ...prevState, Site: e.target.value })) }}>
                                    <option>Usine</option>
                                </select>
                                :
                                <select id="site" name="site" value={""} onChange={(e) => { setFormState(prevState => ({ ...prevState, Site: e.target.value })) }}>
                                    <option value={""}></option>
                                </select>
                        }
                    </div>
                </div>

            </form>

            <h2>Description de la demande</h2>
            <form>
                <div>
                    <label htmlFor="application">Application demandée</label>
                    <select id="application" name="application" onChange={(e) => { setFormState(prevState => ({ ...prevState, Application: e.target.value })) }}>
                        <option></option>
                        <option>SAP</option>
                        <option>SAGE</option>
                        <option>Assabil Sales Monitoring</option>
                    </select>
                </div>
                <div>
            <div>
                <label htmlFor="domaine">Domaine</label>
                <select id="domaine" name="domaine" onChange={(e) =>{setD(e.target.value)}}>
                    <option></option>
                    <option>Achat</option>
                    <option>Finance</option>
                    <option>Controle de gestion</option>
                    <option>Maintenance</option>
                    <option>Prôduction</option>
                    <option>Vente</option>
                    <option>Contrôle qualité</option>
                </select>
            </div>

            <div>
                <label htmlFor="role">Rôle fonctionnel</label>
                <select id="role" name="role" onChange={(e) => {setR(e.target.value)}}>
                    <option></option>
                    <option>A.D.V Agence</option>
                    <option>A.D.V Central</option>
                    <option>Magasinier</option>
                    <option>Acheteur</option>
                    <option>Approvisionneur</option>
                    <option>Exécution de la production</option>
                    <option>Controle de Gestion Central</option>
                    <option>Controle de Gestion Usine</option>
                </select>
            </div>
        </div>


                <div>
                    <button type='button' onClick={addDomainRole}>Ajouter</button>
                </div>
                <table id='D_R'>
                        <thead>
                            <tr>
                                <th>Domaine</th>
                                <th>Rôle fonctionnel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formState.D_R.map(item => (
                                <tr key={item.id}>
                                    <td>{item.domaine}</td>
                                    <td>{item.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </form>
            <div id='sendParent'>
                <button id='send' onClick={send}>SUBMIT</button>
            </div>
            
        </div> :
        <div>
            {Message}
        </div>
        }
        </>

    )
}
import './fiche.scss'
import { useState,useEffect } from 'react'
export default function Fiche(){

    let [Demande,SetDemande]=useState("")
    let [Société,SetSociété]=useState("")
    let [Prenom,SetPrenom]=useState("")
    let [Nom,SetNom]=useState("")
    let [Bénificiare,SetBénificiare]=useState("")
    let [Profil,SetProfil]=useState("")
    let [Adresse,SetAdresse]=useState("")
    let [Direction,SetDirection]=useState("")
    let [Site,SetSite]=useState("")

    let [Application,SetApplication]=useState("")
    let [Dommaine,SetDommaine]=useState("")
    let [Rôle,SetRôle]=useState("")

    useEffect(() => {
        if (Société === 'Lesieur Cristal') {
          SetSite('Roch Noires 2');
        } else if (Société === 'Idusalim') {
          SetSite('Usine');
        } else {
          SetSite('');
        }
      }, [Société]);


    return(
        <div id='fiche'>
            <p>{Demande} {Société} {Prenom} {Nom} {Bénificiare} {Profil} {Adresse} {Direction} {Site} {Application} {Dommaine} {Rôle}</p>
            <h1>Gestion des accès SAP /SAGE ERP X3 / BI</h1>
            <h2>Identification de la demande/demandeur</h2>
<form id='First'>
    <div>
        <div>
            <label for="demand">Demand</label>
            <select id="demand" name="demand" onChange={(e)=>{SetDemande(e.target.value)}}>
                <option></option>
                <option>Création</option>
                <option>Modification</option>
                <option>Désactivation</option>
            </select>
        </div>
        <div>
            <label for="societe">Société</label>
            <select id="societe" name="societe" onChange={(e)=>{SetSociété(e.target.value)}}>
                <option></option>
                <option>Idusalim</option>
                <option>Lesieur Cristal</option>
            </select>
        </div>
    </div>

    <div>
        <div>
            <label for="prenom">Prénom du bénéficiaire</label>
            <input type="text" id="prenom" name="prenom" onChange={(e)=>{SetPrenom(e.target.value)}} />
        </div>
        <div>
            <label for="nom">Nom du bénéficiaire</label>
            <input type="text" id="nom" name="nom" onChange={(e)=>{SetNom(e.target.value)}} />
        </div>
    </div>
    
    <div>
        <label for="fonction">Fonction du bénéficiaire</label>
        <input type="text" id="fonction" name="fonction" onChange={(e)=>{SetBénificiare(e.target.value)}} />
    </div>

    <div>
        <div>
            <label for="profil">Type du profil</label>
            <select id="profil" name="profil" onChange={(e)=>{SetProfil(e.target.value)}}>
                <option></option>
                <option>Salarié Lesieur Cristal</option>
                <option>Salarié Indusalim</option>
                <option>Consultant externe</option>
            </select>
        </div>
        <div>
            <label for="email">Adresse e-mail</label>
            <input type="text" id="email" name="email" onChange={(e)=>{SetAdresse(e.target.value)}} />
        </div>
    </div>
    <div>
        <div>
            <label for="direction">Direction Affectation</label>
            <select id="direction" name="direction" onChange={(e)=>{SetDirection(e.target.value)}}>
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
            <label for="site">Site Affectation</label>
            {Société === "Lesieur Cristal" ? 
                <select id="site" name="site" value={"Roch Noires 2"} onChange={(e)=>{SetSite(e.target.value)}}>
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
                : Société === 'Idusalim' ?
                <select id="site" name="site" value={"Usine"} onChange={(e)=>{SetSite(e.target.value)}}>
                    <option>Usine</option>
                </select>
                :
                <select id="site" name="site" value={""} onChange={(e)=>{SetSite(e.target.value)}}>
                    <option value={""}></option>
                </select>
            }
        </div>
    </div>

    <div>
        <div>
            <label for="date_activation">Date d'activation</label>
            <input type="date" id="date_activation" name="date_activation" />
        </div>
        <div>
            <label for="date_desactivation">Date d'ésactivation</label>
            <input type="date" id="date_desactivation" name="date_desactivation" />
        </div>
    </div>
</form>


            <h2>Description de la demande</h2>
    <form>
        <div>
            <label for="application">Application demandée</label>
            <select id="application" name="application" onChange={(e)=>{SetApplication(e.target.value)}}>
                <option></option>
                <option>SAP</option>
                <option>SAGE</option>
                <option>Assabil Sales Monitoring</option>
            </select>
        </div>
        <div>
            <div>
                <label for="domaine">Domaine</label>
                <select id="domaine" name="domaine" onChange={(e)=>{SetDommaine(e.target.value)}}>
                    <option></option>
                    <option>Achat</option>
                    <option>Finance</option>
                    <option>Contole de gestion</option>
                    <option>Maintenance</option>
                    <option>Prôduction</option>
                    <option>Vente</option>
                    <option>Contrôle qualité</option>
                </select>
            </div>
            
            <div>
                <label for="role">Rôle fonctionnel</label>
                <select id="role" name="role" onChange={(e)=>{SetRôle(e.target.value)}}>
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
            <button type='button' >Ajouter</button>
        </div>
    </form>
</div>
    )
}
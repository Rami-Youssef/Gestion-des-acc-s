import './fiche.css'
import { useState } from 'react'
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
    
    let holder= <select>
        <option value="">holder</option>
    </select>


    return(
        <div id='fiche'>
            <p>yo {Demande}</p>
            <h1>Gestion des accès SAP /SAGE ERP X3 / BI</h1>
            <h2>Identification de la demande/demandeur</h2>
            <table>

                <tr>
                    <td>Demand</td>
                    <td>
                        <select onChange={(e)=>{SetDemande(e.target.value)}}>
                            <optgroup></optgroup>
                            <option></option>
                            <option>Création</option>
                            <option>modification</option>
                            <option>Désactivation</option>
                        </select>
                    </td>
                    <td className='space'></td>
                    <td>societe</td>
                    <td>
                        <select onChange={(e)=>{SetSociété(e.target.value)}}>
                            <option></option>
                            <option>Idusalim</option>
                            <option>Lesieur Cristal</option>
                        </select>
                    </td>
                </tr>


                <tr>
                    <td>Prénom du bénificaire</td>
                    <td><input type="text" onChange={(e)=>{SetPrenom(e.target.value)}}/></td>
                    <td className='space'></td>
                    <td>Nom du bénificaire</td>
                    <td><input type="text" onChange={(e)=>{SetNom(e.target.value)}}/></td>
                </tr>


                <tr>
                    <td>Fonction du bénificaire</td>
                    <td><input type="text" onChange={(e)=>{SetBénificiare(e.target.value)}}/></td>
                </tr>


                <tr>
                    <td>Type du profil</td>
                    <td>
                        <select onChange={(e)=>{SetProfil(e.target.value)}}>
                            <option></option>
                            <option>Salarié Lesieur Cristal</option>
                            <option>Salarié Indusalim</option>
                            <option>Consultant externe</option>
                        </select>
                    </td>
                    <td className='space'></td>
                    <td>Adresse e-mail</td>
                    <td><input type="text" onChange={(e)=>{SetAdresse(e.target.value)}}/></td>
                </tr>


                <tr>
                    <td>Direction Affectation</td>
                    <td>
                        <select onChange={(e)=>{SetDirection(e.target.value)}}>
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
                    </td>
                    <td className='space'></td>
                    <td>Site Affectation</td>
                    <td>
                    <select onChange={(e)=>{SetSite(e.target.value)}}>
                            {
                                Société==="Lesieur Cristal"? 
                                <>
                                <option></option>
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
                                </>
                                :
                                <>
                                <option></option>
                                <option>Usine</option>
                                </>
                            }
                        </select>
                    </td>
                </tr>


                <tr>
                    <td>Date d'activation</td>
                    <td><input type="text" readOnly/></td>
                    <td className='space'></td>
                    <td> Date D'ésactivation</td>
                    <td><input type="text" readOnly/></td>
                </tr>


            </table>

            <h2>Description de la demande</h2>
            <table>
                <tr>
                    <td>Application demandée</td>
                    <td>
                        <select onChange={(e)=>{SetApplication(e.target.value)}}>
                            <option></option>
                            <option>SAP</option>
                            <option>SAGE</option>
                            <option>Assabil Sales Monitoring</option>
                        </select>
                    </td>
                    <td className='space'></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Domaine</td>
                    <td>
                        <select onChange={(e)=>{SetDommaine(e.target.value)}}>
                            <option></option>
                            <option>Achat</option>
                            <option>Finance</option>
                            <option>Contole de gestion</option>
                            <option>Maintenance</option>
                            <option>Prôduction</option>
                            <option>Vente</option>
                            <option>Contrôle qualité</option>
                        </select>
                    </td>
                    <td className='space'></td>
                    <td>Rôle fonctionnel</td>
                    <td><select onChange={(e)=>{SetRôle(e.target.value)}}>
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
                    </td>
                </tr>

            </table>

        </div>
    )
}
import { useEffect, useState } from "react";
import "./config.scss";

 import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

 export default function Config () {
    const navigate= useNavigate()
    const {id} =useParams()
  const [item, setItem] = useState([]);
  const [post, setpost] = useState('');
  const [message, setMessage] = useState('');

  axios.defaults.withCredentials = true;


  useEffect(() => {
    axios.get('http://localhost:5000/verify')
        .then((res) => {
            if (res.data.Status === "Success") {
                setpost(res.data.token.Poste)
                console.log(post)
            } else {
                setMessage("error");
            }
        })
        .catch((error) => {
            console.error('Error verifying authentication:', error);
            setMessage('An error occurred while verifying authentication.');
        });
}, []);




   useEffect( () => {
     axios.post(`http://localhost:5000/one/${id}`  ).then(
      response => {
        setItem(response.data.demande[0]);
        console.log(response.data.Status);
      }
    ).catch(error => {
        
      console.error('Error fetching item:', error);
    });
  }, []);
  
  
  const [added,setAdded]=useState(
      {UPN:"",
      Group:"",
      niveau:"",
        id:id}
    )
    
    
    const [niv,setniv]=useState(
      {id:id,
          niveau:1}
    )
  function valide(niveaux) {
    const updatedNiv = { ...niv, niveau: niveaux };


    axios.post('http://localhost:5000/next', updatedNiv)
        .then(response => {
           
            const subject = encodeURIComponent(`${item.name} votre demande est en cours de traitement`);
            const body = encodeURIComponent(''); // You can add a body if needed
            const mailToUrl = `mailto:${item.email}?subject=${subject}&body=${body}`;

            // Open the mail client directly from the user-initiated event (button click)
            window.open(mailToUrl); 
             navigate('/GDA/List')      })
        .catch(error => {
            // Handle error if needed
            console.error('Error:', error);
            navigate('/GDA/List');
        });
    // Open default email client with pre-filled email
    
}


function validetwo(niveaux) {
    const updatedadded = { ...added, niveau: niveaux };

    console.log(updatedadded)
    axios.post('http://localhost:5000/nexttwo', updatedadded)
        .then(response => {
           
            
             console.log(response.Status) 
             navigate('/GDA/List');   })
        .catch(error => {
            console.error('Error:', error);
        });
    
}



  // Now you can use post and item in your component

  return (
    <div>
        <div className="container">
    <div id="fiche">
            <h2>traitement du demande</h2>
        <form>
           <p>{added.niveau} {added.Group}</p> 
            <div id="First">
                <div>
                    <label htmlFor="demande">Demande</label>
                    <input type="text" id="demande" value={item.demande} readOnly />
                </div>
                <div>
                    <label htmlFor="société">Société</label>
                    <input type="text" id="société" value={item.société} readOnly />
                </div>
            </div>
            <div id="First">
                <div>
                    <label htmlFor="prénom">Prénom du bénéficiaire</label>
                    <input type="text" id="prénom" value={item.prénom} readOnly />
                </div>
                <div>
                    <label htmlFor="nom">Nom du bénéficiaire</label>
                    <input type="text" id="nom" value={item.nom} readOnly />
                </div>
            </div>
            <div id="First">
                <div>
                    <label htmlFor="fonction">Fonction du bénéficiaire</label>
                    <input type="text" id="fonction" value={item.fonction} readOnly />
                </div>
                <div>
                    <label htmlFor="type">Type du profil</label>
                    <input type="text" id="type" value={item.type} readOnly />
                </div>
            </div>
            <div id="First">
                <div>
                    <label htmlFor="email">Adresse e-mail</label>
                    <input type="text" id="email" value={item.email} readOnly />
                </div>
                <div>
                    <label htmlFor="directionAffectation">Direction Affectation</label>
                    <input type="text" id="directionAffectation" value={item.direction} readOnly />
                </div>
            </div>
            <div id="First">
                <div>
                    <label htmlFor="directionGénérale">Direction Générale</label>
                    <input type="text" id="directionGénérale" value={item.directionGénérale} readOnly />
                </div>
                <div>
                    <label htmlFor="siteAffectation">Site Affectation</label>
                    <input type="text" id="siteAffectation" value={item.site} readOnly />
                </div>
            </div>
            <div id="First">
        {post === 'IT' && (
            <div>
                <label htmlFor="upn">UPN du bénéficiaire</label>
            <input 
                type="text" 
                id="upn" 
                value={added.upn} 
                onChange={(e) => setAdded((old) => ({ ...old, UPN: e.target.value }))} 
                />
                </div>
        )
    }
        {post === 'IT' && (
    <div>
            <label htmlFor="mailGroup">Mail group</label>
            <input 
                type="text" 
                id="mailGroup" 
                value={added.Group} 
                onChange={(e) => setAdded((old) => ({ ...old, Group: e.target.value }))} 
            />
    </div>
        )
        }
</div>

        </form>



        <form>
            <div>
            
            
            <button onClick={(e) => { e.preventDefault(); valide(5); }}>refusée</button>
            {post === 'IT' ? (
            <button onClick={(e) => { e.preventDefault(); validetwo(3); }}>validée</button>
        ) : (
            
            <button onClick={(e) => { e.preventDefault(); valide(2); }}>validée</button>

        )}

            </div>
        </form>
    </div>
</div>

    </div>
  );
};


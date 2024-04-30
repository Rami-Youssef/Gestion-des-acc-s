import axios from 'axios';
import { useState, useEffect } from 'react';
import './ListDemande.scss'
import { Link } from 'react-router-dom';

export default function ListDemande() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({ MyList: [], OtherList: [] });
    const [id, setId] = useState("");
    const [Post, setPost] = useState([]);
    const [myListVisible, setMyListVisible] = useState(true);
    const [otherListVisible, setOtherListVisible] = useState(true);
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:5000/verify')
            .then((res) => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setId(res.data.token.id)
                    setPost(res.data.token.Poste)
                    
                } else {
                    setMessage(res.data.Message);
                }
            })
            .catch((error) => {
                console.error('Error verifying authentication:', error);
                setMessage('An error occurred while verifying authentication.');
            });
    }, []);

    useEffect(() => {
        // Fetch data if authenticated
        if (auth) {
            axios.get('http://localhost:5000/List', {
                params: {
                    id: id
                }
            })
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setMessage('An error occurred while fetching data.');
                setLoading(false);
            });
        }
    }, [auth]);

    const toggleMyListVisibility = () => {
        setMyListVisible(!myListVisible);
    };

    const toggleOtherListVisibility = () => {
        setOtherListVisible(!otherListVisible);
    };

    return (
        <>
            {message && <div>{message}</div>}
            {loading ? (
                <div>Loading...</div>
            ) : (





                <div>
    {data.MyList.length > 0 && (
        <div className='container '>
            <h2  className='showText' onClick={toggleMyListVisibility}>Les demandes me concernant</h2>
            {myListVisible && (
            <table className='show'>
                <thead>
                    <tr>
                        <th>Nom et prénom du bénéficiaire</th>
                        <th>Email</th>
                        <th>Type de demande</th>
                        <th>Niveau</th>
                        {
                            Post!="manager"&&<th colSpan={2}>Option</th>
                        }
                        
                    </tr>
                </thead>
                <tbody>
    {Post === "manager" && data.MyList.filter(item => item.managerId === id).map((item, index) => (
        <tr key={index}>
            <td>{item.nom}  {item.prénom}</td>
            <td>{item.email}</td>
            <td>{item.type}</td>
            <td>{item.niveau == 1? "33.3%":
                item.niveau == 2? "66.7%": item.niveau=== 3? "validé":item.niveau=== 4? "validé":"refusé" }</td>
        </tr>
    ))}
    {Post === "CI" && data.MyList.filter(item => item.niveau == 1).map((item, index) => (
        <tr key={index}>
            <td>{item.nom} {item.id} {item.prénom}</td>
            <td>{item.email}</td>
            <td>{item.type}</td>
            <td>{item.niveau == 1? "33.33%":
                item.niveau == 2? "66.7%": item.niveau=== 3? "validé":item.niveau=== 4? "validé":"refusé" }</td>                       
<td>
  <Link className='Link' to={`/GDA/config/${item.id}`} >
  Traiter la demande
</Link>

</td>

        </tr>
    ))}
    {Post === "IT" && data.MyList.filter(item => item.niveau == 2).map((item, index) => (
        <tr key={index}>
            <td>{item.nom}  {item.prénom}</td>
            <td>{item.email}</td>
            <td>{item.type}</td>
            <td>{item.niveau == 1? "33.3%":
                item.niveau == 2? "66.7%": item.niveau=== 3? "validé":item.niveau=== 4? "validé":"refusé" }</td>            
            <td><Link className='Link' to={`/GDA/config/${item.id}`} >
  Traiter la demande
</Link></td>
        </tr>
    ))}
    {Post === "IT2" && data.MyList.filter(item => item.niveau == 3).map((item, index) => (
        <tr key={index}>
            <td>{item.nom} {item.prénom}</td>
            <td>{item.email}</td>
            <td>{item.type}</td>
            <td>{item.niveau == 1? "33.3%":
                item.niveau == 2? "66.7%": item.niveau=== 3? "validé":item.niveau=== 4? "validé":"refusé" }</td>            
            <td><Link className='Link' to={`/GDA/config/${item.id}`} >
  Traiter la demande
</Link></td>
        </tr>
    ))}
</tbody>

            </table>)}
        </div>
    )}






 
        <div>
            <h2 className='showText' onClick={toggleOtherListVisibility}>List des demande validé Pour les Manager</h2>
            {otherListVisible && (
            <table className='show'>
                <thead>
                    <tr>
                        <th>Nom et prénom du bénéficiaire</th>
                        <th>Email</th>
                        <th>Type de demande</th>
                        <th>Niveau</th>
                    </tr>
                </thead>
                <tbody>
                    {data.OtherList.map((item, index) => (
                        <tr key={index}> 
                            <td>{item.nom} {item.prénom}</td>
                            <td>{item.email}</td>
                            <td>{item.type}</td>
                            <td>{item.niveau == 1? "33.3%":item.niveau == 2? "66.6%": item.niveau=== 3? "validé":item.niveau=== 4? "validé":"refusé" }</td>                       
                        </tr>
                    ))}
                </tbody>
            </table>)}
        </div>

</div>

            )}
        </>
    );
}

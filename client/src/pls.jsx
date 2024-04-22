import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DemandePage = () => {
  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/http://127.0.0.1:8000/demande');
        setDemandes(response.data.demandes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Demandes</h1>
      {demandes.map((demande) => (
        <div key={demande.id}>
          <h2>ID: {demande.id}</h2>
          <p>Désactivation: {demande['désactivation']}</p>
          <p>Société: {demande['société']}</p>
          <p>Prénom: {demande['prénom']}</p>
          {/* Add more fields as needed */}
        </div>
      ))}
    </div>
  );
};

export default DemandePage;

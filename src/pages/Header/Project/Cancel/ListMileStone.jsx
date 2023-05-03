import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function ListMileStone(props) {
    const { state } = useLocation();

    const fetchData = async () =>{
        await axios.get(`${API_URL}/milestone/getAllMileStone`).then((response) => {
          
  
         })
       }
  
       useEffect(() => {
         fetchData().catch((error) => {
     
         });
       }, []);
    return (
      <></>
    );
}

export default ListMileStone;
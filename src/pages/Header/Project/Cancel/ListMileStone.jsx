import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function ListMileStone(props) {
    const { state } = useLocation();
    console.log(state)
    const fetchData = async () =>{
        await axios.get(`${API_URL}/milestone/getAllMileStone`).then((response) => {
          
  console.log(response.data.responseSuccess.filter(mil => mil.projectId === state))
         })
       }
  
       useEffect(() => {
         fetchData().catch((error) => {
           console.log(error);
         });
       }, []);
    return (
      <></>
    );
}

export default ListMileStone;
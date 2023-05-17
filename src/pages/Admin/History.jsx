import { Card, Container, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../config/apiUrl/apis-url';

function History(props) {
  

    const [history, setHistory] = useState([])


    const columns = [
        {
          field: 'fullName',
          headerName: 'Account Name',
          flex: 1,
         
        
        },
        // {
        //   field: 'categoryProject',
        //   headerName: 'Category',
        //   flex: 1,
        //   valueGetter: (params) => {
        //     return params.params.row.project
        //   },
        // },
        {
          field: 'type',
    
          headerName: 'Type Action',
    
          flex: 1,
          
        
        },
    
    
    
      
          
       
        {
          field: 'dateTime',
    
          headerName: 'Date',
    
          flex: 1,
          valueGetter: (params) => {
           
            return dayjs(params.row.dateTime).format("DD/MM/YYYY")
          },
        
        },
        {
          field: 'tableName',
          headerName: 'Table Name',
          flex: 1,
       
        },
    
      
    
       
      ];

    const fetchData = () => {
        axios.get(`${API_URL}/changelog/getAllChangelog`).then(response => {
            console.log(response.data.responseSuccess)
            setHistory(response.data.responseSuccess)
        })
    }
    useEffect(() => {

        fetchData()
      }, []);
    return (
        <>
        <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
           Change Log
          </Typography>
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setShowCreate(true)}>
            New Project
          </Button> */}
        </Stack>
  
          <Card>
            {history?.length && <DataGrid
              autoHeight
              rows={history}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
                sorting: {
                    sortModel: [{ field: "dateTime", sort: "desc" }],
                     },
              }}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
            />}
          </Card>
        </Container>
  
      </>
    );
}

export default History;
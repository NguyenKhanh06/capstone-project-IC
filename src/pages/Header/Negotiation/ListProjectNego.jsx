import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import DoNotDisturbOnOutlinedIcon from '@mui/icons-material/DoNotDisturbOnOutlined';

import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentLateTwoToneIcon from '@mui/icons-material/AssignmentLateTwoTone';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { DataGrid } from '@mui/x-data-grid';

import { useNavigate } from 'react-router-dom';
import Iconify from '../../../components/iconify/Iconify';
import DetailProjectNego from './DetailProjectNego';
import DetailCourseNego from './DetailCourseNeogo';


function ListProjectNego(props) {
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [project, setProject] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [course, setCourse] = useState()
  const [showConfirm, setShowConfirm] = useState(false);
  const [showNego, setShowNego] = useState(false)
    const [id, setID] = useState('');
  
    const handleShowConfirm = (data) => {
      setID(data);
      setShowConfirm(true);
    };
  
    const handleCloseConfirm = (data) => {
      setShowConfirm(false)
    };

  const columns = [
    {
      field: 'projectName',
      headerName: 'Project Name',
      flex: 1,
    },

    {
      field: 'estimateTimeStart',
      headerName: 'Start Date',
      flex: 1,
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    },

    {
      field: 'estimateTimeEnd',
      headerName: 'End Date',
      flex: 1,
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    },

    {
      field: 'partner',
      headerName: 'Partner',
      flex: 1,
      valueGetter: (params) => {
        return params.value.name;
      },
    },

    {
      field: 'action',
      headerName: 'Action',
      flex: 1,

      disableClickEventBubbling: true,

      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          return alert(JSON.stringify(currentRow, null, 4));
        };

        return (
          <>
            {params.row.projectStatus === 2 ? <Tooltip title="Project is canceled">
             
             <DoNotDisturbOnOutlinedIcon color='error' />

         </Tooltip>: <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
         <Tooltip title="View Detail">
           <IconButton onClick={() => handleViewDetail(params.row)} aria-label="delete">
             <RemoveRedEyeRoundedIcon />
           </IconButton>
         </Tooltip>
         
         <Tooltip title="Neogotiation">
           <IconButton onClick={() => handleViewNego(params.row)} aria-label="delete">
             <HandshakeOutlinedIcon/>
           </IconButton>
         </Tooltip>
       </Stack>}
          </>
        
         
        );
      },
    },
  ];


  const handleViewDetail = (data) => {
    setShowDetail(true);
    setProject(data);
  };
  const handleViewNego = (data) => {
    setShowNego(true);
  setID(data)
  };
  const fetchData = async () => {
    await axios.get(`https://localhost:7115/api/v1/project/getAllProject`).then((response) => {
      console.log(response.data);
      setProjects(response.data.responseSuccess);
    });
  };

  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
  }, []);

  function NoRowsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        Do not have any project.
      </Stack>
    );
  }
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Negotiation
          </Typography>

        </Stack>

        <Card>
          <Box sx={{ height: 'auto', width: '100%' }}>
            <DataGrid
              autoHeight
              rows={projects}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              components={{ NoRowsOverlay }}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
            />
          </Box>
        </Card>
      </Container>
<DetailCourseNego show={showNego} close={() => setShowNego(false)} id={id}/>
      <DetailProjectNego show={showDetail} close={() => setShowDetail(false)} project={project} />



    </>
  );
}

export default ListProjectNego;

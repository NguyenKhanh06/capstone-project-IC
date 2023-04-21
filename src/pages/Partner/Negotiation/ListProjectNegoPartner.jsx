import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';

import DoNotDisturbOnOutlinedIcon from '@mui/icons-material/DoNotDisturbOnOutlined';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AssignmentLateTwoToneIcon from '@mui/icons-material/AssignmentLateTwoTone';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';

import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { DataGrid } from '@mui/x-data-grid';

import { useNavigate } from 'react-router-dom';
import Iconify from '../../../components/iconify/Iconify';
import DetailProjectNegoPartner from './DetailProjectNegoPartner';
import DetailCourseNegoPartner from './DetailCourseNeogoPartner';




function ListProjectNegoPartner(props) {
  const user = JSON.parse(sessionStorage.getItem('user'));
console.log("user", user)
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [project, setProject] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [showNego, setShowNego] = useState(false)
  const [deputy, setDeputy] = useState()


  const [course, setCourse] = useState()

    const [id, setID] = useState('');
  
    // const handleShowConfirm = (data) => {
    //   setID(data);
    //   setShowConfirm(true);
    // };
  
    const handleCloseConfirm = (data) => {
      setShowConfirm(false)
    };
    const handleViewNego = (data) => {
      setShowNego(true);
    setID(data)
    };
  const columns = [
 
    {
      field: 'projectName',
      headerName: 'Project Name',
      flex: 1,
    },

    {
      field: 'dateCreated',
      headerName: 'Date Create',
      flex: 1,
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
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
      field: 'fullName',
      headerName: 'Partner',
      flex: 1,
      renderCell: (params) => {return params.row.creater.fullName}
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,

      disableClickEventBubbling: true,

      renderCell: (params) => (
   
          <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" divider={<Divider orientation="vertical" flexItem />}>
            
            {params.row.projectStatus === 2 ? <Tooltip title="Project is canceled">
             
             <DoNotDisturbOnOutlinedIcon color='error' />

         </Tooltip>:params.row.projectStatus === 1 ? <Tooltip title="Completing the neogotiation">
             
             <CheckCircleOutlineTwoToneIcon color='success' />

         </Tooltip>: <>
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
         </>}
          </Stack>
         
        ),
    },
  ];


  const handleViewDetail = (data) => {
    setShowDetail(true);
    setProject(data);
  };

  const fetchData = async (id) => {
    await axios.get(`https://api.ic-fpt.click/api/v1/project/getAllProject`).then((response) => {
      
      setProjects(response.data.responseSuccess.filter((project) => project.partnerId === id));

    });
  };
  const fetchDataDeputy = async () => {
    await axios.get(`https://api.ic-fpt.click/api/v1/deputy/getAll`).then((response) => {

      fetchData(response.data.responseSuccess.find(dep => dep.accountId === user.id).partnerId)
      setDeputy(response.data.responseSuccess.find(dep => dep.accountId === user.id));
    });
  };
  useEffect(() => {
    fetchDataDeputy()
    fetchData()
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
           {projects?.length &&  <DataGrid
              autoHeight
              rows={projects}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
                sorting: {
                  sortModel: [{ field: "dateCreated", sort: "desc" }],
                   },
              }}
              components={{ NoRowsOverlay }}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
            />}
          </Box>
        </Card>
      </Container>
<DetailCourseNegoPartner show={showNego} close={() => setShowNego(false)} id={id}/>
      <DetailProjectNegoPartner show={showDetail} close={() => setShowDetail(false)} project={project} />



    </>
  );
}

export default ListProjectNegoPartner;

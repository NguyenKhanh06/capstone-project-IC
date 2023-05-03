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
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { visuallyHidden } from '@mui/utils';
import Iconify from '../../../components/iconify/Iconify';
import CreateSyllabus from './CreateSyllabus';
import DetailSyllabus from './DetailSyllabus';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';
import Loading from '../../Loading';

function DetailCourse(props) {
  const regex = /^[\w\s]*$/;
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [courseContent, setCourseContent] = useState('');
  const [description, setDescription] = useState('');
  const [disableBtn, setDisableBtn] = useState(false);
  const [skillName, setSkillName] = useState('');

  const [activity, setActivity] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [syllabuses, setSyllabuses] = useState([]);
  const [course, setCourse] = useState([]);
  const [syllabus, setSyllabus] = useState({});
  const [filterName, setFilterName] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfirmUpdate, setShowConfirmUpdate] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [id, setID] = useState(null)
  const [status, setStatus] = useState(null)

  const handleError = (data) => {
    setShowError(true);
    setMessage(data);
  };

  function reload() {
    window.location.reload(false);
  }
  const handleShowConfirm = (data) => {
    setShowConfirm(true);
  };

  const handleCloseConfirm = (data) => {
    setShowConfirm(false);
  };
  const handleShowConfirmUpdate = (id, status) => {
    setID(id)
    setStatus(status)
    setShowConfirmUpdate(true);
  };

  const handleCloseConfirmUpdate = (data) => {
    setShowConfirmUpdate(false);
  };
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleViewDetail = (data) => {
    setShowDetail(true);
    setSyllabus(data);
  };

  const handleClose = () => {
    setOpen(props.close);
  };



  const getDetail = () => {
    axios.get(`https://api.ic-fpt.click/api/v1/course/getDetail/${props.course.id}`).then((response) => {
      setCourse(response.data.responseSuccess[0]);
      setSyllabuses(response.data.responseSuccess[0]?.syllabus);

    });
  };

  useEffect(() => {
    getDetail();

    if (props.course) {
      setSyllabuses(props.course?.syllabus);
      setSkillName(props.course?.courseName);
      setActivity(props.course?.activity);
      setCourseContent(props.course?.content);
    }
  }, [props.course]);

  const handleUpdate = () => {
   
    axios
      .put(
        `https://api.ic-fpt.click/api/v1/course/update/${props.course.id}?Activity=${activity}&Content=${courseContent}&CourseName=${skillName}&Status=true&DateCreate=${props.course.dateCreated}`
      )
      .then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true);
          setTimeout(() =>{
            window.location.reload()
          }, 2000);
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
      });
  };
  const handleChangeStatus = () => {
    axios
      .put(
        `
https://api.ic-fpt.click/api/v1/syllabus/changeStatusSyllabus/${id}?Status=${status}`
      )
      .then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true);
      
        setTimeout(() =>{
          getDetail()
          handleCloseConfirmUpdate()
        }, 1000);
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
      });
  };
//   const handleChangeStatusDe = (id) => {
//     axios
//       .put(
//         `
// https://api.ic-fpt.click/api/v1/syllabus/changeStatusSyllabus/${id}?Status=false`
//       )
//       .then(getDetail());
//   };
  const columns = [
    {
      field: 'content',
      headerName: 'Syllabus Name',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Partner',
      flex: 1,
      valueGetter: (params) => {
       
        return params.row.partner?.name
      },
    },

    {
      field: 'dateCreated',
      headerName: 'Create Date',
      flex: 1,
      valueFormatter: (params) => dayjs(params?.value).format('DD/MM/YYYY'),
    },

    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <>{params.row?.status ? <Chip label="Active" color="success" /> : <Chip label="Deactive" color="error" />}</>
      ),
    },
    {
      headerName: 'Action',
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
          <Tooltip title="View Detail">
            <IconButton onClick={() => handleViewDetail(params.row)} aria-label="delete">
              <RemoveRedEyeRoundedIcon />
            </IconButton>
          </Tooltip>
          {params.row.status ? (
            <Tooltip title="Deactive syllabus">
              <IconButton onClick={() => handleShowConfirmUpdate(params.row.id, false)}>
                <HighlightOffOutlinedIcon color="error" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Active syllabus">
              <IconButton onClick={() => handleShowConfirmUpdate(params.row.id, true)}>
                <PublishedWithChangesOutlinedIcon color="success" />
              </IconButton>
            </Tooltip>
          )}

          {/* <Tooltip title="Create a copy">
              <IconButton onClick={() => handleChangeStatus(params.row.id)}>
                <ContentCopyOutlinedIcon  />
              </IconButton>
            </Tooltip> */}
        </Stack>
      ),
    },
  ];

  const handleChangeName = (e) => {
    setSkillName(e.target.value);
    if (e.target.value && skillName.trim().length) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  };
  const handleChangeAc = (e) => {
    setActivity(e.target.value);
    if (e.target.value && activity.trim().length) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  };
  const handleChangeContent = (e) => {
    setCourseContent(e.target.value);
    if (e.target.value && courseContent.trim().length) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  };
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={props.show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <DialogTitle id="alert-dialog-title">Detail Course</DialogTitle>
            <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
          <Divider variant="middle" />

          <DialogContent>
            <Stack direction="column" spacing={3.5} sx={{ padding: 2 }}>
              <TextField
                value={skillName}
                onChange={handleChangeName}
                required
                fullWidth
                label="Course Name"
              
              />
              <TextField
                value={activity}
                onChange={handleChangeAc}
                required
                fullWidth
                label="Activity"
                error={!regex.test(activity)}
                helperText={!regex.test(activity) && 'Can not input special character'}
              />
              <TextField
                value={courseContent}
                multiline
                rows={5}
                onChange={handleChangeContent}
                required
                fullWidth
                label="Description"
                inputProps={{
                  maxLength: 1000,
                 
                }}
 
              />
            </Stack>

            <DialogActions style={{ padding: 10 }}>
              {disableBtn && regex.test(activity)  ? (
                <Button variant="contained" onClick={() => setShowConfirm(true)} autoFocus>
                  Save
                </Button>
              ) : (
                <Button disabled variant="contained" onClick={() => setShowConfirm(true)} autoFocus>
                  Save
                </Button>
              )}
            </DialogActions>
            <Divider variant="middle" />
            <Box style={{ marginTop: 20 }}>
              <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                  <Typography variant="h4" gutterBottom>
                    Syllabus
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={() => setShowCreate(true)}
                  >
                    New Syllabus
                  </Button>
                </Stack>

                <Card>
{syllabuses &&                   <DataGrid
                    autoHeight
                    rows={syllabuses}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 10,
                        },
                      },
                      sorting: {
                        sortModel: [{ field: 'dateCreated', sort: 'desc' }],
                      },
                    }}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                  />}
                </Card>
              </Container>
            </Box>
          </DialogContent>
        </form>
        <Dialog
          open={showConfirm}
          onClose={handleCloseConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Update Course</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">You Want To Update Course?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm}>Cancel</Button>
            <Button variant="contained" onClick={() => handleUpdate()} autoFocus>
              Accept
            </Button>
          </DialogActions>
          <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Update Course Successful!'} />
          <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
        </Dialog>
        <Dialog
          open={showConfirmUpdate}
          onClose={handleCloseConfirmUpdate}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Update Syllabus</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">You Want To Update Syllabus?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmUpdate}>Cancel</Button>
            <Button variant="contained" onClick={() =>  handleChangeStatus()} autoFocus>
              Accept
            </Button>
          </DialogActions>
          <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Update Status Successful!'} />
          <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
        </Dialog>
        <DetailSyllabus
          show={showDetail}
          close={() => setShowDetail(false)}
          syllabus={syllabus}
          getDetail={getDetail}
        />

        <CreateSyllabus
          show={showCreate}
          close={() => setShowCreate(false)}
          courseID={props.course.id}
          getDetail={() => getDetail()}
          setSyllabus={setSyllabus}
        />
      </Dialog>
    </div>
  );
}

export default DetailCourse;

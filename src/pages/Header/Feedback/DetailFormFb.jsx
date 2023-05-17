import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    IconButton,
    Paper,
    Stack,
    TextField,
    Tooltip,
    Typography,
  } from '@mui/material';
  import React, { useEffect, useState } from 'react';
  import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
  import { DataGrid } from '@mui/x-data-grid';
  import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
  import DetailStudentRegister from '../Student/DetailStudentRegister';
  import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import dayjs from 'dayjs';
  import SuccessAlert from '../../Alert/SuccessAlert';
  import ErrorAlert from '../../Alert/ErrorAlert';
  import axios from 'axios';
  import DeleteIcon from '@mui/icons-material/Delete';
  import DetailStudentRegisterDetail from '../Student/DetailStudentRegisterDetail';
  import { API_URL } from '../../../config/apiUrl/apis-url';
import DetailFeedBack from './DetailFeedBack';
  
  function DetailFormFb(props) {
    const [disableBtn, setDisable] = useState(false);
    const [disableBtn1, setDisable1] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');
    const [childForm, setChildForm] = useState(null);
    const [open, setOpen] = useState(false);
    const [showRegis, setShowRegis] = useState(false);
    const [form, setForm] = useState([]);
    const [openRegis, setOpenRegis] = useState(null);
    const [closeRegis, setCloseRegis] = useState(null);
    const [detailForm, setDetailForm] = useState([]);
    const [des, setDes] = useState('')
  const [title, setTitle] = useState('')
    const [inputList, setInputList] = useState([]);
  
    // handle input change
    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
    };
  
    // handle click event of the Remove button
    const handleRemoveClick = (index) => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    };
  
    // handle click event of the Add button
    const handleAddClick = () => {
      setInputList([...inputList, { title: '' }]);
    };
  
    const handleClose = () => {
      setOpen(props.close);
    };
    const columns = [
      {
        field: 'fullName',
        headerName: 'Full Name',
        flex: 1,
        valueGetter: (params) => {
          return params.row?.registration?.student?.fullName;
        },
      },
  
      {
        field: 'rollNumber',
        headerName: 'Roll Number',
        flex: 1,
        valueGetter: (params) => {
          return params.row?.registration?.student?.rollNumber;
        },
      },
  
      {
        field: 'email',
        headerName: 'Email',
        flex: 2,
        valueGetter: (params) => {
          return params.row?.registration?.student?.email;
        },
      },
  
      {
        field: 'phoneNumber',
        headerName: 'phoneNumber',
        flex: 1,
        valueGetter: (params) => {
          return params.row?.registration?.student?.phoneNumber;
        },
      },
      {
        field: 'address',
        headerName: 'Address',
        flex: 1,
        valueGetter: (params) => {
          return params.row?.registration?.student?.address;
        },
      },
      {
        field: 'action',
        headerName: 'Action',
        flex: 1,
        disableClickEventBubbling: true,
  
        renderCell: (params) => (
          <Tooltip title="View detail">
            <IconButton onClick={() => handleClickOpenDetailRegis(params.row)} aria-label="delete">
              <RemoveRedEyeRoundedIcon />
            </IconButton>
          </Tooltip>
        ),
      },
    ];
    const handleError = (data) => {
      setShowError(true);
      setMessage(data);
    };
    const handleSuccess = (data) => {
      setShowSuccess(true);
      setMessage(data);
    };
    const handleClickOpenDetailRegis = (data) => {
      setShowRegis(true);
      setForm(data);
    };
    const handleCloseConfirm = (data) => {
      setShowConfirm(false);
    };
    const updateDate = () => {
      axios({
        method: 'PUT',
  
        url: `${API_URL}/registration/UpdateRegisId/${props.form?.id}?DateOpenRegis=${openRegis}&DateCloseRegis=${closeRegis}&ProjectId=${props.form?.project?.id}`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          if (response.data.isSuccess) {
            handleSuccess('Update successful!');
  
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        })
        .catch((err) => {
          handleError('Update fail!!!!');
        });
    };
  
    const getChildForm = async () => {
      axios.get(`${API_URL}/feedback/getChildFb/${props.form?.id}`).then((response) => {
        setChildForm(response.data.responseSuccess);
  
      });
    };
  
    const getDetail = async () => {
      axios.get(`${API_URL}/feedback/getDetailByRes/${props.form.registrationId}`).then((response) => {

        setDetailForm(response.data.responseSuccess[0]);

      });
    };

  
    useEffect(() => {
      if (props.form) {
        setDes(props.form?.description)
        setTitle(props.form?.title)
        getChildForm();
        getDetail();
      }
    }, [props.form]);
  
    const removeQuestion = (id) => {
      axios
        .post(`${API_URL}/feedback/deleteQuestion/${props.form.id}?questionId=${id}`)
        .then((response) => {
          if (response.data.isSuccess) {
            handleSuccess('Delete question successful!');
  
            getDetail();
          }
        })
        .catch((err) => {
          handleError('Delete fail!!!!');
        });
    };
    const CreateOptionQuestion = () => {

      const formData = new FormData();
      formData.append('FeedBackId', props.form.id);
      inputList.map((ques) => formData.append('Question', ques.title));
  
      axios({
        method: 'POST',
        data: formData,
        url: `${API_URL}/feedback/createQuestion`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          if (response.data.isSuccess) {
            handleSuccess('Create question successful!');
            getDetail();
          }
        })
        .catch((err) => {
          handleError('Create fail!!!!');
        });
    };

    const UpdateFb = () =>{
      const data = {

        "title": title,
        "description": des,
  
        "status": true,
        "registrationId": props.form.registrationId
      }
      axios.put(`${API_URL}/feedback/UpdateFeedBackId/${props.form.id}`, data) .then((response) => {
        if (response.data.isSuccess) {
          handleSuccess('Update successful!');

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((err) => {
        handleError('Update fail!!!!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
    }

    return (
      <Dialog
        open={props.show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <DialogTitle id="alert-dialog-title">Detail Form Feedback</DialogTitle>
          <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>
        <Divider variant="middle" />
        <DialogContent>
      
          <Stack direction={'column'} justifyContent="space-evenly" alignItems="flex-start" spacing={2} flexWrap="wrap">
        
          <TextField fullWidth value={title} onChange={(e) => {setTitle(e.target.value); if(title.trim().length){
            setDisable(true)
          }}} label="Form's Title"/>
            <TextField fullWidth value={des} onChange={(e) => {setDes(e.target.value); if(des.trim().length){
            setDisable(true)
          }}} label="Form's description"/>
            <Divider sx={{ marginTop: 5 }} variant="middle" />
            <Typography variant="h6">Basic Information</Typography>
            <ol style={{ display: 'flex', flexDirection: 'column', gap: 3, marginLeft: '20px', marginBottom: '20px' }}>
              <li>Feedback about program</li>
            </ol>
          </Stack>
  
          <Divider sx={{ marginTop: 5 }} variant="middle" />
          <Stack direction={'column'} justifyContent="space-evenly" alignItems="flex-start" spacing={2} flexWrap="wrap">
            <Typography variant="h6">Addition Field</Typography>
            {detailForm?.feedBackAddOns?.map((form, index) => (
              <Stack justifyContent="center" alignItems="center" direction="row" spacing={2} key={index}>
                <Typography>{form?.question}</Typography>
                <Tooltip title="Delete question">
                  <IconButton onClick={() => removeQuestion(form.id)} aria-label="delete">
                    <DeleteIcon color="error" />
                  </IconButton>
                </Tooltip>
              </Stack>
            ))}
            <Divider sx={{ marginTop: 5 }} variant="middle" />
  
            <Typography sx={{ marginTop: 3, marginBottom: 3 }} variant="h6">
              Add more filed
            </Typography>
            <Button sx={{ marginBottom: 5 }} variant="contained" onClick={handleAddClick}>
              Add Field
            </Button>
          </Stack>
  
          {inputList.length
            ? inputList.map((x, i) => (
                <Stack direction="column" spacing={2} key={i} style={{ marginTop: 4 }}>
                  <Divider sx={{ marginTop: 2 }} variant="middle" />
  
                  <TextField
                    name="title"
                    placeholder="Enter Title"
                    value={x.title}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                  <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                    {inputList.length && (
                      <Button variant="contained" color="error" onClick={() => handleRemoveClick(i)}>
                        Remove
                      </Button>
                    )}
                  </Stack>
                </Stack>
              ))
            : null}
          {(inputList.length && (
            <Button sx={{ marginTop: 5 }} variant="contained" onClick={() => CreateOptionQuestion()}>
              Add Question
            </Button>
          )) || <></>}
          <Divider sx={{ marginTop: 5 }} variant="middle" />
  
          <Typography sx={{ marginTop: 6, marginBottom: 4 }} variant="h6">
            Total Feedback :  {childForm?.length}
          </Typography>
  
          {childForm && (
            <DataGrid
              autoHeight
              rows={childForm}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
            />
          )}
        </DialogContent>
        <DialogActions>
          {disableBtn  ? (
            <Button variant="contained" onClick={() => setShowConfirm(true)}>
              Save
            </Button>
          ) : (
            <Button disabled variant="contained">
              Save
            </Button>
          )}
        </DialogActions>
        <Dialog
          open={showConfirm}
          onClose={handleCloseConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Update Form</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">You Want To Update Form?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm}>Cancel</Button>
            <Button variant="contained" onClick={() => UpdateFb()} autoFocus>
              Accept
            </Button>
          </DialogActions>
          <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={message} />
          <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
        </Dialog>
        <DetailFeedBack show={showRegis} close={() => setShowRegis(false)} form={form} />
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={message} />
          <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      </Dialog>
    );
  }
  
  export default DetailFormFb;
  
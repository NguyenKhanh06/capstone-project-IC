import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import ErrorAlert from '../../Alert/ErrorAlert';
import SuccessAlert from '../../Alert/SuccessAlert';
import Loading from '../../Loading';

function CreateForm(props) {
    const [inputList, setInputList] = useState([]);
    const [projects, setProjects] = useState([])
    const [project, setProject] = useState([])

    // handle input change
    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
    };
  
    // handle click event of the Remove button
    const handleRemoveClick = index => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    };
  
    // handle click event of the Add button
    const handleAddClick = () => {
      setInputList([...inputList, { title: "" }]);
    };
  
  const [open, setOpen] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const handleError = (data) => {
    setShowError(true);
    setMessage(data);
  };

  function reload() {
    window.location.reload(false);
  }
  const handleClose = () => {
    setOpen(props.close);
  };
  const fetchDataPrj = async () => {
    setLoading(true);
    await axios.get(`https://localhost:7115/api/v1/project/getAllProject`).then((response) => {
   
      setProjects(response.data.responseSuccess);
      setLoading(false);
    });
  };
  useEffect(() => {
  fetchDataPrj()

    // free memory when ever this component is unmounted
  }, []);
const handleCreateForm2 = () => {
    axios.post(`https://localhost:7115/api/v1/registration/create?ProjectId=${project}&ContentHeader1=${inputList[0].title}`).then((response) => {
          if (response.data.isSuccess) {
            setShowSuccess(true);
            setTimeout(reload(), 5000);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
  
          handleError(err?.response?.data.responseSuccess);
        });
  
}
const handleCreateForm3 = () => {
  axios.post(`https://localhost:7115/api/v1/registration/create?ProjectId=${project}&ContentHeader1=${inputList[0].title}&ContentHeader2=${inputList[1].title}`).then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true);
          setTimeout(reload(), 5000);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);

        handleError(err?.response?.data.responseSuccess);
      });

}
const handleCreateForm4 = () => {
  axios.post(`https://localhost:7115/api/v1/registration/create?ProjectId=${project}&ContentHeader1=${inputList[0].title}&ContentHeader2=${inputList[1].title}&ContentHeader3=${inputList[2].title}`).then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true);
          setTimeout(reload(), 5000);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);

        handleError(err?.response?.data.responseSuccess);
      });

}
const handleCreateForm5 = () => {
  axios.post(`https://localhost:7115/api/v1/registration/create?ProjectId=${project}&ContentHeader1=${inputList[0].title}&ContentHeader2=${inputList[1].title}&ContentHeader3=${inputList[2].title}&ContentHeader4=${inputList[3].title}`).then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true);
          setTimeout(reload(), 5000);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);

        handleError(err?.response?.data.responseSuccess);
      });

}
const handleCreateForm6 = () => {
  axios.post(`https://localhost:7115/api/v1/registration/create?ProjectId=${project}&ContentHeader1=${inputList[0].title}&ContentHeader2=${inputList[1].title}&ContentHeader3=${inputList[2].title}&ContentHeader4=${inputList[3].title}&ContentHeader5=${inputList[4].title}`).then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true);
          setTimeout(reload(), 5000);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);

        handleError(err?.response?.data.responseSuccess);
      });

}
  const handleCreateForm = () => {
    console.log(inputList)
    axios.post(`https://localhost:7115/api/v1/registration/create?ProjectId=${project}
    `).then((response) => {
          if (response.data.isSuccess) {
            setShowSuccess(true);
            setTimeout(reload(), 5000);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
  
          handleError(err?.response?.data.responseSuccess);
        });
    // setLoading(true);
    // axios
    //   .post(
    //     `https://localhost:7115/api/v1/syllabus/create?Content=${content}&Description=${description}&CourseId=${props.courseID}`
    //   )
    //   .then((response) => {
    //     if (response.data.isSuccess) {
    //       setShowSuccess(true);
    //       setTimeout(reload(), 5000);
    //     }
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     setLoading(false);

    //     handleError(err?.response?.data.responseSuccess);
    //   });
  };

  const handleCreate = () =>{
   
    if(inputList.length === 1){
      handleCreateForm2()
    }else if(inputList.length === 2){
      handleCreateForm3()
    }else if(inputList.length === 3){
      handleCreateForm4()
    }else if(inputList.length === 4){
      handleCreateForm4()
    }else if(inputList.length === 5){
      handleCreateForm6()
    }else {
      handleCreateForm()
    }
  }
  const ITEM_HEIGHT = 46;
  const MOBILE_ITEM_HEIGHT = 58;
  const ITEM_PADDING_TOP = 18;
  const MENU_ITEMS = 6;
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="md"
        open={props.show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <DialogTitle id="alert-dialog-title">Create Form</DialogTitle>
          <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>
        <Divider variant="middle" />

        <DialogContent>
          <Paper>
            <Stack direction={'column'} justifyContent="space-evenly" alignItems="flex-start" spacing={2} flexWrap="wrap">
            <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-autowidth-label">Project</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      displayEmpty
                      label="Project"
                      value={project}
                      name="course"
                      onChange={(e) => setProject(e.target.value)}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            maxHeight: {
                              xs: MOBILE_ITEM_HEIGHT * MENU_ITEMS + ITEM_PADDING_TOP,
                              sm: ITEM_HEIGHT * MENU_ITEMS + ITEM_PADDING_TOP
                            }
                          }
                        }
                      }}
                    >
                      {projects.map((project, index) => (
                        <MenuItem
                          style={{ display: 'flex', justifyContent: 'space-between', direction: 'row' }}
                          key={index}
                          value={project.id}
                        >
                          {project.projectName}
                        
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
             <Typography variant='h6'>Basic Information (You can not change that filed)</Typography>
             <ol style={{display: "flex", flexDirection: "column", gap: 3}}>
                <li>Student Name</li>
                <li>Roll Number</li>
                <li>Major</li>
                <li>Date of birth</li>
                <li>Phone Number</li>
                <li>Passport Number</li>
                <li>Expiration Date</li>
                <li>Social Link</li>
                <li>Passport Image</li>
                <li>Payment Image</li>
             </ol>
            </Stack>
          </Paper>
        <Divider sx={{marginTop: 5}} variant="middle" />

          <Typography  sx={{marginTop: 3, marginBottom: 3}} variant='h6'>Add more filed (You can add maximum 5 field)</Typography>
          { inputList.length < 5 && <Button sx={{marginBottom: 5}} variant='contained' onClick={handleAddClick}>Add Field</Button>}
  

          {inputList.length ? (inputList.map((x, i) => (
   
          <Stack direction="column" spacing={2} key={i} style={{marginTop: 4}}>
        <Divider sx={{marginTop: 2}} variant="middle" />
               
            <TextField
              name="title"
              placeholder="Enter Title"
              value={x.title}
              onChange={e => handleInputChange(e, i)}
            />
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
         
              {inputList.length && <Button variant='contained' color='error'
       
                onClick={() => handleRemoveClick(i)}>Remove</Button>}
        
            </Stack>
          </Stack>
        
      ))) : null}
        </DialogContent>
        <DialogActions style={{ padding: 20 }}>
        {/* <Button variant="contained" onClick={() => handleCreate()} autoFocus>
              Create Form
            </Button> */}
          { project.length ? (
            <Button variant="contained"  onClick={() => handleCreate()} autoFocus>
              Create Form
            </Button>
          ) : (
            <Button disabled variant="contained" autoFocus>
              Create Form
            </Button>
          )}
        </DialogActions>
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Create Form Successful!'} />
        <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />

        <Loading show={loading} />
      </Dialog>
    </div>
  );
}

export default CreateForm;

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
import { API_URL } from '../../../config/apiUrl/apis-url';

import ErrorAlert from '../../Alert/ErrorAlert';
import SuccessAlert from '../../Alert/SuccessAlert';
import Loading from '../../Loading';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function CreateFormFb(props) {
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');
  const [inputList, setInputList] = useState([]);
  const [forms, setForms] = useState([]);
  const [form, setForm] = useState([]);

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
  const fetchDataForm = async () => {
    setLoading(true);
    await axios.get(`${API_URL}/registration/getRootRegis`).then((response) => {
      setForms(response.data.responseSuccess);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchDataForm();

    // free memory when ever this component is unmounted
  }, []);

  const handleCreateForm = () => {
    const formData = new FormData();
    formData.append('Title', title);
    formData.append('Description', des);
    formData.append('RegistrationId', form);
    formData.append('Status', true);
    formData.append('DateCreated', dayjs(new Date()));
    inputList.map((question) => formData.append('AddMoreQuestion', question.title));

    axios({
      method: 'POST',
      data: formData,
      url: `${API_URL}/feedback/create`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true);
          setTimeout(() => {
            window.location.reload();
            setShowSuccess(false);
          }, 1000);
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
    //     `${API_URL}/syllabus/create?Content=${content}&Description=${description}&CourseId=${props.courseID}`
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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-autowidth-label">Form Feedback</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              displayEmpty
              label="Registartion Form"
              value={form}
              name="form"
              onChange={(e) => setForm(e.target.value)}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: {
                      xs: MOBILE_ITEM_HEIGHT * MENU_ITEMS + ITEM_PADDING_TOP,
                      sm: ITEM_HEIGHT * MENU_ITEMS + ITEM_PADDING_TOP,
                    },
                  },
                },
              }}
            >
              {forms.map((form, index) => (
                <MenuItem
                  style={{ display: 'flex', justifyContent: 'space-between', direction: 'row' }}
                  key={index}
                  value={form.id}
                >
                  {form.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Paper>
            <Stack
              direction={'column'}
              justifyContent="space-evenly"
              alignItems="flex-start"
              spacing={2}
              flexWrap="wrap"
            >
              <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                fullWidth
                multiline
                sx={{ marginTop: 5 }}
                label="Form's title"
              />
              <TextField
                value={des}
                onChange={(e) => setDes(e.target.value)}
                required
                fullWidth
                multiline
                sx={{ marginTop: 5 }}
                label="Form's Description"
              />
            </Stack>
            <Stack
              direction={'column'}
              justifyContent="space-evenly"
              alignItems="flex-start"
              spacing={2}
              flexWrap="wrap"
              sx={{marginTop: 5}}
            >
              <Typography variant="h6">Basic Information (You can not change that filed)</Typography>
              <ol
                style={{ display: 'flex', flexDirection: 'column', gap: 3, marginLeft: '20px', marginBottom: '20px' }}
              >
                <li>Feedback about program</li>
              </ol>
            </Stack>
          </Paper>
          <Divider sx={{ marginTop: 5 }} variant="middle" />

          <Typography sx={{ marginTop: 3, marginBottom: 3 }} variant="h6">
            Add more filed
          </Typography>
          <Button sx={{ marginBottom: 5 }} variant="contained" onClick={handleAddClick}>
            Add Field
          </Button>

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
        </DialogContent>
        <DialogActions style={{ padding: 20 }}>
          {/* <Button variant="contained" onClick={() => handleCreate()} autoFocus>
                Create Form
              </Button> */}
          {form.length && title.trim().length && des.trim().length ? (
            <Button variant="contained" onClick={() => handleCreateForm()} autoFocus>
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
      </Dialog>
      <Loading show={loading} />
    </div>
  );
}

export default CreateFormFb;

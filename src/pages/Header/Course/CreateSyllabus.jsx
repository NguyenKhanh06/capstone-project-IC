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
  Select,
  Stack,
  TextField,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import ErrorAlert from '../../Alert/ErrorAlert';
import SuccessAlert from '../../Alert/SuccessAlert';
import Loading from '../../Loading';
import { API_URL } from '../../../config/apiUrl/apis-url';

function CreateSyllabus(props) {
  
  const regex = /^[\w\s]*$/
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [partner, setPartner] = useState(null);

  const [description, setDescription] = useState('');
  const [note, setNote] = useState('');
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const handleError = (data) => {
    setShowError(true);
    setMessage(data);
  };


  const handleClose = () => {
    setOpen(props.close);
  };



  const fetchDataPartner = async () => {
    await axios.get(`${API_URL}/partner/getAllPartner`).then((response) => {
      setPartners(response.data.responseSuccess);
    });
  };


  const handleCreateSyllabus = () => {
    setLoading(true);
    axios
      .post(
        `${API_URL}/syllabus/create?Content=${content}&Description=${description}&CourseId=${props.courseID}&PartnerId=${partner}&Note=${note}`
      )
      .then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true);
          setTimeout(() => {
            handleClose();

          }, 1000)
          setContent('');
          setDescription('');
          props.getDetail();
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);

        handleError(err?.response?.data.responseSuccess);
      });
  };
  useEffect(() => {
    fetchDataPartner();

  }, []);
  const handleOnChangePartner = (e) => {
    setPartner(e.target.value);
   
  };

  const ITEM_HEIGHT = 46;
  const MOBILE_ITEM_HEIGHT = 58;
  const ITEM_PADDING_TOP = 18;
  const MENU_ITEMS = 6;
  return (
    <form id="create">
      <Dialog
        fullWidth
        maxWidth="md"
        open={props.show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <DialogTitle id="alert-dialog-title">Create Syllabus</DialogTitle>
          <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>
        <Divider variant="middle" />

        <DialogContent>
          <Stack direction="column" spacing={3.5} sx={{ padding: 2 }}>
            <TextField
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              fullWidth
              label="Syllabus Name"
              inputProps={{
                maxLength: 255,
               
              }}
           
            />
            <TextField
            required
              value={description}
              multiline
              rows={5}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              label="Description"
              inputProps={{
                maxLength: 1000,
               
              }}
             
            />
            <TextField
            required
              value={note}
              multiline
              rows={5}
              onChange={(e) => setNote(e.target.value)}
              fullWidth
              label="Note"
              inputProps={{
                maxLength: 1000,
               
              }}
             
            />
              <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Partner</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={partner}
                        label="Partner"
                        onChange={handleOnChangePartner}
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
                        {partners.map((partner, index) => (
                          <MenuItem key={index} value={partner.id}>
                            {partner.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions style={{ padding: 20 }}>
          {content.trim() && description.trim().length && partner ? (
            <Button variant="contained" onClick={() => handleCreateSyllabus()} autoFocus>
              Create Syllabus
            </Button>
          ) : (
            <Button disabled variant="contained" autoFocus>
              Create Syllabus
            </Button>
          )}
        </DialogActions>
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Create Syllabus Successful!'} />
        <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />

        <Loading show={loading} />
      </Dialog>
    </form>
  );
}

export default CreateSyllabus;

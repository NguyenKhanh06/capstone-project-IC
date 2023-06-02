import {
  Autocomplete,
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
  Tooltip,
  Typography,
} from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import React, { useEffect, useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import axios from 'axios';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';
import Loading from '../../Loading';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { API_URL } from '../../../config/apiUrl/apis-url';
import { DataGrid } from '@mui/x-data-grid';
import DetailPhase from './DetailPhase';

function CreatePharse(props) {
  const [inputList, setInputList] = useState([]);
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState([]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
  const handleInputChangeDate = (e, index) => {
    // const { name, value } = e;
    const list = [...inputList];
    list[index][e.name] = e.value;
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
    setInputList([...inputList, { title: '', fromDate: null, toDate: null }]);
  };

  const [open, setOpen] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [phases, setPhases] = useState([]);
  const [phasesPrj, setPhasesPrj] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccessUpdate, setShowSuccessUpdate] = useState(false);
  const [showErrorUpdate, setShowErrorUpdate] = useState(false);
  const [showSuccessAss, setShowSuccessAss] = useState(false);
  const [showErrorAss, setShowErrorAss] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [idPhase, setIdPhase] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [phase, setPhase] = useState('');
  const [checkPhase, setCheckPhase] = useState(false);
  const [formDatePhase, setFromPhase] = useState(null);
  const [toDatePhase, setToPhase] = useState(null);

  const handleViewDetail = (id) => {
    setViewDetail(true);
    setIdPhase(id);
  };

  const handleError = (data) => {
    setShowError(true);
    setMessage(data);
  };
  const handleErrorAss = (data) => {
    setShowErrorAss(true);
    setMessage(data);
  };
  const handleSuccessAss = (data) => {
    setShowSuccessAss(true);
    setMessage(data);
  };
  const handleErrorUpdate = (data) => {
    setShowErrorUpdate(true);
    setMessage(data);
  };
  const handleSuccessUpdate = (data) => {
    setShowSuccessUpdate(true);
    setMessage(data);
  };
  function reload() {
    window.location.reload(false);
  }

  const handleClose = () => {
    setOpen(props.close);
  };

  const handleCloseCreate = () => {
    setCreateNew(false);
  };
  const getPhase = async () => {
    await axios.get(`${API_URL}/phase/getAllPhase`).then((response) => {
      setPhases(response.data.responseSuccess);
    });
  };
  const getPhaseById = async () => {
    await axios.get(`${API_URL}/phase/getPhaseByProjectId/${props?.project?.id}`).then((response) => {
      setPhasesPrj(response.data.responseSuccess);
    });
  };

  const handleChangeSelect = (event, value) => setSelectedOptions(value);
  const assignPhase = () => {
    const formData = new FormData();
    formData.append('PhaseName', title);
    formData.append('DateBegin', formDatePhase.add(1, 'day'));
    formData.append('DateEnd', toDatePhase.add(1, 'day'));
    axios({
      method: 'POST',
      data: formData,
      url: `${API_URL}/phase/addPhase/${props?.project?.id}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (response.data.isSuccess) {
          handleSuccessAss('Create phase successful!');
          getPhaseById();
          setTimeout(() => {
            handleCloseCreate();
            setShowSuccessAss(false);
          }, 2000);
          getPhase();
          // setTimeout(() => {
          //   setShowSuccessAss(false);
          // }, 2000);
        }
      })
      .catch((err) => {
        handleErrorAss('Create phase fail!!!!');
        setTimeout(() => {
          setShowErrorAss(false);
        }, 2000);
      });
  };
  const assignPhase2 = () => {
    const formData = new FormData();
    formData.append('PhaseId', phase);
    axios({
      method: 'POST',
      data: formData,
      url: `${API_URL}/phase/addPhase/${props?.project?.id}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (response.data.isSuccess) {
          handleSuccessAss('Create phase successful!');
          getPhaseById();
          setTimeout(() => {

            setShowSuccessAss(false);
          }, 2000);
          getPhase();
          // setTimeout(() => {
          //   setShowSuccessAss(false);
          // }, 2000);
        }
      })
      .catch((err) => {
        handleErrorAss('Create phase fail!!!!');
        setTimeout(() => {
          setShowErrorAss(false);
        }, 2000);
      });
  };
  const UnassignPhase = (id) => {
    axios
      .post(
        `${API_URL}/phase/removePhase/${props?.project?.id}?phaseId=${id}
  `
      )
      .then((response) => {
        if (response.data.isSuccess) {
          handleSuccessAss('Unassign successful!');
          getPhaseById();
          setTimeout(() => {
            setShowSuccessAss(false);
          }, 2000);
        }
      })
      .catch((err) => {
        handleErrorAss('Unassign fail!!!!');
        setTimeout(() => {
          setShowErrorAss(false);
        }, 2000);
      });
  };

  const ChangePhaseDate = (id) => {
    const formData = new FormData();
    formData.append('ProjectId', props?.project?.id);
    formData.append('PhaseId', id);
    if(idPhase?.dateBegin !== null && idPhase?.dateBegin !== null){
      formData.append('DateBegin', fromDate);
      formData.append('DateEnd', toDate);
    }else{
      formData.append('DateBegin', fromDate.add(1, 'day'));
      formData.append('DateEnd', toDate.add(1, 'day'));
    }
 
    axios({
      method: 'PUT',
      data: formData,
      url: `${API_URL}/phase/changePhaseDate`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (response.data.isSuccess) {
          handleSuccessUpdate('Update successful!');
          setTimeout(() => {
            setViewDetail(false);
            setShowSuccessUpdate(false);
          }, 2000);
          getPhaseById();
        }
      })
      .catch((err) => {
        handleErrorUpdate('Update fail!!!!');

        setTimeout(() => {
          setViewDetail(false);
          setShowErrorUpdate(false);
        }, 2000);
      });
  };
  useEffect(() => {
    getPhase();
    getPhaseById();
  }, [props.project]);
  useEffect(() => {
    setFromDate(idPhase?.dateBegin);
    setToDate(idPhase?.dateEnd);
  }, [idPhase]);

  const columns = [
    {
      field: 'phaseName',
      headerName: 'Phase Name',
      flex: 1,
      valueGetter: (params) => {
        return params.row?.phase?.phaseName;
      },
    },

    {
      field: 'dateBegin',
      headerName: 'Date Begin',
      flex: 1,
      valueFormatter: (params) => dayjs(params?.value).format('DD/MM/YYYY'),
    },
    {
      field: 'dateEnd',
      headerName: 'Date End',
      flex: 1,
      valueFormatter: (params) => dayjs(params?.value).format('DD/MM/YYYY'),
    },

    {
      headerName: 'Action',
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
            <Tooltip title="View Detail">
              <IconButton aria-label="delete" onClick={() => handleViewDetail(params.row)}>
                <RemoveRedEyeRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Unassign">
              <IconButton onClick={() => UnassignPhase(params.row.phaseId)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
    },
  ];
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
        <form>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <DialogTitle id="alert-dialog-title">Assign Project Phase</DialogTitle>
            <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
          <Divider variant="middle" />
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Phase</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={phase}
                label="Phase"
                onChange={(e) => {
                  setPhase(e.target.value);
                }}
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
                <em>
                  <Button
                    onClick={() => setCreateNew(true)}
                    size="small"
                    fullWidth
                    endIcon={<AddOutlinedIcon />}
                    variant="contained"
                  >
                    Create New Phase
                  </Button>
                </em>
                {phases
                  .filter((elem) => !phasesPrj.some((ele) => ele.phaseId === elem.id))
                  .map((phase) => (
                    <MenuItem value={phase.id}>{phase.phaseName}</MenuItem>
                  ))}
              </Select>
            </FormControl>
            <DataGrid
              autoHeight
              style={{ marginTop: 20 }}
              rows={phasesPrj}
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
          </DialogContent>

          <DialogActions style={{ padding: 20 }}>
            {phase ?  <Button variant="contained" onClick={() => assignPhase2()} autoFocus>
              New Phase
            </Button> :  <Button disabled variant="contained" onClick={() => assignPhase2()} autoFocus>
              New Phase
            </Button>}
           
            {/* <Button variant="contained" onClick={() => assignPhase()} autoFocus>
              Add Phase
            </Button> */}
          </DialogActions>
        </form>

        <Dialog
          fullWidth
          maxWidth="md"
          open={createNew}
          onClose={handleCloseCreate}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <DialogTitle id="alert-dialog-title">Create Project Phase</DialogTitle>
              <IconButton style={{ marginRight: 6 }} onClick={() => handleCloseCreate()}>
                <CloseOutlinedIcon />
              </IconButton>
            </Stack>
            <Divider variant="middle" />
            <DialogContent>
              <Stack direction="column" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                {/* <Autocomplete
              multiple
              id="tags-outlined"
              options={phases.filter((elem) => !phasesPrj.some((ele) => ele.phaseId === elem.id))}
              getOptionLabel={(option) => option.phaseName}
              onChange={handleChangeSelect}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} label="Phase" placeholder="Phase" />}
            /> */}
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="Phase's title"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disablePast
                      fullWidth
                      label="From date"
                      value={dayjs(formDatePhase)}
                      onChange={(newValue) => {
                        setFromPhase(newValue);
                      }}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>
                  <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disablePast
                      minDate={dayjs(formDatePhase)}
                      fullWidth
                      label="To date"
                      value={dayjs(toDatePhase)}
                      onChange={(newValue) => {
                        setToPhase(newValue);
                      }}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>
                </Stack>
              </Stack>
            </DialogContent>

            <DialogActions style={{ padding: 20 }}>
              {title.trim().length && formDatePhase && toDatePhase ?  <Button variant="contained" onClick={() => assignPhase()} autoFocus>
                Create Phase
              </Button> :  <Button variant="contained" disabled onClick={() => assignPhase()} autoFocus>
                Create Phase
              </Button>}
             
            </DialogActions>
          </form>
          <SuccessAlert show={showSuccessAss} close={() => setShowSuccess(false)} message={message} />
          <ErrorAlert show={showErrorAss} close={() => setShowError(false)} message={message} />
        </Dialog>
        <Dialog
          fullWidth
          maxWidth="md"
          open={viewDetail}
          onClose={() => setViewDetail(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <DialogTitle id="alert-dialog-title">{idPhase?.phase?.phaseName}</DialogTitle>
            <IconButton style={{ marginRight: 6 }} onClick={() => setViewDetail(false)}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
          <Divider variant="middle" />
          <DialogContent>
            {/* <Typography>{idPhase?.phase?.phaseName}</Typography> */}
            {/* <TextField id="outlined-basic" fullWidth label="Phase's title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} /> */}
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
              <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                <DatePicker
                  disablePast
                  sx={{ width: '40%' }}
                  label="From date"
                  value={dayjs(fromDate)}
                  onChange={(newValue) => {
                    setFromDate(newValue);
                  }}
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
              <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                <DatePicker
                  disablePast
                  minDate={dayjs(fromDate)}
                  sx={{ width: '40%' }}
                  label="To date"
                  value={dayjs(toDate)}
                  onChange={(newValue) => {
                    setToDate(newValue);
                  }}
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
            </Stack>
          </DialogContent>

          <DialogActions style={{ padding: 20 }}>
            <Button onClick={() => ChangePhaseDate(idPhase?.phaseId)} variant="contained" autoFocus>
              Update Date
            </Button>
          </DialogActions>

          <SuccessAlert show={showSuccessUpdate} close={() => setShowSuccessUpdate(false)} message={message} />
          <ErrorAlert show={showErrorUpdate} close={() => setShowErrorUpdate(false)} message={message} />
        </Dialog>
        <SuccessAlert show={showSuccessAss} close={() => setShowSuccess(false)} message={message} />
        <ErrorAlert show={showErrorAss} close={() => setShowError(false)} message={message} />
      </Dialog>
    </div>
  );
}

export default CreatePharse;

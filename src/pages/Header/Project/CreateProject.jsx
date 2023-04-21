import {
  Autocomplete,
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextareaAutosize,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import Button from '@mui/material/Button';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import './stylePrj.css';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Loading from '../../Loading';

import AssignLeader from './AssignLeader';
import AssignPartner from './AssignPartner';
import CancelProject from './CancelProject';
import CreateCategory from '../Category/CreateCategory';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';
import CreateCourse from '../Course/CreateCourse';
import DetailCate from '../Category/DetailCate';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function CreateProject(props) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const regex = /^[\w\s]*$/;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAssignLeader, setShowAssignLeader] = useState(false);
  const [showAssignPartner, setShowAssignPartner] = useState(false);
  const [estimateStart, setEstimateStart] = useState(null);
  const [estimateEnd, setEstimateEnd] = useState(null);
  const [regisOpen, setRegisOpen] = useState(null);
  const [regisClose, setRegisClose] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [fee, setFee] = useState(null);
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCate, setSelectedCate] = useState([]);
  const [leader, setLeader] = useState(null);
  const [partner, setPartner] = useState(null);
  const [partners, setPartners] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [cates, setCates] = useState([]);
  const [cate, setCate] = useState('');

  const [showCreate, setShowCreate] = useState(false);
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [id, setId] = useState();
const [showCate, setShowCate] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccessCate, setShowSuccessCate] = useState(false);
  const [showErrorCate, setShowErrorCate] = useState(false);
  const [message, setMessage] = useState('');
  const [campuses, setCampuses] = useState([]);
  const [campus, setCampus] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
const [idCate, setIdCate] = useState()
const regexMailFu = /[\w.-]+fptu@gmail\.com$/
  const handleError = (data) => {
    setShowError(true);
    setMessage(data);
  };
const handleShowCate = (id) => {
  setShowCate(true)
  setId(id)
}
  function reload() {
    window.location.reload(false);
  }
  const handleShowConfirm = (id) => {
    setShowConfirm(true);
    setIdCate(id)
  };

  const handleCloseConfirm = (data) => {
    setShowConfirm(false);
  };
  
  const handleClose = () => {
    setOpen(props.close);
  };

  const fetchDataCampus = async () => {
    await axios.get(`https://api.ic-fpt.click/api/v1/campus/getAll`).then((response) => {
      setCampuses(response.data.responseSuccess.filter((camp) => camp.partnerId === partner && camp.status));
    });
  };
  const fetchDataStaff = async () => {
    await axios.get(`https://api.ic-fpt.click/api/v1/staff/getAll`).then((response) => {
      setStaffs(response.data.responseSuccess.filter(staff => staff.account.status && staff.account.role === 2 && regexMailFu.test(staff.account.email)));
      setLeader(response.data.responseSuccess.filter(staff => staff.account.status).find(staff => staff.id === user.staff.id).id)
    });
  };

  const fetchDataPartner = async () => {
    await axios.get(`https://api.ic-fpt.click/api/v1/partner/getAllPartner`).then((response) => {
      setPartners(response.data.responseSuccess.filter(partner => partner.status));
    });
  };

  const fetchData = async () => {
    await axios.get(`https://api.ic-fpt.click/api/v1/course/getAllCourse`).then((response) => {
      setCourses(response.data.responseSuccess.filter((course) => course.status));
    });
  };

  const fetchDataCate = async () => {
    await axios.get(`https://api.ic-fpt.click/api/v1/categoryProject/getAllCate`).then((response) => {
      setCates(response.data.responseSuccess.filter((cate) => cate.status));
    });
  };

  useEffect(() => {
    fetchData();
    fetchDataStaff();
    fetchDataPartner();
    fetchDataCate();
  }, []);

  useEffect(() => {
    if (partner) {
      fetchDataCampus();
    }
  }, [partner]);


  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('ProjectName', projectName);

    if(
      description
    ){
      formData.append('Description', description);
    }else{
      formData.append('Description',"");
    }
 
    if (regisOpen) {
      formData.append('DateOpenRegis', regisOpen);
    }
    if (regisClose) {
      formData.append('DateCloseRegis', regisClose);
    }
    if (estimateStart) {
      formData.append('EstimateTimeStart', estimateStart.add(1, 'day'));
    }
    if (estimateEnd) {
      formData.append('EstimateTimeEnd', estimateEnd.add(1, 'day'));
    }
    formData.append('CampusName', campus);

    formData.append('LeaderId', leader);
    formData.append('CampusId', campus);
    formData.append('CourseId', course);
    formData.append('PartnerId', partner);
    formData.append('CategoryProjectId', cate);
    formData.append('MileStoneId', `1`);
    formData.append('MileStoneId', `2`);
    formData.append('MileStoneId', `3`);
    formData.append('MileStoneId', `4`);
    formData.append('MileStoneId', `5`);
    setLoading(true);

    axios({
      method: 'POST',
      data: formData,
      url: 'https://api.ic-fpt.click/api/v1/project/create',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {

        if (response.data.isSuccess) {
          setShowSuccess(true);
          setLoading(false);
          setTimeout(reload(), 5000);
        }
      })
      .catch((err) => {
        handleError("Create fail!!!!");
        setLoading(false);
      });
  };
  const handleDeleteCate = () => {
axios.put(`https://api.ic-fpt.click/api/v1/categoryProject/disable/${idCate}`).then((response) => {

  if (response.data.isSuccess) {
    setShowSuccessCate(true);
    setLoading(false);
    setTimeout(setShowConfirm(false), 3000);
    fetchDataCate()
  }
})
.catch((err) => {
  handleError(err.response.data.responseSuccess);
  setLoading(false);
});
  }
  const handleOnChangeCourse = (e) => {
    setCourse(e.target.value);
  };
  const handleOnChangeCate = (e) => {
    setCate(e.target.value);
  };
  const handleOnChangeLeader = (e) => {
    setLeader(e.target.value);
  };
  const handleOnChangePartner = (e) => {
    setPartner(e.target.value);
  };
  const handleOnChangeCampus = (e) => {
    setCampus(e.target.value);
  };
  const ITEM_HEIGHT = 46;
  const MOBILE_ITEM_HEIGHT = 58;
  const ITEM_PADDING_TOP = 18;
  const MENU_ITEMS = 6;
  return (
    <>
      <Dialog
        open={props.show}
        fullWidth
        maxWidth="md"
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <form>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <DialogTitle id="alert-dialog-title">Create Project</DialogTitle>
            <IconButton style={{ marginRight: 3 }} onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
          <Divider variant="middle" />
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Stack direction="column" spacing={3.5} sx={{ padding: 2 }}>
                <TextField
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                  fullWidth
                  label="Project Name"
                  error={ !regex.test(projectName)}
                  helperText={!regex.test(projectName) && "Can not input special character"}
                />
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-autowidth-label">Category *</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      displayEmpty
                      label="Category *"
                      value={cate}
                      name="cate"
                      onChange={handleOnChangeCate}
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
                      {cates.map((cate, index) => (
                        <MenuItem
                          style={{ display: 'flex', justifyContent: 'space-between', direction: 'row' }}
                          key={index}
                          value={cate.id}
                        >
                          <Box>{cate.name}</Box>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            divider={<Divider orientation="vertical" flexItem />}
                          >
                            <Tooltip title="Edit Category">
                              <IconButton onClick={() => handleShowCate(cate)} size="small" aria-label="delete">
                                <CreateOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                            {/* <Tooltip title="Delete Category">
                              <IconButton onClick={() => handleShowConfirm(cate.id)} size="small" aria-label="delete">
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip> */}
                          </Stack>
                        </MenuItem>
                      ))}
                      <MenuItem>
                        <em>
                          <Button
                            onClick={() => setShowCreate(true)}
                            size="small"
                            fullWidth
                            endIcon={<AddOutlinedIcon />}
                            variant="contained"
                          >
                            Create Category
                          </Button>
                        </em>
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-autowidth-label">Course *</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      displayEmpty
                      label="Course"
                      value={course}
                      name="course *"
                      onChange={handleOnChangeCourse}
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
                      {courses.map((course, index) => (
                        <MenuItem
                          style={{ display: 'flex', justifyContent: 'space-between', direction: 'row' }}
                          key={index}
                          value={course.id}
                        >
                          {course.courseName}
                        
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-autowidth-label">Course</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      displayEmpty
                      label="Course"
                      value={course}
                      name="course"
                      onChange={handleOnChangeCourse}
                    >
                      <MenuItem>
                        <em>
                          <Button
                            onClick={() => setShowCreateCourse(true)}
                            endIcon={<AddOutlinedIcon />}
                            variant="contained"
                          >
                            Create Course
                          </Button>
                        </em>
                      </MenuItem>
                      <MenuItem disabled hidden value="">
                        <em>Course</em>
                      </MenuItem>

                      {courses.map((filteredCourse, index) => (
                        <MenuItem key={index} value={filteredCourse.id}>
                          <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Box>{filteredCourse.skillName}</Box>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                              divider={<Divider orientation="vertical" flexItem />}
                            >
                              <Tooltip title="Edit Course">
                                <IconButton size="small" aria-label="delete">
                                  <CreateOutlinedIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete Course">
                                <IconButton size="small" aria-label="delete">
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </Stack>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
                </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disablePast
                      sx={{ width: '50%' }}
                      label="Estimate time start *"
                      value={estimateStart}
                      onChange={(newValue) => {
                        setEstimateStart(newValue);
                      }}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>

                  <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disablePast
                      minDate={dayjs(estimateStart).add(7, 'day')}
                      sx={{ width: '50%' }}
                      label="Estimate time end *"
                      value={estimateEnd}
                      onChange={(newValue) => {
                        setEstimateEnd(newValue);
                      }}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>
                </Stack>
                {/* <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disablePast
                      sx={{ width: '50%' }}
                      label="Register time open"
                      value={regisOpen}
                      onChange={(newValue) => {
                        setRegisOpen(newValue);
                      }}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>

                  <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disablePast
                      minDate={regisOpen}
                      sx={{ width: '50%' }}
                      label="Register time close"
                      value={regisClose}
                      onChange={(newValue) => {
                        setRegisClose(newValue);
                      }}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>
                </Stack> */}
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Partner *</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={partner}
                      label="Partner *"
                      onChange={handleOnChangePartner}
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
                      {partners.map((partner, index) => (
                        <MenuItem key={index} value={partner.id}>
                          {partner.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Campus *</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={campus}
                      label="Campus *"
                      onChange={handleOnChangeCampus}
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
                      {campuses.map((campus, index) => (
                        <MenuItem key={index} value={campus.id}>
                          {campus.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* <Autocomplete
                    fullWidth
                    onChange={handleChangePartner}
                    id="tags-outlined"
                    options={partner}
                    getOptionLabel={(option) => option.name}
                    filterSelectedOptions
                    renderInput={(params) => <TextField {...params} label="Partner" placeholder="Partner" />}
                  /> */}
                  {/* <Autocomplete
                    fullWidth
                    onChange={handleChangeCampus}
                    id="tags-outlined"
                    options={campus}
                    getOptionLabel={(option) => option?.name}
                    filterSelectedOptions
                    renderInput={(params) => <TextField {...params} label="Campus" placeholder="Campus" />}
                  /> */}
                </Stack>
                <Stack direction="row" fullWidth spacing={2}>
                  <Stack
                    direction="row"
                    style={{ width: '50%' }}
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                  >
                    {/* <Autocomplete
                      fullWidth
                      onChange={handleChangeLeader}
                      id="tags-outlined"
                      options={staffs}
                      getOptionLabel={(option) => option.account.fullName}
                      filterSelectedOptions
                      renderInput={(params) => <TextField {...params} label="Leader" placeholder="Leader" />}
                    /> */}
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Leader *</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={leader}
                        label="Leader *"
                     
                        onChange={handleOnChangeLeader}
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
                        {staffs.map((staff, index) => (
                          <MenuItem key={index} value={staff.id}>
                            {`${staff.staffCode  } (${  staff.account.fullName  })`}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                </Stack>

                <TextField
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={5}
                  label="Project Description"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" style={{ position: 'absolute', right: 10, bottom: 20 }}>
                        {description.length}/1000
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ maxLength: 1000 }}
                />
              </Stack>
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ padding: 20 }}>
            {projectName.trim().length &&
            regex.test(projectName) &&
            cate &&
            course &&
            leader &&
            partner &&
            campus
        ? (
              <Button onClick={() => handleSubmit()} variant="contained">
                Create Project
              </Button>
            ) : (
              <Button disabled onClick={() => handleSubmit()} variant="contained">
                Create Project
              </Button>
            )}
          </DialogActions>
        </form>
        <Loading show={loading} />
        <Dialog
          open={showConfirm}
          onClose={handleCloseConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Delete Category</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">You Want To Delete Category?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm}>Cancel</Button>
            <Button color='error' variant="contained" onClick={() =>handleDeleteCate()} autoFocus>
            Delete
            </Button>
          </DialogActions>
          <SuccessAlert show={showSuccessCate} close={() => setShowSuccessCate(false)} message={'Delete cate Successful!'} />
          <ErrorAlert show={showErrorCate} close={() => setShowErrorCate(false)} message={message} />
        </Dialog>
      </Dialog>
      <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Create Project Successful!'} />
      <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      <CreateCategory show={showCreate} close={() => setShowCreate(false)} getAll={fetchDataCate} />
      <AssignLeader setLeader={setLeader} show={showAssignLeader} close={() => setShowAssignLeader(false)} />
      <AssignPartner setPartner={setPartner} show={showAssignPartner} close={() => setShowAssignPartner(false)} />
      <CreateCourse show={showCreateCourse} close={() => setShowCreateCourse(false)} />
      <DetailCate show={showCate} close={() => setShowCate(false)} cate={id} getAll={fetchDataCate}/>
    </>
  );
}

export default CreateProject;

import {
  Autocomplete,
  Box,
  Button,
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
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import dayjs from 'dayjs';
import axios from 'axios';
import DetailCate from '../Category/DetailCate'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useEffect, useState } from 'react';
import AssignLeader from './AssignLeader';
import AssignMember from './AssignMember';
import AssignPartner from './AssignPartner';
import CancelProject from './CancelProject';
import CreateCourse from '../Course/CreateCourse';
import CreateCategory from '../Category/CreateCategory';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';
import CreateDateMil from './CreateDateMil';

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

function DetailProject(props) {
  const regexMailFu = /[\w.-]+fptu@gmail\.com$/
  const regex = /^[\w\s]*$/;
  const [disableBtn, setDisable] = useState(false);
  const [doc, setDoc] = useState(null);

  const [project, setProject] = useState([]);
  const [open, setOpen] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDetailCate, setShowDetailCate] = useState(false);
  const [showCreateCate, setShowCreateCate] = useState(false);
  const [showCreateInit, setShowCreateInit] = useState(false);
  const [estimateStart, setEstimateStart] = useState(null);
  const [estimateEnd, setEstimateEnd] = useState(null);
  const [officialStart, setOfficialStart] = useState(null);
  const [officialEnd, setOfficialEnd] = useState(null);
  const [status, setStatus] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState([]);
  const [courses, setCourses] = useState([]);
  const [cates, setCates] = useState([]);
  const [cate, setCate] = useState([]);
  const [cateDetail, setCateDetail] = useState([]);
  const [leader, setLeader] = useState([]);
  const [partner, setPartner] = useState([]);
  const [partners, setPartners] = useState([]);

  const [milestoneInit, setInit] = useState([]);
  const [fromDateInit, setFromInit] = useState(null);
  const [toDateInit, setToInit] = useState(null);

  const [enableplan, setenableplan] = useState(true);
  const [fromDatePlan, setFromPlan] = useState(null);
  const [toDatePlan, setToPlan] = useState(null);

  const [enableEx, setenableEx] = useState(true);
  const [fromDateEx, setFromEx] = useState(null);
  const [toDateEx, setToEx] = useState(null);

  const [enableMino, setenableMino] = useState(true);
  const [fromDateMino, setFromMino] = useState(null);
  const [toDateMino, setToMino] = useState(null);

  const [enableClose, setenableClose] = useState(true);
  const [fromDateClose, setFromClose] = useState(null);
  const [toDateClose, setToClose] = useState(null);

  const [showAssignMember, setShowAssignMember] = useState(false);
  const [campuses, setCampuses] = useState([]);
  const [staffs, setStaffs] = useState([]);

  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedMember, setSelectedMember] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [viewMember, setViewMember] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');

  const handleError = (data) => {
    setShowError(true);
    setMessage(data);
  };
  const handleSuccess = (data) => {
    setShowSuccess(true);
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
  const handleChangeLeader = (e) => {
    setLeader(e.target.value);
    if (e.target.value) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };

  const handleChangeCampus = (e) => {
    setSelectedCampus(e.target.value);
    if (e.target.value) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };
const handleDetailCate = (data) => {
  setCateDetail(data)
  setShowDetailCate(true)
}
  const fetchDataStaff = async () => {
    await axios.get(`https://api.ic-fpt.click/api/v1/staff/getAll`).then((response) => {
      setStaffs(response.data.responseSuccess.filter((staff) => staff.account.status && staff.account.role === 2 && regexMailFu.test(staff.account.email)));
    });
  };
  const fetchDataDoc = async () => {
    await axios.get(`https://api.ic-fpt.click/api/v1/document/getAll`).then((response) => {
   
      setDoc(response.data.responseSuccess.filter((doc) => doc.projectId === props.project.id));
    });
  };
  const fetchDataPartner = async () => {
    await axios.get(`https://api.ic-fpt.click/api/v1/partner/getAllPartner`).then((response) => {
      setPartners(response.data.responseSuccess).find((partner) => partner.id === props.project.partnerId);
    });
  };

  const handleClose = () => {
    setOpen(props.close);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCourse(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  // update date milestone

  const CreateDateInit = () => {
    const formData = new FormData();
    formData.append('ProjectId', props.project.id);
    formData.append('MileStoneId', 1);
    formData.append('DateBegin',estimateStart);
    formData.append('DateEnd',toDateInit);
   
    axios({
      method: 'PUT',
      data: formData,
      url: `https://api.ic-fpt.click/api/v1/milestone/changeMileStoneDate/1`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
    
        if (response.data.isSuccess) {
          handleSuccess('Update date successfull!!!');
          setTimeout(reload(), 3000);
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
      });
  };

  const CreateDatePlan = () => {
    const formData = new FormData();
    formData.append('ProjectId', props.project.id);
    formData.append('MileStoneId', 2);
    formData.append('DateBegin',fromDatePlan);
    formData.append('DateEnd',toDatePlan);
   
    axios({
      method: 'PUT',
      data: formData,
      url: `https://api.ic-fpt.click/api/v1/milestone/changeMileStoneDate/2`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (response.data.isSuccess) {
          handleSuccess('Update date successfull!!!');
          setTimeout(reload(), 3000);
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
      });
  };
  const CreateDateExe = () => {
    const formData = new FormData();
    formData.append('ProjectId', props.project.id);
    formData.append('MileStoneId', 3);
    formData.append('DateBegin',fromDateEx);
    formData.append('DateEnd',toDateEx);
   
    axios({
      method: 'PUT',
      data: formData,
      url: `https://api.ic-fpt.click/api/v1/milestone/changeMileStoneDate/3`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (response.data.isSuccess) {
          handleSuccess('Update date successfull!!!');
          setTimeout(reload(), 3000);
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
      });
  };
  const CreateDateMino = () => {
    const formData = new FormData();
    formData.append('ProjectId', props.project.id);
    formData.append('MileStoneId', 4);
    formData.append('DateBegin',fromDateMino);
    formData.append('DateEnd',toDateMino);
   
    axios({
      method: 'PUT',
      data: formData,
      url: `https://api.ic-fpt.click/api/v1/milestone/changeMileStoneDate/4`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (response.data.isSuccess) {
          handleSuccess('Update date successfull!!!');
          setTimeout(reload(), 3000);
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
      });
  };
  const CreateDateClosing = () => {
    const formData = new FormData();
    formData.append('ProjectId', props.project.id);
    formData.append('MileStoneId', 5);
    formData.append('DateBegin',fromDateClose);
    formData.append('DateEnd',estimateEnd);
   
    axios({
      method: 'PUT',
      data: formData,
      url: `https://api.ic-fpt.click/api/v1/milestone/changeMileStoneDate/5`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (response.data.isSuccess) {
          handleSuccess('Update date successfull!!!');
          setTimeout(reload(), 3000);
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
      });
  };

  //

  useEffect(() => {
    if (props.project !== null) {
      console.log(props.project)
      setCampuses(
        partners.find((partner) => partner.id === props.project.partnerId)?.campuses.filter((camp) => camp.status)
      );
      if (props.project.mileStoneProject?.find((mil) => mil.mileStoneId === 1).dateEnd) {
        setenableplan(false);
      }else{
        setenableplan(true);
      }
      setToInit(dayjs(props.project.mileStoneProject?.find((mil) => mil.mileStoneId === 1).dateEnd));

      if (
        props.project.mileStoneProject?.find((mil) => mil.mileStoneId === 2).dateBegin &&
        props.project.mileStoneProject?.find((mil) => mil.mileStoneId === 2).dateEnd
      ) {
        setenableEx(false);
      }else{
        setenableEx(true);
      }

      setFromPlan(dayjs(props.project.mileStoneProject?.find((mil) => mil.mileStoneId === 2).dateBegin));
      setToPlan(dayjs(props.project.mileStoneProject?.find((mil) => mil.mileStoneId === 2).dateEnd));

      if (
        props.project.mileStoneProject?.find((mil) => mil.mileStoneId === 3).dateBegin &&
        props.project.mileStoneProject?.find((mil) => mil.mileStoneId === 3).dateEnd
      ) {
        setenableMino(false);
      }else{
        setenableMino(true);
      }
      setFromEx(dayjs(props.project.mileStoneProject?.find((mil) => mil.mileStoneId === 3).dateBegin));
      setToEx(dayjs(props.project.mileStoneProject?.find((mil) => mil.mileStoneId === 3).dateEnd));

      if (
        props.project.mileStoneProject?.find((mil) => mil.mileStoneId === 4).dateBegin &&
        props.project.mileStoneProject?.find((mil) => mil.mileStoneId === 4).dateEnd
      ) {
        setenableClose(false);
      }else{
        setenableClose(true)
      }
      setFromMino(dayjs(props.project.mileStoneProject?.find((mil) => mil.mileStoneId === 4).dateBegin));
      setToMino(dayjs(props.project.mileStoneProject?.find((mil) => mil.mileStoneId === 4).dateEnd));

      setFromClose(dayjs(props.project.mileStoneProject?.find((mil) => mil.mileStoneId === 5).dateBegin));

      setProjectName(props.project.projectName);
      setEstimateStart(dayjs(props.project.estimateTimeStart));
      setEstimateEnd(dayjs(props.project.estimateTimeEnd));
      setSelectedCampus(props.project.campusId);
      if(props.project.officalTimeStart){
        setOfficialStart(dayjs(props.project.officalTimeStart));
      }
      if(props.project.officalTimeEnd){
        setOfficialEnd(dayjs(props.project.officalTimeEnd));
      }
  if(props.project.description !== 'null'){
    setDescription(props.project.description)
  }else{
    setDescription('')
  }

      setStatus(props.project.projectStatus);
      setLeader(props.project.leaderId);
      setCourse(props.project.courseId);
      setCate(props.project.categoryProjectId);
    }
  }, [props.project]);

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
    if (props.project != null) {
      fetchData();
      fetchDataCate();
      fetchDataPartner();
      fetchDataStaff();
      fetchDataDoc()
    }
  }, [props.project]);

  const handleUpdate1 = () => {
    axios
      .put(
        `https://api.ic-fpt.click/api/v1/project/update/${props.project.id}?CampusName=${selectedCampus}&ProjectName=${projectName}&Description=${description}&EstimateTimeStart=${estimateStart}&EstimateTimeEnd=${estimateEnd}&DateCreate=${props.project.dateCreated}&ProjectStatus=${status}&LeaderId=${leader}&CourseId=${course}&PartnerId=${props.project.partnerId}&CategoryProjectId=${cate}&CampusId=${selectedCampus}`
      )
      .then((response) => {
    
        if (response.data.isSuccess) {
          handleSuccess('Update Project Successsfull!!!');
          setTimeout(() => {
      window.location.reload()
          }, 2000)
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
        setTimeout(() => {
          window.location.reload()
              }, 2000)

      });
  };

  const handleUpdate2 = () => {
    axios
      .put(
        `https://api.ic-fpt.click/api/v1/project/update/${props.project.id}?CampusName=${selectedCampus}&ProjectName=${projectName}&Description=${description}&EstimateTimeStart=${estimateStart}&EstimateTimeEnd=${estimateEnd}&OfficalTimeStart=${officialStart.add(1, 'day')}&OfficalTimeEnd=${officialEnd.add(1, 'day')}&DateCreate=${props.project.dateCreated}&ProjectStatus=${status}&LeaderId=${leader}&CourseId=${course}&PartnerId=${props.project.partnerId}&CategoryProjectId=${cate}&CampusId=${selectedCampus}`
      )
      .then((response) => {
      
        if (response.data.isSuccess) {
          handleSuccess('Update Project Successsfull!!!');

          setTimeout(() => {
            window.location.reload()
                }, 2000)
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
        setTimeout(() => {
          window.location.reload()
              }, 2000)
      });
  };
  // console.log(`https://api.ic-fpt.click/api/v1/project/update/${props.project.id}?CampusName=${selectedCampus?.name}&ProjectName=${projectName}&Description=${description}&EstimateTimeStart=${estimateStart}&EstimateTimeEnd=${estimateEnd}&DateCreate=${props.project.dateCreated}&ProjectStatus=${status}&LeaderId=${selectedLeader.id}&CourseId=${course.id}&PartnerId=${props.project.partnerId}&CategoryProjectId=${cate.id}&CampusId=${selectedCampus.id}`)}

  const handleUpdateProject = () => {


    if (officialStart && officialEnd != null) {
  handleUpdate2()
       
    } else {
      handleUpdate1()
        
       
    }
  };
  const handleOnChangeStatus = (e) => {
    setStatus(e.target.value);
    setDisable(true);
  };

  const handleOnChangeCourse = (e) => {
    setCourse(e.target.value);
    if (e.target.value) {
      setDisable(true);
    }
  };
  const handleOnChangeCate = (e) => {
    setCate(e.target.value);
    if (e.target.value) {
      setDisable(true);
    }
  };

  const handleOnChangeName = (e) => {
    setProjectName(e.target.value);
    if (e.target.value.trim()) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };

  const handleExportFile = (documentPrj) => {
    axios({
      url: `https://api.ic-fpt.click/api/v1/document/content/${documentPrj.id}`,
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
     
      const blob = new Blob([response.data], { type: response.data.type });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const contentDisposition = response.headers['content-disposition: attachment'];
      let fileName = documentPrj.fileName;
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
      }
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    });
  };

  const ITEM_HEIGHT = 46;
  const MOBILE_ITEM_HEIGHT = 58;
  const ITEM_PADDING_TOP = 18;
  const MENU_ITEMS = 6;

  return (
    <div>
      <Dialog
        open={props.show}
        fullWidth
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <DialogTitle id="alert-dialog-title">DetailProject</DialogTitle>
          <IconButton style={{ marginRight: 3 }} onClick={() => handleClose()}>
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>
        <Divider variant="middle" />
        <form>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Stack direction="column" spacing={3.5} sx={{ padding: 2 }}>
                <TextField value={projectName} disabled={props.project?.checkNegotiationStatus} onChange={handleOnChangeName} required fullWidth label="Project Name" 
                
                  inputProps={{ maxLength: 255 }}
                />
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      displayEmpty
                      label="Category"
                      value={cate}
                      defaultValue={props.project.categoryProjectId}
                      name="cate"
                      onChange={handleOnChangeCate}
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
                            <Tooltip title="Edit Course">
                              <IconButton onClick={() => handleDetailCate(cate)} size="small" aria-label="delete">
                                <CreateOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                            {/* <Tooltip title="Delete Course">
                              <IconButton size="small" aria-label="delete">
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
                    <InputLabel id="demo-simple-select-autowidth-label">Course</InputLabel>
                    <Select
                      defaultValue={props.project.courseId}
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      displayEmpty
                      label="Course"
                      value={course}
                      disabled={props.project?.checkNegotiationStatus}
                      name="course"
                      onChange={handleOnChangeCourse}
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
                      {courses.map((filteredCourse, index) => (
                        <MenuItem key={index} value={filteredCourse.id}>
                          {filteredCourse.courseName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disablePast
                      format="DD/MM/YYYY"
                      sx={{ width: '50%' }}
                      label="Estimate time start"
                      value={estimateStart}
                      onChange={(newValue) => {
                        setEstimateStart(newValue);
                        setDisable(true)
                      }}
                    />
                  </LocalizationProvider>

                  <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disablePast
                      minDate={dayjs(estimateStart).add(7, 'day')}
                      sx={{ width: '50%' }}
                      label="Estimate time end"
                      value={estimateEnd}
                      onChange={(newValue) => {
                        setEstimateEnd(newValue);
                        setDisable(true)
                      }}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>
                </Stack>

                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disablePast
                      sx={{ width: '50%' }}
                      label="Official time start"
                      value={officialStart}
                      onChange={(newValue) => {
                        setOfficialStart(newValue);
                        setDisable(true);
                      }}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>

                  <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disablePast
                      minDate={dayjs(officialStart).add(7, 'day')}
                      sx={{ width: '50%' }}
                      label="Official time end"
                      value={officialEnd}
                      onChange={(newValue) => {
                        setOfficialEnd(newValue);
                        setDisable(true);
                      }}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>
                </Stack>

                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  {/* <Autocomplete
                    fullWidth
                    onChange={handleChangePartner}
                    id="tags-outlined"
                    options={partners}
                    defaultValue={partners.find((partner) => partner.id === props.project.partnerId)}
                    getOptionLabel={(option) => option.name}
                    filterSelectedOptions
                    renderInput={(params) => <TextField {...params} label="Partner" placeholder="Partner" />}
                  /> */}
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                    style={{ width: '100%' }}
                  >
                    <Typography variant="h6">Partner: </Typography>
                    <Chip label={partners.find((partner) => partner.id === props.project.partnerId)?.name} />
                  </Stack>
                  {/*                
                  <Autocomplete
                    fullWidth
                    onChange={handleChangeCampus}
                    id="tags-outlined"
                    options={campuses}
                    defaultValue={partners.find(partner => partner.id === props.project.partnerId)   
                      ?.campuses.find((camp) => camp.id === props.project.campusId)}
                    getOptionLabel={(option) => option?.name}
                    filterSelectedOptions
                    renderInput={(params) => <TextField {...params} label="Campus" placeholder="Campus" />}
                  /> */}
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Campus</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedCampus}
                      defaultValue={props.project.campusId}
                      label="Campus"
                      onChange={handleChangeCampus}
                      disabled={props.project?.checkNegotiationStatus}
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
                      {campuses?.map((camp) => (
                        <MenuItem value={camp.id}>{camp.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>

                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                  {/* <Autocomplete
                    fullWidth
                    onChange={handleChangeLeader}
                    defaultValue={staffs.find((leader) => leader.id === props.project.leaderId)}
                    id="tags-outlined"
                    options={staffs}
                    getOptionLabel={(option) => option.staffCode}
                    filterSelectedOptions
                    renderInput={(params) => <TextField {...params} label="Leader" placeholder="Leader" />}
                  /> */}
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Leader</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={leader}
                      label="Leader"
                      defaultValue={props.project.leaderId}
                      onChange={handleChangeLeader}
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
                      {staffs?.map((staff) => (
                        <MenuItem value={staff.id}>{`${staff.staffCode  } (${  staff.account.fullName  })`}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Status"
                      onChange={(e) => {setStatus(e.target.value); setDisable(true)}}
                      defaultValue={props.project.projectStatus}
                    >
                      <MenuItem value={0}>
                        <Chip label="Initiation" size="small" />
                      </MenuItem>
                      <MenuItem value={1}>
                        <Chip label="Planning" color="primary" size="small" />
                      </MenuItem>
                      <MenuItem value={2}>
                        <Chip label="Execution" color="secondary" size="small" />
                      </MenuItem>
                      <MenuItem value={3}>
                        <Chip label="Monitoring" color="warning" size="small" />
                      </MenuItem>
                      <MenuItem value={4}>
                        <Chip label="Closing" color="success" size="small" />
                      </MenuItem>
                    </Select>
                  </FormControl> */}
                </Stack>
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={4}>
                  <Button onClick={() => setShowAssignMember(true)} variant="outlined" color="primary">
                    Assign Member
                  </Button>
                  {/* <Button onClick={() => setShowCreateInit(true)} variant="outlined" color="primary">
                   Create date of milestone
                  </Button> */}
                </Stack>

                <TextField
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={5}
                  label="Project Description"
                  value={description}
                />

                <Stack direction="column" justifyContent="center" spacing={2}>
                  <Typography variant="h6">Milestone of project</Typography>
                  <Divider variant="middle" />

                  <Typography>Initiation</Typography>
                  <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                    <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                      <DatePicker
                        readOnly
                        sx={{ width: '40%' }}
                        label="From date"
                        value={dayjs(estimateStart)}
                        onChange={(newValue) => {
                          setFromInit(newValue);
                        }}
                        format="DD/MM/YYYY"
                      />
                    </LocalizationProvider>
                    <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disablePast
                        minDate={dayjs(estimateStart)}
                        sx={{ width: '40%' }}
                        label="To date"
                        value={dayjs(toDateInit)}
                        onChange={(newValue) => {
                          setToInit(newValue);
                        }}
                        format="DD/MM/YYYY"
                      />
                    </LocalizationProvider>

                    <Button variant="contained" onClick={() => CreateDateInit()} autoFocus>
                      Update Date
                    </Button>
                  </Stack>

                  <Typography>Planning</Typography>
                  <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                    <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disablePast
                        disabled={enableplan}
                        maxDate={dayjs(toDateInit)}
                        minDate={dayjs(toDateInit)}
                        sx={{ width: '40%' }}
                        label="From date"
                        value={dayjs(fromDatePlan)}
                        onChange={(newValue) => {
                          setFromPlan(newValue);
                        }}
                        format="DD/MM/YYYY"
                      />
                    </LocalizationProvider>
                    <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disablePast
                        disabled={enableplan}
                        minDate={dayjs(fromDatePlan)}
                        sx={{ width: '40%' }}
                        label="To date"
                        value={dayjs(toDatePlan)}
                        onChange={(newValue) => {
                          setToPlan(newValue);
                        }}
                        format="DD/MM/YYYY"
                      />
                    </LocalizationProvider>

                    <Button disabled={enableplan} variant="contained" onClick={() => CreateDatePlan()} autoFocus>
                      Update Date
                    </Button>
                  </Stack>
                  <Typography>Executing</Typography>
                  <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                    <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disablePast
                        disabled={enableEx}
                        minDate={dayjs(toDatePlan)}
                        maxDate={dayjs(toDatePlan)}
                        sx={{ width: '40%' }}
                        label="From date"
                        value={dayjs(fromDateEx)}
                        onChange={(newValue) => {
                          setFromEx(newValue);
                        }}
                        format="DD/MM/YYYY"
                      />
                    </LocalizationProvider>
                    <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disablePast
                        disabled={enableEx}
                        minDate={dayjs(fromDateEx)}
                        sx={{ width: '40%' }}
                        label="To date"
                        value={dayjs(toDateEx)}
                        onChange={(newValue) => {
                          setToEx(newValue);
                        }}
                        format="DD/MM/YYYY"
                      />
                    </LocalizationProvider>

                    <Button disabled={enableEx} variant="contained" onClick={() => CreateDateExe()} autoFocus>
                      Update Date
                    </Button>
                  </Stack>

                  <Typography>Minotoring</Typography>
                  <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                    <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disablePast
                        minDate={dayjs(toDateEx)}
                        maxDate={dayjs(toDateEx)}
                        disabled={enableMino}
                        sx={{ width: '40%' }}
                        label="From date"
                        value={dayjs(fromDateMino)}
                        onChange={(newValue) => {
                          setFromMino(newValue);
                        }}
                        format="DD/MM/YYYY"
                      />
                    </LocalizationProvider>
                    <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disablePast
                        disabled={enableMino}
                        minDate={dayjs(fromDateMino)}
                        sx={{ width: '40%' }}
                        label="To date"
                        value={dayjs(toDateMino)}
                        onChange={(newValue) => {
                          setToMino(newValue);
                        }}
                        format="DD/MM/YYYY"
                      />
                    </LocalizationProvider>

                    <Button disabled={enableMino} variant="contained" onClick={() => CreateDateMino()} autoFocus>
                      Update Date
                    </Button>
                  </Stack>

                  <Typography>Closing</Typography>
                  <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                    <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disablePast
                        disabled={enableClose}
                        minDate={dayjs(toDateMino)}
                        maxDate={dayjs(toDateMino)}
                        sx={{ width: '40%' }}
                        label="From date"
                        value={dayjs(fromDateClose)}
                        onChange={(newValue) => {
                          setFromClose(newValue);
                        }}
                        format="DD/MM/YYYY"
                      />
                    </LocalizationProvider>
                    <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                      <DatePicker
                   
                        readOnly
                        sx={{ width: '40%' }}
                        label="To date"
                        value={dayjs(estimateEnd)}
                        onChange={(newValue) => {
                          setToClose(newValue);
                        }}
                        format="DD/MM/YYYY"
                      />
                    </LocalizationProvider>

                    <Button disabled={enableClose} variant="contained" onClick={() => CreateDateClosing()} autoFocus>
                      Update Date
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </DialogContentText>
            <Box sx={{ padding: '0 44px 44px 44px', maxWidth: '100%' }}>
            <b>Project's Files:</b>
            <Stack direction="column" alignItems="flex-start" spacing={3}>
            {doc && doc?.map((document, index) => (
                      <Button
                   key={index}
                      variant="text"
                     
                      onClick={() => handleExportFile(document)}
                    >
                      {document.fileName}
                    </Button>
                ))
                }
            </Stack>
            </Box>
          </DialogContent>
          <DialogActions style={{ padding: 20 }}>
            <Stack direction="row" alignItems="center" spacing={3}>
              <Button onClick={() => setShowCancel(true)} color="error" variant="contained">
                Cancel Project
              </Button>
              
              {disableBtn ? (
                <Button onClick={() => handleShowConfirm()} variant="contained">
                  Save
                </Button>
              ) : (
                <Button disabled onClick={() => handleShowConfirm()} variant="contained">
                  Save
                </Button>
              )}
            </Stack>
          </DialogActions>
        </form>
        <Dialog
          open={showConfirm}
          onClose={handleCloseConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Update Project</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">You Want To Update Project?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm}>Cancel</Button>
            <Button onClick={() => handleUpdateProject()} variant="contained" autoFocus>
              Accept
            </Button>
          </DialogActions>
          <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={message} />
          <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
        </Dialog>
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={message} />
        <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      </Dialog>
      <AssignMember project={props.project} show={showAssignMember} close={() => setShowAssignMember(false)} />
      <CancelProject show={showCancel} close={() => setShowCancel(false)} id={props.project.id} />
<DetailCate show={showDetailCate} close ={() => setShowDetailCate(false)} cate={cateDetail}getAll={fetchDataCate}/>
      <CreateCategory show={showCreateCate} close={() => setShowCreateCate(false)} getAll={fetchDataCate}  />

      <CreateDateMil show={showCreateInit} close={() => setShowCreateInit(false)} prjId={props.project.id} />
    </div>
  );
}

export default DetailProject;

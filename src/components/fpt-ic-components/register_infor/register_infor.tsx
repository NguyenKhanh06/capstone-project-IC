import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Title from './title';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputBar from './input-bar';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import 'react-day-picker/dist/style.css';
import { Program } from '../../../interfaces/program';
import { Major } from '../../../interfaces/major';
import CloseIcon from '@mui/icons-material/Close';

import axios from 'axios';
import { useLocation } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { API_URL } from 'src/config/apiUrl/apis-url';

const RegisterSchema = Yup.object().shape({
  // Program: Yup.string().required('Can you select the program you want register, please ?'),

  FullName: Yup.string()
    .required('Can you input your full name, please ?')
    .min(2, 'Name is too short!')
    .max(40, 'Name is too long!'),

  RollNumber: Yup.string()
    .required('Can you input your roll number, please ?')
    .matches(/^[A-Za-z]{2}[0-9]{6}$/, 'Incorrect roll number. Example: SE123456'),

  // Major: Yup.string().required('Can you input your major, please ?'),

  PhoneNumber: Yup.string().matches(/^[0-9]{8,10}$/, 'Invalid phone number, please check again!'),

  // PassportNumber: Yup.string()
  //   .matches(/[A-Z]{1}[0-9]{8}/, 'Incorrect passport number, please check again! [Example: A12345678]')
  //   .required('Can you input your major, please ?'),

  FacebookLink: Yup.string()
    .matches(
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
      'Incorrect link. Example: https://example.com'
    )
    .required('Can you input your facebook link, please ?'),

  // DOB: Yup.date().required('Can you input your date of birth, please ?'),

  // ExpirationDate: Yup.date().required('Can you input your expiration date, please ?'),

  // PassportImage: Yup.array().required('Can you upload your passport image, please ?'),

  // TransferInfomation: Yup.array().required('Can you upload your transfer information, please ?'),
});
const RegisterInformationComponent = () => {
  const student = JSON.parse(sessionStorage.getItem('user'));
  const location = useLocation();
  const data = location.state;

  const [PassportImage, setPassportImage] = React.useState<File[]>([]);
  const [TransferInfomation, setTransferInfomation] = React.useState<File[]>([]);
  const [Program, setProgram] = React.useState(null);
  const [ProgramForm, setProgramForm] = React.useState(null);
  const [Major, setMajor] = React.useState(null);
  const [Majors, setMajors] = React.useState(null);
  const [DOB, setDOB] = React.useState(dayjs(new Date(data['dateOfBirth'])));
  const [ExpirationDate, setExpirationDate] = React.useState(dayjs(new Date(data['dateExpired'])));
  const [forms, setForm] = React.useState(null);
  const [formDetail, setFormDetail] = React.useState(null);
  const [studentDetail, setStudentDetail] = React.useState(null);
  const [show, setShow] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const containerRef = useRef(null);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      // Program: data.project as string,
      FullName: studentDetail?.fullName as string,
      RollNumber: studentDetail?.rollNumber as string,
      Major: '',
      PhoneNumber: studentDetail?.phoneNumber as string,
      PassportNumber: formDetail?.numberPassPort as string,
      FacebookLink: formDetail?.scocialLink as string,
      DOB: '',
      ExpirationDate: '',
      contentHeader1: formDetail?.content1 as string,
      contentHeader2: formDetail?.content2 as string,
      contentHeader3: formDetail?.content3 as string,
      contentHeader4: formDetail?.content4 as string,
      contentHeader5: formDetail?.content5 as string,
      PassportImage: '',
      TransferInfomation: '',
    },
    enableReinitialize: true,
    validateOnChange: false,
    validationSchema: RegisterSchema,
    onSubmit: (values, { resetForm }) => {
      const register = {
        Program: Program,
        FullName: values.FullName,
        PhoneNumber: values.PhoneNumber,
        RollNumber: values.RollNumber,
        Major: Major,
        PassportNumber: values.PassportNumber,
        DOB: DOB,
        ExpirationDate: ExpirationDate,
        FacebookLink: values.FacebookLink,
        contentHeader1: values.contentHeader1,
        contentHeader2: values.contentHeader2,
        contentHeader3: values.contentHeader3,
        contentHeader4: values.contentHeader4,
        contentHeader5: values.contentHeader5,
        PassportImage: PassportImage,
        TransferInfomation: TransferInfomation,
      };
    

      // {ProgramForm && () &&  console.log(2)}
      // {ProgramForm && (ProgramForm?.contentHeader3 && ProgramForm?.contentHeader2 && ProgramForm?.contentHeader1) &&  console.log(3)}
      // {ProgramForm && (ProgramForm?.contentHeader4&& ProgramForm?.contentHeader3 && ProgramForm?.contentHeader2 && ProgramForm?.contentHeader1) &&  console.log(4)}

      const formData = new FormData();
      formData.append('PassportImageUrl', PassportImage[0]);
      formData.append('UrlImageBill', TransferInfomation[0]);

      axios({
        method: 'PUT',
        data: formData,
        url: `${API_URL}/registration/UpdateRegisId/${data.id}?FullName=${values.FullName}&MajorId=${Major.id}&memberCode=${data?.student?.memberCode}&PhoneNumber=${values.PhoneNumber}&DateOfBirth=${DOB}&NumberPassPort=${values.PassportNumber}&RollNumber=${values.RollNumber}&YourEmail=${data?.student?.email}&ScocialLink=${values.FacebookLink}&DateExpired=${ExpirationDate}&ProjectId=${data?.projectId}&Content1=${values?.contentHeader1}&Content2=${values.contentHeader2}&Content3=${values.contentHeader3}&Content4=${values.contentHeader4}&Content5=${values.contentHeader5}`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          const datas = {
            memberCode: student.memberCode,
            oldRollNumber: student.oldRollNumber,
            batch: student.batch,
            semeter: student.semeter,
            upStatus: student.studentStatus,
            address: student.address,
            rollNumber: values.RollNumber,
            fullName: values.FullName,
            majorId: Major.id,
            email: data.student.email,
            phoneNumber: values.PhoneNumber,
            status: true,
          };
          if (response.data.isSuccess) {
            setShow(true);
            getDetail();
            getDetailStudent();
            handleUpdateStudent(datas);
            setTimeout(() => {
              setShow(false);
            }, 2000);
          }
        })
        .catch((err) => {
          setShowErr(true);
        });
      axios
        .put(
          `${API_URL}/registration/create?ParentId=${Program['id']}&NumberPassPort=${values.PassportNumber}&ScocialLink=${values.FacebookLink}&DateExpired=${values.ExpirationDate}&DateOfBirth=${values.DOB}&ProjectId=${Program['projectId']}&StudentId=${student.id}&Content1=${values.contentHeader1}&Content2=${values.contentHeader2}&Content3=${values.contentHeader3}&Content4=${values.contentHeader4}&Content5=${values.contentHeader5}&contentHeader1=${ProgramForm?.contentHeader1}&contentHeader2=${ProgramForm?.contentHeader2}&contentHeader3=${ProgramForm?.contentHeader3}&contentHeader4=${ProgramForm?.contentHeader4}&contentHeader5=${ProgramForm?.contentHeader5}`
        )
        .then((response) => {
          const dataUpdate = {
            memberCode: student.memberCode,
            oldRollNumber: student.oldRollNumber,
            batch: student.batch,
            semeter: student.semeter,
            upStatus: student.studentStatus,
            address: student.address,
            rollNumber: values.RollNumber,
            fullName: values.FullName,
            majorId: Major.id,
            email: student.email,
            phoneNumber: values.PhoneNumber,
            status: true,
          };
          if (response.data.isSuccess) {
            handleUpdateStudent(dataUpdate);
          
          }
        })
        .catch((err) => {
          setShowErr(true);
        });
    },

    //if register function succesful, redirect to login page
    //   register(newUser).then((res) => {
    //     history.push(`/login`);
    //   });
  });

  const getDetail = async () => {
    await axios.get(`${API_URL}/registration/GetDetailResId/${data.id}`).then((response) => {
      setFormDetail(response.data.responseSuccess[0]);
    });
  };

  const getDetailStudent = async () => {
    await axios.get(`${API_URL}/student/getStudentDetail/${student.id}`).then((response) => {
      setStudentDetail(response.data.responseSuccess[0]);
      sessionStorage.setItem('user', JSON.stringify(response.data.responseSuccess[0]));

    });
  };
  
  const handleUpdateStudent = (dataUpdate) => {
    axios
      .put(`${API_URL}/student/update/${student.id}`, dataUpdate)
      .then((response) => {
        console.log(response);
        if (response.data.isSuccess) {
          setShow(true);
          getDetail();
          getDetailStudent();
          setTimeout(() => {
            setShow(false);
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllForm = async () => {
    await axios.get(`${API_URL}/registration/getAllRes`).then((response) => {
      setForm(response.data.responseSuccess.filter((value) => value.project != null));
      console.log(response);
    });
  };
  const getAllMajor = async () => {
    await axios.get(`${API_URL}/Major/getAllMajor`).then((response) => {
      setMajors(response.data.responseSuccess);
    });
  };

  const getFormbyPrj = (id) => {
    axios.get(`${API_URL}/registration/getDetailbyProjectId/${id}`).then((response) => {
      setProgramForm(response.data.responseSuccess.filter((form) => !form.student)[0]);
      console.log(response.data.responseSuccess.filter((form) => !form.student));
    });
  };

  const handlePassportImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)[0];
      const newFiles = [...PassportImage, files];
      setPassportImage(newFiles);
      const newFilesString = newFiles.map((file) => file.name);
      formik.setFieldValue('PassportImage', newFilesString);
    }
    console.log(PassportImage);
  };
  const handleTransferInformation = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)[0];
      const newFiles = [...TransferInfomation, files];
      setTransferInfomation(newFiles);
      const newFilesString = newFiles.map((file) => file.name);
      formik.setFieldValue('TransferInfomation', newFilesString);
    }
    console.log(TransferInfomation);
  };

  const handleDeletePassportImage = (file: File) => {
    const newFiles = PassportImage.filter((f) => f !== file);
    setPassportImage(newFiles);
    const newFilesString = newFiles.map((file) => file.name);
    formik.setFieldValue('PassportImage', newFilesString);
  };

  const handleDeleteTransferInformation = (file: File) => {
    const newFiles = TransferInfomation.filter((f) => f !== file);
    setTransferInfomation(newFiles);
    const newFilesString = newFiles.map((file) => file.name);
    formik.setFieldValue('TransferInfomation', newFilesString);
  };

  useEffect(() => {
    getAllForm();
    getAllMajor();
    getDetail();
    getDetailStudent();
    setMajor(student?.major)
  
  
  }, [data]);
  useEffect(() => {
    if (Program) {
      getFormbyPrj(Program.projectId);
    }
  }, [Program]);
  return (
    <>
      {forms && (
        <Slide
          direction="up"
          in={true}
          container={containerRef.current}
          style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 600 } : {})}
        >
          <Box
            sx={{
              backgroundColor: 'background.default',
            }}
          >
            <Box
              sx={{
                width: '80%',
                height: '100%',
                backgroundColor: ' #F8F8F8',
                margin: '13% auto',
                borderRadius: '30px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '4px 0px 4px rgba(0, 0, 0, 0.25)',
              }}
            >
              <Box
                sx={{
                  height: '200px',
                  width: '100%',
                  borderTopRightRadius: '30px',
                  background: 'url("/images/register-form-bg.png")',
                  backgroundSize: 'cover',
                  backgroundColor: 'primary.main',
                  borderTopLeftRadius: '30px',
                  color: 'primary.contrastText',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '0 7% 20px',
                }}
              >
                <Typography style={{ fontWeight: 'Bold', fontSize: '60px' }}>REGISTER FORM</Typography>
                <Typography style={{ fontWeight: '400', fontSize: '25px' }}>* Required</Typography>
              </Box>
              <Box
                sx={{
                  padding: ' 0 6% 7% 8%',
                  width: 'auto',
                }}
              >
                <form onSubmit={formik.handleSubmit}>

                  <Title number={'1'} title={'Program *'} />
                  {/* <Autocomplete
                  componentsProps={{
                    paper: {
                      sx: {
                        fontWeight: 'bold',
                      },
                    },
                  }}
                  options={forms}
                  getOptionLabel={(option) => option['project']['projectName']}
                  sx={{ border: 'none !important', fontWeight: 'bold', width: '43%' }}
                  onChange={(event, newValue) => {
                    setProgram(newValue);

                    formik.setFieldValue('Program', newValue !== null ? newValue['id'].toString() : '');
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputProps={{ ...params.inputProps, style: { fontWeight: 'bold' } }}
                      sx={{
                        borderRadius: '25px',
                        backgroundColor: '#D9D9D9',
                        margin: '10px 0 0 20px',
                        border: 'none !important',
                        '.MuiOutlinedInput-notchedOutline': { border: 'none !important' },
                        '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                          border: 'none !important',
                        },
                        '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          border: 'none !important',
                        },
                        '& .MuiSvgIcon-root': {
                          color: 'primary.main',
                        },
                      }}
                      placeholder="Select Program"
                    />
                  )}
                  noOptionsText="This program not found"
                /> */}
                  <Typography style={{ marginTop: 4, marginLeft: 12 }} variant="h5">
                    {data.project.projectName}
                  </Typography>

                  {/* {Boolean(formik.touched.Program && formik.errors.Program) && (
                    <Box sx={{ margin: ' 10px 0 0 20px' }}>
                      <Typography color={'red'} fontSize="14px">
                        {formik.touched.Program && formik.errors.Program}
                      </Typography>
                    </Box>
                  )} */}

                  <Box sx={{ display: 'flex', width: '100%' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '50%',
                      }}
                    >
                      <Title number={'2'} title={'Full name *'} />
                      <InputBar
                        inputName="FullName"
                        width={'90%'}
                        {...formik.getFieldProps('FullName')}
                        error={Boolean(formik.touched.FullName && formik.errors.FullName)}
                        helperText={formik.touched.FullName && formik.errors.FullName}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '50%',
                      }}
                    >
                      <Title number={'3'} title={'Roll number *'} />
                         <InputBar
                          check={student?.rollNumber}
                      inputName="RollNumber"
                      width={'90%'}
                      {...formik.getFieldProps('RollNumber')}
                      error={Boolean(formik.touched.RollNumber && formik.errors.RollNumber)}
                      helperText={formik.touched.RollNumber && formik.errors.RollNumber}
                    />
                      
                 
                    </Box>
                  </Box>
                 
                  <Title number={'4'} title={'Major *'} />
                  {!student?.major && (
                 
              //        <FormControl fullWidth>
                   
              //        <Select
                    
              //          labelId="demo-simple-select-label"
              //          id="demo-simple-select"
              //          value={Major}
              // defaultValue={student.majorId}
              //          onChange={handleChange}
              //                    sx={{
              //               width: '93.5%',
              //               borderRadius: '25px',
              //               backgroundColor: '#ffff',
              //               margin: '10px 0 0 20px',
              //               border: 'none !important',
              //               '.MuiOutlinedInput-notchedOutline': { border: 'none !important' },
              //               '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
              //                 border: 'none !important',
              //               },
              //               '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              //                 border: 'none !important',
              //               },
              //               '& .MuiSvgIcon-root': {
              //                 color: 'primary.main',
              //               },
              //             }}
              //        >
              //        {Majors.map((maj, index) => (
              //          <MenuItem value={maj.id}>{maj.majorFullName}</MenuItem>

              //        )
              //        )

              //        }
                     
              //        </Select>
              //      </FormControl>

                    <Autocomplete
                      componentsProps={{
                        paper: {
                          sx: {
                            fontWeight: 'bold',
                          },
                        },
                      }}
                      disablePortal
                      options={Majors}
                      defaultValue={student?.major}
                      getOptionLabel={(option) => option['majorFullName']}
                      sx={{ border: 'none !important', fontWeight: 'bold' }}
                      onChange={(event, newValue) => {
                        setMajor(newValue);
                        formik.setFieldValue('Major', newValue !== null ? newValue['id'].toString() : '');
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          inputProps={{ ...params.inputProps, style: { fontWeight: 'bold' } }}
                          sx={{
                            width: '93.5%',
                            borderRadius: '25px',
                            backgroundColor: '#D9D9D9',
                            margin: '10px 0 0 20px',
                            border: 'none !important',
                            '.MuiOutlinedInput-notchedOutline': { border: 'none !important' },
                            '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                              border: 'none !important',
                            },
                            '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              border: 'none !important',
                            },
                            '& .MuiSvgIcon-root': {
                              color: 'primary.main',
                            },
                          }}
                          placeholder="Select Major"
                        />
                      )}
                      noOptionsText="This major not found"
                    />
                  ) || <Typography style={{ marginTop: 4, marginLeft: 12 }} variant="h5">{student?.major.majorFullName}</Typography> }
                  {/* {Boolean(formik.touched.Major && formik.errors.Major) && (
                    <Box sx={{ margin: ' 10px 0 0 20px' }}>
                      <Typography color={'red'} fontSize="14px">
                        {formik.touched.Major && formik.errors.Major}
                      </Typography>
                    </Box>
                  )} */}
                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        width: '50%',
                        flexDirection: 'column',
                      }}
                    >
                      <Title number={'5'} title={'Date of birth'} />
                      <Box height={12}></Box>
                      <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{
                            input: { fontWeight: 'bold' },
                            margin: '0 0 0 20px',
                            padding: '0 20px 0 5px',
                            width: '90%',
                            borderRadius: '25px',
                            '.MuiOutlinedInput-notchedOutline': { border: 'none !important' },
                            '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                              border: 'none !important',
                            },
                            '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              border: 'none !important',
                            },
                          }}
                          value={DOB}
                          onChange={(newValue) => {
                            setDOB(newValue);
                            formik.setFieldValue('DOB', newValue);
                          }}
                          format="DD/MM/YYYY"
                        />
                      </LocalizationProvider>
                      {Boolean(formik.touched.DOB && formik.errors.DOB) && (
                        <Box sx={{ margin: ' 10px 0 0 20px' }}>
                          <Typography color={'red'} fontSize="14px">
                            {formik.touched.DOB && formik.errors.DOB}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '50%',
                      }}
                    >
                      <Title number={'6'} title={'Phone number *'} />
                       <InputBar
                      inputName="PhoneNumber"
                      check={student?.phoneNumber}

                      width={'90%'}
                      {...formik.getFieldProps('PhoneNumber')}
                      error={Boolean(formik.touched.PhoneNumber && formik.errors.PhoneNumber)}
                      helperText={formik.touched.PhoneNumber && formik.errors.PhoneNumber}
                    />
                      
                  
                    </Box>
                  </Box>
                  <Title number={'7'} title={'Passport number *'} />
                  <InputBar
                    inputName="PassportNumber"
                    width={'95%'}
                    {...formik.getFieldProps('PassportNumber')}
                    // error={Boolean(formik.touched.PassportNumber && formik.errors.PassportNumber)}
                    // helperText={formik.touched.PassportNumber && formik.errors.PassportNumber}
                  />
                  <Title number={'8'} title={'Expiration date *'} />
                  <Box height={12}></Box>
                  <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{
                        input: { fontWeight: 'bold' },
                        margin: '0 0 0 20px',
                        padding: '0 20px 0 5px',
                        width: '93.5%',
                        borderRadius: '25px',
                        '.MuiOutlinedInput-notchedOutline': { border: 'none !important' },
                        '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                          border: 'none !important',
                        },
                        '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          border: 'none !important',
                        },
                      }}
                      value={ExpirationDate}
                      onChange={(newValue) => {
                        setExpirationDate(newValue);
                        formik.setFieldValue('ExpirationDate', newValue);
                      }}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>
                  {/* {Boolean(formik.touched.ExpirationDate && formik.errors.ExpirationDate) && (
                    <Box sx={{ margin: ' 10px 0 0 20px' }}>
                      <Typography color={'red'} fontSize="14px">
                        {formik.touched.ExpirationDate && formik.errors.ExpirationDate}
                      </Typography>
                    </Box>
                  )} */}
                  <Title number={'9'} title={'Personal Facebook link *'} />
                  <InputBar
                    inputName="FacebookLink"
                    width={'95%'}
                    {...formik.getFieldProps('FacebookLink')}
                    error={Boolean(formik.touched.FacebookLink && formik.errors.FacebookLink)}
                    helperText={formik.touched.FacebookLink && formik.errors.FacebookLink}
                  />
                  <Title number={'10'} title={'Passport image *'} />
                  {data?.passportImageUrl && 
                    <img
                      src={formDetail?.passportImageUrl}
                      style={{ maxWidth: '50%', margin: '10px 0 20px 0' }}
                      alt="alt"
                    />}
               
                      {!PassportImage ||
                        (PassportImage.length < 1 && (
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: '20px',
                              margin: '10px 0 0 20px',
                            }}
                          >
                            <img src="/images/upload-icon.svg" width={25} height={25} alt="alt" />
                            <Box
                              component="label"
                              sx={{
                                fontWeight: '500',
                                fontSize: '18px',
                                cursor: 'pointer',
                                '&:hover': { color: 'primary.main' },
                              }}
                            >
                              Upload your file here
                              <input type="file" hidden onChange={handlePassportImage} />
                            </Box>
                          </Box>
                        ))}
               

                  {PassportImage.length > 0 && (
                    <>
                      <Box height={24}></Box>
                      <Box px={2} display={'flex'} flexWrap="wrap" width={'100%'} gap={1}>
                        {PassportImage.map((item, index) => (
                          <Chip
                            label={item.name}
                            onDelete={() => handleDeletePassportImage(item)}
                            sx={{ borderRadius: 10, padding: '5px 10px' }}
                          />
                        ))}
                        <Box width={3}></Box>
                        {PassportImage.length < 1 && (
                          <Button
                            component="label"
                            variant="contained"
                            fullWidth={false}
                            size={'small'}
                            style={{
                              maxWidth: '30px',
                              maxHeight: '30px',
                              minWidth: '30px',
                              minHeight: '30px',
                              backgroundColor: '#D9D9D9',
                              color: 'background.paper',
                              fontSize: '16px',
                            }}
                          >
                            +
                            <input type="file" hidden onChange={handlePassportImage} />
                          </Button>
                        )}
                      </Box>
                    </>
                  )}
                  {/* {!data?.urlImageBill  ?<>
                  {Boolean(formik.touched.PassportImage && formik.errors.PassportImage) && (
              <Box sx={{ margin: ' 10px 0 0 20px' }}>
                <Typography color={'red'} fontSize="14px">
                  {formik.touched.PassportImage && formik.errors.PassportImage}
                </Typography>
              </Box>
            )}
                 </> : null }  */}

                  <Title number={'11'} title={'Transfer information *'} />

               
                {
                  data?.urlImageBill && (
                    
                    <img
                      src={formDetail?.urlImageBill}
                      alt="alt"
                      style={{ maxWidth: '50%', margin: '10px 0 20px 0' }}
                    />
                    
                  )
                }
                      {!TransferInfomation ||
                        (TransferInfomation.length < 1 && (
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: '20px',
                              margin: '10px 0 0 20px',
                            }}
                          >
                            <img src="/images/upload-icon.svg" width={25} height={25} alt="alt" />
                            <Box
                              component="label"
                              sx={{
                                fontWeight: '500',
                                fontSize: '18px',
                                cursor: 'pointer',
                                '&:hover': { color: 'primary.main' },
                              }}
                            >
                              Upload your file here
                              <input accept="image/*" type="file" hidden onChange={handleTransferInformation} />
                            </Box>
                          </Box>
                        ))}
              
               

                  {TransferInfomation.length > 0 && (
                    <>
                      <Box height={24}></Box>
                      <Box px={2} gap={1} display={'flex'} flexWrap="wrap" width={'100%'}>
                        {TransferInfomation.map((item, index) => (
                          <Chip
                            label={item.name}
                            onDelete={() => handleDeleteTransferInformation(item)}
                            sx={{ borderRadius: 10, padding: '5px 10px' }}
                          />
                        ))}

                        <Box width={3}></Box>
                        {TransferInfomation.length < 1 && (
                          <Button
                            variant="contained"
                            fullWidth={false}
                            component="label"
                            size={'small'}
                            style={{
                              maxWidth: '30px',
                              maxHeight: '30px',
                              minWidth: '30px',
                              minHeight: '30px',
                              backgroundColor: '#D9D9D9',
                              color: 'background.paper',
                              fontSize: '16px',
                            }}
                          >
                            +
                            <input accept="image/*" type="file" hidden onChange={handleTransferInformation} />
                          </Button>
                        )}
                      </Box>
                    </>
                  )}
                  {/* {data?.urlImageBill ? null : <>
                  {Boolean(formik.touched.TransferInfomation && formik.errors.TransferInfomation) && (
              <Box sx={{ margin: ' 10px 0 0 20px' }}>
                <Typography color={'red'} fontSize="14px">
                  {formik.touched.TransferInfomation && formik.errors.TransferInfomation}
                </Typography>
              </Box>
            )}
                 </>}  */}

                  {data?.contentHeader1 !== 'null' && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                      }}
                    >
                      <Title number={'10'} title={data?.contentHeader1} />
                      <InputBar
                        inputName={'contentHeader1'}
                        width={'90%'}
                        {...formik.getFieldProps('contentHeader1')}
                      />
                    </Box>
                  )}
                  {data?.contentHeader2 !== 'null' && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                      }}
                    >
                      <Title number={'11'} title={data?.contentHeader2} />
                      <InputBar
                        inputName={'contentHeader2'}
                        width={'90%'}
                        {...formik.getFieldProps('contentHeader2')}
                      />
                    </Box>
                  )}
                  {data?.contentHeader3 !== 'null' && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                      }}
                    >
                      <Title number={'12'} title={data?.contentHeader3} />
                      <InputBar
                        inputName={'contentHeader3'}
                        width={'90%'}
                        {...formik.getFieldProps('contentHeader3')}
                      />
                    </Box>
                  )}
                  {data?.contentHeader4 !== 'null' && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                      }}
                    >
                      <Title number={'13'} title={data?.contentHeader4} />
                      <InputBar
                        inputName={'contentHeader4'}
                        width={'90%'}
                        {...formik.getFieldProps('contentHeader4')}
                      />
                    </Box>
                  )}
                  {data?.contentHeader5 !== 'null' && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                      }}
                    >
                      <Title number={'14'} title={data?.contentHeader5} />
                      <InputBar
                        inputName={'contentHeader5'}
                        width={'95%'}
                        {...formik.getFieldProps('contentHeader5')}
                      />
                    </Box>
                  )}
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '50px',
                    }}
                  >
                    <Button
                      disableRipple
                      variant="contained"
                      sx={{
                        fontWeight: '500',
                        fontSize: '20px',
                        padding: '10px 50px',
                        borderRadius: '10px',
                        backgroundColor: 'primary.main',
                        color: 'secondary.contrastText',
                        transition: 'all .5s',
                        boxShadow: '0 2px 3px #00000085',

                        '&:hover': {
                          backgroundColor: 'primary.main',
                          transform: 'translateY(3px)',
                        },
                      }}
                      type="submit"
                    >
                      SUBMIT
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
            <Snackbar
              open={show}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setShow(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                variant="filled"
                severity="success"
                sx={{ width: '100%' }}
              >
                {'Update Successful!!'}
              </Alert>
            </Snackbar>
            <Snackbar
              open={showErr}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setShowErr(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                variant="filled"
                severity="error"
                sx={{ width: '100%' }}
              >
                {'Update fail!!'}
              </Alert>
            </Snackbar>
          </Box>
        </Slide>
      )  ||     <Box  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, height: "100vh", position:"relative", top: "50vh", left: "80vh" }}>
      <CircularProgress />
    </Box>}
    </>
  );
};

export default RegisterInformationComponent;

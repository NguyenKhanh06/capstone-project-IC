import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
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
import { programData, majorData } from './register.data';
import { Program } from '../../../interfaces/program';
import { Major } from '../../../interfaces/major';
import CloseIcon from '@mui/icons-material/Close';

import axios from 'axios';
import { API_URL } from 'src/config/apiUrl/apis-url';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const RegisterSchema = Yup.object().shape({
  Program: Yup.string().required('Can you select the program you want register, please ?'),

  FullName: Yup.string()
    .required('Can you input your full name, please ?')
    .min(2, 'Name is too short!')
    .max(40, 'Name is too long!'),

  RollNumber: Yup.string()
    .required('Can you input your roll number, please ?')
    .matches(/^[A-Za-z]{2}[0-9]{6}$/, 'Incorrect roll number. Example: SE123456'),

  // Major: Yup.string().required('Can you input your major, please ?'),

  PhoneNumber: Yup.string().matches(/(0[3|5|7|8|9])+([0-9]{8})\b/, 'Invalid phone number, please check again!'),

  // PassportNumber: Yup.string()
  //   .matches(/[A-Z]{1}[0-9]{8}/, 'Incorrect passport number, please check again! [Example: A12345678]')
  //   .required('Can you input your major, please ?'),

  FacebookLink: Yup.string()
    .matches(
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
      'Incorrect link. Example: https://example.com'
    )
    .required('Can you input your facebook link, please ?'),

  DOB: Yup.date().required('Can you input your date of birth, please ?'),

  // ExpirationDate: Yup.date().required('Can you input your expiration date, please ?'),

  // PassportImage: Yup.array().required('Can you upload your passport image, please ?'),

  // TransferInfomation: Yup.array().required('Can you upload your transfer information, please ?'),
});
const RegisterComponent = () => {
  const student = JSON.parse(sessionStorage.getItem('user'));

  // const [PassportImage, setPassportImage] = React.useState<File[]>([]);
  const [TransferInfomation, setTransferInfomation] = React.useState<File[]>([]);
  const [Program, setProgram] = React.useState(null);
  const [ProgramForm, setProgramForm] = React.useState(null);
  const [Major, setMajor] = React.useState(null);
  const [Majors, setMajors] = React.useState(null);
  const [DOB, setDOB] = React.useState<Date | null>(null);
  const [ExpirationDate, setExpirationDate] = React.useState<Date | null>(null);
  const [forms, setForm] = React.useState(null);
  const [show, setShow] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const [inputList, setInputList] = useState([]);

  const containerRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      Program: '',
      FullName: student?.fullName as string,
      RollNumber: student?.rollNumber as string,
      Major: '',
      PhoneNumber: student?.phoneNumber as string,
      PassportNumber: '',
      FacebookLink: '',
      DOB: '',
      ExpirationDate: '',

      // PassportImage: '',
      // TransferInfomation: '',
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

        // PassportImage: PassportImage,
        // TransferInfomation: TransferInfomation,
      };

      // {ProgramForm && () &&  console.log(2)}
      // {ProgramForm && (ProgramForm?.contentHeader3 && ProgramForm?.contentHeader2 && ProgramForm?.contentHeader1) &&  console.log(3)}
      // {ProgramForm && (ProgramForm?.contentHeader4&& ProgramForm?.contentHeader3 && ProgramForm?.contentHeader2 && ProgramForm?.contentHeader1) &&  console.log(4)}

      const formData = new FormData();
      formData.append('Title', Program['title']);
      formData.append('ParentId', Program['id']);

      formData.append('ProjectId', Program['projectId']);
      formData.append('NumberPassPort', values.PassportNumber);
      formData.append('ScocialLink', values.FacebookLink);
      formData.append('DateExpired', values.ExpirationDate);
      formData.append('DateOfBirth', values.DOB);
      formData.append('StudentId', student.id);

      // inputList.map(question => formData.append('AddMoreOptinal', question.question))

      axios({
        method: 'POST',
        data: formData,
        url: `${API_URL}/registration/create`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        const data = {
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
        handleUpdateStudent(data);
        if (response.data.isSuccess) {
          
          setShow(true);
        
          handleRegis(response.data.responseSuccess.registrationAddOn);

          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }else{
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      });
    },

    //if register function succesful, redirect to login page
    //   register(newUser).then((res) => {
    //     history.push(`/login`);
    //   });
  });

  const handleRegis = (res) => {
    for (let i = 0; i <= res?.length; i += 1) {
      console.log("res", res[i])
      axios
        .put(
          `${API_URL}/registration/updateAnswer?RegistrationId=${res[i]?.registrationId}&Id=${res[i]?.id}&Answer=${inputList[i]?.answer}`
        )
        .then((response) => console.log(response));
    }
    // if(ProgramForm?.contentHeader1){
    // }
    // else if(ProgramForm?.contentHeader2 && ProgramForm?.contentHeader1){
    //   console.log(2)
    //  }
    //  }else else if( ProgramForm?.contentHeader3 && ProgramForm?.contentHeader2 && ProgramForm?.contentHeader1){
    //   console.log(3)
    //  }else if(ProgramForm?.contentHeader4&& ProgramForm?.contentHeader3 && ProgramForm?.contentHeader2 && ProgramForm?.contentHeader1){
    //   console.log(4)
    //  }else if(ProgramForm?.contentHeader5 && ProgramForm?.contentHeader4&& ProgramForm?.contentHeader3 && ProgramForm?.contentHeader2 && ProgramForm?.contentHeader1) {
    //   console.log(5)
    //  }
  };

  const handleUpdateStudent = (data) => {
    axios
      .put(`${API_URL}/student/update/${student.id}`, data)
      .then((response) => {
        if (response.data.isSuccess) {
          setShow(true);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 2000);
        }
      })
      .catch((err) => {
        setShowErr(true);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      });
  };
  const getAllForm = async () => {
    await axios.get(`${API_URL}/registration/getRootRegis`).then((response) => {
      setForm(response.data.responseSuccess.filter((value) => value.status));
    });
  };
  const getDetailForm = async (id) => {
    await axios.get(`${API_URL}/registration/GetDetailResId/${id}`).then((response) => {
      setProgramForm(response.data.responseSuccess[0]);

      console.log(response.data.responseSuccess[0]);
      // addList(response.data.responseSuccess[0])
      // for (const element in response.data.responseSuccess[0].registrationAddOn) {
      //   console.log(element);
      // }
      setInputList(response.data.responseSuccess[0].registrationAddOn);
    });
  };

  const getAllMajor = async () => {
    await axios.get(`${API_URL}/Major/getAllMajor`).then((response) => {
      setMajors(response.data.responseSuccess);
    });
  };

  // const getFormbyPrj = (id) => {
  //   axios.get(`${API_URL}/registration/getDetailbyProjectId/${id}`).then((response) => {
  //     setProgramForm(response.data.responseSuccess.filter((form) => !form.student)[0]);
  //     console.log(response.data.responseSuccess.filter((form) => !form.student));
  //   });
  // };

  // const handlePassportImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const files = Array.from(e.target.files)[0];
  //     const newFiles = [...PassportImage, files];
  //     setPassportImage(newFiles);
  //     const newFilesString = newFiles.map((file) => file.name);
  //     formik.setFieldValue('PassportImage', newFilesString);
  //   }
  //   console.log(PassportImage);
  // };
  // const handleTransferInformation = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const files = Array.from(e.target.files)[0];
  //     const newFiles = [...TransferInfomation, files];
  //     setTransferInfomation(newFiles);
  //     const newFilesString = newFiles.map((file) => file.name);
  //     formik.setFieldValue('TransferInfomation', newFilesString);
  //   }
  //   console.log(TransferInfomation);
  // };

  // const handleDeletePassportImage = (file: File) => {
  //   const newFiles = PassportImage.filter((f) => f !== file);
  //   setPassportImage(newFiles);
  //   const newFilesString = newFiles.map((file) => file.name);
  //   formik.setFieldValue('PassportImage', newFilesString);
  // };

  // const handleDeleteTransferInformation = (file: File) => {
  //   const newFiles = TransferInfomation.filter((f) => f !== file);
  //   setTransferInfomation(newFiles);
  //   const newFilesString = newFiles.map((file) => file.name);
  //   formik.setFieldValue('TransferInfomation', newFilesString);
  // };

  useEffect(() => {
    getAllForm();
    getAllMajor();
    setMajor(student?.major);
  }, []);
  useEffect(() => {
    if (Program) {
      getDetailForm(Program.id);
    }
  }, [Program]);
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  return (
    <>
      {(forms && Majors && (
        <Slide
          direction="up"
          in={true}
          container={containerRef.current}
          style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 600 } : {})}
        >
          <Box
            sx={{
              mt: 25,
              backgroundColor: 'background.default',
            }}
          >
            <Box
              sx={{
                width: '80%',
                height: '100%',
                backgroundColor: ' #F8F8F8',
                margin: '5% auto',
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
                {(student && (
                  <form onSubmit={formik.handleSubmit}>
                    <Title number={'1'} title={'Program *'} />
                    <Autocomplete
                      componentsProps={{
                        paper: {
                          sx: {
                            fontWeight: 'bold',
                          },
                        },
                      }}
                      options={forms}
                      getOptionLabel={(option) => option['title']}
                      sx={{ border: 'none !important', fontWeight: 'bold', width: '43%' }}
                      onChange={(event, newValue) => {
                        setInputList([]);
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
                    />

                    {/* {!student?.major &&Boolean(formik.touched.Program && formik.errors.Program) && (
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
                          inputName="RollNumber"
                          width={'90%'}
                          check={student?.rollNumber}
                          {...formik.getFieldProps('RollNumber')}
                          error={Boolean(formik.touched.RollNumber && formik.errors.RollNumber)}
                          helperText={formik.touched.RollNumber && formik.errors.RollNumber}
                        />
                      </Box>
                    </Box>
                    <Title number={'4'} title={'Major *'} />
                    {(!student?.major && (
                      <Autocomplete
                        componentsProps={{
                          paper: {
                            sx: {
                              fontWeight: 'bold',
                            },
                          },
                        }}
                        defaultValue={student?.major}
                        disablePortal
                        options={Majors}
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
                    )) || (
                      <Typography style={{ marginTop: 4, marginLeft: 12 }} variant="h5">
                        {student?.major.majorFullName}
                      </Typography>
                    )}

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
                          width={'90%'}
                          check={student?.phoneNumber}
                          {...formik.getFieldProps('PhoneNumber')}
                          error={Boolean(formik.touched.PhoneNumber && formik.errors.PhoneNumber)}
                          helperText={formik.touched.PhoneNumber && formik.errors.PhoneNumber}
                        />
                      </Box>
                    </Box>
                    <Title number={'7'} title={'Passport number'} />
                    <InputBar
                      inputName="PassportNumber"
                      width={'95%'}
                      {...formik.getFieldProps('PassportNumber')}
                      // error={Boolean(formik.touched.PassportNumber && formik.errors.PassportNumber)}
                      // helperText={formik.touched.PassportNumber && formik.errors.PassportNumber}
                    />
                    <Title number={'8'} title={'Expiration date'} />
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
                    {/* <Title number={'10'} title={'Passport image *'} />
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
      {Boolean(formik.touched.PassportImage && formik.errors.PassportImage) && (
        <Box sx={{ margin: ' 10px 0 0 20px' }}>
          <Typography color={'red'} fontSize="14px">
            {formik.touched.PassportImage && formik.errors.PassportImage}
          </Typography>
        </Box>
      )}
      <Title number={'11'} title={'Transfer information *'} />
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
              <input type="file" hidden onChange={handleTransferInformation} />
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
                <input type="file" hidden onChange={handleTransferInformation} />
              </Button>
            )}
          </Box>
        </>
      )}
      {Boolean(formik.touched.TransferInfomation && formik.errors.TransferInfomation) && (
        <Box sx={{ margin: ' 10px 0 0 20px' }}>
          <Typography color={'red'} fontSize="14px">
            {formik.touched.TransferInfomation && formik.errors.TransferInfomation}
          </Typography>
        </Box>
      )} */}

                    {inputList?.map((x, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '50%',
                        }}
                      >
                        <Title number={String(9 + index + 1)} title={x?.question} />
                        <TextField
                          variant="standard" // <== changed this
                          InputProps={{
                            disableUnderline: true, // <== change this
                          }}
                          name="answer"
                          placeholder={'Enter your answer here'}
                          inputProps={{
                            style: { fontWeight: 'bold !important' },
                          }}
                          multiline
                          sx={{
                            backgroundColor: 'background.grey',
                            width: '100vh',
                            minHeight: '60px',
                            borderRadius: '25px',
                            fontSize: '25px',
                            justifyContent: 'center',
                            padding: ' 0 20px',
                            fontWeight: 'bold !important',
                          }}
                          value={x.answer}
                          onChange={(e) => handleInputChange(e, index)}
                        />
                        {/* <TextField onChange={() => } /> */}
                        {/* <InputBar
              inputName={form?.question}
              width={'90%'}
              {...formik.getFieldProps(form?.question)}
            /> */}
                      </Box>
                    ))}
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
                )) || (
                  <Box sx={{ height: '100vh' }}>
                    <Typography style={{ marginTop: '5%' }} variant="h6">
                      Please <Link to={'/login'}>Login</Link> before regis any program!
                    </Typography>
                  </Box>
                )}
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
                {'Regis Successful!!'}
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
                {'Regis fail!!'}
              </Alert>
            </Snackbar>
          </Box>
        </Slide>
      )) || (
        <Box
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            height: '100vh',
            position: 'relative',
            top: '50vh',
            left: '80vh',
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default RegisterComponent;

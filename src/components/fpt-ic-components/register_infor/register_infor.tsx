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

  // DOB: Yup.date().required('Can you input your date of birth, please ?'),

  // ExpirationDate: Yup.date().required('Can you input your expiration date, please ?'),

  // PassportImage: Yup.array().required('Can you upload your passport image, please ?'),

  // TransferInfomation: Yup.array().required('Can you upload your transfer information, please ?'),
});
const RegisterInformationComponent = () => {
  const student = JSON.parse(sessionStorage.getItem('user'));
  const location = useLocation();
  const data = location.state;
  console.log(data);
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
  const [showFB, setShowFB] = useState(false);
  const [showErrFB, setShowErrFB] = useState(false);
  const containerRef = useRef(null);
  const [age, setAge] = React.useState('');

  const [inputList, setInputList] = useState([]);

  const [formFb, setFormFb] = useState([]);
  const [inputListFb, setInputListFb] = useState([]);
  const [titleFb, setTitleFb] = useState('');
  const [idFb, setIdFb] = useState('');
  const [fbProgram, setfbProgram] = useState('');

  const [fbStu, setfbStu] = useState(false);
  const [detailformStu, setDetailFormStu] = useState(null);
const [mess, setMess] = useState('')
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

        PassportImage: PassportImage,
        TransferInfomation: TransferInfomation,
      };

      const formData = new FormData();
      formData.append('PassportImageUrl', PassportImage[0]);
      formData.append('UrlImageBill', TransferInfomation[0]);

      axios({
        method: 'PUT',
        data: formData,
        url: `${API_URL}/registration/UpdateRegisId/${data.id}?Title=${data.title}&FullName=${values.FullName}&MajorId=${Major.id}&memberCode=${data?.student?.memberCode}&PhoneNumber=${values.PhoneNumber}&DateOfBirth=${DOB}&NumberPassPort=${values.PassportNumber}&RollNumber=${values.RollNumber}&YourEmail=${data?.student?.email}&ScocialLink=${values.FacebookLink}&DateExpired=${ExpirationDate}&ProjectId=${data?.projectId}`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
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
          handleRegis();
          getDetail();
          getDetailStudent();
          handleUpdateStudent(datas);
          setTimeout(() => {
            setShow(false);
            window.location.reload();
          }, 2000);
        } else {
          setShowErr(true);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
    },
  });

  const handleRegis = () => {
    for (let i = 0; i <= inputList.length; i += 1) {
      axios.put(
        `${API_URL}/registration/updateAnswer?RegistrationId=${data.id}&Id=${inputList[i]?.id}&Answer=${inputList[i]?.answer}`
      );
    }
  };

  const handleRegisFb = (res) => {
    for (let i = 0; i <= res?.feedBackAddOns?.length; i += 1) {
      console.log('fb', res.feedBackAddOns[i]);
      const data = {
        feedbackId: res?.feedBackAddOns[i]?.feedBackId,
        id: res?.feedBackAddOns[i]?.id,
        answer: inputListFb[i]?.answer,
      };
      axios.put(`${API_URL}/feedback/updateFbAnswer`, data).then((response) => console.log('check ans', response));
    }
  };
  const getDetail = async () => {
    await axios.get(`${API_URL}/registration/GetDetailResId/${data.id}`).then((response) => {
      setFormDetail(response.data.responseSuccess[0]);
      setInputList(response.data.responseSuccess[0].registrationAddOn);
    });
  };
  const getDetailFb = async () => {
    await axios.get(`${API_URL}/feedback/getDetailByRes/${data.parentRegistrationsId}`).then((response) => {
      getDetailFbByStudent(response.data.responseSuccess[0].id);
      setFormFb(response.data.responseSuccess[0]);
      setInputListFb(response.data.responseSuccess[0].feedBackAddOns);
      setTitleFb(response.data.responseSuccess[0].title);
    });
  };

  const getDetailStudent = async () => {
    await axios.get(`${API_URL}/student/getStudentDetail/${student.id}`).then((response) => {
      setStudentDetail(response.data.responseSuccess[0]);
      sessionStorage.setItem('user', JSON.stringify(response.data.responseSuccess[0]));
    });
  };
  const getDetailFbByStudent = (id) => {
    axios.get(`${API_URL}/feedback/getChildFb/${id}`).then((response) => {
      console.log('detail', response.data.responseSuccess);
      if (
        response.data.responseSuccess.find(
          (form) => form.registrationId === data.id && form.registration?.studentId === student.id
        )
      ) {
        setDetailFormStu(
          response.data.responseSuccess.find(
            (form) => form.registrationId === data.id && form.registration?.studentId === student.id
          )
        );
        setfbStu(true);
        setfbProgram(
          response.data.responseSuccess.find(
            (form) => form.registrationId === data.id && form.registration?.studentId === student.id
          ).feedBackContent
        );

        setInputListFb(
          response.data.responseSuccess.find(
            (form) => form.registrationId === data.id && form.registration?.studentId === student.id
          ).feedBackAddOns
        );
      }
    });
  };
const handleSuccess = (message) => {
  setShowFB(true)
  setMess(message)
}
const handleErr = (message) => {
  setShowErrFB(true)
  setMess(message)
}
  const CreateFb = () => {
    const formData = new FormData();
    formData.append('Title', titleFb);
    formData.append('ParentFeedBacksId', formFb['id']);
    formData.append('Description', formFb['description']);
    formData.append('RegistrationId', data.id);
    formData.append('FeedBackContent', fbProgram);
    formData.append('DateCreated', formFb['dateCreated']);
    // inputListFb.map((question) => formData.append('AddMoreQuestion', question.question));

    axios({
      method: 'POST',
      data: formData,
      url: `${API_URL}/feedback/create`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => {
      if (response.data.isSuccess) {
        handleSuccess("Feedback Successful!!!")
        handleRegisFb(response.data.responseSuccess);
        getDetailFb();

        setTimeout(() => {
          setShowFB(false);
          window.location.reload();
        }, 2000);
      } else {
      handleErr("Feedback fail!!")
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  };

  const UpdateFb = () => {
    const datas = {
      parentFeedBacksId: detailformStu.parenFeedBacksId,
      title: detailformStu?.title,
      description: detailformStu?.description,
      feedBackContent: fbProgram,
      status: true,
      registrationId: detailformStu.registrationId,
    };
    axios.put(`${API_URL}/feedback/UpdateFeedBackId/${detailformStu.id}`, datas).then((response) => {
      if (response.data.isSuccess) {
        handleRegisFb(detailformStu);
        handleSuccess("Update Feedback Successful!!!")
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }).catch((err) => {
handleErr("Update Feedback Fail!!")
setTimeout(() => {
  window.location.reload();
}, 2000);
    });
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
  const handleInputChangeFB = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputListFb];
    list[index][name] = value;
    setInputListFb(list);
  };
  const handleUpdateStudent = (dataUpdate) => {
    axios
      .put(`${API_URL}/student/update/${student.id}`, dataUpdate)
      .then((response) => {
        if (response.data.isSuccess) {
          setShow(true);
          getDetail();
          getDetailStudent();
          // setTimeout(() => {
          //   setShow(false);
          //   window.location.reload();
          // }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllForm = async () => {
    await axios.get(`${API_URL}/registration/getAllRes`).then((response) => {
      setForm(response.data.responseSuccess.filter((value) => value.project != null));
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
  };
  const handleTransferInformation = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)[0];
      const newFiles = [...TransferInfomation, files];
      setTransferInfomation(newFiles);
      const newFilesString = newFiles.map((file) => file.name);
      formik.setFieldValue('TransferInfomation', newFilesString);
    }
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
    getDetailFb();

    getAllForm();
    getAllMajor();
    getDetail();
    getDetailStudent();
    setMajor(student?.major);
  }, [data]);
  useEffect(() => {
    if (Program) {
      getFormbyPrj(Program.projectId);
    }
  }, [Program]);
  return (
    <>
      {(forms && (
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

                  <Typography style={{ marginTop: 4, marginLeft: 12 }} variant="h5">
                    {data?.title}
                  </Typography>

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
                  {(!student?.major && (
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
                  {data?.passportImageUrl && (
                    <img
                      src={formDetail?.passportImageUrl}
                      style={{ maxWidth: '50%', margin: '10px 0 20px 0' }}
                      alt="alt"
                    />
                  )}

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

                  {data?.urlImageBill && (
                    <img
                      src={formDetail?.urlImageBill}
                      alt="alt"
                      style={{ maxWidth: '50%', margin: '10px 0 20px 0' }}
                    />
                  )}
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

                  {data?.student?.gradingUrl ? (
                    <Box>
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
                          <Typography style={{ fontWeight: 'Bold', fontSize: '60px' }}>FEEDBACK FORM</Typography>
                          <Typography style={{ fontWeight: '400', fontSize: '25px' }}>* Required</Typography>
                        </Box>
                        <Box
                          sx={{
                            padding: ' 0 6% 7% 8%',
                            width: 'auto',
                          }}
                        >
                          <form>
                            <Title number={'1'} title={'Form title'} />

                            <Typography style={{ marginTop: 4, marginLeft: 12 }} variant="h5">
                              {titleFb}
                            </Typography>

                            <Title number={'1'} title={'Description'} />

                            <Typography style={{ marginTop: 4, marginLeft: 12 }} variant="h5">
                              {formFb['description']}
                            </Typography>
                            <Box sx={{ display: 'flex', width: '100%' }}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  width: '50%',
                                }}
                              >
                                <Title number={'2'} title={'Full name'} />
                                <Typography style={{ marginTop: 4, marginLeft: 12 }} variant="h5">
                                  {student?.fullName}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  width: '50%',
                                }}
                              >
                                <Title number={'3'} title={'Roll number'} />
                                <Typography style={{ marginTop: 4, marginLeft: 12 }} variant="h5">
                                  {student?.rollNumber}
                                </Typography>
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '50%',
                              }}
                            >
                              <Title number="1" title={'Feed back about program'} />
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
                                  width: '100%',
                                  minHeight: '60px',
                                  borderRadius: '25px',
                                  fontSize: '25px',
                                  justifyContent: 'center',
                                  padding: ' 0 20px',
                                  fontWeight: 'bold !important',
                                }}
                                value={fbProgram}
                                onChange={(e) => setfbProgram(e.target.value)}
                              />
                            </Box>
                            {inputListFb?.map((x, index) => (
                              <Box
                                key={index}
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  width: '50%',
                                }}
                              >
                                <Title number={String(index + 2)} title={x?.question} />
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
                                    width: '100%',
                                    minHeight: '60px',
                                    borderRadius: '25px',
                                    fontSize: '25px',
                                    justifyContent: 'center',
                                    padding: ' 0 20px',
                                    fontWeight: 'bold !important',
                                  }}
                                  value={x.answer}
                                  onChange={(e) => handleInputChangeFB(e, index)}
                                />
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
                              {fbStu ? (
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
                                  onClick={() => UpdateFb()}
                                >
                                  SUBMIT
                                </Button>
                              ) : (
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
                                  onClick={() => CreateFb()}
                                >
                                  SUBMIT
                                </Button>
                              )}
                            </Box>
                          </form>
                        </Box>
                      </Box>
                      <Snackbar
                        open={showFB}
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
                      {mess}
                        </Alert>
                      </Snackbar>
                      <Snackbar
                        open={showErrFB}
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
                         {mess}
                        </Alert>
                      </Snackbar>
                    </Box>
                  ) : (
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
                  )}
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

export default RegisterInformationComponent;

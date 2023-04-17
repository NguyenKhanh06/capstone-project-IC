import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import React, { useEffect, useState } from 'react';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';
import Loading from '../../Loading';


function CreateBlog(props) {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [open, setOpen] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

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
  const onChangeFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleCreateCourse = () => {
    // axios
    //   .post(
    //     `https://localhost:7115/api/v1/course/create?Activity=${activity}&Content=${content}&SkillName=${skillName}`
    //   )
    //   .then((response) => {
    //     window.location.reload(false);
    //   });
  };
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
    if(e.target.files[0]){
      setDisableBtn(true)
    }
  };


  const [inputImageSub, setInputImageSub] = useState([]);
  // state of obj to push to firebase
  const [stringImgSub, setStringImgSub] = useState([]);

  const handleFileChangeSub = (event) => {
    const image = [];
    const storageImage = [];
    for (let i = 0; i < event.target.files.length; i+=1) {
      if (
        event.target.files[i].type === "image/png" ||
        event.target.files[i].type === "image/jpeg" ||
        event.target.files[i].type === "image/jpg" ||
        event.target.files[i].type === "image/gif"
      ) {
        image.push(URL.createObjectURL(event.target.files[i]));
        storageImage.push(event.target.files[i]);
      }
    }
    setStringImgSub(storageImage);
    setInputImageSub(image);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value)

  }

  const handleChangeSubTitle = (e) => {
    setSubtitle(e.target.value)

  }

  const handleChangeContent = (e) => {
    setContent(e.target.value)
    
  }
  const handleChangeAuthor = (e) => {
    setAuthor(e.target.value)

  }
  const createPost = () =>{
    setLoading(true);
    const formData = new FormData();
    formData.append('FormFile', selectedFile)
    formData.append('Author', author)
    formData.append('Title', title)
    formData.append('SubTitle', subTitle)
    formData.append('Content', content)

    axios({
      method: 'POST',
      data: formData,
      url: 'https://localhost:7115/api/v1/post/create',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
console.log(response)
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
  }
  return (
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
        <DialogTitle id="alert-dialog-title">Create Post</DialogTitle>
            <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
        <Divider variant="middle" />

        <DialogContent>
          <Stack direction="column" spacing={3.5} sx={{ padding: 2 }}>
            <TextField value={title} onChange={handleChangeTitle} multiline required fullWidth label="Title Post" />
            <TextField
            multiline
              value={subTitle}
              onChange={handleChangeSubTitle}
              required
              fullWidth
              label="Subtitle"
            />
               {/* <TextField
              value={author}
          
              onChange={handleChangeAuthor}
              required
              fullWidth
              label="Author"
            /> */}
            <TextField
              value={content}
              multiline
              onChange={handleChangeContent}
              required
              fullWidth
              label="Content"
              inputProps={{
                maxLength: 1000,
              }}
            />
          
            <Divider variant="middle" />
            <Typography variant="h6">Poster:</Typography>
            {selectedFile && (
              <img src={preview} alt="poster" style={{ maxWidth: '50%', marginLeft: '25%', borderRadius: 10 }} />
            )}
            <Button color="secondary" variant="contained" component="label" startIcon={<FileUploadOutlinedIcon />}>
              Import Poster
              <input onChange={onSelectFile} id="input" hidden accept="image/*" type="file" />
            </Button>
{/*             
            <Divider variant="middle" />
            <Typography variant="h6">Another Images:</Typography>

            <Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={3} flexWrap="wrap">
            {inputImageSub.length ? (
            
         inputImageSub.map((img, index) => (
          
                <img key={index} src={img} alt="poster" style={{ maxWidth: '25%', borderRadius: 10, margin: 4 }} />

         
              ))
             
            ): null}
             </Stack> */}
            {/* <Button color="secondary" variant="contained" component="label" startIcon={<FileUploadOutlinedIcon />}>
              Import Another Images
              <input  onChange={handleFileChangeSub} multiple id="input" hidden accept="image/*" type="file" />
            </Button> */}
          </Stack>
        </DialogContent>
        <DialogActions style={{ padding: 20 }}>
     
          { title.trim().length && subTitle.trim().length && content.trim().length && selectedFile ? (
            <Button variant="contained" onClick={() => createPost()} autoFocus>
              Create Post
            </Button>
          ) : (
            <Button disabled variant="contained" autoFocus>
              Create Post
            </Button>
          )}
        </DialogActions>
      </form>
      <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Create Post Successful!'} />
      <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      <Loading show={loading} />
    </Dialog>
  );
}

export default CreateBlog;

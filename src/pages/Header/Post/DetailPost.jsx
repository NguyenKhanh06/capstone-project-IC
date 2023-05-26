import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import axios from 'axios';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';
import Loading from '../../Loading';
import { API_URL } from '../../../config/apiUrl/apis-url';

function DetailPost(props) {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSuccessdl, setShowSuccessdl] = useState(false);
  const [showSuccessdlImg, setShowSuccessdlImg] = useState(false);
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [showErrordl, setShowErrordl] = useState(false);
  const [showErrordlImg, setShowErrordlImg] = useState(false);
  const [open, setOpen] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [post, setPost] = useState({});
  const [title, setTitle] = useState('');
  const [subTitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showConfirmDeleteImg, setShowConfirmDeleteImg] = useState(false);

  const handleError = (data) => {
    setShowError(true);
    setMessage(data);
  };
  const handleErrordl = (data) => {
    setShowErrordl(true);
    setMessage(data);
  };
  const handleErrordlImg = (data) => {
    setShowErrordlImg(true);
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

  const handleCloseConfirm = (data) => {
    setShowConfirm(false);
  };
  const handleCloseConfirmDelete = (data) => {
    setShowConfirmDelete(false);
  };
  const handleCloseConfirmDeleteImg = (data) => {
    setShowConfirmDeleteImg(false);
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
    if (e.target.files[0]) {
      setDisableBtn(true);
    }
  };

  const [inputImageSub, setInputImageSub] = useState([]);
  // state of obj to push to firebase
  const [stringImgSub, setStringImgSub] = useState([]);

  const handleFileChangeSub = (event) => {
    const image = [];
    const storageImage = [];
    for (let i = 0; i < event.target.files.length; i += 1) {
      if (
        event.target.files[i].type === 'image/png' ||
        event.target.files[i].type === 'image/jpeg' ||
        event.target.files[i].type === 'image/jpg' ||
        event.target.files[i].type === 'image/gif'
      ) {
        image.push(URL.createObjectURL(event.target.files[i]));
        storageImage.push(event.target.files[i]);
      }
    }
    setStringImgSub(storageImage);
    setInputImageSub(image);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
    if (e.target.value && e.target.value.trim().length) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  };

  const handleChangeSubTitle = (e) => {
    setSubtitle(e.target.value);
    if (e.target.value && e.target.value.trim().length) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  };

  const handleChangeContent = (e) => {
    setContent(e.target.value);
    if (e.target.value && e.target.value.trim().length) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  };
  const handleChangeAuthor = (e) => {
    setAuthor(e.target.value);
    if (e.target.value && e.target.value.trim().length) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  };

  const handleDeleteImg = (id) => {
    setShowConfirmDeleteImg(true);
    setId(id);
  };

  useEffect(() => {
    if (props.post) {
      getDetail();
    }
  }, [props.post]);
  const DeleteImage = () => {
  
    axios
      .delete(`${API_URL}/post/deleteImage/${id.id}`)
      .then((response) => {
        if (response.data.isSuccess) {
          setShowSuccessdlImg(true);

          setTimeout(() => {
            getDetail();
            handleCloseConfirmDeleteImg();
  
          }, 1000)
      
    
        }
      })
      .catch((err) => {
        handleErrordlImg('Delete fail!!!!');

      });
  };
  const DeletePost = () => {
    axios
      .delete(`${API_URL}/post/delete/${props.post.id}`)
      .then((response) => {
        if (response.data.isSuccess) {
          setShowSuccessdl(true);
          setLoading(false);
          setTimeout(() => {
            reload();
          }, 1000);
        }
      })
      .catch((err) => {
        handleErrordl('Delete fail!!!!');
        setLoading(false);
      });
  };
  const getDetail = async () => {
    await axios.get(`${API_URL}/post/getPostById/${props.post.id}`).then((response) => {
      setPost(response.data.responseSuccess[0]);
      setTitle(response.data.responseSuccess[0].title);
      setSubtitle(response.data.responseSuccess[0].subTitle);
      setAuthor(response.data.responseSuccess[0].author);
      setContent(response.data.responseSuccess[0].content);
    });
  };

  const uploadFile = () => {
    setLoading(true);
    const formData = new FormData();
    stringImgSub.map((img, index) => formData.append('file', img));

    axios({
      method: 'POST',
      data: formData,
      url: `${API_URL}/post/upload/${props.post.id}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (!response.data.error) {
          setTimeout(() => {
            window.location.reload()
  
          }, 1000)
          setShowSuccess(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        handleError('Update fail!!!!');
        setLoading(false);
        setTimeout(() => {
          window.location.reload()

        }, 1000)
      });
  };

  const handleUpdate = () => {
    setLoading(true);
    const formData = new FormData();
    if (selectedFile) {
      formData.append('FormFile', selectedFile);
    }
    formData.append('Author', author);
    formData.append('Title', title);
    formData.append('SubTitle', subTitle);
    formData.append('Content', content);

    axios({
      method: 'PUT',
      data: formData,
      url: `${API_URL}/post/update/${props.post.id}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (response.data.isSuccess) {
          if (stringImgSub) {
            uploadFile();
          } else {
            setTimeout(() => {
            window.location.reload()
            }, 1000)
            setShowSuccess(true);
            setLoading(false);
          }
        }
      })
      .catch((err) => {
        handleError('Update fail!!!!');
        setLoading(false);
        setTimeout(() => {
          window.location.reload()

        }, 1000)
      });
  };

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
          <DialogTitle id="alert-dialog-title">Detail Post</DialogTitle>
          <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>
        <Divider variant="middle" />

        <DialogContent>
          <Stack direction="column" spacing={3.5} sx={{ padding: 2 }}>
            <TextField value={title} multiline onChange={handleChangeTitle} required fullWidth label="Title Post" />
            <TextField value={subTitle} onChange={handleChangeSubTitle} required fullWidth label="Subtitle" multiline />
            {/* <TextField
              value={author}
              InputProps={{
                readOnly: true,
              }}
              onChange={handleChangeAuthor}
              required
              fullWidth
              label="Author"
            /> */}
            <TextField value={content} multiline onChange={handleChangeContent} required fullWidth label="Content" />

            <Divider variant="middle" />
            <Typography variant="h6">Poster:</Typography>
            <p style={{marginTop: 10, color: "red"}}>(Just accept file with size under 20MB)</p>
            {selectedFile ? (
              <img src={preview} alt="poster" style={{ maxWidth: '100%', marginLeft: '25%', borderRadius: 10 }} />
            ) : (
              <img
                src={props.post?.posterUrl}
                alt="poster"
                style={{ maxWidth: '80%', marginLeft: '10%', borderRadius: 10 }}
              />
            )}
            <Button color="secondary" variant="contained" component="label" startIcon={<FileUploadOutlinedIcon />}>
              Update Poster
              <input onChange={onSelectFile} id="input" hidden accept="image/*" type="file" />
            </Button>

            <Divider variant="middle" />
            <Typography variant="h6">Another Images:</Typography>
            <p style={{marginTop: 10, color: "red"}}>(Just accept file with size under 20MB)</p>
            <Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={3} flexWrap="wrap">
              {post?.postImages?.length
                ? post?.postImages?.map((item, index) => (
                    <>
                      <ImageListItem key={index}>
                        <img
                        style={{marginTop: 6}}
                          src={`${item.postImageUrl}?w=248&fit=crop&auto=format`}
                          srcSet={`${item.postImageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                          alt="sub_img"
                          loading="lazy"
                        />
                        <ImageListItemBar
                          actionIcon={
                            <Tooltip title="Delete Image">
                              <IconButton
                                onClick={() => handleDeleteImg(item)}
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${item.title}`}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          }
                        />
                      </ImageListItem>
                    </>
                  ))
                : null}
              {inputImageSub.length
                ? inputImageSub.map((img, index) => (
                    <img key={index} src={img} alt="poster" style={{ maxWidth: '25%', borderRadius: 10, margin: 4 }} />
                  ))
                : null}
            </Stack>

            <Button color="secondary" variant="contained" component="label" startIcon={<FileUploadOutlinedIcon />}>
              Update Another Images
              <input onChange={handleFileChangeSub} multiple id="input" hidden accept="image/*" type="file" />
            </Button>
            
          </Stack>
        </DialogContent>
        <DialogActions style={{ padding: 20 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Button variant="contained" onClick={() => setShowConfirmDelete(true)} color="error">
              Delete
            </Button>
            {disableBtn || stringImgSub.length ? (
              <Button variant="contained" onClick={() => setShowConfirm(true)} autoFocus>
                Save
              </Button>
            ) : (
              <Button disabled variant="contained" autoFocus>
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
        <DialogTitle id="alert-dialog-title">Update Post</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">You Want To Update Post?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Cancel</Button>
          <Button variant="contained" onClick={() => handleUpdate()} autoFocus>
            Change
          </Button>
        </DialogActions>
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Update Post Successful!'} />
        <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
        <Loading show={loading} />
      </Dialog>
      <Dialog
        open={showConfirmDeleteImg}
        onClose={handleCloseConfirmDeleteImg}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">Delete Image</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">You Want To Delete Image?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDelete}>Cancel</Button>
          <Button color="error" variant="contained" onClick={() => DeleteImage()} autoFocus>
            Delete
          </Button>
        </DialogActions>
        <SuccessAlert show={showSuccessdl} close={() => setShowSuccess(false)} message={'Delete Image Successful!'} />
        <ErrorAlert show={showErrordl} close={() => setShowError(false)} message={message} />
      </Dialog>
      <Dialog
        open={showConfirmDelete}
        onClose={handleCloseConfirmDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">Delete Post</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">You Want To Delete Post?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDelete}>Cancel</Button>
          <Button color="error" variant="contained" onClick={() => DeletePost()} autoFocus>
            Delete
          </Button>
        </DialogActions>
        <SuccessAlert show={showSuccessdl} close={() => setShowSuccess(false)} message={'Delete Post Successful!'} />
        <ErrorAlert show={showErrordl} close={() => setShowError(false)} message={message} />
      </Dialog>
    </Dialog>
  );
}

export default DetailPost;

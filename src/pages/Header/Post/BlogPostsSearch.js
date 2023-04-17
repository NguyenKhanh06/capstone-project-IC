import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import { styled } from '@mui/material/styles';
import { Autocomplete, Box, Button, InputAdornment, Link, Popper, TextField } from '@mui/material';
// components
import Iconify from '../../../components/iconify';

import DetailPost from './DetailPost';

// ----------------------------------------------------------------------

const StyledPopper = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '280px !important',
});
const StyledTitle = styled(Link)({
  height: 80,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});
// ----------------------------------------------------------------------

BlogPostsSearch.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default function BlogPostsSearch({ posts }) {
  const [showDetail, setShowDetail] = useState(false)
  const [postDetail, setPost] = useState()
  const ShowPostDetail = (data) => {
    setPost(data)
    setShowDetail(true)
      }
  const viewDetail = () => {
 
  }
  return (
    <>
     <Autocomplete
      sx={{ width: 280 }}
      autoHighlight
      popupIcon={null}
      PopperComponent={StyledPopper}
      options={posts}
      getOptionLabel={(post) => post.title}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option) => (
        <StyledTitle 
        color="inherit"
        variant="subtitle2"
        underline="none"
        key={option.id} >
&nbsp;&nbsp;&nbsp;<Button onClick={() => ShowPostDetail(option)}>{option.title}</Button>
        </StyledTitle>

      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search post..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      
    />

<DetailPost show={showDetail} close={() => setShowDetail(false)} post={postDetail}/>
    </>
   


  );
  
}

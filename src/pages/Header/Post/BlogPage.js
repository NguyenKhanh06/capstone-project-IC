
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CreateBlog from './CreateBlog';
// components
import Iconify from '../../../components/iconify';

// mock
import POSTS from '../../../_mock/blog';
import BlogPostsSearch from './BlogPostsSearch';
import BlogPostCard from './BlogPostCard';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {
  const [showCreate, setShowCreate] = useState(false)
  const [posts, setPost] = useState([])

  const getPost = async () => {
    await axios.get(`https://localhost:7115/api/v1/post/getAllPost`).then(response => {
      setPost(response.data.responseSuccess)
    })
  }
  useEffect(() => {
    getPost().catch((error) => {
      console.log(error);
    });
  }, []);
  return (
    <>


      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Post
          </Typography>
          <Button onClick={() => setShowCreate(true)} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Post
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={posts} />
          {/* <BlogPostsSort options={SORT_OPTIONS} /> */}
        </Stack>

        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
      <CreateBlog show={showCreate} close={() => setShowCreate(false)}/>
    </>
  );
}

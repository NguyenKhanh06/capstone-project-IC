import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { data } from '../../../components/fpt-ic-components/program/program.data';
import ProgramDetailComponent from '../../../components/fpt-ic-components/program/detail/program-detail';
import { PostContext } from 'src/context/context';

const ProgramDetail = () => {
  const { id } = useParams();
  const { posts } = useContext(PostContext);
  const item = posts.find((e) => e.id === id);

  return <>{item && <ProgramDetailComponent item={item} />}</>;
};

export default ProgramDetail;

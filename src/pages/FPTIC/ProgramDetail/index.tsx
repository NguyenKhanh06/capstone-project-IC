import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { data } from '../../../components/fpt-ic-components/program/program.data';
import ProgramDetailComponent from '../../../components/fpt-ic-components/program/detail/program-detail';

const ProgramDetail = () => {
  const { id } = useParams();
  const item = data.find((e) => e.id === Number.parseInt(id, 36));

  return <>{item && <ProgramDetailComponent item={item} />}</>;
};

export default ProgramDetail;

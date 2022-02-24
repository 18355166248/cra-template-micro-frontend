import React, { FC } from 'react';

interface Props {
  lg?: number | string;
  xl?: number | string;
  xs?: number | string;
  md?: number | string;
  xxl?: number | string;
}

const FormItem: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default FormItem;

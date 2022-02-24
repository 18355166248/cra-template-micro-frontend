import { FC, useEffect } from 'react';
import { useCommonContext } from './index.context';

interface Props {
  children?: any;
}

const Init: FC<Props> = (props: Props) => {
  const { children } = props;

  const { getOpsId } = useCommonContext();
  useEffect(() => {
    getOpsId();
  }, []);

  return children;
};

export default Init;

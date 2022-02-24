import { Tooltip } from 'antd';
import React, { FC } from 'react';
import './index.scoped.scss';

interface Props {
  ellipsis?: number;
  children: any;
  width?: any;
}

const XToolTip: FC<Props> = (props: Props) => {
  const { ellipsis = 1, children, width } = props;

  function getStyle() {
    const style: any = {};

    if (ellipsis !== 1) {
      style.WebkitBoxOrient = 'vertical';
      style.WebkitLineClamp = ellipsis;
    }

    if (width) {
      style.width = `${width}px`;
    }

    return style;
  }

  return (
    <Tooltip placement="top" title={children}>
      <span
        className={
          ellipsis === 1
            ? 'oneHidden xToolTipView'
            : 'manyLineHidden xToolTipView'
        }
        style={getStyle()}
      >
        {children}
      </span>
    </Tooltip>
  );
};

export default XToolTip;

import React, { FC, useCallback, useEffect, useState } from 'react';
import { Modal } from 'antd';
import { isFunction } from 'lodash';

export type CtrlRef = {
  open: () => void;
  close: () => void;
  loading: () => void;
};

interface Props {
  width?: string | number;
  title: string;
  children: JSX.Element;
  ctrlRef: { current: any };
  onOk?: () => void;
  onCancel?: () => void;
  footer?: any;
  destroyOnClose?: boolean;
}

const XModal: FC<Props> = (props: Props) => {
  const {
    width = 500,
    title,
    ctrlRef,
    onOk,
    onCancel,
    children,
    footer,
    destroyOnClose = false,
  } = props;

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const _close = useCallback(() => {
    setVisible(false);
    if (isFunction(onCancel)) onCancel();
  }, [onCancel]);

  useEffect(() => {
    if (!ctrlRef.current) {
      ctrlRef.current = {
        open,
        close: _close,
        loading,
      };
    }

    return () => {
      // qiankun销毁子应用时 这块要销毁 不然再次进来会报错
      ctrlRef.current = null;
    };
  }, [_close, ctrlRef]);

  function open() {
    setVisible(true);
  }
  function _onOk() {
    if (isFunction(onOk)) onOk();
  }
  function loading(bool: boolean = true) {
    setConfirmLoading(bool);
  }

  return (
    <Modal
      width={width}
      title={title}
      visible={visible}
      confirmLoading={confirmLoading}
      onOk={_onOk}
      onCancel={_close}
      footer={footer}
      destroyOnClose={destroyOnClose}
    >
      {children}
    </Modal>
  );
};

export default XModal;

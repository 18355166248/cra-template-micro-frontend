import XModal from '@/components/Modal/XModal';
import { rechargeVirtualBalanceAccount } from '@/services/virtualAccount-services';
import { Form, InputNumber, notification } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useBalanceManageContext } from '../../index.context';

interface Props {}

const PayRecordModal: FC<Props> = () => {
  const { payModalRef, payData, getList } = useBalanceManageContext();

  const [form] = Form.useForm();

  function onOk() {
    payModalRef.current.loading(true);
    form
      .validateFields()
      .then(values => {
        return rechargeVirtualBalanceAccount({ ...payData, ...values }).then(
          () => {
            notification.success({
              message: '充值成功',
            });
            payModalRef.current.close();
            getList();
          }
        );
      })
      .finally(() => {
        payModalRef.current.loading(false);
      });
  }

  return (
    <XModal
      title="充值"
      ctrlRef={payModalRef}
      destroyOnClose
      onCancel={form.resetFields}
      onOk={onOk}
    >
      <Form form={form}>
        <Form.Item label="业务方">{payData.businessClientDsc}</Form.Item>
        <Form.Item label="业务类型">
          {payData.cashBackBusinessTypeIdDsc}
        </Form.Item>
        <Form.Item label="返现渠道">{payData.payTypeDsc}</Form.Item>
        <Form.Item label="预警值">{payData.earlyWarningAmount}</Form.Item>
        <Form.Item
          label="充值金额"
          name="rechargeAmount"
          rules={[
            {
              required: true,
              message: '请输入充值金额',
            },
          ]}
        >
          <InputNumber
            precision={2}
            min={0.01}
            style={{ width: '100%' }}
          ></InputNumber>
        </Form.Item>
      </Form>
    </XModal>
  );
};

export default observer(PayRecordModal);

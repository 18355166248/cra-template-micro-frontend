import XModal from '@/components/Modal/XModal';
import { ClientEnum } from '@/services/types';
import {
  createOrUpdateVirtualBalance,
  updateOrUpdateVirtualBalance,
} from '@/services/virtualAccount-services';
import { Form, InputNumber, notification, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import { useBalanceManageContext } from '../../index.context';

interface Props {}

const RechargeRecordModal: FC<Props> = () => {
  const { dummyModalRef, dummyData, getList, clientEnumMap } =
    useBalanceManageContext();
  const { businessClients }: Record<string, ClientEnum[]> = clientEnumMap;
  const [clientType, setClientType] = useState<ClientEnum[] | []>([]);
  const [payType, setPayType] = useState<ClientEnum[] | []>([]);

  const method = dummyData.id ? 'edit' : 'create';
  const isCreate = method === 'create';

  const [form] = Form.useForm();

  useEffect(() => {
    if (!isCreate) {
      form.setFieldsValue(dummyData);
    }
  }, [form, dummyData, isCreate]);

  function onOk() {
    dummyModalRef.current.loading(true);
    form
      .validateFields()
      .then(values => {
        const api = isCreate
          ? createOrUpdateVirtualBalance
          : updateOrUpdateVirtualBalance;
        return api({ ...dummyData, ...values }).then(() => {
          notification.success({
            message: `${isCreate ? '新增' : '更新'}成功`,
          });
          dummyModalRef.current.close();
          getList();
        });
      })
      .finally(() => {
        dummyModalRef.current.loading(false);
      });
  }

  function onValuesChange(data: any) {
    if (data.businessClient) {
      const client = businessClients.find(
        business => business.id === data.businessClient
      );
      if (client) {
        setClientType(client.cashBackBusinessTypes || []);
        form.setFieldsValue({
          cashBackBusinessTypeId: undefined,
          payType: undefined,
        });
      }
    }
    if (data.cashBackBusinessTypeId) {
      const cli = clientType.find(
        client => client.id === data.cashBackBusinessTypeId
      );
      if (cli) {
        setPayType(cli.payTypes || []);
        form.setFieldsValue({
          payType: undefined,
        });
      }
    }
  }

  function onCancel() {
    setClientType([]);
    setPayType([]);
    form.resetFields();
  }

  return (
    <XModal
      title={isCreate ? '新增虚拟账户' : '编辑虚拟账户'}
      ctrlRef={dummyModalRef}
      destroyOnClose
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form form={form} onValuesChange={onValuesChange}>
        <Form.Item
          label="业务方"
          name={isCreate ? 'businessClient' : 'businessClientDsc'}
          rules={[
            {
              required: true,
              message: '请选择业务方',
            },
          ]}
        >
          <Select disabled={!isCreate}>
            {businessClients.map(item => (
              <Select.Option key={item.id} value={item.id}>
                {item.desc}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="业务类型"
          name={
            isCreate ? 'cashBackBusinessTypeId' : 'cashBackBusinessTypeIdDsc'
          }
          rules={[
            {
              required: true,
              message: '请选择业务类型',
            },
          ]}
        >
          <Select disabled={!isCreate}>
            {clientType &&
              clientType.map(item => (
                <Select.Option key={item.id} value={item.id}>
                  {item.desc}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="返现渠道"
          name={isCreate ? 'payType' : 'payTypeDsc'}
          rules={[
            {
              required: true,
              message: '请选择返现渠道',
            },
          ]}
        >
          <Select disabled={!isCreate}>
            {payType &&
              payType.map((item: any) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.desc}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="预警值"
          name="earlyWarningAmount"
          rules={[
            {
              required: true,
              message: '请输入预警值',
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

export default observer(RechargeRecordModal);

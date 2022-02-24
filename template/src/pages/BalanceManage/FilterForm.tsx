import FilterFormLayout from '@/components/FilterFormLayout';
import { Form, Select, DatePicker, notification } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useBalanceManageContext } from './index.context';
import FormItem from '@/components/FormItem';
import moment from 'moment';
import { ClientEnum } from '@/services/types';

interface Props {}

const FilterForm: FC<Props> = () => {
  const {
    filterParams,
    setFilterParams,
    getList,
    reset,
    tabActivity,
    clientEnumMap,
    setFilterForm,
  } = useBalanceManageContext();
  const { businessClients }: Record<string, ClientEnum[]> = clientEnumMap;
  const [clientType, setClientType] = useState<ClientEnum[] | []>([]);
  const [payType, setPayType] = useState<ClientEnum[] | []>([]);

  // 是否是返现明细
  const isCash = tabActivity === '2';

  const selectTimeRangeRef = useRef<any[] | null>(null);
  const filterFormLayoutRef = useRef<any>({});

  const defaultTimeRangeRef = useRef([
    moment().startOf('month'),
    moment().endOf('day'),
  ]);

  const defaultValues = { timeRange: defaultTimeRangeRef.current };

  useEffect(() => {
    setFilterForm(filterFormLayoutRef.current?.form);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onOk() {
    if (
      tabActivity === '2' &&
      (!filterParams.timeRange ||
        !filterParams.timeRange[0] ||
        !filterParams.timeRange[1])
    ) {
      notification.error({
        message: '请选择返现时间',
      });
      return;
    }
    getList();
  }

  function onReset() {
    reset();
  }

  function onValuesChange(data: any, allValues: any) {
    if (data.businessClient) {
      const client = businessClients.find(
        business => business.id === data.businessClient
      );
      if (client) {
        setClientType(client.cashBackBusinessTypes || []);
        filterFormLayoutRef.current?.form.setFieldsValue({
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
        filterFormLayoutRef.current?.form.setFieldsValue({
          payType: undefined,
        });
      }
    }
    setFilterParams(allValues);
  }

  function onCalendarChange(
    value: any,
    dateStrings: [string, string],
    info: { range: 'start' | 'end' }
  ) {
    if (value !== null) {
      if (info.range === 'start' && value[0]) {
        selectTimeRangeRef.current = [value[0].clone().add(6, 'months'), null];
        if (value[1] > selectTimeRangeRef.current[0]) {
          value[1] = null;
        }
      } else if (info.range === 'end' && value[1]) {
        selectTimeRangeRef.current = [
          null,
          value[1].clone().subtract(6, 'months'),
        ];
        if (value[0] < selectTimeRangeRef.current[1]) {
          value[0] = null;
        }
      } else {
        selectTimeRangeRef.current = null;
      }
    } else {
      selectTimeRangeRef.current = null;
    }
  }

  function disabledDate(current: any): boolean {
    const timeRange = selectTimeRangeRef.current;
    if (timeRange !== null) {
      if (timeRange[0]) {
        return current > timeRange[0];
      }
      if (timeRange[1]) {
        return current < timeRange[1];
      }

      return false;
    }
    return false;
  }

  return (
    <FilterFormLayout
      onOk={onOk}
      onReset={isCash ? undefined : onReset}
      onValuesChange={onValuesChange}
      initialValues={defaultValues}
      ref={filterFormLayoutRef}
    >
      <Form.Item
        label="业务方"
        name="businessClient"
        rules={
          isCash
            ? [
                {
                  required: true,
                  message: '请选择业务方',
                },
              ]
            : []
        }
      >
        <Select
          showSearch
          filterOption={(input, option: any) =>
            option.children.indexOf(input) >= 0
          }
        >
          {businessClients.map(item => (
            <Select.Option key={item.id} value={item.id}>
              {item.desc}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="业务类型"
        name="cashBackBusinessTypeId"
        rules={
          isCash
            ? [
                {
                  required: true,
                  message: '请选择业务类型',
                },
              ]
            : []
        }
      >
        <Select
          showSearch
          filterOption={(input, option: any) =>
            option.children.indexOf(input) >= 0
          }
        >
          {clientType &&
            clientType.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item.desc}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="返现类型"
        name="payType"
        rules={
          isCash
            ? [
                {
                  required: true,
                  message: '请选择返现类型',
                },
              ]
            : []
        }
      >
        <Select
          showSearch
          filterOption={(input, option: any) =>
            option.children.indexOf(input) >= 0
          }
        >
          {payType &&
            payType.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item.desc}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>

      {isCash && (
        <FormItem lg={14} xl={12} xxl={9}>
          <Form.Item
            label="返现时间"
            name="timeRange"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            rules={[{ required: true, message: '请选择返现时间' }]}
          >
            <DatePicker.RangePicker
              allowClear={false}
              showTime={{ format: 'HH:mm:ss' }}
              format="YYYY-MM-DD HH:mm:ss"
              disabledDate={disabledDate}
              onCalendarChange={onCalendarChange}
            />
          </Form.Item>
        </FormItem>
      )}
    </FilterFormLayout>
  );
};

export default observer(FilterForm);

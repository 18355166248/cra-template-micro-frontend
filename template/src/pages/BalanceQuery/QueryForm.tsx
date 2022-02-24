import { FC, useRef, useState } from 'react';
import FilterFormLayout from '@/components/FilterFormLayout';
import { Form, InputNumber, Select } from 'antd';
import { CashBackRequestVo, CashBackBusinessType } from '@/services/types';

const { Option } = Select;

interface Props {
  onOkCallback: (cashBackRequstVo: CashBackRequestVo) => void;
  onResetCallback: () => void;
  cashBackBusinessTypes: CashBackBusinessType[];
}

const QueryForm: FC<Props> = props => {
  const { onOkCallback, onResetCallback, cashBackBusinessTypes } = props;

  const [selectedType, setSelectedType] = useState<number>(0);

  const uidInputRef = useRef<HTMLInputElement | null>(null);

  const getFormItemRules = (label: string) => {
    return [
      {
        required: true,
        message: `${label}不能为空`,
      },
      {
        pattern: /^[0-9]+$/,
        message: `${label}须为数字`,
      },
    ];
  };

  const onSelectedTypeChange = (value: any) => {
    setSelectedType(value);
  };

  const onOk = () => {
    const userId = Number(uidInputRef.current?.value);
    const cashBackBusinessTypeId = selectedType;
    onOkCallback({ userId, cashBackBusinessTypeId });
  };

  return (
    <FilterFormLayout onOk={onOk} onReset={onResetCallback}>
      <Form.Item label="UID" name="userId" rules={getFormItemRules('UID')}>
        <InputNumber
          ref={uidInputRef}
          placeholder="请输入UID"
          min={0}
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        label="业务类型"
        name="cashBackBusinessTypeId"
        rules={getFormItemRules('业务类型')}
      >
        <Select placeholder="请选择业务类型" onChange={onSelectedTypeChange}>
          {cashBackBusinessTypes.map((type: CashBackBusinessType) => {
            return (
              <Option value={type.id} key={type.id}>
                {type.desc}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
    </FilterFormLayout>
  );
};

export default QueryForm;

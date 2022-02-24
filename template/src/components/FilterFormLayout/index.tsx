import { Form, Button, Row, Col } from 'antd';
import React, { forwardRef, useImperativeHandle } from 'react';
import { isFunction } from 'lodash';
import './index.scoped.scss';

interface Props {
  onOk: (formData: any) => void; // 查询回调
  children: React.ReactNode | React.ReactNode[]; // 表单内容
  onCreate?: () => void; // 新增
  onReset?: () => void; // 重置回调
  onValuesChange?: (changedValues: any, allValues: any) => void; // 重置回调
  initialValues?: any; // 表单初始值
  labelCol?: { span?: number; lg?: number; xl?: number };
  wrapperCol?: { span?: number; lg?: number; xl?: number };
  layout?: 'horizontal' | 'vertical' | 'inline';
}

interface RefProps {
  form: any;
}

const FilterFormLayout = forwardRef<RefProps, Props>((props, ref) => {
  const {
    onOk,
    onReset,
    onCreate,
    onValuesChange,
    initialValues = {},
    labelCol = { span: 9 },
    wrapperCol = { span: 15 },
    layout,
    children,
  } = props;
  const childrenNodes: React.ReactNode[] = Array.isArray(children)
    ? children
    : [children];

  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    form,
  }));

  function _onFinish() {
    if (isFunction(onOk)) onOk(form.getFieldsValue());
  }

  function _onValuesChange(changedValues: any, allValues: any) {
    if (isFunction(onValuesChange)) onValuesChange(changedValues, allValues);
  }

  function _onReset() {
    form.resetFields();
    if (isFunction(onReset)) onReset();
  }

  return (
    <div>
      <Form
        form={form}
        className="filterformlayout flex"
        name="basic"
        initialValues={initialValues}
        onFinish={_onFinish}
        onValuesChange={_onValuesChange}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        layout={layout}
      >
        <Row gutter={12} className="flex-1">
          {childrenNodes
            .filter(v => v)
            .map((child: any, index) => {
              const {
                xs = 24,
                md = 12,
                lg = 8,
                xl = 6,
                xxl = 4,
              } = child.props || {};
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Col key={index} xs={xs} md={md} lg={lg} xl={xl} xxl={xxl}>
                  {child}
                </Col>
              );
            })}
          <Col xs={24} md={12} lg={8} xl={6} xxl={4}>
            <div className="flex flex-grow mb-4">
              <div>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                {onReset && (
                  <Button onClick={_onReset} className="ml-2">
                    重置
                  </Button>
                )}
              </div>
            </div>
          </Col>
          {onCreate && (
            <Col flex="auto" className="mb-4">
              <div className="flex justify-end">
                <Button type="primary" onClick={onCreate}>
                  新增
                </Button>
              </div>
            </Col>
          )}
        </Row>
      </Form>
    </div>
  );
});

export default FilterFormLayout;

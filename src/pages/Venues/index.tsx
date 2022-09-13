import React from "react";
import Layout from "@components/Layout";
import {
  Form,
  Input,
  Button,
  Dialog,
  TextArea,
  DatePicker,
  Selector,
  Slider,
  Stepper,
  Switch,
  Image
} from 'antd-mobile'

const Venues: React.FC<any> = () => {
  return (
    <Layout>
      <header>
        <Image src="https://cdn.leoao.com/%20litta/mini/index/card.png" />
        <div>
          标题
          文字
        </div>
      </header>
      <div>
        <Form
          layout='horizontal'
          footer={
            <Button block type='submit' color='primary' size='large'>
              提交
            </Button>
          }
        >
          <Form.Header>申请人信息</Form.Header>
          <Form.Item
            name='name'
            label='姓名'
            rules={[{ required: true, message: '姓名不能为空' }]}
          >
            <Input onChange={console.log} placeholder='请输入姓名' />
          </Form.Item>
          <Form.Item
            name='company'
            label='所属单位'
            rules={[{ required: true, message: '所属单位不能为空' }]}
          >
            <Input onChange={console.log} placeholder='请输入所属单位' />
          </Form.Item>
          <Form.Item
            name='phone'
            label='手机号'
            rules={[{ required: true, message: '手机号不能为空' }]}
          >
            <Input onChange={console.log} placeholder='请输入手机号' />
          </Form.Item>
          <Form.Header>预订信息</Form.Header>
          <Form.Item name='address' label='地址' help='详情地址'>
            <TextArea
              placeholder='请输入地址'
              maxLength={100}
              rows={2}
              showCount
            />
          </Form.Item>
          <Form.Item name='amount' label='数量' childElementPosition='right'>
            <Stepper />
          </Form.Item>
          <Form.Item
            name='delivery'
            label='送货上门'
            childElementPosition='right'
          >
            <Switch />
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};
export default Venues;

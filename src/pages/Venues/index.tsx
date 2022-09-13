import React, { RefObject, useState } from "react";
import dayjs from "dayjs";
import {
  Form,
  Input,
  Button,
  Dialog,
  Space,
  Tag,
  TextArea,
  Picker,
  DatePicker,
  Selector,
  Slider,
  Stepper,
  Switch,
  Image,
} from "antd-mobile";
import type { DatePickerRef } from "antd-mobile/es/components/date-picker";

const basicColumns = [
  [
    { label: "周一", value: "Mon" },
    { label: "周二", value: "Tues" },
    { label: "周三", value: "Wed" },
    { label: "周四", value: "Thur" },
    { label: "周五", value: "Fri" },
  ],
];

const Venues: React.FC<any> = () => {
  const [value, setValue] = useState<(string | null)[]>([]);

  return (
    <div>
      <header>
        <Image src="https://cdn.leoao.com/%20litta/mini/index/card.png" />
        <div>标题 文字</div>
      </header>
      <div>
        {/* <select name="" id="" placeholder="请选择场馆">
          <option value="1">普陀馆1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select> */}
        <Picker
          columns={basicColumns}
          value={value}
          onConfirm={setValue}
          onSelect={(val, extend) => {
            console.log("onSelect", val, extend.items);
          }}
        >
          {(items, { open }) => {
            return (
              <Space align="center">
                <Tag color="primary" fill="outline" onClick={open}>
                  场馆：
                </Tag>
                {items.every((item) => item === null)
                  ? "未选择"
                  : items.map((item) => item?.label)}
              </Space>
            );
          }}
        </Picker>
      </div>
      <div>
        <Form
          layout="horizontal"
          footer={
            <Button block type="submit" color="primary" size="large">
              预约申请
            </Button>
          }
        >
          <Form.Header>预约信息</Form.Header>
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: "姓名不能为空" }]}
          >
            <Input onChange={console.log} placeholder="请输入姓名" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="手机号"
            rules={[{ required: true, message: "手机号不能为空" }]}
          >
            <Input onChange={console.log} placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            name="teamName"
            label="团队名"
            rules={[{ required: true, message: "团队名不能为空" }]}
          >
            <Input onChange={console.log} placeholder="请输入团队名" />
          </Form.Item>
          <Form.Item
            name="address"
            label="排练内容"
            rules={[{ required: true, message: "排练内容不能为空" }]}
          >
            <TextArea
              placeholder="请输入排练内容"
              maxLength={100}
              rows={2}
              showCount
            />
          </Form.Item>
          <Form.Item
            name="teamName"
            label="预约人数"
            rules={[{ required: true, message: "预约人数不能为空" }]}
          >
            <Input onChange={console.log} placeholder="请输入预约人数" />
          </Form.Item>
          <Form.Item
            name="date"
            label="预约日期"
            trigger="onConfirm"
            onClick={(e, datePickerRef: RefObject<DatePickerRef>) => {
              datePickerRef.current?.open();
            }}
            rules={[{ required: true, message: "预约日期不能为空" }]}
          >
            <DatePicker>
              {(value) =>
                value ? dayjs(value).format("YYYY-MM-DD") : "请选择日期"
              }
            </DatePicker>
          </Form.Item>
          <Form.Item name="favoriteFruits" label="时段">
            <Selector
              columns={3}
              options={[
                { label: "上午", value: "apple" },
                { label: "下午", value: "orange" },
                { label: "晚上", value: "banana" },
              ]}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Venues;

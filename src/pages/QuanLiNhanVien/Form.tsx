import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { Status } from '@/services/QuanLiNhanVien/Status'; 

const { Option } = Select;

const FormInput = ({ employee, onSubmit }: any) => {
    return (
        <Form
            initialValues={employee}
            onFinish={onSubmit}
        >
            <Form.Item
                name="name"
                label="Họ Tên Nhân Viên"
                rules={[{ required: true, message: 'Vui lòng nhập Họ Tên Nhân Viên!' }]}
            >
                <Input placeholder="Họ Tên Nhân Viên" maxLength={50} />
            </Form.Item>
            <Form.Item
                name="position"
                label="Chức Vụ"
                rules={[{ required: true, message: 'Vui lòng Nhập Chức Vụ!' }]}
            >
                <Select>
                    <Option value="Chức Vụ A">Chức Vụ A</Option>
                    <Option value="Chức Vụ B">Chức Vụ B</Option>
                    <Option value="Chức Vụ C">Chức Vụ C</Option>
                    <Option value="Chức Vụ D">Chức Vụ D</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="department"
                label="Phòng Ban"
                rules={[{ required: true, message: 'Vui lòng Nhập Phòng Ban!' }]}
            >
                <Select>
                    <Option value="Phòng A">Phòng A</Option>
                    <Option value="Phòng B">Phòng B</Option>
                    <Option value="Phòng C">Phòng C</Option>
                    <Option value="Phòng D">Phòng D</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="status"
                label="Trạng Thái"
                rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
            >
                <Select placeholder="Trạng Thái">
                    <Option value={Status.a}>{Status.a}</Option>
                    <Option value={Status.b}>{Status.b}</Option>
                    <Option value={Status.c}>{Status.c}</Option>
                    <Option value={Status.d}>{Status.d}</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="salary"
                label="Lương"
                rules={[{ required: true, message: 'Vui lòng nhập lương!' }]}
            >
                <Input type="number" placeholder="Lương" />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit">Lưu</Button>
            </Form.Item>
        </Form>
    );
};

export default FormInput;

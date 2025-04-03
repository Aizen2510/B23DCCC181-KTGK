import React, { useState, useEffect } from 'react';
import { Button, Modal, Table, Input, Row, Col } from 'antd';
import { useModel } from 'umi';
import FormInput from './Form';
import { Status } from '@/services/QuanLiNhanVien/Status';

const Index = () => {
    const { data, setVisible, visible, isEdit, setIsEdit, row, updateLocalStorage, setRow, setData, getDataUser, deleteEmployee, filterData, sortBySalary, filteredData, sortOrder, setSortOrder } = useModel('QuanLiNhanVien');

    useEffect(() => {
        getDataUser();
    }, []);

    const handleAddEditEmployee = (employee: Employee.Record) => {
        setRow(employee);
        setIsEdit(true);
        setVisible(true);
    };

    const handleSubmitForm = (values: Employee.Record) => {
        if (isEdit) {
            const updatedData = data.map((item: Employee.Record) => item.id === row?.id ? { ...row, ...values } : item);
            setData(updatedData);
            updateLocalStorage(updatedData);
        } else {
            const newEmployee = { ...values, id: `NV${data.length + 1}`};
            const updatedData = [...data, newEmployee];
            setData(updatedData);
            updateLocalStorage(updatedData);
        }
        setVisible(false);
    };

    const handleDeleteEmployee = (id: string) => {
        Modal.confirm({
            title: 'Xóa nhân viên',
            content: 'Bạn có chắc chắn muốn xóa nhân viên này?',
            okText: 'Có',
            cancelText: 'Không',
            onOk: () => deleteEmployee(id),
        });
    };

    const columns = [
        { title: 'Mã nhân viên', dataIndex: 'id' },
        { title: 'Họ tên', dataIndex: 'name' },
        { title: 'Chức vụ', dataIndex: 'position' },
        { title: 'Phòng ban', dataIndex: 'department' },
        { title: 'Lương', dataIndex: 'salary' },
        { title: 'Trạng thái', dataIndex: 'status' },
        {
            title: 'Hành động',
            render: (text: string, record: Employee.Record) => (
                <>
                    <Button onClick={() => handleAddEditEmployee(record)}>Sửa</Button>
                    <Button danger onClick={() => handleDeleteEmployee(record.id)}>Xóa</Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <Row gutter={16} style={{ marginBottom: '20px' }}>
                <Col>
                    <Button type="primary" onClick={() => setVisible(true)}>
                        Thêm nhân viên
                    </Button>
                </Col>
                <Col>
                    <Input
                        type="text"
                        placeholder="Tìm kiếm nhân viên"
                        onChange={(e) => filterData(e.target.value)}
                    />
                </Col>
            </Row>

            <Table
                columns={columns}
                dataSource={filteredData.length ? filteredData : data}
                rowKey="id"
                pagination={false}
                style={{ marginBottom: '20px' }}
            />
            <Button onClick={sortBySalary} style={{ marginBottom: '20px' }}>
                {sortOrder === 'asc' ? 'Sắp xếp lương tăng dần' : 'Sắp xếp lương giảm dần'}
            </Button>

            <Modal
                visible={visible}
                title={isEdit ? 'Chỉnh sửa nhân viên' : 'Thêm mới nhân viên'}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <FormInput employee={row} onSubmit={handleSubmitForm} />
            </Modal>
        </div>
    );
};

export default Index;

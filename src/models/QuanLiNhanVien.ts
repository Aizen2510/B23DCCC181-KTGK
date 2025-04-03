import { getData } from '@/services/QuanLiNhanVien';
import { useState, useEffect } from 'react';
import { Status } from '@/services/QuanLiNhanVien/Status'; 

export default () => {
    const [data, setData] = useState<Employee.Record[]>([]);
    const [filteredData, setFilteredData] = useState<Employee.Record[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [row, setRow] = useState<Employee.Record | undefined>();
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); 

    const getDataUser = async () => {
        const dataLocal: any = localStorage.getItem('data');
        if (dataLocal) {
            const parsedData = JSON.parse(dataLocal);
            if (Array.isArray(parsedData)) {
                setData(parsedData);
                setFilteredData(parsedData); 
            }
        } else {
            const res = await getData();
            const dataToSave = res?.data ?? [];
            localStorage.setItem('data', JSON.stringify(dataToSave));
            setData(dataToSave);
            setFilteredData(dataToSave); 
        }
    };

    useEffect(() => {
        getDataUser();
    }, []);

    const updateLocalStorage = (updatedData: Employee.Record[]) => {
        localStorage.setItem('data', JSON.stringify(updatedData));
    };

    const filterData = (searchValue: string) => {
        const filtered = data.filter((item: Employee.Record) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const sortBySalary = () => {
        const sortedData = [...data].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.salary - b.salary; 
            } else {
                return b.salary - a.salary; 
            }
        });
        setData(sortedData);
        setFilteredData(sortedData); 
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); 
    };

    const deleteEmployee = (id: string) => {
        const employee = data.find((emp: Employee.Record) => emp.id === id);
        if (employee?.status === Status.a || employee?.status === Status.d) {
            const updatedData = data.filter((item: Employee.Record) => item.id !== id);
            setData(updatedData);
            setFilteredData(updatedData); 
            updateLocalStorage(updatedData);
        } else {
            alert('Không thể xóa nhân viên này.');
        }
    };

    return {
        data,
        visible,
        setVisible,
        row,
        setRow,
        isEdit,
        setIsEdit,
        setData,
        getDataUser,
        filterData,
        updateLocalStorage,
        sortBySalary,
        deleteEmployee,
        filteredData,
        sortOrder, 
        setSortOrder
    };
};

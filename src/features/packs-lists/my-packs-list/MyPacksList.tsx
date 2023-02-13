import React from 'react';
import {Table} from 'antd';
import {ColumnsType} from 'antd/es/table';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'nameKards',
        width: 110,
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
    },
    {
        title: 'Kards',
        width: 100,
        dataIndex: 'age',
        key: 'age',
        fixed: 'left',
    },

    {
        title: 'Column 1',
        dataIndex: 'address',
        key: '1',
        width: 150,
    },
    {
        title: 'Column 2',
        dataIndex: 'address',
        key: '2',
        width: 150,
    },

    {title: 'Column 8', dataIndex: 'address', key: '8'},
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <a>action</a>,
    },
];

const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: `vasaaaaaaa ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}

export const MyPacksList: React.FC = () => (
    <Table columns={columns} dataSource={data} scroll={{x: 1500, y: 300}}/>
);
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

/*

import React, {useState} from 'react';
import {Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {Link} from "react-router-dom";
import {routes} from "../../../constants/constants";
import {PacksListAPI, PacksListType} from "../PacksList.api";
import {getAllPacksListTC} from "../PacksListReduser";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../../app/store";

interface DataType {
    key: React.Key;
    name: any;
}

const columns = [
    {
        title: 'nameKards',
        // width: 110,
        dataIndex: 'name',
        key: 'name',
        // fixed: 'left',
    },
    // {
    //     title: 'Kards',
    //     width: 100,
    //     dataIndex: 'age',
    //     key: 'age',
    //     fixed: 'left',
    // },
    //
    // {
    //     title: 'Column 1',
    //     dataIndex: 'address',
    //     key: '1',
    //     width: 150,
    // },
    // {
    //     title: 'Column 2',
    //     dataIndex: 'address',
    //     key: '2',
    //     width: 150,
    // },
    //
    // {title: 'Column 8', dataIndex: 'address', key: '8'},
    // {
    //     title: 'Action',
    //     key: 'operation',
    //     fixed: 'right',
    //     width: 100,
    //     render: () => <a>action</a>,
    // },
];

// const data: DataType[] = [];
// for (let i = 0; i < 100; i++) {
//     data.push({
//         key: i,
//         name: <Link to={routes.MY_PACKS_LIST}>{`NameKard ${i}`}</Link>,
//         age: 32,
//         address: `London Park no. ${i}`,
//     });
// }

export const AllPacksList: React.FC = () => {
    /!* const [search, setParams] = useSearchParams()
     console.log(search.get('search'))
     const onchange = (e: any) => {
         const value = e.currentTarget.value
         search.set('search', value)
         setParams(search)
     }*!/
    let [all, setAll] = useState(true)

    const packs = useSelector<AppRootStateType,PacksListType[]>(state => state.packs.data)

    const dipatch=useAppDispatch()
    const getAllPacksListHandler=()=>{
        dipatch(getAllPacksListTC())
    }

    return <div>
        <div>

            <button onClick={() => setAll(true)}>Myyyyyyyyyyyyyyyyyyyyyyy</button>

            <button onClick={getAllPacksListHandler}>Allllllllllllllllllll</button>

        </div>
        {/!* <input onChange={onchange} type="text"/>*!/}
        <div>
            <Table columns={columns} dataSource={packs} scroll={{x: 1500, y: 300}}/>
        </div>

    </div>
};*/

import {useSearchParams} from "react-router-dom";


// all project paths
export const enum routes {
    PROFILE = '/',
    SIGN_IN = '/sign-in',
    SIGN_UP = '/sign-up',
    RESET_PASS = '/res-password',
    CHECK_EMAIL = '/check-email',
    NEW_PASS = '/new-password/:token',
    NOT_FOUND = '/404',
    PACKS_LIST = '/packsList',
    MY_PACKS_LIST = '/myPacksList',
    PACKS = '/Packs',
    CARDS = '/Cards'
}

/*
const [search, setParams] = useSearchParams()
console.log(search.get('search'))
const onchange = (e: any) => {
    const value = e.currentTarget.value
    search.set('search', value)
    setParams(search)
}*/

/*
import React from 'react';
import {Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {my-packs-list} from "../my-packs-list/my-packs-list";
import {Link, useSearchParams} from "react-router-dom";
import {routes} from "../../../constants/constants";

interface DataType {
    key: React.Key;
    name: any;
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
        name: <Link to={routes.MY_PACKS_LIST}>{`fsdfsd ${i}`}</Link>,
        age: 32,
        address: `London Park no. ${i}`,
    });
}

export const all-packs-list: React.FC = () => {
    const [search, setParams] = useSearchParams()
    console.log(search.get('search'))
    const onchange = (e: any) => {
        const value = e.currentTarget.value
        search.set('search', value)
        setParams(search)
    }

   return <>
       <input onChange={onchange} type="text"/>
        <Table columns={columns} dataSource={data} scroll={{x: 1500, y: 300}}/>
        </>
};
 */
/*
export const all-packs-list: React.FC = () => {
    const [search, setParams] = useSearchParams()

    const isOwner = search.get('isOwner') ? JSON.parse(search.get('isOwner')!) : undefined
    console.log(isOwner)

    const toggleIsOwner = () => {
        search.set('isOwner',JSON.stringify(!isOwner))
        setParams(search)
    }

    useEffect(()=>{
        if (isOwner) {
            fetchPacks({isOwner})
        }
    },[isOwner])

   return <>
       <button onClick={toggleIsOwner}>toggle</button>
        <Table columns={columns} dataSource={data} scroll={{x: 1500, y: 300}}/>
        </>
};
 */

/*
export const all-packs-list: React.FC = () => {
    const [search, setParams] = useSearchParams()

    const isOwner = JSON.parse(search.get('isOwner') || 'false')
    console.log(isOwner)

    const toggleIsOwner = () => {
        search.set('isOwner',JSON.stringify(!isOwner))
        setParams(search)
    }

   return <>
       <button onClick={toggleIsOwner}>toggle</button>
        <Table columns={columns} dataSource={data} scroll={{x: 1500, y: 300}}/>
        </>
};
 */

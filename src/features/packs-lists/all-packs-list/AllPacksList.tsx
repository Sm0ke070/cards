import React, {useEffect, useState} from 'react';
import {Table} from 'antd';
import {CardsPackType, PacksListAPI} from "../PacksList.api";
import {createNewMyCardPack, getAllPacksListTC, getMyPacksListTC} from "../PacksListReduser";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../../app/store"
import {log} from "util";

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
    /* const [search, setParams] = useSearchParams()
     console.log(search.get('search'))
     const onchange = (e: any) => {
         const value = e.currentTarget.value
         search.set('search', value)
         setParams(search)
     }*/
    let [all, setAll] = useState(true)

        const packs = useSelector<AppRootStateType, CardsPackType[]>(state => state.packs.cardPacks)
    const myPacks=useSelector<AppRootStateType,CardsPackType[]>(state=>state.packs.cardPacks)

    const dispatch=useAppDispatch()
    const getAllPacksListHandler=()=>{
        dispatch(getAllPacksListTC())
        //dispatch(getMyPacksListTC('63ee5c39fb91183294207dc8'))
    }
    const getMyPacksListHandler=()=>{
        dispatch(getMyPacksListTC('63ee5c39fb91183294207dc8'))
    }

    useEffect(()=>{
      const test = PacksListAPI.newMyPack('dfa').then((res)=>{
              console.log(res.data.newCardsPack)
      })
    },[])

    const addNewMyPack=()=>{
        dispatch(createNewMyCardPack('newMyPackListName'))
    }
    return <div>
        <div>

            <button onClick={getMyPacksListHandler}>Myyyyyyyyyyyyyyyyyyyyyyy</button>
            <button onClick={addNewMyPack}>MyCREATE</button>

            <button onClick={getAllPacksListHandler}>Allllllllllllllllllll</button>

        </div>
        {/* <input onChange={onchange} type="text"/>*/}
        <div>
            <Table columns={columns} dataSource={packs} scroll={{x: 1500, y: 300}}/>
            <Table columns={columns} dataSource={myPacks} scroll={{x: 1500, y: 300}}/>
        </div>

    </div>
};
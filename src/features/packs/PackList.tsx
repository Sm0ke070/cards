import React from 'react';
import {ColumnsType} from 'antd/es/table';
import {SortPackName} from './packs-sort/SortPackName';
import {SortPacksCards} from './packs-sort/SortPacksCards';
import {SortPacksUpdated} from './packs-sort/SortPacksUpdated';
import {SortPackCreatedBy} from './packs-sort/SortPackCreatetBy';
import {formatDate} from '../../common/utils/formatDate';
import {ActionsPacks} from './ActionsPacks';
import {setCardsPackIdAC, setCurrentCardNameAC} from '../cards/cardsReducer';
import {routes} from '../../constants/constants';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {Table} from 'antd';
import {useNavigate} from 'react-router-dom';
import {setPacksPageAC, setPageCountAC} from './PackSettings/packsSettingsReducer';
import {defaultCover} from '../../common/components/image-loader/emptyCoverImage';
import {EmptyList} from "../../common/components/EmptyList";

interface DataType {
    key: React.Key
    deckCover?: string
    packId: string
    name: string
    cardsCount: number
    lastUpdated: string
    userName: string
}

export const PackList = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const packs = useAppSelector(state => state.packs.cardPacks)
    const isLoading = useAppSelector(state => state.app.status)
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const page = useAppSelector(state => state.packsSettings.queryParams.page)
    const pageCount = useAppSelector(state => state.packsSettings.queryParams.pageCount)


    const columns: ColumnsType<DataType> = [
        {
            title: 'Cover',
            dataIndex: 'deckCover',
            width: 200,
            render: (deckCover) => <img src={deckCover ? deckCover : defaultCover} width={150}/>,
        },
        {
            title: <SortPackName/>,
            dataIndex: 'name',
            width: 200,
        },
        {
            title: <SortPacksCards/>,
            dataIndex: 'cardsCount',
            width: 150,
        },

        {
            title: <SortPacksUpdated/>,
            dataIndex: 'lastUpdated',
            width: 150,
        },
        {
            title: <SortPackCreatedBy/>,
            dataIndex: 'userName',
            width: 170,
        },
        {
            title: 'Action',
            dataIndex: 'actions',
            width: 150,
        },
    ];

    const data = packs.map((p) => {

        return {
            key: p._id,
            deckCover: p.deckCover,
            packId: p._id,
            name: p.name,
            cardsCount: p.cardsCount,
            lastUpdated: formatDate(p.updated),
            userName: p.user_name,
            actions: <ActionsPacks packId={p._id} packUserId={p.user_id} name={p.name} cardsCount={p.cardsCount}
                                   deckCover={p.deckCover}/>

        }
    })
    const onClickEnterToPackHandler = (record: DataType) => {
        dispatch(setCardsPackIdAC(record.packId))
        dispatch(setCurrentCardNameAC(record.name))
        navigate(routes.CARDS)
    }
    return (
        <>
            {isLoading ? <Table columns={columns}
                                dataSource={data}
                                scroll={{x: 1000, y: 500}}
                                loading={isLoading === 'loading'}

                                onRow={record => {
                                    return {
                                        onDoubleClick: () => onClickEnterToPackHandler(record)
                                    }
                                }}
                                pagination={{
                                    current: page,
                                    pageSize: pageCount,
                                    total: cardPacksTotalCount,
                                    position: ['bottomLeft'],
                                    onChange: (page, pageSize) => {
                                        dispatch(setPacksPageAC(page))
                                        dispatch(setPageCountAC(pageSize))
                                    },
                                }}/>
                :
                <EmptyList/>
            }


        </>
    );
};




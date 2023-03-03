import {Button, Upload} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {baseImage} from './baseImage';
import {UploadOutlined} from '@ant-design/icons';
import {convertFileToBase64} from '../../utils/convertFileToBase64';
import {RcFile, UploadChangeParam} from 'antd/es/upload';
import type {UploadFile} from 'antd/es/upload/interface';
import {fileSizeCut} from '../../utils/fileSizeCut';


export const InputTypeFile: FC<{ onLoad: (image: string) => void }> = ({onLoad}) => {
    const [previewImage, setPreviewImage] = useState(baseImage)
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [isAvaBroken, setIsAvaBroken] = useState(false)
    const [fileSize, setFileSize] = useState(0)

    useEffect(() => {
        onLoad(previewImage)
    }, [previewImage])


    const errorHandler = () => {
        setIsAvaBroken(true)
        alert('Кривая картинка')
    }


    const handleUpload = (e: UploadChangeParam) => {
        setFileList(e.fileList)
        const file = e.fileList[0]
        setFileSize(file && file.size ? fileSizeCut(file.size) : 0)

        if (file && file.size && file.size < 100000) {
            convertFileToBase64(file.originFileObj as RcFile, (file64: string) => {
                setPreviewImage(file64)
            })
        } else if(file){
            setIsAvaBroken(true)

            console.error('Error: ', 'Файл слишком большого размера')

        }
    }

    const handleRemove = (file: UploadFile) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
        setPreviewImage(baseImage)
        setIsAvaBroken(false)

    }

    return (
        <div style={{display: 'flex', alignItems: 'flex-end',}}>
            <div style={{display: 'flex', flexDirection: 'column'}}><span>Cover Image</span>

                <img
                    src={isAvaBroken ? baseImage : previewImage}
                    style={{width: '130px'}}
                    onError={errorHandler}
                    alt="ava"
                /></div>

            <Upload name={'file'}
                    fileList={fileList}
                    accept={'image/*'}
                    beforeUpload={() => false}
                    onRemove={handleRemove}
                    onChange={handleUpload}

            >
                {isAvaBroken && <span style={{color: 'red'}}>Файл, не должен превышать 100кб. Ваш файл весит: {fileSize}кб</span>}
                {!fileList.length && <Button style={{margin: '5px'}} icon={<UploadOutlined/>}/>}
            </Upload>


        </div>
    )
}


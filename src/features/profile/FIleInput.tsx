
import React, {ChangeEvent, useRef, useState} from 'react';
//import Video from "./Video";
//import {FlexColumnCenterCenter} from "../../../../../neko-3-styles/flex-containers";
import {getFile, writeFile} from "./getFile";
import axios from "axios";

export const fileBackURL = 'https://neko-back.herokuapp.com/';

interface IFileInputProps {

}
/*
const FileInput: React.FC<IFileInputProps> = () => {
    const inRef = useRef<HTMLInputElement>(null);

    const [code, setCode] = useState(false);
    const [base64, setBase64] = useState(true); // base64 - true, text - false
    const [text, setText] = useState('');
    const [file, setFile] = useState();
    const [fileURL, setFileURL] = useState();
    const [file64, setFile64] = useState();
    const [fileData, setFileData] = useState();

    const upload = (e: ChangeEvent<HTMLInputElement>) => {
        // e.preventDefault();
        const reader = new FileReader();
        const formData = new FormData(); // for send to back

        const newFile = e.target.files && e.target.files[0];

        if (newFile) {
            //setFile(newFile);
           // setFileURL(window.URL.createObjectURL(newFile));
            formData.append('myFile', newFile, newFile.name);
            //setFileData(formData);

            if (code) { // reader
                reader.onloadend = () => {
                    //setFile64(reader.result);
                };

                if (base64) reader.readAsDataURL(newFile);
                else reader.readAsText(newFile);
            }
        }
    };

    const send = () => {
        const response = axios.post(fileBackURL + 'file', fileData);
    };

    const returnFileSize = (n: number) => {
        if (n < 1024) {
            return n + 'bytes';
        } else if (n > 1024 && n < 1048576) {
            return (n / 1024).toFixed(2) + 'KB';
        } else if (n > 1048576) {
            return (n / 1048576).toFixed(2) + 'MB';
        }
    };

    return (
        <div style={'FlexColumnCenterCenter'}>
            FileInput

            <input type="file" accept=".jpg, .jpeg, .png" multiple/>
            <hr style={{width: '100%'}}/>

            <label>
                reader
                <input type={'checkbox'} checked={code} onChange={e => setCode(e.currentTarget.checked)}/>
            </label>
            <label>
                base64
                <input type={'checkbox'} checked={base64} onChange={e => setBase64(e.currentTarget.checked)}/>
            </label>

            <img src={file64} alt={'file'} width={'300px'}/>
            <div>name: {file && file.name}</div>
            <div>lastModified: {file && file.lastModified}</div>
            <div>size: {file && returnFileSize(file.size)}</div>
            <div>type: {file && file.type}</div>

            <input
                ref={inRef}
                type={'file'}
                style={{display: 'none'}}
                onChange={upload}
            />
            <button onClick={() => inRef && inRef.current && inRef.current.click()}>add</button>
            <hr style={{width: '100%'}}/>

            <textarea value={text} onChange={e => setText(e.currentTarget.value)}/>
            <pre>{file64}</pre>
            <div>
                <button onClick={() => writeFile('Text.txt', text + `\r\n` + file64)}>save</button>
                <button onClick={send}>send</button>
                <button onClick={() => getFile(fileBackURL + 'file', 'newFile.jpg')}>get</button>
            </div>

            <hr style={{width: '100%'}}/>

            <Video fileURL={fileURL}/>
        </div>
    );
};

export default FileInput;*/

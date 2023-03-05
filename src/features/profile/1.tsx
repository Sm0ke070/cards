import {ChangeEvent, useRef} from "react";

export const InputFile1 = () => {

    const inputRef = useRef<HTMLInputElement>(null)

    const selectFilrHandler = () => {
        inputRef && inputRef.current?.click()
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log('file', file)
        }
    }

    return (
        <div>
            <button onClick={selectFilrHandler}>
                Upload file
            </button>
            <input
                type="file"
                style={{display: 'none'}}
                ref={inputRef}
                onChange={uploadHandler}
            />
        </div>
    )


}
import {ChangeEvent, useRef} from "react";

export const InputFile2 = () => {

   /* const inputRef = useRef<HTMLInputElement>(null)

    const selectFilrHandler = () => {
        inputRef && inputRef.current?.click()
    }*/

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log('file', file)

            if (file.size < 4000000) {
                const reader = new FileReader()

                reader.onloadend = () => {
                    const file64 = reader.result as string
                }
                reader.readAsDataURL(file)
            } else {
                console.error('Error', 'Файл слишком большого размера.', 'размер файла не больше 4 Мб')
            }
        }
    }


    return (
        <div>
            {/*<button onClick={selectFilrHandler}>
                Upload file
            </button>*/}
            <input
                type="file"
                style={{display: 'none'}}
                onChange={uploadHandler}
                /*ref={() => {}}*/
            />
        </div>
    )


}
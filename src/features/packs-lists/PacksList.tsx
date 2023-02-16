import {useState} from "react";
import {MyPacksList} from "./my-packs-list/MyPacksList";
import {AllPacksList} from "./all-packs-list/AllPacksList";

export const PacksList = () => {
    let [all, setAll] = useState(true)


    return (
        <>
            <div>

                <button onClick={() => setAll(true)}>My</button>

            </div>
            {all ? <AllPacksList/> : <MyPacksList/>}
        </>
    )
}
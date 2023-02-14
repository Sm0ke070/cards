import {useState} from "react";
import {AllPacksList} from "./all-packs-list/AllPacksList";
import {MyPacksList} from "./my-packs-list/MyPacksList";

export const PacksList = () => {
    let [my, setMy] = useState()
    let [all, setAll] = useState(true)
    return (
        <>
            <div>
                <button onClick={() => setAll(true)}>My</button>
                <button onClick={() => setAll(false)}>All</button>
            </div>
            {all ? <AllPacksList/> : <MyPacksList/>}
        </>
    )
}
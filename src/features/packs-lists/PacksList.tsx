import {useState} from "react";
import {PacksListAPI} from "./PacksList.api";
import {MyPacksList} from "./my-packs-list/MyPacksList";
import {AllPacksList} from "./all-packs-list/AllPacksList";

export const PacksList = () => {
    let [all, setAll] = useState(true)


    return (
        <>
            <div>
                <button onClick={()=>console.log(PacksListAPI.allPacksList())}>465</button>
                <button onClick={() => setAll(true)}>My</button>
                <button onClick={() => setAll(false)}>All</button>
            </div>
            {all ? <AllPacksList/> : <MyPacksList/>}
        </>
    )
}
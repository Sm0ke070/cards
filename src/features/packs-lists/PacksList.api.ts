import {instance} from "../../app/base-url";


export const PacksListAPI={
    allPacksList(){
        return instance.get('cards/pack')
    }
}
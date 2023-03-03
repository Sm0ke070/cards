/**
 * Функция обрезки Килобайт до 3х знаков.
 * @param {number} num - изначальный размер файла
 */
export const fileSizeCut = (num:number)=>{
    return  +num.toString().slice(0, -3)
}

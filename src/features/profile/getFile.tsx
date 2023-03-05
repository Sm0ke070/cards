import axios from 'axios';

export const getFile = (url: string, fileName: string) => {
    // запросить файл
    axios.get(url, {responseType: 'blob'}) // !!! responseType: 'blob'
        .then(({data}) => {
            const blob = new Blob([data], {type : 'image/jpeg'});
            console.log(blob)

            // создать ссылку на файл
            const downloadUrl = window.URL.createObjectURL(blob);

            // создать тег "ссылка" на наш файл
            const link = document.createElement('a');
            link.href = downloadUrl;

            // добавить атрибуты нашему тегу: загрузочный, имя файла
            link.setAttribute('download', fileName);

            // добавить тег в документ
            document.body.appendChild(link);

            // нажать на ссылку
            link.click();

            // удалить тег из документа
            link.remove();
        });
};

export const writeFile = (fileName: string, value: string) => {
    const link = document.createElement("a");
    link.href = "data:text/plain;content-disposition=attachment;filename=file," + value;
    link.download = fileName;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
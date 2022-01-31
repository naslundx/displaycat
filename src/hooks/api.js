const API_ADDR = "https://api.thecatapi.com/v1/images/search";
const API_KEY = "d378884b-cb7d-42bc-95c0-bd8202d3386e"; // Yes this shouldn't be here but what are you going to do with it? It's free. Thanks.

function getCatUrl(count, category) {
    const limit_string = `?limit=${count}`;
    const category_string = category > 0 ? `&category_ids=${category}` : '';

    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        let url = API_ADDR + limit_string + category_string;
        xhr.open("GET", url);
        xhr.setRequestHeader("x-api-key", API_KEY);
        xhr.responseType = "json";
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                const urls = xhr.response.reduce((prev, current) => [...prev, current.url], []);
                resolve(urls);
            } else {
                xhr.onerror();
            }
        };
        xhr.onerror = () => {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

export default getCatUrl;
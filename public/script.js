const API_ADDR = "https://api.thecatapi.com/v1/images/search";
const API_KEY = "d378884b-cb7d-42bc-95c0-bd8202d3386e";  // Yes this shouldn't be here but what are you going to do with it? It's free. Thanks.
const IMG_CONTAINER = document.querySelector("#myMosaic");
const CATEGORY_SELECT = document.querySelector("#categories");
const UI_BOX = document.querySelector("#ui");
const FOOTER = document.querySelector("footer");
const SPINNER = document.querySelector("#loading");
const LOADING_TXT = document.querySelector("#loading p");

const LOADSTRINGS = [
    "Försöker jama...",
    "Puttar ner vaser från bord...",
    "Pekar med laserpekaren...",
    "Tar bort hundar...",
    "Öppnar tonfiskburkar...",
    "Lapar grädde...",
    "Säger kss kss kss...",
    "Gnider kinder mot möbler..."
];

function randomInt(low, high) {
    return low + Math.round(Math.random() * (high - low));
}

function randomColor() {
    return "hsl(" + 360 * Math.random() + ',' +
             (25 + 70 * Math.random()) + '%,' + 
             (85 + 10 * Math.random()) + '%)';
}

let loading_txt_idx = randomInt(0, 10000);

function getCatUrl(cb) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", API_ADDR);
    xhr.setRequestHeader("x-api-key", API_KEY);
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = xhr.response[0];
            cb(data.url);
        }
    };
    xhr.send();
}

function createCatImage(category) {
    let category_string = "";
    if (category > 0) {
        category_string = "?category_ids=" + category;
    }

    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        let url = API_ADDR + category_string;
        xhr.open("GET", url);
        xhr.setRequestHeader("x-api-key", API_KEY);
        xhr.responseType = "json";
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                const data = xhr.response[0];
                const div = document.createElement("div");
                div.width = data.width;
                div.height = data.height;
                div.style.backgroundColor = randomColor();
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.onclick = () => replaceImg(div);
                img.src = data.url;
                img.classList.add("preload");
                img.classList.add("transition");
                div.appendChild(img);
                IMG_CONTAINER.appendChild(div);
                updateMosaic();
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

function getSelectedCategory() {
    return $("#categories :selected")[0].value;
}

function replaceImg(img) {
    img.remove();
    updateMosaic();

    let category = getSelectedCategory();
    createCatImage(category).then((img) => {
        img.classList.remove("preload");
    });
}

function addCats(num) {
    hideUI();

    let category = getSelectedCategory();

    let reqs = [];
    for (let i=0; i<num; i+=1) {
        reqs.push(createCatImage(category));
    }

    Promise.all(reqs).then(imgs => {
        for (let img of imgs) {
            const img2 = img;
            setTimeout(() => img2.classList.remove("preload"), randomInt(100, 3000));
        }

        SPINNER.classList.add("invisible");
        setTimeout(() => SPINNER.classList.add("hidden"), 1600);
        FOOTER.classList.add("invisible");
        setTimeout(() => FOOTER.classList.add("hidden"), 1600);
    });
}

function hideUI() {
    document.querySelector("body").classList.add("blank");
    handleLoadingText();
    UI_BOX.classList.add("hidden");
    SPINNER.classList.remove("hidden");
}

function updateMosaic() {
    let imgs = document.querySelectorAll("img");
    if (imgs.length > 0) {
        $('#myMosaic').Mosaic();
    }
}

function handleLoadingText() {
    loading_txt_idx = (loading_txt_idx + 1) % LOADSTRINGS.length;
    LOADING_TXT.innerText = LOADSTRINGS[loading_txt_idx];
    if (!SPINNER.classList.contains("invisible")) {
        setTimeout(() => handleLoadingText(), 2500);
    }
}

const API_ADDR = "https://api.thecatapi.com/v1/images/search";
const API_KEY = "d378884b-cb7d-42bc-95c0-bd8202d3386e";
const IMG_CONTAINER = document.querySelector("#myMosaic");
const CATEGORY_SELECT = document.querySelector("#categories");
const UI_BOX = document.querySelector("#ui");
const SPINNER = document.querySelector("#loading");
const LOADING_TXT = document.querySelector("#loading p");

const LOADSTRINGS = [
    "Försöker härma jamande...",
    "Puttar ner vaser från bord...",
    "Pekar med laserpekaren...",
    "Tar bort hundar...",
    "Öppnar tonfiskburkar..."
];

function randomInt(low, high) {
    return low + Math.round(Math.random() * (high - low));
}

let loading_txt_idx = randomInt(0, 10000);

function fillCategories() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.thecatapi.com/v1/categories");
    xhr.responseType = "json";
    xhr.onload = () => {
        for (let v of xhr.response) {
            let opt = document.createElement("option");
            opt.value = v.id;
            opt.innerText = v.name;
            CATEGORY_SELECT.appendChild(opt);
        }
    };
    xhr.send();
}

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
    console.log(category);
    let category_string = "";
    if (category > 0) {
        category_string = "?category_ids=" + category;
    }
    console.log(category_string);

    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        let url = API_ADDR + category_string;
        console.log(url);
        xhr.open("GET", url);
        xhr.setRequestHeader("x-api-key", API_KEY);
        xhr.responseType = "json";
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                const data = xhr.response[0];
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.onclick = () => removeImg(img);
                img.width = data.width;
                img.height = data.height;
                img.src = data.url;
                img.classList.add("preload");
                img.classList.add("transition");
                IMG_CONTAINER.appendChild(img);
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
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

function removeImg(img) {
    img.remove();
    updateMosaic();
}

function addCat(category) {
    createCatImage(category).then(value => IMG_CONTAINER.appendChild(value));
}

function addCats(num) {
    hideUI();

    let category = $("#categories :selected")[0].value;

    let reqs = [];
    for (let i=0; i<num; i+=1) {
        reqs.push(createCatImage(category));
    }

    Promise.all(reqs).then(imgs => {
        SPINNER.classList.add("invisible");
        updateMosaic();

        for (let img of imgs) {
            const img2 = img;
            setTimeout(() => img2.classList.remove("preload"), randomInt(100, 3000));
        }
    });
}

function hideUI() {
    document.querySelector("body").classList.add("blank");
    UI_BOX.classList.add("hidden");
    handleLoadingText();
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

// -------------

fillCategories();

// let body = document.querySelector("body");
// getCatUrl(url => {
//     console.log("done " + url);
//     body.style.background = "url(" + url + ")"
// });

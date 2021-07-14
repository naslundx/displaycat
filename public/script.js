const API_ADDR = "https://api.thecatapi.com/v1/images/search";
const IMG_CONTAINER = document.querySelector("#myMosaic");

function createCatImage() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", API_ADDR);
        xhr.responseType = "json";
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.onclick = () => removeImg(img);
                img.src = xhr.response[0].url;
                img.classList.add("invisible");
                img.classList.add("transition");
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
    mosaic();
}

function addCat() {
    createCatImage().then(value => IMG_CONTAINER.appendChild(value))
}

function addCats(num) {
    toggleUI();
    IMG_CONTAINER.innerHTML = "<h3>Var god vänta...</h3>";

    let reqs = [];
    for (let i=0; i<num; i++) {
        reqs.push(createCatImage());
    }
    Promise.all(reqs).then(imgs => {
        IMG_CONTAINER.innerHTML = "";
        for (let i of imgs) {
            IMG_CONTAINER.appendChild(i);
            setTimeout(() => i.classList.remove("invisible"), 1000);
        }
        console.log("added!")
        mosaic();
    })
}

function toggleUI() {
    document.querySelector("#ui").classList.toggle("hidden");
}

function mosaic() {
    let imgs = document.querySelectorAll("img");
    if (imgs.length > 1) {
        $('#myMosaic').Mosaic();
    }
    else if (imgs.length === 1) {
        imgs[0].style.width = "100%";
    }
} 
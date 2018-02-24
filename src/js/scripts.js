function getJSON(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (this.status == 200) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function() {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

function parseInput(input) {
    document.getElementById("page").innerHTML = input.name;
    let grid = document.getElementById("grid");
    if (input.groups.length) {
        input.groups.map(item => {
            let element = document.createElement("div");
            let title = document.createElement("div");
            let price = document.createElement("div");
            let image = document.createElement("img");
            element.className = "hero";
            title.className = "title";
            title.innerHTML = item.name;
            price.className = "price";
            let selling = "$ ";
            if (item.hasOwnProperty("priceRange")) {
                selling += item.priceRange.selling.high;
            } else if (item.hasOwnProperty("price")) {
                selling += item.price.selling;
            }
            price.innerHTML = selling;
            image.src = item.hero.href
            image.setAttribute("id", item.id);
            image.onclick = function() { return clickHandler(this); }
            element.appendChild(title);
            element.appendChild(price);
            element.appendChild(image);
            grid.appendChild(element);    
        });
    }
}

function clickHandler(e) {
    if (! modal.isActive()) {
        modal.load(e.id);
        modal.show();
    }
}

// read local JSON file and consume input
getJSON("products.json")
    .then((data) => {
        const input = JSON.parse(data);
        parseInput(input);
        modal.init(input);
    })
    .catch((error) => console.error("Error getting JSON ", error.statusText))

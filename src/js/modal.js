class Modal {
    constructor() {
        this.arr = [];
        this.active = false;
        this.count = 0;
    }
    
    init(input) {
        this.dialog = document.getElementById("dialog");
        this.carousel = document.getElementById("carousel");
        this.controls = document.getElementById("controls");
        this.indicator = document.getElementById("indicator");
        document.getElementById("close").onclick = () => { return this.hide(); }
        document.getElementById("left").onclick = () => { return this.left(); }
        document.getElementById("right").onclick = () => { return this.right(); }

        if (input.groups.length) {
            input.groups.map(item => {
                let o = {};
                o.id = item.id;
                o.images = [];
                item.images.map( x => {
                    o.images.push({href: x.href});
                });
                this.arr.push(o);
            });
        }
    }

    load(id) {
        let item = this.arr.find(x => x.id == id);
        if (item.images.length) {
            this.count = item.images.length;
            item.images.map(images => {
                let img = document.createElement("img");
                img.src = images.href;
                this.carousel.appendChild(img);
            });
            if (this.count > 1) {
                this.controls.style.display = "block";
                this.indicator.style.display = "block";                
                for (let i = 0; i < this.count; i++) {
                    let dot = document.createElement("span");
                    if (i == 0) {
                        dot.className = "black-circle";                        
                    } else {
                        dot.className = "white-circle";
                    }
                    this.indicator.appendChild(dot);
                }            
            }
            this.picture = 0;
        }
    }

    show() {
        this.active = true;
        this.dialog.style.display = "block";
        document.getElementById("screen").style.display = "block";
    }

    hide() {
        this.active = false;
        this.dialog.style.display = "none";
        this.controls.style.display = "none";
        while (this.indicator.hasChildNodes()) {
            this.indicator.removeChild(this.indicator.lastChild);
        }
        this.indicator.style.display = "none";
        while (this.carousel.hasChildNodes()) {
            this.carousel.removeChild(this.carousel.lastChild);
        }
        this.carousel.style.marginLeft = "0px";
        this.count = 0;      
        document.getElementById("screen").style.display = "none";
    }

    right() {
        this.picture++;
        if (this.picture >= this.count) {
            this.picture = 0;
        }
        this.carousel.style.marginLeft = (this.picture * -363) + "px";
        this.dots();
     }

    left() {
        this.picture--;
        if (this.picture < 0) {
            this.picture = this.count -1;
        }
        this.carousel.style.marginLeft = (this.picture * -363) + "px";
        this.dots();
    }

    dots() {
        for (let i = 0; i < this.count; i++) {
            if (i == this.picture) {
                this.indicator.children[i].className = "black-circle";
            } else {
                this.indicator.children[i].className = "white-circle";                
            }
        }
    }

    isActive() {
        return this.active;
    }
}
const modal = new Modal();

document.onkeydown = function(e) {
    e = e || window.event;
    if (e.keyCode == 27) {
        modal.hide();
    }
};

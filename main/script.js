//background stuff
const dicts = [
    [0, [
        [360, 70, 30, 90, 20, 10, 30],
        [500, 90, 5, 105, 90, 100, 85],
        [550, 90, 10, 100, 90, 100, 85],
        [800, 80, 40, 110, 70, 60, 75]
    ]],
    [750, [
        [350, 85, 20, 140, 10, 10, 30],
        [620, 90, 80, 120, 60, -10, 20],
        [770, 95, 40, 110, 70, 80, 60]
    ]]
]

let drawing = true;
let curves;
let path;

function select_dict() {
    const width = window.innerWidth;
    let i = 0;
    for (; i < dicts.length - 1; i++) {
        if (width < dicts[i + 1][0]) {
            break;
        }
    }
    curves = dicts[i][1];
}

function drawcurve(arr) {
    path.setAttribute("d", `M100 100 L0 100 L0 ${arr[0]} C ${arr[1]} ${arr[2]} ${arr[3]} ${arr[4]} 100 ${arr[5]} Z`);
}
function interp(arr1, arr2, t) {
    const arr = [];
    const p = (t - arr1[0]) / (arr2[0] - arr1[0]);
    const q = 1 - p;
    for (let i = 1; i < arr1.length; i++) {
        arr.push(arr1[i] * q + arr2[i] * p);
    }
    drawcurve(arr);
}
function offset_arr(arr, off) {
    const arr2 = [arr[1] + off, arr[2], arr[3] + off, arr[4], arr[5] + off, arr[6] + off];
    drawcurve(arr2);
}
function draw_fun() {
    window.requestAnimationFrame(draw_fun);
    if (!drawing) return;
    drawing = false;
    const offset = document.documentElement.scrollTop || document.body.scrollTop || window.scrollY;
    const total = document.body.scrollHeight || document.body.clientHeight;
    const r = (offset + window.innerHeight / 2) / total * 1000;
    if (r < curves[0][0]) {
        const diff = (curves[0][0] - r) * total / 10 / window.innerHeight;
        offset_arr(curves[0], diff);
        return;
    }
    for (let i = 0; i < curves.length - 1; i++) {
        if (r < curves[i + 1][0]) {
            interp(curves[i], curves[i + 1], r);
            return;
        }
    }
    const diff = (curves[curves.length - 1][0] - r) * total / 10 / window.innerHeight;
    offset_arr(curves[curves.length - 1], diff);
}
//carousel stuff
let images = [];
function update_carousel() {
    images[0].classList = "carousel-image img0";
    images[1].classList = "carousel-image img1";
    images[2].classList = "carousel-image img2";
    images[3].classList = "carousel-image img3";
    images[4].classList = "carousel-image img4";
    images[5].classList = "carousel-image img5";
    images[6].classList = "carousel-image img6";
    images[7].classList = "carousel-image img6";
    images[8].classList = "carousel-image img6";
}
function carousel_left() {
    images.unshift(images.pop());
    update_carousel();
}
function carousel_right() {
    images.push(images.shift());
    update_carousel();
}

let touchstartX = 0
let touchendX = 0

function checkDirection() {
    if (touchendX < touchstartX - 10) carousel_right();
    if (touchendX > touchstartX + 10) carousel_left();
}



init.push(function () {
    path = document.getElementById("back-path");
    document.onscroll = function (e) {
        drawing = true;
        // const offset = document.documentElement.scrollTop || document.body.scrollTop || window.scrollY;
        // const total = document.body.scrollHeight || document.body.clientHeight;
        // const r = (offset + window.innerHeight / 2) / total * 1000;
        // console.log(r);
    }
    select_dict();
    window.onresize = select_dict;
    window.requestAnimationFrame(draw_fun);

    let collection = document.getElementsByClassName("carousel-image");
    for (let i = 0; i < 9; i++) {
        images.push(collection[i]);
    }

    document.getElementById("carousel").addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX
    })

    document.getElementById("carousel").addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX
        checkDirection()
    })

    document.getElementById("carousel-left").addEventListener('click', carousel_left);
    document.getElementById("carousel-right").addEventListener('click', carousel_right);
})
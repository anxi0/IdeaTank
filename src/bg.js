const image = document.querySelector('.js-image');


function init() {
    const randomNumber = parseInt(Math.random() * 3)+1;
    image.querySelector('img').src = `${randomNumber}.jpg`;
}

init();
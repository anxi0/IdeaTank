const currentId = document.querySelector('.loginId'),
    currentPw = document.querySelector('.loginPw'),
    submitBtn = document.querySelector('button[type=submit]');

function sleep(t){
    return new Promise(resolve=>setTimeout(resolve,t));
}

function handleLogin(event) {
    event.preventDefault();
    const greeting = document.querySelector('h1');
    const id = currentId.value;
    const pw = currentPw.value;
    if (id === "" && pw=== "") {
        greeting.innerText = "Hello,lord";
        sleep(3000);
        location.href='file:///C:/Users/jjo01/Desktop/PROGRAMMING/JSbasics/last/main.html'
    } else {
        greeting.innerText = "Hello, fucker";
        while (1) alert('Get off!');
    }
}

function init() {
    submitBtn.addEventListener('click', handleLogin);
}

init();
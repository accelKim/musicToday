const reg = document.getElementById('reg');
const regSubmitBtn = document.getElementById('reg_btn');
const regForm = document.getElementById('regForm');
const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('login_btn');
reg.addEventListener('click', () => {
    loginForm.classList.remove('on');
    regForm.classList.add('on');
});

regSubmitBtn.addEventListener('click', () => {
    regForm.classList.remove('on');
    loginForm.classList.add('on');
});

regSubmitBtn.addEventListener('click', () => {
    register();
});

loginBtn.addEventListener('click', () => {
    login();
});

function register() {
    const id = document.getElementById('reg_id');
    const pw = document.getElementById('reg_pw');
    const repw = document.getElementById('repw');

    if (id.value.length == 0 || pw.value.length == 0) {
        alert('ID와 Password를 입력해주세요');
    } else if (pw.value !== repw.value) {
        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다');
    } else {
        localStorage.setItem('id', id.value);
        localStorage.setItem('pw', pw.value);
        alert('회원가입 완료!');
    }
}

function login() {
    const storedName = localStorage.getItem('id');
    const storedPw = localStorage.getItem('pw');

    const userName = document.getElementById('login_id');
    const userPw = document.getElementById('login_pw');

    if (userName.value == storedName && userPw.value == storedPw) {
        alert('로그인 완료');
        location.replace('../index.html');
    } else {
        alert('비밀번호나 아이디가 틀렸습니다');
    }
}

// 문자열이 비어있는지 확인하는 함수
const isBlank = function(value) {
    return value.trim() === "";
};

// 문자열의 길이가 주어진 범위 내에 있는지 확인하는 함수
const isBetween = function(length, min = 5, max = 25) {
    return length >= min && length <= max;
};

// 입력값에 에러 메시지를 설정하는 함수
const setError = function(input, message) {
    const parentElement = input.parentElement;
    parentElement.classList.remove("success");
    parentElement.classList.add("error");
    parentElement.querySelector("small").textContent = message;
};

// 입력값을 성공 상태로 설정하는 함수
const setSuccess = function(input) {
    const parentElement = input.parentElement;
    parentElement.classList.remove("error");
    parentElement.classList.add("success");
    parentElement.querySelector("small").textContent = "";
};

// 이메일 형식을 확인하는 함수
const isValidEmail = function(email) {
    const format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return format.test(String(email).toLowerCase());
};

// 비밀번호를 검증하는 함수
const isPasswordSecure = function(password) {
    const format = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,}$/;
    return format.test(String(password));
};

// 유저네임을 검증하는 함수
const isValidUsername = function(username) {
    const format = /^[^\s]*[A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*$/;
    return format.test(username.trim());
};

// 유저네임을 검증하는 함수
const validateUsername = function() {
    let isInputValid = false;
    const username = username_input.value.trim();

    if (isBlank(username)) {
        setError(username_input, "유저네임을 입력해주세요.");
    } else if (!isValidUsername(username)) {
        setError(username_input, "유저네임 형식이 올바르지 않습니다.");
    } else if (!isBetween(username.length, 4, 20)) {
        setError(username_input, `유저네임은 4자에서 20자 사이어야 합니다.`);
    } else {
        setSuccess(username_input);
        isInputValid = true;
    }

    return isInputValid;
};

// 이메일을 검증하는 함수
const validateEmail = function() {
    let isInputValid = false;
    const email = email_input.value.trim();

    if (isBlank(email)) {
        setError(email_input, "이메일을 입력해주세요.");
    } else if (!isValidEmail(email)) {
        setError(email_input, "올바른 이메일 형식이 아닙니다.");
    } else {
        setSuccess(email_input);
        isInputValid = true;
    }

    return isInputValid;
};

// 비밀번호를 검증하는 함수
const validatePassword = function() {
    let isInputValid = false;
    const password = password_input.value.trim();

    if (isBlank(password)) {
        setError(password_input, "비밀번호를 입력해주세요.");
    } else if (!isPasswordSecure(password)) {
        setError(password_input, "비밀번호는 최소 8자 이상, 소문자, 대문자, 숫자, 특수 문자를 포함해야 합니다.");
    } else {
        setSuccess(password_input);
        isInputValid = true;
    }

    return isInputValid;
};

// 비밀번호 확인을 검증하는 함수
const validateConfirmPassword = function() {
    let isInputValid = false;
    const confirmPassword = confirm_password_input.value.trim();
    const password = password_input.value.trim();

    if (isBlank(confirmPassword)) {
        setError(confirm_password_input, "비밀번호를 다시 입력해주세요.");
    } else if (confirmPassword !== password) {
        setError(confirm_password_input, "비밀번호가 일치하지 않습니다.");
    } else {
        setSuccess(confirm_password_input);
        isInputValid = true;
    }

    return isInputValid;
};

// 폼 제출 처리
const form = document.getElementById('myForm');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 제출 동작 막기

    // 입력 필드 유효성 검사
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    // 모든 검증 통과 시 폼 제출
    if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        console.log("폼이 유효합니다. 제출 중...");
        // form.submit(); // 실제 폼 제출 (주석 해제)
    } else {
        console.log("폼 검증 실패. 입력값을 확인해주세요.");
    }
});

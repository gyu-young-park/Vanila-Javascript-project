const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//show input error message
function showError(input, message){
    //input의 parent는 form-control이 된다.
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small'); // tag를 가져온다.
    small.innerText = message;
}

//show success outline
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// check email is valid
function checkEmail(input){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input)
    }else{
        showError(input, `Email is not valid`);
    }
} 

function checkRequired(inputArr){
    inputArr.forEach((input) => {
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`)
        } else{
            showSuccess(input)
        }
    })
}

//check input length
function checkLength(input, min, max){
    if(input.value.length < min ){
        showError(input, `${getFieldName(input)} must be at least ${min} chartacters`);
    }else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} chartacters`);
    }else{
        showSuccess(input)
    }
}

// check passwords match
function checkPasswordMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, 'Passwords do not match')
    }
}

//첫번째 글자만 대문자로 만들고 싶다.
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event listeners
form.addEventListener('submit', function(e){
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username, 3 , 15);
    checkLength(password, 6 , 20);
    checkEmail(email);
    checkPasswordMatch(password, password2);
})

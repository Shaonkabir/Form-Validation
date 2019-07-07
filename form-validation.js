// FORM VALIDATION
// Worked using JSON Server and Ajax. All the data are calling from server
// Gathered experience of handling / working with 'promise'
// Advance level of working with 'Fetch API'


 // REGISTATION FORM VALIDATION
const form = document.querySelector('.form');
const name = document.querySelector('.nameField');
const email = document.querySelector('.emailField');
const password = document.querySelector('.passwordField');
const passwordTwo = document.querySelector('.passwordFieldTwo');
const output = document.querySelector('.output');

// SUBMIT BUTTON EVENT
const registationBtn = document.querySelector('.register');

// VALIDATION FUNCTION
function validation(e) {
    if(name.value == '' || name.value == null) {
        output.innerHTML = `Name can't be Empty`;
        output.classList.add('err')
    } else if(name.value.length <3) {
        output.innerHTML = `Name is too short`;
        output.classList.add('err')
    } else if(password.value != passwordTwo.value) {
        output.innerHTML = `Password doesn't match.`;
        output.classList.add('err')
    } else if(password.value == '' || password.value == null) {
        output.innerHTML = `Password can't be Empty`;
        output.classList.add('err')
    } else if(password.value.length <6) {
        output.innerHTML = `Password is too short`;
        output.classList.add('err')
    } else {
        // IF EVERYTHING IS VAILED, DATA WILL BE STORED IN DATABASE
        const contact = {
            name: name.value,
            email: email.value,
            password: password.value
        }
        const URL = 'http://localhost:3000/user_list';
        //XMLHttpRequest:
        const xhr = new XMLHttpRequest()
        xhr.open("post",URL,true);
        xhr.setRequestHeader('content-type', 'application/json')
        xhr.onreadystatechange = () => {
            name.value = '';
            email.value = ''
            password.value = '';
            passwordTwo.value = ''
            // to display output on browser:
            output.innerHTML = "Registation Successfull"
            output.style.padding = '21px 113px';
            output.classList.remove('err')
        }
        xhr.send(JSON.stringify(contact))
    }
}
registationBtn.addEventListener('click',validation);


// LOGIN FORM VALIDATION
const loginForm = document.querySelector('.login')
const userName = document.querySelector('.userName');
const loginPassword = document.querySelector('.password');
const loginOutput = document.querySelector('.loginOutput');

// LOGIN FORM VALIDATION FUNCTION
function loginValidation(e) {
    fetch('http://localhost:3000/user_list')
        .then(res => res.json())
        .then(data => {
            data.filter(user => {
                if(userName.value == '' || userName.value == null) {
                    loginOutput.innerHTML = `User name can't be empty`;
                    loginOutput.classList.add('err')
                } else if (loginPassword.value == '' || loginPassword.value == null) {
                    loginOutput.innerHTML = `Password can't be empty`;
                    loginOutput.classList.add('err')
                } else if(user.email !== userName.value) {
                    loginOutput.innerHTML = `Can't find user name ${userName.value}`;
                    loginOutput.classList.add('err')
                } else if(user.password !== loginPassword.value) {
                    loginOutput.innerHTML = `Password don't match`;
                    loginOutput.classList.add('err')
                } else {
                    // IF EVERYTHING IS VAILED, THEN .......
                    loginOutput.innerHTML = `Login Successfull </br> Congratulations, ${user.name} `;
                    loginOutput.style.padding = '21px 113px';
                    loginOutput.style.background = '#31c231';

                    userName.value = '';
                    loginPassword.value = '';

                }
            })
        })
        .catch(err => console.log(`An error just occoured unfortunately !! ${err}`))
}
loginForm.addEventListener('click' , loginValidation);
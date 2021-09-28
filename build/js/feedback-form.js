const form = document.forms.feedback
const inputOfContact = document.querySelector('input[type=email]')
const labelOfContact = document.querySelector('.contact-text')
const fullName = document.querySelectorAll('input[type=text]')
const textarea = document.querySelector('TEXTAREA')

const removeError = (field) => field.classList.remove('_error-validation')

const clearInputInForm = () => {
    [...fullName, textarea, inputOfContact].forEach((item) => {
        if(item.classList.contains('_error-validation')) removeError(item)
    })
    form.reset()
}

const validateError = (errorsFiel) => {
    errorsFiel.classList.add('_error-validation')
}

const generateModal = (message, bcColor) => {
    let modal = document.createElement('div')
    modal.className = 'response-modal'
    modal.innerHTML = message
    modal.style.backgroundColor = bcColor
    document.body.prepend(modal)
    setTimeout(() => {
        modal.remove()
        }, 2000)
}

form.addEventListener('focusout', (event) => {
    if(event.target.tagName === 'TEXTAREA'){
        event.target.value !== '' ? event.target.nextElementSibling.id = 'textInArea' : event.target.nextElementSibling.id = ''
    }
    if (event.target.classList.contains('fullName')){
        event.target.value !== ''
        ? (event.target.parentNode.lastElementChild.id = 'textInInput')
        : (event.target.parentNode.lastElementChild.id = '')
    }
})


form.addEventListener('change', (event) => {
    if (!(event.target.name === 'contact')) return
    switch (event.target.value) {
        case 'telephone':
            inputOfContact.setAttribute('type', 'telephone')
            labelOfContact.innerHTML = 'Телефон'
            break
        case 'email':
            inputOfContact.setAttribute('type', 'email')
            labelOfContact.innerHTML = 'E-mail'
            break
    }
})

form.addEventListener('click', function (event) {
    if (event.target.classList.contains('clear')) {
        event.preventDefault()
        clearInputInForm()
        return
    }
    if (event.target.classList.contains('submit')) {
        event.preventDefault()
        formValidation()
    }
})

const validateEmail = (email) =>
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email)

const validateTel = (tel) => /\+375\d{9}$/.test(tel)

const validateFullname = (valueOfFullName) =>
    valueOfFullName.length >= 3 &&
    valueOfFullName.length <= 15 &&
    valueOfFullName !== ''
        ? true
        : false


const toMail = dataForm => {
    
    for(let item of document.querySelectorAll('INPUT[name="isVisited"]')){
        if(item.checked){
            dataForm.attandence = item.value
            break
        }
    }
    //* активация EmailJS 
    emailjs.init('user_VXF2bC1Ly2Cf3nlgdUt0k')

    //* отправка формы
    emailjs.send("service_46t0xhk","template_aivc1cs", dataForm)
    .then(response => {
        console.log(response);
        if(response.status === 200){
            form.reset()
            document.body.classList.remove('send')
            generateModal('Успешно отправлено', '#00A86B')
        }else{
            document.body.classList.remove('send')
            generateModal('Произошла ошибка!', '#FE1F20')
        }
    }).catch(error => {
        console.log(error)
        document.body.classList.remove('send')
        generateModal("Ошибка сети!", '#FE1F20')
    })
}

const formValidation = () => {
    let requiredElements = document.querySelectorAll('[data-req=req]')
    let errors = 0
    let contacrForm = {
        from_name: "",
        from_surname: '',
        from_contact: "",
        policy_con: "",
        attandence: "",
        message: "",
    }
    for (let field of requiredElements) {
        switch (field.name) {
            case 'text-message':
                if(field.value.length < 20){
                    validateError(field)
                    errors++
                }else{
                    contacrForm.message = field.value
                    removeError(field)
                }
                break
            case 'name':
                if (validateFullname(field.value)) {
                    contacrForm.from_name = field.value
                    removeError(field)
                } else {
                    validateError(field)
                    errors++
                }
                break
            case 'surname':
                if (validateFullname(field.value)) {
                    contacrForm.from_surname = field.value
                    removeError(field)
                } else {
                    validateError(field)
                    errors++
                }
                break

            case 'contact-info':
                switch (field.type) {
                    case 'email':
                        if (validateEmail(field.value)) {
                            contacrForm.from_contact = field.value
                            removeError(field)
                        } else {
                            validateError(field)
                            errors++
                        }
                        break

                    case 'telephone':
                        if (validateTel(field.value)) {
                            contacrForm.from_contact = field.value
                            removeError(field)
                        } else {
                            validateError(field)
                            errors++
                        }
                        break
                }
                break

            case 'privacy-policy':
                if (!field.checked) errors++
                contacrForm.policy_con = 'Отправитель ознакомлен'
                break
        }
    }
    if (errors === 0) {
        document.body.querySelector('.load').style.top = window.pageYOffset + 'px'
        document.body.classList.add('send')
        // setTimeout(() => {
        //     document.body.classList.remove('send')
        // }, 4000)
        toMail(contacrForm)
    }else{
        document.querySelector('.feedback').scrollIntoView(true)
    }
}

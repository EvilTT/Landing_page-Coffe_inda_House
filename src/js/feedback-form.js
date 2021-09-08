const form = document.forms.feedback
const inputOfContact = document.querySelector('input[type=email]')
const labelOfContact = document.querySelector('.contact-text')
const fullName = document.querySelectorAll('input[type=text]')
const textarea = document.querySelector('TEXTAREA')

const removeError = (field) => field.classList.remove('_error-validation')

const clearInputInForm = () => {
    ;[...fullName, textarea, inputOfContact].forEach((item) =>
        removeError(item)
    )
    form.reset()
}

const generateModal = () => {
    let modal = document.createElement('div')
}

form.addEventListener('focusout', (event) => {
    if (!event.target.classList.contains('fullName')) return
    event.target.value !== ''
        ? (event.target.parentNode.lastElementChild.id = 'textInInput')
        : (event.target.parentNode.lastElementChild.id = '')
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

const validateError = (errorsFiel) => {
    errorsFiel.classList.add('_error-validation')
    errorsFiel.focus()
}

// const toMail = async (dataForm) => {
//     let data = new FormData(dataForm)
//     let response = await fetch('mail.php', {
//         body: data,
//         method: 'POST',
//     })
//     if(response.ok) document.body.classList.remove('send')   
// }

const formValidation = () => {
    let requiredElements = document.querySelectorAll('[data-req=req]')
    let errors = 0

    for (let field of requiredElements) {
        switch (field.name) {
            case 'name':
                if (validateFullname(field.value)) {
                    removeError(field)
                } else {
                    validateError(field)
                    errors++
                }
                break
            case 'surname':
                if (validateFullname(field.value)) {
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
                            removeError(field)
                        } else {
                            validateError(field)
                            errors++
                        }
                        break

                    case 'telephone':
                        if (validateTel(field.value)) {
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
                break
        }
    }
    if (errors === 0) {
        document.body.querySelector('.load').style.top = window.pageYOffset + 'px'
        document.body.classList.add('send')
    }
}

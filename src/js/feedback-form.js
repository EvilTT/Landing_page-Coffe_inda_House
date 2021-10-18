const form = document.forms.feedback
const fieldContact = document.querySelector('input[type=email]')
const labelFieldContact = document.querySelector('.contact-text')
const fullnameFields = document.querySelectorAll('input[type=text]')
const textarea = document.querySelector('TEXTAREA')

const clearFieldsForm = () => {
    ;[...fullnameFields, textarea, fieldContact].forEach((item) => {
        if (item.classList.contains('_error-validation')) validateFieldForm(item, false)
    })
    form.reset()
}

const validateFieldForm = (fieldOfError, error) => {
    error
        ? fieldOfError.classList.add('_error-validation')
        : fieldOfError.classList.remove('_error-validation')
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
    if (event.isTrusted === false) {
        let inputs = document.querySelectorAll('#textInInput')
        if (!inputs) return
        inputs.length === 1
            ? (inputs.id = '')
            : inputs.forEach((item) => (item.id = ''))

        let area = document.getElementById('textInArea')
        if (!area) return
        area.id = ''
        return
    }
    if (event.target.tagName === 'TEXTAREA') {
        event.target.value !== ''
            ? (event.target.nextElementSibling.id = 'textInArea')
            : (event.target.nextElementSibling.id = '')
    }
    if (event.target.classList.contains('fullName')) {
        event.target.value !== ''
            ? (event.target.parentNode.lastElementChild.id = 'textInInput')
            : (event.target.parentNode.lastElementChild.id = '')
    }
})

form.addEventListener('change', (event) => {
    if (!(event.target.name === 'contact')) return
    switch (event.target.value) {
        case 'telephone':
            fieldContact.setAttribute('type', 'telephone')
            labelFieldContact.innerHTML = 'Телефон'
            break
        case 'email':
            fieldContact.setAttribute('type', 'email')
            labelFieldContact.innerHTML = 'E-mail'
            break
    }
})

form.addEventListener('click', function (event) {
    if (event.target.classList.contains('clear')) {
        event.preventDefault()
        clearFieldsForm()
        generateEventFocusout()
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
    valueOfFullName.length >= 3 && valueOfFullName !== '' ? true : false

const generateEventFocusout = () => {
    let focusoutEvent = new Event('focusout', { bubbles: true })
    form.dispatchEvent(focusoutEvent)
}

const toMail = (dataForm) => {
    for (let item of document.querySelectorAll('INPUT[name="isVisited"]')) {
        if (item.checked) {
            dataForm.attandence = item.value
            break
        }
    }

    emailjs.init('user_VXF2bC1Ly2Cf3nlgdUt0k')

    emailjs
        .send('service_46t0xhk', 'template_aivc1cs', dataForm)
        .then((response) => {
            if (response.status === 200) {
                form.reset()
                generateEventFocusout()
                document.body.classList.remove('send')
                generateModal('Успешно отправлено', '#00A86B')
            } else {
                document.body.classList.remove('send')
                generateModal('Произошла ошибка!', '#FE1F20')
            }
        })
        .catch(() => {
            document.body.classList.remove('send')
            generateModal('Ошибка сети!', '#FE1F20')
        })
}

const formValidation = () => {
    let requiredElements = document.querySelectorAll('[data-req=req]')
    let errors = 0
    let contacrForm = {
        from_name: '',
        from_surname: '',
        from_contact: '',
        policy_con: '',
        attandence: '',
        message: '',
    }
    for (let field of requiredElements) {
        switch (field.name) {
            case 'text-message':
                if (field.value.length < 10) {
                    validateFieldForm(field, true)
                    errors++
                } else {
                    contacrForm.message = field.value
                    validateFieldForm(field, false)
                }
                break
            case 'name':
                if (validateFullname(field.value)) {
                    contacrForm.from_name = field.value
                    validateFieldForm(field, false)
                } else {
                    validateFieldForm(field, true)
                    errors++
                }
                break
            case 'surname':
                if (validateFullname(field.value)) {
                    contacrForm.from_surname = field.value
                    validateFieldForm(field, false)
                } else {
                    validateFieldForm(field, true)
                    errors++
                }
                break

            case 'contact-info':
                switch (field.type) {
                    case 'email':
                        if (validateEmail(field.value)) {
                            contacrForm.from_contact = field.value
                            validateFieldForm(field, false)
                        } else {
                            validateFieldForm(field, true)
                            errors++
                        }
                        break

                    case 'telephone':
                        if (validateTel(field.value)) {
                            contacrForm.from_contact = field.value
                            validateFieldForm(field, false)
                        } else {
                            validateFieldForm(field, true)
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
        document.body.querySelector('.load').style.top =
            window.pageYOffset + 'px'
        document.body.classList.add('send')
        toMail(contacrForm)
    } else {
        document.querySelector('.feedback').scrollIntoView(true)
    }
}

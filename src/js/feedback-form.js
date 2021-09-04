const form = document.forms.feedback
const inputOfContact = document.querySelector('input[type=email]')
const labelOfContact = document.querySelector('.contact-text')

form.addEventListener('focusout', (event) => {
    if (!event.target.classList.contains('input')) return
    event.target.value !== ''
        ? event.target.parentNode.lastElementChild.id = 'textInInput'
        : event.target.parentNode.lastElementChild.id = ''
})

form.addEventListener('change', (event) => {
    if(!(event.target.name === 'contact')) return
    switch(event.target.value){
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


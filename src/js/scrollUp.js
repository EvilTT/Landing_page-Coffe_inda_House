const btnScrollUp = document.querySelector('.arrow_container')

btnScrollUp.addEventListener('click', (event) => {
    if (event.target.closest('.arrow_container')) {
        event.preventDefault()
        window.scroll({ top: 0, left: 0, behavior: 'smooth' })
        return
    }
})

window.onscroll = () =>
    window.pageYOffset >= 300 &&
    document.body.clientHeight - (window.innerHeight + window.pageYOffset) >= 50
        ? (btnScrollUp.style.display = 'block')
        : (btnScrollUp.style.display = 'none')

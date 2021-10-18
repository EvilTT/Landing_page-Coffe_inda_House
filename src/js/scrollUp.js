window.onscroll = () =>
    window.pageYOffset >= 300 &&
    document.body.clientHeight - (window.innerHeight + window.pageYOffset) >= 50
        ? (btnScrollUp.style.display = 'block')
        : (btnScrollUp.style.display = 'none')

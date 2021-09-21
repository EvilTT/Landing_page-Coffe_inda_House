window.onscroll = () =>
    window.pageYOffset >= 300 &&
    document.body.clientHeight - (window.innerHeight + window.pageYOffset) >= 50
        ? (arrow.style.display = 'block')
        : (arrow.style.display = 'none')
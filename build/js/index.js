const navigationContainer = document.querySelectorAll('.menu_text')
const btnScrollUp = document.querySelector('.arrow_container')
const toggleNavigation = document.querySelector('.menu_position__nav')
const changeBgColorBtn = document.querySelector('.btn')

let numberOfClickToTitle = 0
let currentGradient = undefined

window.onload = () => {
    document.body.classList.remove('send')
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
            registration.unregister()
        }
    })
}

window.addEventListener('DOMContentLoaded', () => {
    let mapIframe = document.querySelector('IFRAME')
    if (window.innerWidth <= 530) {
        mapIframe.setAttribute('height', '350')
    }
})

document.body.addEventListener('click', (event) => {
    if (
        event.target.classList.contains('menu_position__nav') ||
        toggleNavigation.contains(event.target)
    ) {
        document.querySelector('.menu_navigation').classList.toggle('open_nav')

        navigationContainer.forEach((item) => item.classList.toggle('open-menu'))
        toggleNavigation.querySelector('i').classList.toggle('icon-close')
        return
    }

    if (event.target.closest('.arrow_container')) {
        event.preventDefault()
        window.scroll({ top: 0, left: 0, behavior: 'smooth' })
        return
    }

    if (event.target.closest('.menu_position')) {
        event.preventDefault()
        let unker = event.target.closest('.menu_position').dataset.help
        let cordOfScroll = document.querySelector(unker)
        cordOfScroll.scrollIntoView({
            behavior: 'smooth',
        })
        return
    }

    if (changeBgColorBtn.contains(event.target)) {
        event.preventDefault()
        const gradienBackground = [
            ['linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)'],
            ['linear-gradient(90deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)'],
            ['linear-gradient(90deg, #21D4FD 0%, #B721FF 100%)'],
            ['linear-gradient(90deg, #FAD961 0%, #ff701d 100%)'],
            ['linear-gradient(90deg, #db2c7e 0%, #026773 50%, #00A49B 100%)'],
        ]

        let randomNumber = () =>
            Math.round(Math.random() * (gradienBackground.length - 1) + 1)

        while (true) {
            let gradientNumber = randomNumber()
            if (gradientNumber !== currentGradient) {
                currentGradient = gradientNumber
                break
            }
        }

        document.body.style.background = gradienBackground[currentGradient - 1]
        return
    }

    if (event.target.classList.contains('title')) {
        numberOfClickToTitle++
        if (numberOfClickToTitle >= 10 && document.querySelector('.eruda') === null) {
            numberOfClickToTitle = 0
            let script = document.createElement('script')
            script.classList.add('eruda')
            script.src = 'https://cdn.jsdelivr.net/npm/eruda'
            document.body.append(script)

            script.onload = () => {
                let modalOfErudaloaded = document.createElement('div')
                modalOfErudaloaded.innerHTML = 'Mobile console active!'
                modalOfErudaloaded.className = 'eruda'
                document.body.prepend(modalOfErudaloaded)
                eruda.init()

                setTimeout(() => {
                    modalOfErudaloaded.remove()
                }, 2000)
            }
        }
    }
})

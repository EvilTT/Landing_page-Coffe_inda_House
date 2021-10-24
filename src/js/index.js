const navigationContainer = document.querySelectorAll('.menu_text')
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
            ['bg1'],
            ['bg2'],
            ['bg3'],
            ['bg4'],
            ['bg5'],
        ]

        let randomNumber = () =>
            Math.round(Math.random() * (gradienBackground.length - 1) + 1)

        while (true) {
            let gradientNumber = randomNumber()
            if (gradientNumber !== currentGradient) {
                document.body.classList.remove(gradienBackground[currentGradient - 1])
                currentGradient = gradientNumber
                break
            }
        }
        document.body.classList.add(gradienBackground[currentGradient - 1])
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

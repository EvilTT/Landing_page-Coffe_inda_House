'use strict'

const menuText = document.querySelectorAll('.menu_text')
const arrow = document.querySelector('.arrow_container')
const closeDiv = document.querySelector('.menu_position__nav')
const btnColor = document.querySelector('.btn')
let count = 0

let currentGradient = undefined

window.addEventListener('DOMContentLoaded', () => {
    let map = document.querySelector('IFRAME')
    if (window.innerWidth <= 530) {
        map.setAttribute('height', '350')
    }
})

window.onload = () => {
    document.body.classList.remove('send')
    // PWA install
    // let resolve = 'Servise Worker - Active!'
    // let rejected = 'Servise Worker - Active Fail'
    // if ('serviceWorker' in navigator) {
    //     navigator.serviceWorker
    //         .register('./service-worker.js')
    //         .then(() =>
    //             console.log(
    //                 `%c${resolve}`,
    //                 'color: green; font-weight: 700; font-size: 18px'
    //             )
    //         )
    //         .catch(() =>
    //             console.log(
    //                 `%c${rejected}`,
    //                 'color: red; font-weight: 700; font-size: 18px'
    //             )
    //         )
    // }
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
         registration.unregister()
       } })
}

document.body.addEventListener('click', (event) => {
    //! open/close menu btn
    if (
        event.target.classList.contains('menu_position__nav') ||
        closeDiv.contains(event.target)
    ) {
        document.querySelector('.menu_navigation').classList.toggle('open_nav')

        menuText.forEach((item) => item.classList.toggle('open-menu'))
        closeDiv.querySelector('i').classList.toggle('icon-close')
        return
    }
    //! scroll btn
    if(event.target.closest('.arrow_container')){
        event.preventDefault()
        let stopScroll = setInterval(() => {
            if(document.documentElement.scrollTop <= 0) clearInterval(stopScroll)
            document.documentElement.scrollTop = document.documentElement.scrollTop - 90
        },15)
        return
    } 
    if(event.target.closest('.menu_position')){
        event.preventDefault()
        let unker = event.target.closest('.menu_position').dataset.help
        let cordOfScroll = document.querySelector(unker).getBoundingClientRect().top
        window.scrollTo({
            top: cordOfScroll,
            behavior: 'smooth'
        })
        console.log('scrollTo');
        return
    }
    //! Random gradient background
    if (btnColor.contains(event.target)) {
        event.preventDefault()
        const gradienBAckground = [
            ['#845EC2', '#B39CD0', '#FBEAFF', '#00C9A7'],
            ['#845EC2', '#B0A8B9', '#C34A36', '#BEA6A0'],
            ['#845EC2', '#009EFA', '#00D2FC', '#4FFBDF'],
            ['#845EC2', '#C493FF', '#FEFEDF', '#D5CABD'],
            ['#845EC2', '#C197FF', '#00C9A7', '#005B44'],
            ['#B55EC2', '#D2A7D7', '#FFE7FF', '#5CBAB3'],
            ['#B55EC2', '#B5A7B6', '#CB6328', '#BCA79D'],
            ['#B55EC2', '#55A1FF', '#55A1FF', '#28FCF1'],
        ]
        let generateNumber = () =>
            Math.round(Math.random() * (gradienBAckground.length - 1) + 1)
        let numberOfGradient = undefined
        //! ===
        do {
            numberOfGradient = generateNumber()
        } while (numberOfGradient === currentGradient)
        currentGradient = numberOfGradient
        console.log(numberOfGradient - 1)
        //!! ===

        document.body.style.background = `linear-gradient(147deg, ${
            gradienBAckground[numberOfGradient - 1][0]
        } 0%, ${gradienBAckground[numberOfGradient - 1][1]} 33%, ${
            gradienBAckground[numberOfGradient - 1][2]
        } 66%, ${gradienBAckground[numberOfGradient - 1][3]} 100%)`
        return
    }
    //eruda initialize (mobile console)
    if (
        event.target.tagName === 'P' ||
        event.target.contains(document.querySelector('catalog_text-title'))
    ) {
        count++
        if (count >= 10 && document.querySelector('.eruda') === null) {
            let script = document.createElement('script')
            script.src = '//cdn.jsdelivr.net/npm/eruda'
            document.body.append(script)

            script.onload = () => {
                console.log('Eruda active')
                let modal = document.createElement('div')
                modal.innerHTML = 'Mobile console active!'
                modal.className = 'eruda'
                document.body.prepend(modal)
                eruda.init()

                setTimeout(() => {
                    modal.remove()
                    }, 2000)
            }
        }
    }
})

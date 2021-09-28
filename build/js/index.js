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
        window.scroll({ top: 0, left: 0, behavior: 'smooth' })
        return
    } 
    if(event.target.closest('.menu_position')){
        event.preventDefault()
        let unker = event.target.closest('.menu_position').dataset.help
        let cordOfScroll = document.querySelector(unker)
        cordOfScroll.scrollIntoView({
            behavior: "smooth"
        })        
        return
    }
    //! Random gradient background
    if (btnColor.contains(event.target)) {
        event.preventDefault()
        const gradienBAckground = [
            ['linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)'],
            ['linear-gradient(90deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)']
        ]
        let generateNumber = () =>
            Math.round(Math.random() * (gradienBAckground.length - 1) + 1)
            

        while(true){
            let numberOfGradient = generateNumber()
            if(numberOfGradient !== currentGradient){
                currentGradient = numberOfGradient
                break
            } 
        }

        document.body.style.background = gradienBAckground[currentGradient-1]
        return
    }
    //eruda initialize (mobile console)
    if (event.target.classList.contains('title')) {
        count++
        console.log(`Click on "О нас" - ${count}`);
        if (count >= 10 && document.querySelector('.eruda') === null) {

            count = 0
            let script = document.createElement('script')
            script.classList.add('eruda')
            script.src = 'https://cdn.jsdelivr.net/npm/eruda'
            document.body.append(script)

            script.onload = () => {
                console.log('Eruda onload')
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

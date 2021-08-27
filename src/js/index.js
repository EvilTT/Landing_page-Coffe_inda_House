'use strict'

const menuText = document.querySelectorAll('.menu_text')
const arrow = document.querySelector('.arrow_container')
const closeDiv = document.querySelector('.menu_position__nav')
const btnColor = document.querySelector('.btn')

window.onscroll = () =>
    window.pageYOffset >= 300
        ? (arrow.style.display = 'block')
        : (arrow.style.display = 'none')

document.body.addEventListener('click', (event) => {
    //! open/close menu btn
    if (
        event.target.classList.contains('menu_position__nav') ||
        closeDiv.contains(event.target)
    ) {
        menuText.forEach((item) => item.classList.toggle('open-menu'))
        closeDiv.querySelector('i').classList.toggle('icon-close')
        return
    }
    //! Random gradient background
    if (btnColor.contains(event.target)) {

        const gradienBAckground = [
            ['#845EC2', '#B39CD0', '#FBEAFF', '#00C9A7'],
            ['#845EC2', '#B0A8B9', '#C34A36', '#BEA6A0'],
            ['#845EC2', '#009EFA', '#00D2FC', '#4FFBDF'],
            ['#845EC2', '#C493FF', '#FEFEDF', '#D5CABD'],
            ['#845EC2', '#C197FF', '#00C9A7', '#005B44'],
            ['#B55EC2', '#D2A7D7', '#FFE7FF', '#5CBAB3'],
            ['#B55EC2', '#B5A7B6', '#CB6328', '#BCA79D'],
            ['#B55EC2', '#55A1FF', '#55A1FF', '#28FCF1']
        ]
        let numberOfGradient =
            Math.round(Math.random() * (gradienBAckground.length - 1) + 1)
        document.body.style.background = `linear-gradient(90deg, ${gradienBAckground[numberOfGradient-1][0]} 0%, ${gradienBAckground[numberOfGradient-1][1]} 33%, ${gradienBAckground[numberOfGradient-1][2]} 66%, ${gradienBAckground[numberOfGradient-1][3]} 100%)`
        console.log(event.target);
        return
    }
})

//? Scrolling navigation animation

window.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const id = entry.target.getAttribute('id')
            if (entry.intersectionRatio > 0) {
                document
                    .querySelector(`.icon_container a[href="#${id}"]`)
                    .closest('.menu_position')
                    .classList.add('active-navigation-tab')
            } else {
                document
                    .querySelector(`.icon_container a[href="#${id}"]`)
                    .closest('.menu_position')
                    .classList.remove('active-navigation-tab')
            }
        })
    })
    // Track all sections that have an `id` applied
    document.querySelectorAll('section[id]').forEach((section) => {
        observer.observe(section)
    })
})

//! Slider menu

// let mySwiper = new Swiper('.swiper-container', {
//     direction: 'vertical',
//     loop: true,
//     pagination: '.swiper-pagination',
//     grabCursor: true,
//     speed: 1000,
//     paginationClickable: true,
//     parallax: true,
//     autoplay: false,
//     effect: 'slide',
//     mousewheelControl: 1,
// })

//! 3d

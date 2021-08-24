'use strict'

const closeArrow = '<i class="fas fa-arrow-left"></i>'
const menuText = document.querySelectorAll('.menu_text')
const menuBtn = document.getElementById('menu-nav')
const arrow = document.querySelector('.arrow_container')
const closeDiv = document.querySelector('.menu_position__nav')

window.onscroll = () =>
    window.pageYOffset >= 300
        ? (arrow.style.display = 'block')
        : (arrow.style.display = 'none')

document.body.addEventListener('click', (event) => {
    //! open/close menu btn
    if (event.target.classList.contains('menu_position__nav') || closeDiv.contains(event.target)) {
        menuText.forEach((item) => item.classList.toggle('open-menu'))
        closeDiv.querySelector('i').classList.toggle('icon-close')
        return
    }
    // if(event.target.closest('.menu_position')){
    //     event.target.closest('.menu_position').classList.add('click')
    //     console.log(1);
    //     setTimeout(() => {
    //         console.log(2);
    //         event.target.closest('.menu_position').classList.remove('click')
    //     },500)
    // }
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
            }else {
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

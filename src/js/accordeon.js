const accordeon = document.querySelector('.location_accordeon')

accordeon.addEventListener('click', (event) => {
    if(event.target.classList.contains('accordion-item-header') || event.target.parentNode.classList.contains('accordion-item-header')){
        document.querySelectorAll('.accordion-item').forEach(item => {
            if(item.contains(event.target)) return
            item.classList.remove('show')
        })
        event.target.closest('.accordion-item').classList.toggle('show')
    }
})
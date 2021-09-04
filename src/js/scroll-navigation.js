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

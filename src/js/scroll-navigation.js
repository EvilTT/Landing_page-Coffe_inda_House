window.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const id = entry.target.getAttribute('id')
            if (entry.intersectionRatio > 0) {
                document
                    .querySelector(`.menu_position[data-help="#${id}"]`)
                    .classList.add('active-navigation-tab')
            } else {
                document
                    .querySelector(`.menu_position[data-help="#${id}"]`)
                    .classList.remove('active-navigation-tab')
            }
        })
    })
    document.querySelectorAll('section[id]').forEach((section) => {
        observer.observe(section)
    })
})

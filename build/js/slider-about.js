const swiperAbout = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

let iconFullScreen = 'fas fa-expand'
let iconCloseFullScreen = 'fas fa-compress'

document.querySelector('.icon-sreen').addEventListener('click', function(event){
  this.parentNode.classList.toggle('bigImage')
  document.body.classList.toggle('fullScreen')
  
  let icon = this.querySelector('I')
  icon.classList.contains('fas fa-expand') ? icon.className = iconCloseFullScreen : icon.className = iconCloseFullScreen
})
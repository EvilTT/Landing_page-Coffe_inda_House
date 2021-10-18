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

document.querySelector('.icon-sreen').addEventListener('click', function(){
  this.parentNode.classList.toggle('bigImage')
  document.body.classList.toggle('fullScreen')
  
  let currentIcon = this.querySelector('I')
  
  switch(currentIcon.className){
    case iconFullScreen:
      currentIcon.className = iconCloseFullScreen
      break
    
    case iconCloseFullScreen:
      currentIcon.className = iconFullScreen
      break
  }
})  
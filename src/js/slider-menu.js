const slider = (targetElem) => {
  const tabs = Array.from(document.querySelectorAll('.tub > p'))
  const slides = Array.from(document.querySelectorAll('.catalog_slider-slide'))

  let activeSlide = targetElem.dataset.num

  tabs.forEach(item => item.closest('.tub').classList.remove('tub-active'))
  tabs[activeSlide].closest('.tub').classList.add('tub-active')

  slides.forEach(item => item.classList.remove('catalog_slider-slide-active'))
  slides[activeSlide].classList.add('catalog_slider-slide-active')
}

document.querySelector('.catalog_text-tubs').addEventListener('click', (event) => {
  if(event.target.tagName !== "P") return
  slider(event.target)
})


const swiperOfMenu = new Swiper('.blog-slider', {
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    observer: true,
    mousewheel: {
      invert: false,
    },
    pagination: {
      el: '.blog-slider__pagination',
      clickable: true,
    },
    navigation: {
        nextEl: '.blog-slider__button-next',
        prevEl: '.blog-slider__button-prev',
      }
  });

 
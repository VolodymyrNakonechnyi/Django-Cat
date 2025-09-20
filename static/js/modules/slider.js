"use strict";

function slider({container, slide, nextArrow, prevArrow}) {
  const slider = document.querySelector(container),
        slides = document.querySelectorAll(slide),
        nextSlide = document.querySelector(nextArrow),
        indicators = [],
        indicatorsContainer = document.createElement('div'),
        prevSlide = document.querySelector(prevArrow);
  
  
  let curSlide = 0;
  let maxSlide = slides.length - 1;
   
  indicatorsContainer.classList.add('slider-indicators');

  for(let i = 0; i < slides.length; i++){
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    indicator.dataset.slide = i;

    indicators.push(indicator);
    indicatorsContainer.append(indicator);
  }

  slider.append(indicatorsContainer);
  renewSlider(indicators);
  
  nextSlide.addEventListener("click", () => {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
  
    renewSlider(indicators);
  });
  

  
  prevSlide.addEventListener("click", function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
  
    renewSlider(indicators);
  });
  
  
  Array.from(indicators).forEach((element, indx) => {
    element.addEventListener("click", function () {
      curSlide = indx;
      console.log(indx);
  
      renewSlider(indicators);
    });
  });
  

  function renewSlider(indicators) {
    Array.from(indicators).forEach((element) => {
      if(curSlide === Number(element.dataset.slide)) {
        element.style.background = "rgba(14, 220, 235)";
      } else {
        element.style.background = "rgba(166, 246, 252)";
      }
    });
    slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
    });
  }
}

export default slider;
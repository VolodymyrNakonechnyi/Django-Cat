/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./modules/forms.js":
/*!**************************!*\
  !*** ./modules/forms.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function forms(formsSelector) {
    const forms = document.querySelectorAll(formsSelector);
    const message = {
      loading: '/media/spinner.svg',
      success: 'Дякуємо, ми скоро з вами зв\'яжемось!',
      failure: 'Щось пішло не так...'
    };

    forms.forEach(item => {
      bindPostData(item);
    });
  
    function bindPostData(form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
  
        let statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        const messageStyle = `
        display: flex;
        margin: 20px auto;
        justify-content: center;
      `;

        statusMessage.style.cssText = messageStyle;
  
        form.append(statusMessage);
  
        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));
  
        const xhr = new XMLHttpRequest();
        xhr.open('POST', "/uk-ua/");
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('X-CSRFToken', document.querySelector('[name=csrfmiddlewaretoken]').value)

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            console.log(xhr.response);
            statusMessage.remove();
            statusMessage = document.createElement('div');
            statusMessage.style.cssText = messageStyle;
            statusMessage.textContent = message.success;
            form.append(statusMessage);
            form.reset()

            setTimeout(() => {
              statusMessage.remove()
            }, 5000);


          } else {
            console.log(message.failure);
            statusMessage.remove();
            statusMessage = document.createElement('div');
            statusMessage.style.cssText = messageStyle;
            statusMessage.textContent = message.failure;
            form.append(statusMessage);
            form.reset()

            setTimeout(() => {
              statusMessage.remove()
            }, 5000);

          }
        });
  
        xhr.addEventListener('error', () => {
          console.log(message.failure);
          setTimeout(() => {
            statusMessage.remove()
          }, 5000);
        });
        
        console.log(json)
        xhr.send(json);
      });
    }
  }
  
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);
  

/***/ }),

/***/ "./modules/slider.js":
/*!***************************!*\
  !*** ./modules/slider.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./scripts/main.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/slider */ "./modules/slider.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/forms */ "./modules/forms.js");




window.addEventListener('DOMContentLoaded', function() {
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_0__["default"])({
        container: '.winner-cats', 
        slide: '.winners__slide', 
        nextArrow: '.slider-btn-next', 
        prevArrow: '.slider-btn-prev'
    });

    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_1__["default"])('.form-container');
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
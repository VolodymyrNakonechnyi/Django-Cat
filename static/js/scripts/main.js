import slider from "../modules/slider";
import forms from "../modules/forms";


window.addEventListener('DOMContentLoaded', function() {
    slider({
        container: '.winner-cats', 
        slide: '.winners__slide', 
        nextArrow: '.slider-btn-next', 
        prevArrow: '.slider-btn-prev'
    });

    forms('.form-container');
})
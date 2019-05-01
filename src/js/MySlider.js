import '../scss/MySlider.scss';
import {Subject} from 'rxjs';
import crtEl from './createElement';

class MySlider {
  constructor(parent, slides = [], options = {}) {
    this.root = parent;
    this.slidesEl = [];
    this.slides = slides;

    this.curSlideIndex = 0;
    this.length = this.slides.length;

    this.width = options.width || '100%';
    this.height = options.height || '550px';

    this.isHorizontal = options.isHorizontal || false;

    this.isAuto = options.isAuto || false;
    this.speed = options.speed || 2500;
    this.forward = true;

    this.sliderLeftObserver = new Subject();
    this.sliderRightObserver = new Subject();
    
    this.init();
  }

  init() {
    
    // set dimentions of the main slider window
    this.setSliderSize();
    
    // create DOM element for each slide
    this.createSlideElements()
   
    // checking if slider is set in auto-rotate mode
    this.checkAutoPlay();
           
  }

  setSliderSize() {
    this.root.style.width = this.width;
    this.root.style.height = this.height;
  }

  createSlideElements() {

    const slideMoveClass = this.checkSliderDirection();

    this.slides.forEach((slide, index) => {
      this.slidesEl.push(crtEl({
        element: 'div',
        classNames: `${slideMoveClass[0]} slide slide${index + 1}`,
        parent: this.root
      }));
    });

    this.slidesEl[0].classList.remove(slideMoveClass[0]);

    // setup images as a background of each slide
    this.slidesEl.forEach((slideEl, index) => slideEl.style.backgroundImage = `url(${this.slides[index]})`);
  }

  checkSliderDirection() {    
    if(this.isHorizontal) return ['move-right', 'move-left'];    
    return ['move-up', 'move-down']
  }

  checkAutoPlay() {
    if (this.isAuto) { this.autoRotate() }
    else {

      const btnLeftEl = crtEl({
        element: 'div',
        classNames: 'btn-left',
        parent: this.root
      });

      const btnRightEl = crtEl({
        element: 'div',
        classNames: 'btn-right',
        parent: this.root
      });

      btnLeftEl.addEventListener('click', () => { this.previousSlide() });
      btnRightEl.addEventListener('click', () => { this.nextSlide() });
    }
  }

  previousSlide() {

    const sliderMoveClass = this.checkSliderDirection();

    if (this.curSlideIndex > 0) {
        const curSlide = this.slidesEl[this.curSlideIndex];
        const prvSlide = this.slidesEl[this.curSlideIndex - 1];
  
        this.curSlideIndex--;
        
        curSlide.classList.add(sliderMoveClass[0]);
        prvSlide.classList.remove(sliderMoveClass[1]);

        this.sliderRightObserver.next(this.curSlideIndex);
      }
    
  }

  nextSlide() {

    const sliderMoveClass = this.checkSliderDirection();

    if (this.curSlideIndex < this.length - 1) {
      const curSlide = this.slidesEl[this.curSlideIndex];
      const nextSlide = this.slidesEl[this.curSlideIndex + 1];

      this.curSlideIndex++;
      
      curSlide.classList.add(sliderMoveClass[1]);
      nextSlide.classList.remove(sliderMoveClass[0]);

      this.sliderLeftObserver.next(this.curSlideIndex);     

    }
  }

  autoRotate() {
    setInterval(() => {

      if (this.curSlideIndex === 0)
        this.forward = true;

      if (this.curSlideIndex === this.length - 1)
        this.forward = false;

      if (this.forward)
        this.nextSlide();
      else
        this.previousSlide();

    }, this.speed);
  }  
}

export default MySlider;
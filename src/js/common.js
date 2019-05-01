import MySlider from './MySlider.js';

window.onload = function () {

  new MySlider(slider1, [
    './asserts/img/1.jpg',
    './asserts/img/2.jpg',
    './asserts/img/3.jpg',
    './asserts/img/4.jpg'],
    {
      width: '100%',
      height: '450px',
      isAuto: true,
      isHorizontal: true
    });

 const s = new MySlider(slider2, [
    './asserts/img/1.jpg',
    './asserts/img/2.jpg',
    './asserts/img/3.jpg',
    './asserts/img/4.jpg'],
    {
      width: '50%',
      height: '450px',
      isAuto: true,
      isHorizontal: false
    });

  new MySlider(slider3, [
    './asserts/img/1.jpg',
    './asserts/img/2.jpg',
    './asserts/img/3.jpg',
    './asserts/img/4.jpg'],
    {
      width: '850px',
      height: '400px',
      isAuto: false,
      isHorizontal: true
    });

  new MySlider(slider4, [
    './asserts/img/1.jpg',
    './asserts/img/2.jpg',
    './asserts/img/3.jpg',
    './asserts/img/4.jpg'],
    {
      width: '100%',
      height: '500px',
      isAuto: false,
      isHorizontal: false
    });

  s.sliderLeftObserver.subscribe({
    next: v => {console.log('slide# ', v)}
  });

  s.sliderRightObserver.subscribe({
    next: v => {console.log('slide# ', v)}
  })
}

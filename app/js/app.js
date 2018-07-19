import Calendar from './Calendar';

const calendar = new Calendar().init();

const calendarIcon = document.querySelector('.calendar__icon');
const prodCalendar = document.querySelector('.prod-calendar');
calendarIcon.addEventListener('click', e => {
   prodCalendar.classList.toggle('prod-calendar--visible');
});

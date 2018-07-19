import Data from './Data';
import dataJson from './data.json';

const data = new Data();


export default class Calendar {
    constructor() {
        this.calendar = document.querySelector('.calendar__body');
        this.title = document.querySelector('.calendar__title');
        this.btn = [document.querySelector('.calendar__btn-prev'), document.querySelector('.calendar__btn-next')];
        this.months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        this.daysWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        this.todayDate = new Date();
    }

    getNameMonth(month) {
        return this.months[month];
    }

    updateTitle(event, currentMonth) {
        const indexNewMonthBtnPrev = currentMonth === 0 ? 11 : currentMonth - 1;
        const indexNewMonthBtnNext = currentMonth === 11 ? 0 : currentMonth + 1;
        const indexNewMonth = event.target.classList.contains('calendar__btn-prev') ? indexNewMonthBtnPrev : indexNewMonthBtnNext;
        this.todayDate.setMonth(indexNewMonth);
        this.updateTable();
    }

    init() {
        this.updateTable();
        for (let btn of this.btn) {
            btn.addEventListener('click', event => {
                this.updateTitle(event, this.currentMonth);
            })
        }
    }

    updateTable() {
        this.currentMonth = this.todayDate.getMonth();
        this.currentYear = this.todayDate.getFullYear();
        this.title.textContent = `${this.getNameMonth(this.currentMonth)} 2018`;
        this.createCalendar();
        data.updateData(this.currentMonth, dataJson);
        this.updateProdCalendar(this.currentMonth)
    }

    updateProdCalendar(month) {
        const daysSelected = document.querySelectorAll('.prod-calendar__day--selected');
        console.log(daysSelected);
            Array.from(daysSelected).reduce((acc, el, index, arr) => {
                el.textContent = dataJson.prodCalendar[month][index];
            }, null);
    }

    createCalendar() {
        const tbody = document.createElement('tbody');
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        tr.classList.add('calendar__tr');
        td.classList.add('calendar__td');
        tbody.appendChild(tr.cloneNode());

        let currentDayMonth = 1;
        let indexDayFirstWeek = 0;
        const getLastDay = () => {
            return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        };

        const getLastTableRow = tbody => {
            return tbody.children[tbody.children.length - 1]
        };

        const getIndexFirstDayWeek = () => {
            const date = new Date(this.currentYear, this.currentMonth, 1);
            return date.getDay() === 0 ? 6 : date.getDay() - 1;
        };

        const iter = (counter, acc) => {

            if (counter > getLastDay()) {
                return acc;
            }

            let currentTableRow = getLastTableRow(acc);

            if (currentTableRow.children.length < this.daysWeek.length) {
                const cloneTableData = td.cloneNode();
                for (let daySelected of dataJson.daysMonths[this.currentMonth]) {

                    if (daySelected === counter) {
                        cloneTableData.classList.add('calendar__td--select');
                        this.clickFunc = e => {
                            const indexDay = dataJson.daysMonths[this.currentMonth].indexOf(daySelected);

                            const allActiveTd = document.querySelectorAll('.calendar__td--active');

                            if (!cloneTableData.classList.contains(`calendar__td-${daySelected}--active`) && !cloneTableData.classList.contains(`calendar__td--active`)) {
                                data.filterData(this.currentMonth, indexDay, dataJson);
                                cloneTableData.classList.add(`calendar__td-${daySelected}--active`);
                                cloneTableData.classList.add(`calendar__td--active`);
                            }
                            else if (cloneTableData.classList.contains(`calendar__td-${daySelected}--active`) && !cloneTableData.classList.contains(`calendar__td--active`)) {
                                data.filterData(this.currentMonth, indexDay, dataJson);
                                cloneTableData.classList.add(`calendar__td-${daySelected}--active`);
                                cloneTableData.classList.add(`calendar__td--active`);

                            } else {
                                data.updateData(this.currentMonth, dataJson);
                                cloneTableData.classList.remove(`calendar__td-${daySelected}--active`);
                                cloneTableData.classList.remove(`calendar__td--active`);
                            }
                            for (let i = 0; i < allActiveTd.length; i++) {
                                allActiveTd[i].classList.remove(`calendar__td--active`);
                            }
                        };
                        cloneTableData.addEventListener('click', this.clickFunc);
                    }
                }
                if (currentTableRow === acc.children[0]) {
                    cloneTableData.textContent = getIndexFirstDayWeek() > indexDayFirstWeek++ ? ' ' : counter++;
                }
                else {
                    cloneTableData.textContent = counter++;
                }
                if (cloneTableData.classList.contains('calendar__td--select') && cloneTableData.textContent === ' ') {
                    cloneTableData.classList.remove('calendar__td--select');
                    cloneTableData.removeEventListener('click', this.clickFunc);
                }

                currentTableRow.appendChild(cloneTableData);
            }

            if (currentTableRow.children.length === this.daysWeek.length) {
                acc.appendChild(tr.cloneNode());
            }


            return iter(counter, acc);
        };

        this.calendar.replaceChild(iter(currentDayMonth, tbody), this.calendar.querySelector('tbody'));
    }
}


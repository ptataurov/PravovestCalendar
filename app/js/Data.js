export default class Data {
    constructor() {
        this.content = document.querySelector('.content__inner');
        // this.months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    }

    updateData(month, data) {
        this.content.innerHTML = '';

        const block = document.createElement('div');
        const title = document.createElement('h4');
        const list = document.createElement('ul');
        const item = document.createElement('li');

        block.classList.add('news');
        title.classList.add('news__title');
        list.classList.add('news__list');
        item.classList.add('news__item');

        const dataCurrentMonth = data.months[month];
        const dataDays = data.daysMonths[month];

        dataCurrentMonth.reduce((acc, day, index, arr) => {
            const cloneBlock = block.cloneNode();
            const cloneTitle = title.cloneNode();
            const cloneList = list.cloneNode();
            cloneTitle.textContent = `${day[0]}`;
            cloneBlock.appendChild(cloneTitle);

            day.reduce((acc, text, index) => {
                if (index === 0) {
                    return false
                }
                const cloneItem = item.cloneNode();
                cloneItem.textContent = text;
                cloneList.appendChild(cloneItem);
            }, cloneList);

            cloneBlock.appendChild(cloneList);

            this.content.appendChild(cloneBlock);

        }, null)
        // Разобраться
    }

    filterData(month, day, data) {

        const filteredData = data.months[month].filter((dataDay, index) => {
            if (index === day) {
                return true;
            }
            return false;
        });

        const newData = {
            months: [],
            daysMonths: data.daysMonths,
            prodCalendar: data.prodCalendar
        };

        for (let el of data.months) {
            newData.months.push(el);
        }

        newData.months[month] = filteredData;

        this.updateData(month, newData);
    }
}
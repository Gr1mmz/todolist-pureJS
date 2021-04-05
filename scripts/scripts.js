let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo'),
    time = document.querySelector('.time'),
    year = document.querySelector('.year');

let todoList = [];

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

addButton.addEventListener('click', function() {
    if (!addMessage.value) return;
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false,
    };

    todoList.push(newTodo);
    displayMessages();

    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = '';
});


function displayMessages() {
    let displayMessage = '';
    if (todoList.length === 0) todo.innerHTML = '';
    todoList.forEach(function(item, i){
        displayMessage += `
        <li>
            <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
            <label for='item_${i}' class='${item.important ? 'important' : ''}'>${item.todo}</label>
        </li>
        `;
        todo.innerHTML = displayMessage;
    });
};

todo.addEventListener('change', function(event) {
    let valueLabel = todo.querySelector('[for='+ event.target.getAttribute('id') + ']').innerHTML;
    todoList.forEach(function(item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        };
    });
});

todo.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    todoList.forEach(function(item, i) {
        if (item.todo === event.target.innerHTML) {
            if (event.ctrlKey || event.metaKey) {
                todoList.splice(i, 1);
            } else {
                item.important = !item.important;
            }
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

function getTime() {
    var currentDate = new Date(),
        Hours = (currentDate.getHours() < 10 ? '0' + currentDate.getHours() : currentDate.getHours()),
        Minutes = (currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes()),
        Seconds = (currentDate.getSeconds() < 10 ? '0' + currentDate.getSeconds() : currentDate.getSeconds());
    time.innerHTML = `${Hours}:${Minutes}:${Seconds}`;
};

function getYear() {
    var currentDate = new Date(),
        Year = currentDate.getFullYear(),
        Month = currentDate.getMonth(),
        Day = currentDate.getDate();
    switch (Month) {
        case 0: Month="января"; break;
        case 1: Month="февраля"; break;
        case 2: Month="марта"; break;
        case 3: Month="апреля"; break;
        case 4: Month="мая"; break;
        case 5: Month="июня"; break;
        case 6: Month="июля"; break;
        case 7: Month="августа"; break;
        case 8: Month="сентября"; break;
        case 9: Month="октября"; break;
        case 10: Month="ноября"; break;
        case 11: Month="декабря"; break;
    };
    year.innerHTML = `${Day} ${Month} ${Year}`
};

getTime();
setInterval(getTime, 1000);

getYear();
setInterval(getYear, 10000);


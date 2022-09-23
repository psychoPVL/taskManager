//****добавление новой задачи

//ищем форму по ID
const form = document.querySelector('#addForm');

//ищем список задачь по ID для добавления нового элемента и для удаления и для поиска
const itemList = document.querySelector('#items');

//отслеживаем событие отправка формы (submit)
form.addEventListener('submit', addItem);

//функция добавления новой задачи
function addItem(e) {
    //отменяем отправку формы
    e.preventDefault();

    //прослушиваем инпут
    const inputForm = document.querySelector('#newItemText');
    //получаем текст инпута и записываем в переменную
    const itemText = inputForm.value;
    if (inputForm.value === '') {
        return false;
    }

    //создаем элемиент для новой задачи

    //создаем элемент li
    const newLi = document.createElement('li');
    //добавляем класс в li
    newLi.className = 'list-group-item';
    //добавляем текст который получили в инпуте
    const newTextNode = document.createTextNode(itemText);
    //соединяем текст с новым элементом
    newLi.appendChild(newTextNode);

    //создаем кнопку удалить

    //создаем кнопку по тегу <button>
    const btnDelete = document.createElement('button');
    //добавляем в кнопку текст
    btnDelete.appendChild(document.createTextNode('Удалить'));
    //добавляем класс для кнопки
    btnDelete.className = 'btn btn-light btn-sm float-right';
    //добавляем data атрибут
    btnDelete.dataset.action = 'delete';

    //добавляем кнопку внутрь тега li
    newLi.appendChild(btnDelete);

    //добавляем новую задачу в список со всеми задачами
    itemList.prepend(newLi);

    //очистить инпут после отправки формы
    inputForm.value = '';
}

//****удаление элементов задачи

//прослушка по клику всего списка
itemList.addEventListener('click', deleteItem);

//функция удаления элемента
function deleteItem(e) {
    if (e.target.getAttribute('data-action') == 'delete' && e.target.hasAttribute('data-action')) {
        if (confirm('удалить?')) {
            e.target.parentElement.remove();
        }
    }
}

//****Поиск по списку

//ищем инпут по ID
const search = document.querySelector('#filter');

//прослушка события при отпускании клавиши
search.addEventListener('keyup', filterItems);

//функция поиска по списку
function filterItems(e) {
    //получаем фразу для поиска и переводим ее в нижний регистр
    const searchText = e.target.value.toLowerCase();

    //получаем список всех задачь
    const items = itemList.querySelectorAll('li');
    //перебираем циклом все найденые теги li с задачами
    items.forEach((item) => {
        //получаем текст задачи из списка и переводим в нижний регистр
        const itemText = item.firstChild.textContent.toLowerCase();
        //проверяем если вводимый текст не -1(null)
        if (itemText.indexOf(searchText) != -1) {
            //показываем елемент
            item.style.display = 'block';
        } else {
            //скрываем элемент
            item.style.display = 'none';
        }
    });
}

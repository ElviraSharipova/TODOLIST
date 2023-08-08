(function() {

    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.textContent = title;
        return appTitle;

    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');



        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';
        button.disabled = true; // скрываем кнопку



        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,

        };
    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }


    function createTodoItem(name, done = false) {

        let item = document.createElement('li');


        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');


        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';


        //doneButton.disabled = done; //задаем кнопке полученное значение
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';


        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);


        return {
            item,
            doneButton,
            deleteButton,

        };


    }


    function createTodoApp(container, title = 'To-do list', todoArray = []) {


        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        let clearLSButton = document.createElement('button');
        clearLSButton.classList.add('btn', 'btn-danger', 'my-sm-3');
        clearLSButton.textContent = 'Очистить локальное хранилище';
        container.append(clearLSButton);
        container.append(todoAppTitle);

        container.append(todoItemForm.form);
        container.append(todoList);

        clearLSButton.addEventListener('click', function() {
            if (confirm('Are you sure?')) {
                localStorage.clear();
            }
        })

        //выгружаем все из localStorage по ключу 
        if (todoArray != null) {
            for (var i = 0; i < todoArray.length; i++) {
                // const todoItem = createTodoItem(todoArray[i].name, todoArray[i].done)
                addToDoItem(todoArray[i].name, todoArray[i].done, todoArray[i].id);
                // todoList.append(todoItem.item);
            }
        } else {

            todoArray = [];

        }


        todoItemForm.input.addEventListener('input', function() { //при вводе кнопка работает если ввод не пустой

            if (todoItemForm.input.value === '') {
                todoItemForm.button.disabled = true;
            } else {
                todoItemForm.button.disabled = false;
            }

        });


        //отдельная функция для создания дела

        function addToDoItemToLS(task, id) {
            todoArray.push({ "name": task, "done": false, "id": id });
            localStorage.setItem(title, JSON.stringify(todoArray))
        }

        function removeToDoItemFromLS() {

        }

        function addToDoItem(task, done = false, id) {
            let todoItem = createTodoItem(task, done);
            //если дело по умолчанию выполнено, то закрасить
            if (done == true) {
                todoItem.item.classList.toggle('list-group-item-success');
            }
            todoItem.doneButton.addEventListener('click', function() {
                todoItem.item.classList.toggle('list-group-item-success');
                //перебор для поиска элемента в массиве 
                for (var i = 0; i < todoArray.length; i++) {
                    if (todoArray[i].id == id) {
                        todoArray[i].done = !todoArray[i].done; //меняем done на противоположный
                    }
                    localStorage.setItem(title, JSON.stringify(todoArray)) //обновляем LS

                }
            });


            todoItem.deleteButton.addEventListener('click', function() {
                if (confirm('Are you sure?')) {
                    todoItem.item.remove();
                }
                let idForDelete;
                for (var i = 0; i < todoArray.length; i++) { //перебор для поиска индека элемента
                    if (todoArray[i].id == id) {
                        idForDelete = i;
                    }
                    todoArray = todoArray.filter(item => item.id != id);; //удаление из массива по индексу 
                    localStorage.setItem(title, JSON.stringify(todoArray)) //обновляем LS

                }
            });

            todoList.append(todoItem.item);

            //сохраняем обновленный список в  localStorage

            // todoArray.push({ "name": task, "done": done });
            //localStorage.setItem(title, JSON.stringify(todoArray))


        }


        todoItemForm.form.addEventListener('submit', function(e) {

            e.preventDefault();

            if (!todoItemForm.input.value) {

                return;
            }

            //генерируем id 
            let id = Math.random() * 1000;

            //вызываем функцию для создания дела и отправляем в нее значение input
            addToDoItem(todoItemForm.input.value, done = false, id)
            addToDoItemToLS(todoItemForm.input.value, id);


            todoItemForm.input.value = '';
            todoItemForm.button.disabled = true; //скрываем кнопку после добавления пункта
        });





    }







    window.createTodoApp = createTodoApp;



})();
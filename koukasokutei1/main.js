(function () {
    const todoList = document.getElementById('todo-list');
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');

    
    // Todoのリストを保持する
    let todos = [];

    function loadTodos() {
        const saved = localStorage.getItem('todos');
        if (saved) {
            try {
                todos = JSON.parse(saved);
                todos.forEach(todo => addTodoToList(todo));
            } catch (error) {
                alert('保存データの読み込みに失敗しました');
            }
        } else {
            fetch('todos.json')
                .then(response => {
                    if (!response.ok) throw new Error('JSONファイルの読み込み失敗');
                    return response.json();
                })
                .then(data => {
                    todos = data;
                    todos.forEach(todo => addTodoToList(todo));
                    saveTodos();
                })
                .catch(error => {
                    alert('タスクの初期読み込みエラー: ' + error.message);
                });
        }
    }
// タスクの保存
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
// タスク追加
    function addTodoToList(task) {
        const li = document.createElement('li');
        li.textContent = task;
        todoList.appendChild(li);
    }
// フォーム送信時の処理
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const task = input.value.trim();
        if (!task) return;

        todos.push(task);
        saveTodos();
        addTodoToList(task);
        input.value = '';
    });
    loadTodos();
})();

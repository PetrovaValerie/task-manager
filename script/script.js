const addTaskBtn = document.getElementById('add-btn');
const showAllBtn = document.getElementById('show-all');
const showCompletedBtn = document.getElementById('show-completed');
const deleteAllTasksBtn = document.querySelector('.btn_del-all');
const deleteLastTaskBtn = document.querySelector('.btn_del-last');
const todosContainer = document.querySelector('.tasks');
const liTagItems = todosContainer.getElementsByTagName("li");
const deskTaskInput = document.getElementById('description-task');
const searchTask = document.getElementById('search-task');
const allRemainingTasks = document.querySelector('.remain-list-count');
const allCompletedTasks = document.querySelector('.completed-list-count');
let taskList;
// from localStorage
!localStorage.taskList ? taskList = [] : taskList = JSON.parse(localStorage.getItem('taskList'));
let todoItemElems = [];
// constr-func
function Task(description) {
	this.description = description;
	this.completed = false;
}
// returns task template
const createTemplate = (task, index) => {
	return `
		<li class="item ${task.completed ? 'checked' : ''}">
			<input onclick = "completeTask(${index})" class="btn-complete checkbox" type = "checkbox" ${task.completed ? 'checked' : '' }>
			<p class="description">${task.description}</p>
			<div class="aside">
				<button onclick = "deleteTask(${index})" class="close-btn"></button>
				<div class="date" id="dateDisplay"></div>
			</div>
		</li>
			`
}
// filtered array
	const filterTasks = () => {
	const activeTasks = taskList.length && taskList.filter(item => item.completed === false);
	const completedTasks = taskList.length && taskList.filter(item => item.completed === true);
	taskList = [...activeTasks,...completedTasks];
}
// adding li-item to ul
const fillHtmlList = () => {
	todosContainer.innerHTML = "";
	if (taskList.length > 0) {
			filterTasks();
			taskList.forEach((item, index) => {
				todosContainer.innerHTML += createTemplate(item, index);
			});
			todoItemElems = document.querySelectorAll('.item');
	}
	// counter for all tasks
	let allTasks = taskList.length;
	allRemainingTasks.innerHTML = "All: " + `${allTasks}`;
	// counter for completed
	const taskCheck = document.getElementsByClassName('checked');
	let checkedNumb = taskCheck.length;
	allCompletedTasks.innerHTML = "Completed: " + `${checkedNumb}`;
}
// show completed btn
showCompletedBtn.addEventListener('click', () => {
	let a = document.getElementsByClassName('checked');
		for (let i = 0; i < todosContainer.children.length; i++) {
			todoItemElems[i].classList.add('none');
		}
		for (let i of a) {
		i.classList.add('new');
		i.classList.remove('none');
		}
});
// show all tasks btn
showAllBtn.addEventListener('click', () => {
	for (let i of todosContainer.children) {
		i.classList.remove('none');
	}
});
// to localStorage
const updateLocal = () => {
	localStorage.setItem('taskList', JSON.stringify(taskList));
}
// create new task
addTaskBtn.addEventListener('click', () => {
	taskList.push(new Task(deskTaskInput.value));
	updateLocal();
	fillHtmlList();
	deskTaskInput.value = '';
});
// create new task by pressing enter key
deskTaskInput.addEventListener("keypress", (event)=> {
	if (event.keyCode === 13) {
		event.preventDefault();
		taskList.push(new Task(deskTaskInput.value));
		updateLocal();
		fillHtmlList();
		deskTaskInput.value = '';
	}
});
// completed task turns grey
const completeTask = index => {
	taskList[index].completed = !taskList[index].completed;
	if(taskList[index].completed) {
		todoItemElems[index].classList.add('checked');
		todoItemElems[index].classList.remove('none');
	} else {
		todoItemElems[index].classList.remove('checked');
	}
	updateLocal();
	fillHtmlList();
}
// search task
function searchInList() {
	let filter = searchTask.value.toUpperCase();
	for (let i = 0; i < liTagItems.length; i++) {
		let p = liTagItems[i].getElementsByTagName("p")[0];
		let taskText = p.textContent || p.innerText;

		if (taskText.toUpperCase().indexOf(filter) > -1) {
			liTagItems[i].style.display = "";
		} else {
			liTagItems[i].style.display = "none";
		}
	}
}
// delete certain task
const deleteTask = (index) => {
	todoItemElems[index].classList.add('deletion');
	updateLocal();
	fillHtmlList();
	setTimeout(() => {
		taskList.splice(index, 1);
		updateLocal();
		fillHtmlList();
	}, 200)
};
// delete all tasks
deleteAllTasksBtn.addEventListener('click', (e) => {
	while(todosContainer.firstChild){
		todosContainer.firstChild.remove();
	}
	//clearing local storage
	localStorage.clear();
});
updateLocal();
fillHtmlList();
// delete last task
 deleteLastTaskBtn.addEventListener('click', () => {
	 let newList = taskList.pop();
	 updateLocal();
	 fillHtmlList();
 });




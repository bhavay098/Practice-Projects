let btn = document.querySelector('#addbtn');   // getting access of the add button
let input = document.querySelector('input');   // getting access of user input
let taskList = document.querySelector('#task-list');   // getting access of the ordered task list

btn.addEventListener('click', function () {   // adding event listner on the add button
    let inputValue = input.value.trim()

    if (inputValue === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement('li')   // creating li everytime user clicks on button
        li.textContent = inputValue;   // inserting the user input into li
        taskList.appendChild(li)   // adding li into the ordered list


        let dltbtn = document.createElement('button');   // creating delete button to delete the task
        dltbtn.className = 'dlt-btn'   // adding class attribute to delete button
        dltbtn.textContent = 'Delete';   // adding text inside the delete button
        li.appendChild(dltbtn)   // inserting the delete button inside li
        dltbtn.addEventListener('click', function () {
            li.remove()     // clicking on delete button will remove the task
            saveData()   // updating the localStorage after deleting task
        })


        saveData();  // saving the data in local storage after clicking add button
        input.value = ''   // clears input box after adding task
    }
})

function saveData() {   // saving the data(tasks) so we don't lose it after refresh
    localStorage.setItem('data', taskList.innerHTML);
}

window.addEventListener('load', function () {   // Adding a function to retrieve the saved tasks from localStorage when the page is refreshed.
    taskList.innerHTML = localStorage.getItem('data') ?? ''
})

taskList.addEventListener('click', function (e) {  // Attaching listener to the parent container (taskList).
    if (e.target.classList.contains('dlt-btn')) {  // Checks whether the clicked element (e.target) has a class called 'dlt-btn' (delete button class).
        e.target.parentElement.remove();   // removes the button's parent (the <li> task)
        saveData();   // Update localStorage
    }
    else if(e.target.tagName === 'LI'){   // checks weather the user has clicked on li. if yes then it will be marked checked
            e.target.classList.toggle('checked')  // .toggle() method is used with classList to add a class if it’s not present and remove it if it is.
            saveData();
    }
})
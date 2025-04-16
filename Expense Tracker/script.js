let description = document.querySelector('#description');  // getting access of descripttion input
let amount = document.querySelector('#amount');  // getting access of amount input
let addBtn = document.querySelector('#addBtn');  // getting access of add button
let expenseList = document.querySelector('#expenseList');  // getting access of expense list (ul)
let totalExpense = document.querySelector('#totalExpense');  // getting access of total expense
let expenseArr = [];  // storing expenses in empty array for sum calculation


addBtn.addEventListener('click', function () {  // adding event listener on add button
    let descriptionValue = description.value.trim()  // getting input value of description
    let amountValue = amount.value.trim()  // getting input value of amount and trimming extra spaces which returns a string

    if (descriptionValue === "" || amountValue === "") {  // condition check for empty inputs. amountValue is still a string
        alert('Please enter valid description and amount!')
        return;  // exiting the function
    }

    amountValue = Number(amountValue);  // converting amountValue from string to number
    amountValue = Number(amountValue.toFixed(2));  // using toFixed() for 2 decimal places & using Number() to again convert it to number as toFixed returns a string

    if (isNaN(amountValue) || amountValue <= 0) {  // condition check for invalid or negative numbers
        alert('Amount must be a positive number!')
        return;  // exiting the function
    }

    let li = document.createElement('li');  // creating li element
    li.innerText = `${descriptionValue} - $${amountValue}`  // updating text content of li
    let dltBtn = document.createElement('button')  // creating delete button
    dltBtn.innerText = 'Delete'  // adding text content into delete button
    dltBtn.classList.add('dltBtn')  // adding dltBtn class to delete button
    li.appendChild(dltBtn);  // adding delet buton inside li
    expenseList.appendChild(li);  // adding li into expense list (ul)

    expenseArr.push(amountValue);  // adding the expense amount in the expense array for sum calculation

    updateTotal();  // calling updateTotal func to calculate the sum of expenses and displaying it

    description.value = ""  // clearing both the input fields after adding an expense
    amount.value = ""

    saveExpenseList();  // saving the expenses list in local storage
    saveExpenseArr();  // saving the expenses array in local storage
})



function updateTotal() {  // creating function for updating total sum expense to be used many times
    let total = expenseArr.reduce((acc, exp) => {
        return acc + exp
    }, 0)
    totalExpense.innerText = `Total: $${total.toFixed(2)}`;  // displaying the sum and using toFixed to display sum upto two decimals
}

function saveExpenseList() {  // creating function for saving the added expenses in local storage.
    localStorage.setItem('expenseList', expenseList.innerHTML);
}

function saveExpenseArr() {  // creating function for saving the expense array in local storage.
    localStorage.setItem('expenseArr', JSON.stringify(expenseArr))  // using JSON.stringify to convert the array into string as local storage only stores data as string
}


window.addEventListener('load', function () {  // adding event listner on window when it reloads
    expenseArr = JSON.parse(localStorage.getItem('expenseArr')) || [];  // retreaving expenses on page reload. if it's empty then empty array will be returned. using JSON.parse to convert it back to array
    expenseList.innerHTML = localStorage.getItem('expenseList') || "";  // Restore expense list on page reload from local storage and displaying it
    updateTotal();  // Restore total on page load
})


expenseList.addEventListener('click', function (e) {
    if (e.target.classList.contains('dltBtn')) {
        let li = e.target.parentElement;  // declaring li as the parent element of delete btn
        let amountText = li.innerText.split('$')[1];  // extracting the amount as an array
        let amountValue = parseFloat(amountText);  // converting amount into Number which was an array

        li.remove();  // deleting li

        let index = expenseArr.indexOf(amountValue)  // finding index of the amount we wanna delete from expense array

        if (index !== -1) {  // condition check to ensure that the value is present in the array. indexOf() returns -1 if the value isn’t found.
            expenseArr.splice(index, 1);  // remove the specific amount
        }
        updateTotal();  // updating the sum and displaying it
        saveExpenseArr();  // saving the updated expense array in local storage
        saveExpenseList();  // saving the updated expense list in local storage
    }
})
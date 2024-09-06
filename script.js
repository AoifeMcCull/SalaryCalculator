
const employeeArray = [] //this array will store submitted employee objects

/*
sample Employee object: 
{
firstName: 'foo'
lastName: 'bar'
employeeID: 901925
title: 'king of the world'
annualSalary: 91570912579

}

*/

//add a new employee to the table and array
function submitEmployee(){
    console.group()
    let emplTable = document.getElementById("employeeTable")

    //construct a new Employee object
    let newEmployee = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        employeeID: Number(document.getElementById("idNum").value),
        title: document.getElementById("employeeTitle").value,
        annualSalary: Number(document.getElementById("annualSalary").value)
    }

    //add newEmployee to html table
    emplTable.innerHTML +=
        `<tr>
            <td>${newEmployee.firstName}</td>
            <td>${newEmployee.lastName}</td>
            <td>${newEmployee.employeeID}</td>
            <td>${newEmployee.title}</td>
            <td>${newEmployee.annualSalary}</td>
            <td><button onClick="deleteEmployee(${newEmployee.employeeID}, event)">Delete</button> </td>
        </tr>`
    
    //add newEmployee to employeeArray
    employeeArray.push(newEmployee)
    //update Total Monthly
    updateTotal()
    //clear form boxes
    clearInputs()

    console.groupEnd()
    //console.table(employeeArray)
    //for checking for problems in the employeeArray
}


function clearInputs(){
    let form = document.getElementById("employeeForm")
    form.reset() //this is a builtin
}

function updateTotal(){
    let costTotal = document.getElementById("monthlyCostTotal")
    let addedAnnualSalaries = 0

    for(let emp of employeeArray){
        addedAnnualSalaries += emp.annualSalary
    }
    console.log(`Total annual salaries are ${addedAnnualSalaries}`)

    let addedMonthlySalaries = (addedAnnualSalaries / 12).toFixed(2) //toFixed truncates to 2 decimals
    //presumably here any value smaller than a cent gets transferred to my bank account
    //like the guys in office space
    console.log(`Total monthly wage costs are ${addedMonthlySalaries}`)

    costTotal.innerHTML = `\$${addedMonthlySalaries}`

    checkBudget(addedMonthlySalaries)
}

function checkBudget(monthlyCost){
    let footer = document.getElementById("foot")
    if(monthlyCost > 20000 && !footer.classList.contains("over-budget")){
        footer.classList.add("over-budget")
    }
    else if(monthlyCost <= 20000 && footer.classList.contains("over-budget")){
        footer.classList.remove("over-budget")
    }
}

function deleteEmployee(employeeID, event){ //THIS FUNCTION ASSUMES EMPLOYEE IDS ARE UNIQUE
    console.log(`deleting employee with ID ${employeeID}`)

    //remove the employee from the html table
    let parentRow = event.target.parentElement.parentElement
    parentRow.remove()

    //remove the employee from the employeeArray
    for(let index=0; index < employeeArray.length; index++){
        if(employeeArray[index].employeeID === employeeID){
            employeeArray.splice(index, 1)
        }
    }
    updateTotal()
}

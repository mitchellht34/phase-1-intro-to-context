// Your code here
function createEmployeeRecord(array){
    const newEmployee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return newEmployee;
}

function createEmployeeRecords(array){
    const newArray = [];
    array.forEach((element) => {
        newArray.push(createEmployeeRecord(element));
    })
    return newArray;
}

function createTimeInEvent(employee, dateTime){
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateTime.slice(11, 15), 10),
        date: dateTime.slice(0, 10)
    })
    return employee;
}

function createTimeOutEvent(employee, dateTime){
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateTime.slice(11, 15), 10),
        date: dateTime.slice(0, 10)
    })
    return employee;
}

function hoursWorkedOnDate(employee, targetDate){
    let hours = 0;
    for(let i = 0; i < employee.timeOutEvents.length; i++){
        if(employee.timeOutEvents[i].date === targetDate){
            hours = (employee.timeOutEvents[i].hour - employee.timeInEvents[i].hour) / 100;
        }
    }
    return hours;
}

function wagesEarnedOnDate(employee, targetDate){
    return hoursWorkedOnDate(employee, targetDate) * employee.payPerHour;
}

function allWagesFor(employee){
    const dates = [];
    let total = 0;
    for(let i = 0; i < employee.timeOutEvents.length; i++){
        dates.push(employee.timeOutEvents[i].date);
    }
    for(let j = 0; j < dates.length; j++){
        total += wagesEarnedOnDate(employee, dates[j]);
    }
    return total;
}

function calculatePayroll(employees){
    let payroll = 0;
    for(const employee of employees){
        payroll += allWagesFor(employee);
    }
    return payroll;
}
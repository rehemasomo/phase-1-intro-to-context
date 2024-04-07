// Your code here
// Helper function to calculate hours worked between two timestamps
function calculateHoursWorked(timeIn, timeOut) {
    const timeInHour = parseInt(timeIn.slice(-4, -2));
    const timeOutHour = parseInt(timeOut.slice(-4, -2));
    return timeOutHour - timeInHour;
}

// Function to create an employee record
function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create employee records from an array of arrays
function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
}

// Function to record clock-in time for an employee
function createTimeInEvent(employeeRecord, timestamp) {
    const [date, hour] = timestamp.split(' ');
    employeeRecord.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour), date });
    return employeeRecord;
}

// Function to record clock-out time for an employee
function createTimeOutEvent(employeeRecord, timestamp) {
    const [date, hour] = timestamp.split(' ');
    employeeRecord.timeOutEvents.push({ type: "TimeOut", hour: parseInt(hour), date });
    return employeeRecord;
}

// Function to calculate hours worked by an employee on a specific date
function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    if (!timeInEvent || !timeOutEvent) {
        throw new Error("Missing clock-in or clock-out time for the given date.");
    }
    return calculateHoursWorked(timeInEvent.hour, timeOutEvent.hour);
}

// Function to calculate wages earned by an employee on a specific date
function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
}

// Function to calculate total wages earned by an employee for all dates worked
function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employeeRecord, date), 0);
}

// Function to calculate total payroll for all employees for all dates
function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}

module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll
};



/*
Errors corrected from the original PDF:

Error 1 (grade.html, Line 19):
onsubmit did not return the function result properly.

Error 2 (grade.js, Line 5):
Assignment operator = was used instead of comparison ==.

Error 3 (grade.js, Line 9):
isNan was written incorrectly. Correct spelling is isNaN.

Error 4 (grade.js, Line 14):
The range condition used && instead of ||.

Error 5 (grade.js, Line 28):
getElementByID was incorrect. Correct spelling is getElementById.

Error 6 (grade.js, Line 30):
colour was incorrect. Correct property is color.

Error 7 (grade.js, Line 34):
showtable was inconsistent with showTable.

Error 8 (grade.js, Line 38):
Loop started at 1 instead of 0, causing the A grade row to be skipped.

Error 9 (grade.js, Line 42):
innerHtml was incorrect. Correct spelling is innerHTML.
*/

// Check student's mark
function checkMark() {

    // Get name and mark
    let name = document.forms["gradeForm"]["name"].value;
    let mark = document.forms["gradeForm"]["mark"].value;

    // Validate empty name
    if (name == "") {
        alert("Name must be filled out.");
        return false;
    }

    // Validate empty mark
    if (mark == "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Validate numeric mark
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    // Convert mark to integer
    mark = parseInt(mark);

    // Validate mark range
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Determine grade
    let grade;

    if (mark >= 80) {
        grade = "A";
    } else if (mark >= 65) {
        grade = "B";
    } else if (mark >= 50) {
        grade = "C";
    } else {
        grade = "F";
    }

    // Display result
    document.getElementById("result").innerHTML =
        name + " got grade " + grade;

    // Change result colour according to grade
    if (grade == "A" || grade == "B") {
        document.getElementById("result").style.color = "green";
    } else if (grade == "C") {
        document.getElementById("result").style.color = "orange";
    } else {
        document.getElementById("result").style.color = "red";
    }

    // Display date and time
    document.getElementById("checkTime").innerHTML =
        "Checked on: " + Date();

    return false;
}

// Display grade table
function showTable() {

    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];

    let tableHTML = "<table>";

    // Table heading
    tableHTML += "<tr><th>Grade</th><th>Mark Range</th></tr>";

    // Loop through all grades
    for (let i = 0; i < grades.length; i++) {

        tableHTML +=
            "<tr><td>" + grades[i] +
            "</td><td>" + ranges[i] +
            "</td></tr>";

    }

    tableHTML += "</table>";

    // Display table
    document.getElementById("tableContainer").innerHTML = tableHTML;

}

// Generate random mark from 0 to 100
function randomMark() {

    let random = Math.floor(Math.random() * 101);

    document.getElementById("mark").value = random;

}

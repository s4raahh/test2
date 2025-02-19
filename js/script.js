let editingRow = null; // Track the row being edited

document.getElementById("ic").addEventListener("input", function () {
    let ic = this.value.trim();

    if (ic.length >= 6) { 
        document.getElementById("age").value = getAgeFromIC(ic);
    }
    
    if (ic.length >= 8) { 
        document.getElementById("state").value = getStateFromIC(ic);
    }
    
    if (ic.length >= 7) { 
        document.getElementById("gender").value = getGenderFromIC(ic);
    }
});

document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh

    let name = document.getElementById("name").value;
    let ic = document.getElementById("ic").value;
    let address = document.getElementById("address").value;
    let gender = document.getElementById("gender").value;
    let state = document.getElementById("state").value;
    let age = document.getElementById("age").value;

    if (!name || !ic || !address || !gender || !state || !age) {
        alert("Please fill in all fields!");
        return;
    }

    let table = document.getElementById("dataTable");

    if (editingRow) {
        // Update existing row instead of creating a new one
        editingRow.cells[0].innerText = name;
        editingRow.cells[1].innerText = ic;
        editingRow.cells[2].innerText = address;
        editingRow.cells[3].innerText = gender;
        editingRow.cells[4].innerText = state;
        editingRow.cells[5].innerText = age;

        editingRow = null; // Reset editing row tracker
    } else {
        let newRow = table.insertRow();

        newRow.insertCell(0).innerText = name;
        newRow.insertCell(1).innerText = ic;
        newRow.insertCell(2).innerText = address;
        newRow.insertCell(3).innerText = gender;
        newRow.insertCell(4).innerText = state;
        newRow.insertCell(5).innerText = age;

        // Create Edit Button
        let editCell = newRow.insertCell(6);
        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.style.background = "blue";
        editButton.style.color = "white";
        editButton.style.border = "none";
        editButton.style.padding = "5px 10px";
        editButton.style.cursor = "pointer";

        editButton.onclick = function () {
            document.getElementById("name").value = newRow.cells[0].innerText;
            document.getElementById("ic").value = newRow.cells[1].innerText;
            document.getElementById("address").value = newRow.cells[2].innerText;

            let ic = newRow.cells[1].innerText;
            document.getElementById("gender").value = getGenderFromIC(ic);
            document.getElementById("state").value = getStateFromIC(ic);
            document.getElementById("age").value = getAgeFromIC(ic);

            editingRow = newRow; // Store row to be replaced
        };
        editCell.appendChild(editButton);

        // Create Delete Button
        let deleteCell = newRow.insertCell(7);
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.style.background = "red";
        deleteButton.style.color = "white";
        deleteButton.style.border = "none";
        deleteButton.style.padding = "5px 10px";
        deleteButton.style.cursor = "pointer";

        deleteButton.onclick = function () {
            table.deleteRow(newRow.rowIndex - 1);
        };
        deleteCell.appendChild(deleteButton);

    }

    // Clear the form
    document.getElementById("userForm").reset();
});

// Function to extract gender from IC number
function getGenderFromIC(ic) {
    if (ic.length < 12) return "";
    let genderDigit = parseInt(ic.charAt(11));
    return (genderDigit % 2 === 0) ? "Female" : "Male";
}

// Function to extract state from IC number
function getStateFromIC(ic) {
    if (ic.length < 12) return "";
    let stateCode = ic.slice(6, 8);
    const stateMap = {
        "01": "Johor", "02": "Kedah", "03": "Kelantan", "04": "Melaka",
        "05": "Negeri Sembilan", "06": "Pahang", "07": "Pulau Pinang", "08": "Perak",
        "09": "Perlis", "10": "Selangor", "11": "Terengganu", "12": "Sabah",
        "13": "Sarawak", "14": "Wilayah Persekutuan Kuala Lumpur",
        "15": "Wilayah Persekutuan Labuan", "16": "Wilayah Persekutuan Putrajaya"
    };
    return stateMap[stateCode] || "Unknown";
}

// Function to calculate age based on IC number
function getAgeFromIC(ic) {
    if (ic.length < 12) return "";
    let birthDate = ic.slice(0, 5);
    let year = parseInt(birthDate.slice(0, 2));
    let month = parseInt(birthDate.slice(2, 4));
    let day = parseInt(birthDate.slice(4, 6));

    year += (year > 50) ? 1900 : 2000;
    let dob = new Date(year, month - 1, day);
    let today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    let m = today.getMonth() - dob.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    return age;
}

document.addEventListener("DOMContentLoaded", () => {
    const employeeForm = document.getElementById("employee-form");
    const nameInput = document.getElementById("name");
    const professionInput = document.getElementById("profession");
    const ageInput = document.getElementById("age");
    const errorMessageDiv = document.getElementById("error-message");
    const successMessageDiv = document.getElementById("success-message");
    const employeeListDiv = document.getElementById("employee-list");

    let employees = [];
    let currentId = 1;

    employeeForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Clear previous messages
        errorMessageDiv.textContent = "";
        successMessageDiv.textContent = "";

        // Validate fields
        if (nameInput.value === "" || professionInput.value === "" || ageInput.value === "") {
            errorMessageDiv.textContent = "All fields are required!";
            return;
        }

        // Create new employee object
        const newEmployee = {
            id: currentId,
            name: nameInput.value,
            profession: professionInput.value,
            age: parseInt(ageInput.value),
        };

        // Add employee to the array
        employees.push(newEmployee);
        currentId++; // Increment ID for the next employee

        // Display success message
        successMessageDiv.textContent = `Employee ${newEmployee.name} added successfully!`;

        // Clear form inputs
        nameInput.value = "";
        professionInput.value = "";
        ageInput.value = "";

        // Update employee list
        renderEmployeeList();
    });

    function renderEmployeeList() {
        employeeListDiv.innerHTML = ""; // Clear the current list

        if (employees.length === 0) {
            employeeListDiv.innerHTML = "<p>No employees added.</p>";
            return;
        }

        employees.forEach((employee) => {
            const employeeItem = document.createElement("div");
            employeeItem.classList.add("employee-item");

            employeeItem.innerHTML = `
                <span>${employee.name} - ${employee.profession} - Age: ${employee.age}</span>
                <button class="delete-btn" data-id="${employee.id}">Delete User</button>
            `;

            // Add delete button functionality
            const deleteButton = employeeItem.querySelector(".delete-btn");
            deleteButton.addEventListener("click", () => deleteEmployee(employee.id));

            employeeListDiv.appendChild(employeeItem);
        });
    }

    function deleteEmployee(id) {
        // Remove employee from array
        employees = employees.filter(employee => employee.id !== id);

        // Re-render employee list
        renderEmployeeList();
    }

    // Initial rendering of employee list
    renderEmployeeList();
});

class EmployeeBuilder {
    value = "";
    constructor(option) {
        this.generate(option)
    }

    generate(optionsObj) {
        if (optionsObj.action === "View all employees") {
            console.log("Happy Days");   
        } else if (optionsObj.action ==="Find all artists who appear more than once") {
            console.log("Number 2");
        }
    }
}

module.exports = EmployeeBuilder
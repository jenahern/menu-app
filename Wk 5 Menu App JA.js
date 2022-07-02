class Student {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    describe() {
        return `${this.firstName} , ${this.lastName}.`;
    }
}

class Homeroom {
    constructor(name) {
        this.name = name;
        this.students = [];
    }

    addStudent(student) {
        if (student instanceof Student) {
        this.students.push(student);
        } else {
        throw new Error(`You can only add an instance of a Student. Argument is not a student: ${student}`);
        }
    }

    describe() {
        return `${this.name} has ${this.students.length} students.`;
    }
}

class Menu {
    constructor() {
        this.homerooms = [];
        this.selectedHomeroom = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while(selection != 0) {
            switch (selection) {
                case '1' :
                    this.createHomeroom();
                    break;
                case '2':
                    this.viewHomerooms();
                    break;
                case '3':
                    this.displayHomerooms();
                    break;
                    default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();           
        }

        alert('Thank You!');
    }

    showMainMenuOptions() {
        return prompt(`
            0) Exit
            1) Create New Homeroom
            2) View Homeroom and Student Options
            3) Display All Homerooms
          
        `);
    }
// 2) view team is where 2nd menu is located
    showHomeroomMenuOptions(homeroomInfo) {
        return prompt(`
            0) Return
            1) Add Student
            2) Delete Student
            -----------------------
            ${homeroomInfo}
            `);
    }

    displayHomerooms() {
        let homeroomString = '';
        for (let i = 0; i < this.homerooms.length; i++) {
            homeroomString += i + ' - ' + this.homerooms[i].name + '\n';
        }

        alert(homeroomString);
    }

    createHomeroom() {
        let name = prompt('Enter Homeroom Grade Level:');
        this.homerooms.push(new Homeroom(name));
    }    

    viewHomerooms() {
        let index = prompt ('Enter 0 to view Homerooms:');
        if (index > -1 && index < this.homerooms.length) {
            this.selectedHomeroom = this.homerooms[index];
            let description = 'Homeroom Name: ' + this.selectedHomeroom.name + '\n';

            for (let i = 0; i < this.selectedHomeroom.students.length; i++) {
                description += i + ' - ' + this.selectedHomeroom.students[i].firstName
                + ' - ' + this.selectedHomeroom.students[i].lastName + '\n';
            }

            let selection = this.showHomeroomMenuOptions(description);
            switch (selection) {
                case '1' :
                    this.createStudent();
                    break;
                case '2' :
                    this.deleteStudent();
            }
        }
    }

    createStudent() {
        let firstName = prompt('Enter Student First Name:');
        let lastName = prompt('Enter Student Last Name:');
        this.selectedHomeroom.students.push(new Student(firstName , lastName));
    }

    deleteStudent() {
        let index = prompt('Enter the index of the student you wish to delete:');
        if (index > -1 && index < this.selectedHomerooms.students.length) {
            this.selectedHomeroom.students.splice(index, 1);
        }
    }
}

    let menu = new Menu();
    menu.start();


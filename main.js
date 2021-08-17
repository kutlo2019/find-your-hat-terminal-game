const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
    }

    print() {
        let fieldString = this.field.map(row => row.join(' '));
        for (let row of fieldString) {
            console.log(row)
        }
    }
}


const aField = new Field ([
    [pathCharacter, fieldCharacter, hole],
    [fieldCharacter, hole, fieldCharacter],
    [fieldCharacter, hat, hole]
])

function updateLocation(move) {
    switch(move) {
        case 'd':
            location[0] += 1;
            break;
        case 'u':
            location[0] -= 1;
            break;
        case 'l':
            location[1] -= 1;
            break;
        case 'd':
            location[1] += 1;
            break;
    }
}
let location = [];
let counter = 0;
const myField = aField.field;
myField.forEach(row => {
    if (row.indexOf(pathCharacter) !== -1) {
        location = [counter, row.indexOf(pathCharacter)];
    }
    counter++
});

function updateField() {

    let gamePlay = true;

    while (gamePlay) {
        let move = prompt('make a move: \n')
        console.log('My move',move);
        switch(move) {
            case 'd':
                // check if user is out of bounds
                let myChecker = location[0] + 1; // A downward movement increases the location[0] attribute
                if (myChecker >= myField.length) { // Check if user CANNOT move down
                    // User NOT allowed to move down
                    console.log('You are out of bounds!!')
                } else {
                    // User allowed to move down. Swap the path square and field square
                    const temp = myField[location[0]][location[1]];
                    console.log('My field: ', myField);
                    console.log('Temporary variable: ', temp)
                    console.log('1st col 2nd row:? ', myField[location[0] + 1][location[1]])
                    myField[location[0]][location[1]] = myField[location[0] + 1][location[1]];
                    myField[location[0] + 1][location[1]] = temp;
                    console.log('My field: ', myField);
                    console.log(location)
                    updateLocation(move);
                    console.log(location)
                    aField.field = myField;
                    aField.print();
                }
                break;
            case 'u':
                // check if user is out of bounds
                let myChecker = location[0] - 1; // A upward movement increases the location[0] attribute
                if (myChecker < 0 ) { // Check if user CANNOT move down
                    // User NOT allowed to move down
                    console.log('You are out of bounds!!')
                } else {
                    // User allowed to move down. Swap the path square and field square
                    const temp = myField[location[0]][location[1]];
                    console.log('My field: ', myField);
                    console.log('Temporary variable: ', temp)
                    console.log('1st col 2nd row:? ', myField[location[0] - 1][location[1]])
                    myField[location[0]][location[1]] = myField[location[0] - 1][location[1]];
                    myField[location[0] - 1][location[1]] = temp;
                    console.log('My field: ', myField);
                    console.log(location)
                    updateLocation(move);
                    console.log(location)
                    aField.field = myField;
                    aField.print();
                }
                break;
            case 'l':
                // do something
                break;
            case 'r':
                // do something
                break;
            default:
                // Do something
                console.log('Please enter a valide move. See instructions at the top.');
                // move = prompt('make a move: \n');
                break;
        }
    }
}

console.log('Instructions: d (down), u (up), l (left), r (right)')
aField.print();

updateField();

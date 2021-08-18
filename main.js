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
        case 'r':
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
        switch(move) {
            case 'd':
                // check if user is out of bounds
                let downChecker = location[0] + 1; // A downward movement increases the location[0] attribute
                if (downChecker >= myField.length) { // Check if user CANNOT move down
                    // User NOT allowed to move down
                    console.log('You are out of bounds. \n!!GAME OVER!!')
                    gamePlay = false;
                } else {
                    // User allowed to move down. Swap the path square and field square
                    const temp = myField[location[0] + 1][location[1]];
                    if (temp === hole) {
                        console.log('You fell in a hole. \n!!GAME OVER!!');
                        gamePlay = false;
                    } else if ( temp === fieldCharacter) {
                        myField[location[0] + 1][location[1]] = myField[location[0]][location[1]];
                        myField[location[0]][location[1]] = temp;
                        updateLocation(move);
                        aField.field = myField;
                        aField.print();
                    } else {
                        console.log('Congratulations! <3 You have found your hat!')
                        gamePlay = false;
                    }
                }
                break;
            case 'u':
                // check if user is out of bounds
                let upChecker = location[0] - 1; // A upward movement increases the location[0] attribute
                if (upChecker < 0 ) { // Check if user CANNOT move up
                    // User NOT allowed to move up
                    console.log('You are out of bounds. \n!!GAME OVER!!');
                    gamePlay = false;
                } else {
                    // User allowed to move up. Swap the path square and field square
                    const temp = myField[location[0] - 1][location[1]];
                    if (temp === hole) {
                        console.log('You fell in a hole. \n!!GAME OVER!!');
                        gamePlay = false;
                    } else if (temp === fieldCharacter) {
                        myField[location[0] - 1][location[1]] = myField[location[0]][location[1]];
                        myField[location[0]][location[1]] = temp;
                        updateLocation(move);
                        aField.field = myField;
                        aField.print();
                    } else {
                        console.log('Congratulations! <3 You have found your hat!')
                        gamePlay = false;
                    }
                }
                break;
            case 'l':
                 // check if user is out of bounds
                 let leftChecker = location[1] - 1; // A left movement decreases the location[1] attribute
                 if (leftChecker < 0 ) { // Check if user CANNOT move left
                     // User NOT allowed to move left
                     console.log('You are out of bounds. \n!!GAME OVER!!');
                     gamePlay = false;
                 } else {
                     // User allowed to move left. Swap the path square and field square
                     const temp = myField[location[0]][location[1] - 1];
                     if (temp === hole) {
                        console.log('You fell in a hole. \n!!GAME OVER!!');
                        gamePlay = false;
                    } else if (temp === fieldCharacter) {
                        myField[location[0]][location[1] - 1] = myField[location[0]][location[1]];
                        myField[location[0]][location[1]] = temp;
                        updateLocation(move);
                        aField.field = myField;
                        aField.print();
                    } else {
                        console.log('Congratulations! <3 You have found your hat!')
                        gamePlay = false;
                    }
                 }
                break;
            case 'r':
                 // check if user is out of bounds
                 let rightChecker = location[1] + 1; // A right movement increases the location[1] attribute
                 if (rightChecker >= myField[0].length ) { // Check if user CANNOT move right
                     // User NOT allowed to move right
                     console.log('You are out of bounds. \n!!GAME OVER!!')
                     gamePlay = false;
                 } else {
                     // User allowed to move right. Swap the path square and field square
                     const temp = myField[location[0]][location[1] + 1];
                     if (temp === hole) {
                        console.log('You fell in a hole. \n!!GAME OVER!!');
                        gamePlay = false;
                    } else if (temp === fieldCharacter) {
                        myField[location[0]][location[1] + 1] = myField[location[0]][location[1]];
                        myField[location[0]][location[1]] = temp;
                        updateLocation(move);
                        aField.field = myField;
                        aField.print();
                    } else {
                        console.log('Congratulations! <3 You have found your hat!')
                        gamePlay = false;
                    }
                 }
                break;
            default:
                // Do something
                console.log('Please enter a valide move. See instructions at the top.');
                break;
        }
    }
}

console.log('Instructions: d (down), u (up), l (left), r (right)')
aField.print();

updateField();

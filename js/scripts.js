//qua metto le funzioni -----------------------------------------------------

//per generare un numero random
function createRandomNum (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//per generare una cella con larghezza determinata dal numero totale di celle
function createCell(cellNumber) {
    //creo una cella
    const cell = document.createElement('div');
    //assegno allacella la classe cell
    cell.classList.add('cell');
    //assegno alla cella la larghezza, pari al 100% del contenitore fratto la radice quadrata del numero di celle
    cell.setAttribute("style","width: calc(100% / " + Math.sqrt(cellNumber));
    
    return cell;
}


// per creare un array con un tot di numeri casuali che non si ripetono
function createBombArray (bombNum, cellNum) {
    //creo l'array
    const bombArray = [];
    //controllo che il numero di celle sia maggiore del numero di bombe
    if (cellNum < bombNum) {
        console.log('il numero di bombe non può essere maggiore del numero di celle');
        return bombArray;
    }
    //genero un numero casuale un tot di volte e se non è già presente lo metto nell'array
    for (let i = 1; i <= bombNum; i++){
        let ranNumber;
        do {
            ranNumber = createRandomNum (1, cellNum);
        } while (bombArray.includes(ranNumber));

        bombArray.push(ranNumber);
    }
    return bombArray;
}

//restituire quante bombe ha attorno una cella
function numberOfNearBombs(cell, cellInRow, bombArray) {
    //creo un contatore
    let counter = 0;
    const cellID = parseInt(cell.id);

    

    if (bombArray.includes(cellID - cellInRow - 1)){
        counter++;
    }
    if (bombArray.includes(cellID - cellInRow)){
        counter++;
    }
    if (bombArray.includes(cellID - cellInRow + 1)) {
        counter++;
    }
    if (bombArray.includes(cellID - 1)) {
        counter++;
    }
    if (bombArray.includes(cellID + 1)) {
        counter++;
    }
    if (bombArray.includes(cellID + cellInRow - 1)) {
        counter++;
    }
    if (bombArray.includes(cellID + cellInRow)) {
        counter++;
    }
    if (bombArray.includes(cellID + cellInRow + 1)) {
        counter++;
    }

    return counter;
}

//----------------------------------------------------------------------------


//vado a prendere gli elementi HTML
const playButton = document.getElementById('play-button');
const gridBox = document.getElementById('grid-box');
const select = document.getElementById('diff');

//decido il numero di bombe
const bombNum = 16;

//click PLAY
playButton.addEventListener ('click',
    function() {

        //inizializzo il gioco
        gridBox.innerHTML = '';
        
        //vado a prendere il valore della select che contiene il numero di celle
        const cellNumber = parseInt(select.value);

        //calcolo il numero di celle in una riga
        const cellInRow = Math.sqrt(cellNumber);

        //genero l'array con le bombe
        const bombArray = createBombArray (bombNum, cellNumber);

        //genero le celle
        for (let i = 1; i <= cellNumber; i++) {
            //genero la cella
            const cell = createCell(cellNumber);
            //do alla cella un ID
            cell.id = i;
            //se la cella contiene una bomba assegna la classe bomb e colora di rosso
            if (bombArray.includes(i)) {
                cell.classList.add('bomb', 'red');
            }
            //aggiungo la cella alla grid box
            gridBox.append(cell);
        }


        for (let i = 1; i <= cellNumber; i++) {
            const cell = document.getElementById(i);
            cell.innerText = numberOfNearBombs(cell, cellInRow, bombArray);
        }


        bombArray.sort();
        console.log(bombArray)
        console.log(cellInRow)

        //rendo visibile la grid-box
        gridBox.classList.add('visible');





})



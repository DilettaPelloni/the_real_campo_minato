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

//per restituire quante bombe ha attorno una cella
function numberOfNearBombs(cell, cellInRow, bombArray, cellNumber) {
    //creo un contatore
    let counter = 0;
    const cellID = parseInt(cell.id);

    //se non sei la prima riga
    if (cellID - cellInRow > 0) {
        if ((bombArray.includes(cellID - cellInRow - 1)) && (cellID % cellInRow != 1)){
            counter++;
        }
        if (bombArray.includes(cellID - cellInRow)){
            counter++;
        }
        if ((bombArray.includes(cellID - cellInRow + 1)) && (cellID % cellInRow != 0)) {
            counter++;
        }
    }

    //se non sei l'ultima riga
    if (cellID + cellInRow <= cellNumber) {
        if ((bombArray.includes(cellID + cellInRow - 1)) && (cellID % cellInRow != 1)) {
            counter++;
        }
        if (bombArray.includes(cellID + cellInRow)) {
            counter++;
        }
        if ((bombArray.includes(cellID + cellInRow + 1)) && (cellID % cellInRow != 0)) {
            counter++;
        }
    }

    // qualsiasi riga
    if ((bombArray.includes(cellID - 1)) && (cellID % cellInRow != 1)) {
        counter++;
    }
    if ((bombArray.includes(cellID + 1)) && (cellID % cellInRow != 0)) {
        counter++;
    }
    
    return counter;
}

//per selezionare una cella
function selectCell(cell, span) {
    //do la classe select
    cell.classList.add('selected');
    //rendo visibile lo span
    span.classList.add('visible');
}

//per selezionare tutte le celle accanto ad una data cella
function selectNearCells (cell, cellInRow, bombArray, cellNumber) {
    const cellID = parseInt(cell.id);
    const spanList = document.querySelectorAll('.content');

        //se non sei la prima riga
        if (cellID - cellInRow > 0) {
            if (cellID % cellInRow != 1){
                const selectedCell = document.getElementById(cellID - cellInRow - 1);
                const selectedSpan = spanList[cellID - cellInRow - 1 - 1];

                const spanContent = parseInt(selectedSpan.innerText);
                if ((spanContent == 0) && (!selectedCell.classList.contains('selected'))) {
                    selectCell(selectedCell, selectedSpan);
                    selectNearCells (selectedCell, cellInRow, bombArray, cellNumber);
                }
                selectCell(selectedCell, selectedSpan);
            }
            if (cellID % cellInRow != 0) {
                const selectedCell = document.getElementById(cellID - cellInRow + 1);
                const selectedSpan = spanList[cellID - cellInRow + 1 - 1];

                const spanContent = parseInt(selectedSpan.innerText);
                if ((spanContent == 0) && (!selectedCell.classList.contains('selected'))) {
                    selectCell(selectedCell, selectedSpan);
                    selectNearCells (selectedCell, cellInRow, bombArray, cellNumber);
                }
                selectCell(selectedCell, selectedSpan);
            }
            const selectedCell = document.getElementById(cellID - cellInRow);
            const selectedSpan = spanList[cellID - cellInRow - 1];

            const spanContent = parseInt(selectedSpan.innerText);
            if ((spanContent == 0) && (!selectedCell.classList.contains('selected'))) {
                selectCell(selectedCell, selectedSpan);
                selectNearCells (selectedCell, cellInRow, bombArray, cellNumber);
            }
            selectCell(selectedCell, selectedSpan);
        }
    
        //se non sei l'ultima riga
        if (cellID + cellInRow <= cellNumber) {
            if (cellID % cellInRow != 1) {
                const selectedCell = document.getElementById(cellID + cellInRow - 1);
                const selectedSpan = spanList[cellID + cellInRow - 1 - 1];

                const spanContent = parseInt(selectedSpan.innerText);
                if ((spanContent == 0) && (!selectedCell.classList.contains('selected'))) {
                    selectCell(selectedCell, selectedSpan);
                    selectNearCells (selectedCell, cellInRow, bombArray, cellNumber);
                }
                selectCell(selectedCell, selectedSpan);
            }
            if (cellID % cellInRow != 0) {
                const selectedCell = document.getElementById(cellID + cellInRow + 1);
                const selectedSpan = spanList[cellID + cellInRow + 1 - 1];

                const spanContent = parseInt(selectedSpan.innerText);
                if ((spanContent == 0) && (!selectedCell.classList.contains('selected'))) {
                    selectCell(selectedCell, selectedSpan);
                    selectNearCells (selectedCell, cellInRow, bombArray, cellNumber);
                }
                selectCell(selectedCell, selectedSpan);
            }
            const selectedCell = document.getElementById(cellID + cellInRow);
            const selectedSpan = spanList[cellID + cellInRow - 1];

            const spanContent = parseInt(selectedSpan.innerText);
            if ((spanContent == 0) && (!selectedCell.classList.contains('selected'))) {
                selectCell(selectedCell, selectedSpan);
                selectNearCells (selectedCell, cellInRow, bombArray, cellNumber);
            }
            selectCell(selectedCell, selectedSpan);
        }
    
        // qualsiasi riga
        if (cellID % cellInRow != 1) {
            const selectedCell = document.getElementById(cellID - 1);
            const selectedSpan = spanList[cellID - 1 - 1];

            const spanContent = parseInt(selectedSpan.innerText);
            if ((spanContent == 0) && (!selectedCell.classList.contains('selected'))) {
                selectCell(selectedCell, selectedSpan);
                selectNearCells (selectedCell, cellInRow, bombArray, cellNumber);
            }
            selectCell(selectedCell, selectedSpan);
        }
        if (cellID % cellInRow != 0) {
            const selectedCell = document.getElementById(cellID + 1);
            const selectedSpan = spanList[cellID + 1 - 1];

            const spanContent = parseInt(selectedSpan.innerText);
            if ((spanContent == 0) && (!selectedCell.classList.contains('selected'))) {
                selectCell(selectedCell, selectedSpan);
                selectNearCells (selectedCell, cellInRow, bombArray, cellNumber);
            }
            selectCell(selectedCell, selectedSpan);
        }
}




//----------------------------------------------------------------------------


//vado a prendere gli elementi HTML
const playButton = document.getElementById('play-button');
const gridBox = document.getElementById('grid-box');
const select = document.getElementById('diff');
const messageBox = document.getElementById('message-box');

//decido il numero di bombe
const bombNum = 16;

//creo una flag per determinare se il gioco è finito
let gameEnd = false;

//click PLAY
playButton.addEventListener ('click',
    function() {

        //inizializzo il gioco
        gridBox.innerHTML = '';
        gameEnd = false;
        messageBox.innerHTML = "";

        //rendo visibile la grid-box
        gridBox.classList.add('visible');
        
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
            //se la cella contiene una bomba assegna la classe bomb
            if (bombArray.includes(i)) {
                cell.classList.add('bomb');
            }
            //aggiungo la cella alla grid box
            gridBox.append(cell);
        }

        //metto ad ogni cella uno span che contiene una bandierina
        for (let i = 1; i <= cellNumber; i++) {
            const cell = document.getElementById(i);
            const span = document.createElement('span');
            span.classList.add('flag');
            span.innerHTML = '&#128681';
            cell.append(span);
        }

        //metto dentro ad ogni cella uno span che contiene il numero di bombe che ha accanto, oppure mette una bomba
        for (let i = 1; i <= cellNumber; i++) {
            const cell = document.getElementById(i);
            const span = document.createElement('span');
            span.classList.add('content');
            //se la cella contiene una bomba metto l'emoji di una bomba
            if (bombArray.includes(i)){
                span.innerHTML = '&#128163;'
            }
            else{
                //altrimenti il numero di bombe che ha accanto
                span.innerText = numberOfNearBombs(cell, cellInRow, bombArray, cellNumber);
            }
            cell.append(span);
        }

        //creo degli array con gli span
        const spanList = document.querySelectorAll('.content');
        const flagList = document.querySelectorAll('.flag');

        //ad ogni cella aggiungo un evento al click destro
        for (let i = 1; i <= cellNumber; i++) {

            const cell = document.getElementById(i);
            const span = flagList[i - 1];

            cell.addEventListener ('contextmenu',
                function(ev) {
                    ev.preventDefault();

                    //se non è già selezionata e il gioco non è finito
                    if ((!(this.classList.contains('selected'))) && (gameEnd == false)) {
                        //mostro la bandiera
                        span.classList.toggle('visible');
                    }
                }
            )

        }

        //ad ogni cella aggiungo un evento al click sinistro
        for (let i = 1; i <= cellNumber; i++) {

            const cell = document.getElementById(i);
            const span = spanList[i - 1];
            const bombIndicator = parseInt(span.innerText);
            const flag = flagList[i - 1];

            cell.addEventListener ('click',
                function() {
                    //se non è già selezionata e il gioco non è finito
                    if ((!(this.classList.contains('selected'))) && (gameEnd == false)) {

                        //la seleziono
                        selectCell(this, span);
                        //tolgo la bandiera se c'è
                        flag.classList.remove('visible');

                        //se non contiene una bomba
                        if (!(bombArray.includes(i))) {
                            //se la cella non ha bombe accanto
                            if (bombIndicator == 0) {
                                selectNearCells (this, cellInRow, bombArray, cellNumber);
                            };

                            //vado a prendere tutte le celle selezionate
                            const selectedCellsList = document.querySelectorAll('.selected');

                            //se ho raggiunto il punteggio massimo
                            if (selectedCellsList.length ==  cellNumber - bombNum) {
                                //termino la partita
                                gameEnd = true;
                                //comunico che l'utente ha vinto
                                messageBox.innerHTML = "HAI VINTO! Premi di nuovo PLAY per fare un'altra partita";
                            }
                        }
                        else {
                            //mi segno che la partita è terminata
                            gameEnd = true;
                            //comunico che l'utente ha perso
                            messageBox.innerHTML = "HAI PERSO! Premi di nuovo PLAY per fare un'altra partita";
                        }
                    }
                }
            )
        }
})



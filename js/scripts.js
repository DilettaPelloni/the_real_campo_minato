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

    //se sei la prima riga
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

    //se sei l'ultima riga
    if (cellID + cellInRow < cellNumber) {
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

    // se non sei ne l'ultima ne la prima
    if ((bombArray.includes(cellID - 1)) && (cellID % cellInRow != 1)) {
        counter++;
    }
    if ((bombArray.includes(cellID + 1)) && (cellID % cellInRow != 0)) {
        counter++;
    }
    
    return counter;
}

//seleziona una cella
function selectCell(cell, span) {
    //do la classe select
    cell.classList.add('selected');
    //rendo visibile lo span
    span.classList.add('visible');
}

//----------------------------------------------------------------------------


//vado a prendere gli elementi HTML
const playButton = document.getElementById('play-button');
const gridBox = document.getElementById('grid-box');
const select = document.getElementById('diff');
const messageBox = document.getElementById('message-box');

//decido il numero di bombe
const bombNum = 16;

//creo un contatore di punti
let pointCounter = 0;

//creo una flag per determinare se il gioco è finito
let gameEnd = false;

//click PLAY
playButton.addEventListener ('click',
    function() {

        //inizializzo il gioco
        gridBox.innerHTML = '';
        gameEnd = false;
        pointCounter = 0;
        messageBox.innerHTML = "";
        
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

        //creo un array con gli span
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
            const flag = flagList[i - 1];

            cell.addEventListener ('click',
                function() {
                    //se non è già selezionata e il gioco non è finito
                    if ((!(this.classList.contains('selected'))) && (gameEnd == false)) {

                        //la seleziono
                        selectCell(this, span);
                        //tolgo la bandiera se c'è
                        flag.classList.toggle('visible');

                        //se non contiene una bomba
                        if (!(bombArray.includes(i))) {
                            //incremento di uno il punteggio
                            pointCounter += 1;
                            //scrivo il punteggio
                            messageBox.innerHTML = 'Punteggio: ' + pointCounter;;
                            //se ho raggiunto il punteggio massimo
                            if (pointCounter ==  cellNumber - bombNum) {
                                //termino la partita
                                gameEnd = true;
                                //comunico che l'utente ha vinto
                                messageBox.innerHTML = "HAI VINTO! Il tuo punteggio è " + pointCounter + ". Premi di nuovo PLAY per fare un'altra partita";
                            }
                        }
                        else {
                            //mi segno che la partita è terminata
                            gameEnd = true;
                            //comunico che l'utente ha perso
                            messageBox.innerHTML = "HAI PERSO! Il tuo punteggio è " + pointCounter + ". Premi di nuovo PLAY per fare un'altra partita";
                        }
                    }
                }
            )
        }

    
        //rendo visibile la grid-box
        gridBox.classList.add('visible');





})



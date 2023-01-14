//qua metto le funzioni -----------------------------------------------------

//per generare un numero random
function createRandomNum (min, max) {
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum;
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

//per creare uno span con un indice all'interno
function createSpan(index) {
    //creo uno span
    const span = document.createElement('span');
    //metto il numero dell'indice dentro all span
    span.innerHTML = index;
    
    return span;
}

//seleziona una cella
function selectCell(cell, span) {
    //do la classe select
    cell.classList.add('selected');
    //rendo visibile lo span
    span.classList.add('visible');
}

//----------------------------------------------------------------------------

//vado a prendere il bottone
const playButton = document.getElementById('play-button');

//vado a prendere la grid box
const gridBox = document.getElementById('grid-box');

//vado a prendere la select
const select = document.getElementById('diff');

//vado a prendere la message box
const messageBox = document.getElementById('message-box');

//creo una flag per determinare se il gioco è finito
let gameEnd = false;

//creo un contatore di punti
let pointCounter = 0;

//decido il numero di bombe
const bombNum = 16;

//quando clicco sul bottone
playButton.addEventListener ('click',
    function () {
        //inizializzo il gioco
        gridBox.innerHTML = '';
        gameEnd = false;
        pointCounter = 0;
        messageBox.innerHTML = "";

        //vado a prendere il valore della select che contiene il numero di celle
        const selectInput = parseInt(select.value);

        //genero l'array con le bombe
        const bombArray = createBombArray (bombNum, selectInput);

        //genero le celle e a ciascuna assegno un evento al click
        for (let i = 1; i <= selectInput; i++) {
            //genero la cella
            const cell = createCell(selectInput);
            //genero lo span
            const span = createSpan(i);
            //metto lo span nella cella
            cell.append(span);

            //se la cella contiene una bomba assegna la classe bomb alla cella e allo span
            if (bombArray.includes(i)) {
                cell.classList.add('bomb');
            }

            //aggiungo un event listener alla cella
            cell.addEventListener ('click',
                function() {
                    //se non è già selezionata e il gioco non è finito
                    if ((!(this.classList.contains('selected'))) && (gameEnd == false)) {
                        selectCell(this, span);
                        //se non contiene una bomba
                        if (!(bombArray.includes(i))) {
                            //la coloro di verde
                            this.classList.add('safe');
                            //incremento di uno il punteggio
                            pointCounter += 1;
                            //scrivo il punteggio
                            messageBox.innerHTML = 'Punteggio: ' + pointCounter;
                            //se ho raggiunto il punteggio massimo
                            if (pointCounter ==  selectInput - bombNum) {
                                //termino la partita
                                gameEnd = true;
                                //comunico che l'utente ha vinto
                                messageBox.innerHTML = "HAI VINTO! Il tuo punteggio è " + pointCounter + ". Premi di nuovo PLAY per fare un'altra partita";
                            }
                        }
                        else {
                            const cellArray = document.querySelectorAll('.cell');
                            const spanArray = document.querySelectorAll('span');
                            //altrimenti mostro tutte le celle e coloro di rosso quelle con le bombe
                            for (let i = 0; i < cellArray.length; i++) {
                                selectCell(cellArray[i], spanArray[i]);
                                if (bombArray.includes(i+1)) {
                                    cellArray[i].classList.add("red");
                                }
                            }
                            
                            //mi segno che la partita è terminata
                            gameEnd = true;
                            //comunico che l'utente ha perso
                            messageBox.innerHTML = "HAI PERSO! Il tuo punteggio è " + pointCounter + ". Premi di nuovo PLAY per fare un'altra partita";
                        }
                    }
                }
            )
            //aggiungo la cella alla grid box
            gridBox.append(cell);
        }

        //rendo visibile la grid-box
        gridBox.classList.add('visible');
    }
)


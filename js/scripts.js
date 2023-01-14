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

        //genero le celle
        for (let i = 1; i <= cellNumber; i++) {
            //genero la cella
            const cell = createCell(cellNumber);
            //aggiungo la cella alla grid box
            gridBox.append(cell);
        }
        
        //rendo visibile la grid-box
        gridBox.classList.add('visible');
})
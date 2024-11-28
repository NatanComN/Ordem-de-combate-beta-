let combatObject = [];

const mainTable = document.getElementById("mainTable");

const btn_sendValues = document.getElementById("btn_sendValues");
const btn_removeAll = document.getElementById("btn_restart");
const btn_restartTurn = document.getElementById("btn_restartTurn");

let turn = 1;
let txt_turn = document.getElementById("txt_turnNumber");

tableCentralize();

window.addEventListener("resize", function() {
    tableCentralize();
});

btn_sendValues.addEventListener("click", function(recieveValues){
    recieveValues.preventDefault();
    createNewObject();
    sortObjects();
    setTableTexts();
    restoreDefaultValues();
});

btn_removeAll.addEventListener("click", function(onRemoveAllClick){
    onRemoveAllClick.preventDefault();
    restartCombat()
});

btn_restartTurn.addEventListener("click", function(OnRestartTurnClick){
    OnRestartTurnClick.preventDefault();
    restartTurn();
});

function createNewObject(){
    const newName = document.getElementById("btn_characterName").value;
    const newIniciative = Number(document.getElementById("btn_characterInitiative").value);

    let sameName = false;
    combatObject.forEach(row =>{
        if (newName == row.name){
            sameName = true;
        }
    });
   
    if (newName === ""){
        alert("Insira um nome antes de adicionar um personagem ao combate");
    }
    else if (newName.length >= 30){
        alert("Insira um nome menor");
    }
    else if (sameName === true){
        alert("Insira um nome diferente");
    }
    else{
        const newRemoveButton = document.createElement("input"); newRemoveButton.type="submit"; newRemoveButton.value="-"; document.body.appendChild(newRemoveButton);
        newRemoveButton.addEventListener("click", function(onRemoveClick){
            onRemoveClick.preventDefault();
            deleteObject(combatObject, newName);
        });
    
        const newCheckbox = document.createElement("input"); newCheckbox.type="checkbox"; document.body.appendChild(newCheckbox);
        newCheckbox.addEventListener("click", function(onCheckboxClick){
            checkTurnPass();
        });
    
        
        newObject = {name: newName, iniciative: newIniciative, removeButton: newRemoveButton, checkbox: newCheckbox};
        combatObject.push(newObject);
    }
}

function sortObjects(){
    combatObject = combatObject.sort((a, b) => b.iniciative - a.iniciative);
}

function setTableTexts(){
    const playersData = document.querySelectorAll(".toDelete");
    playersData.forEach(row => {
        row.remove();
    });

    combatObject.forEach(row => {
        newTr = document.createElement("tr"); newTr.classList.add("toDelete"); mainTable.appendChild(newTr); newTr.id=row.name;
        //tr
        
        newTd1 = document.createElement("td"); newTr.appendChild(newTd1); newTd1.innerHTML = row.name; newTd1.classList.add("defaultTd");
        newTd2 = document.createElement("td"); newTr.appendChild(newTd2); newTd2.innerHTML = row.iniciative; newTd2.classList.add("defaultTd");
        //tds
    });
    tableCentralize();
    combatObject.forEach(row => {
        putCheckboxAside(row.checkbox, document.getElementById(row.name));
        putRemoveButtonAside(row.removeButton, document.getElementById(row.name));
    });
}

function restoreDefaultValues(){
    document.getElementById("btn_characterName").value = null;
    document.getElementById("btn_characterInitiative").value = null;
}

function deleteObject(targetArray, targetName) {
    const index = targetArray.findIndex(localObject => localObject.name === targetName);
    combatObject[index].checkbox.remove();
    combatObject[index].removeButton.remove();
    combatObject.splice(index, 1);
    
    setTableTexts();
    checkTurnPass();
}

function restartCombat(){
    for (let index = combatObject.length-1; index >= 0; index--) {
        combatObject[index].checkbox.remove();
        combatObject[index].removeButton.remove();

        combatObject.splice(index, 1);
    }
    turn = 1;
    txt_turn.innerHTML = turn;
    setTableTexts();
}

function checkTurnPass(){
    if (combatObject.length>0){
        let canPassTurn = true;

        combatObject.forEach(row => {
            
            if (!row.checkbox.checked) {
                canPassTurn = false;
            }
        });
    
        if (canPassTurn) {
            turn++;
            txt_turn.innerHTML = turn;
            restoreCheckboxValues();
        }
    }
}

function restoreCheckboxValues(){
    combatObject.forEach(row => {
        row.checkbox.checked = false;
    });
}

function restartTurn(){
    turn=1;
    txt_turn.innerHTML = turn;
    restoreCheckboxValues();
}

//#region style functions

function debugTrPosition(tr){
    trRect = tr.getBoundingClientRect();
    console.log("grossura: " + trRect.width);
}

function putCheckboxAside(elementoMovel, elementoFixo){
    const tableRect = mainTable.getBoundingClientRect();
    const fixoRect = elementoFixo.getBoundingClientRect();
    const movelRect = elementoMovel.getBoundingClientRect();
    
    const novaPosicao = [
        tableRect.right + movelRect.width,
        fixoRect.top + fixoRect.height/2 - movelRect.height/2
    ];
    
    elementoMovel.style.position = "absolute";
    elementoMovel.style.left = novaPosicao[0] + "px";
    elementoMovel.style.top = novaPosicao[1] + "px";
}

function putRemoveButtonAside(elementoMovel, elementoFixo){
    const tableRect = mainTable.getBoundingClientRect();
    const fixoRect = elementoFixo.getBoundingClientRect();
    const movelRect = elementoMovel.getBoundingClientRect();
    
    const novaPosicao = [
        tableRect.right + movelRect.width,
        fixoRect.top + fixoRect.height/2 - movelRect.height/2
    ];
    
    elementoMovel.style.position = "absolute";
    elementoMovel.style.right = novaPosicao[0] + "px";
    elementoMovel.style.top = novaPosicao[1] + "px";
}

function tableCentralize(){
    const tableRect = mainTable.getBoundingClientRect();

    mainTable.style.position = "absolute";
    mainTable.style.top = "140px";
    mainTable.style.right = window.innerWidth/2 - tableRect.width/2 + "px";

    adjustFixedElements();
}

function adjustFixedElements(){
    const txt_turn = document.getElementById("txt_turn");

    const DefaultborderDistance = "15px";

    txt_turn.style.position = "absolute";
    txt_turn.style.top = DefaultborderDistance;
    txt_turn.style.left = window.innerWidth/2 - txt_turn.getBoundingClientRect().width/2 + "px";

    btn_restartTurn.style.position = "absolute";
    btn_restartTurn.style.left = DefaultborderDistance;
    btn_restartTurn.style.bottom = DefaultborderDistance;

    btn_removeAll.style.position = "absolute";
    btn_removeAll.style.right = DefaultborderDistance;
    btn_removeAll.style.bottom = DefaultborderDistance;
}

//#endregion
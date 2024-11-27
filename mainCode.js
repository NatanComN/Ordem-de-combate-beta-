let combatObject = [];

const btn_sendValues = document.getElementById("btn_sendValues");
const btn_removeAll = document.getElementById("btn_restart");
const btn_restartTurn = document.getElementById("btn_restartTurn");

let turn = 1;
let txt_turn = document.getElementById("txt_turn");

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
    turn=1;
    txt_turn.innerHTML = turn;
});

function createNewObject(){
    const newName = document.getElementById("btn_characterName").value;
    const newIniciative = Number(document.getElementById("btn_characterInitiative").value);

    const newRemoveButton = document.createElement("input"); newRemoveButton.type="submit"; newRemoveButton.value="remover " + newName; document.body.appendChild(newRemoveButton);
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

function sortObjects(){
    combatObject = combatObject.sort((a, b) => b.iniciative - a.iniciative);
}

function setTableTexts(){
    const playersData = document.querySelectorAll(".toDelete");
    playersData.forEach(row => {
        row.remove();
    });

    const mainTable = document.getElementById("mainTable");

    combatObject.forEach(row => {
        newTr = document.createElement("tr"); newTr.className="toDelete"; mainTable.appendChild(newTr);
        //tr
        
        newTd1 = document.createElement("td"); newTr.appendChild(newTd1); newTd1.innerHTML = row.name;
        newTd2 = document.createElement("td"); newTr.appendChild(newTd2); newTd2.innerHTML = row.iniciative;
        //tds
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
}

function restartCombat(){
    for (let index = combatObject.length-1; index >= 0; index--) {
        combatObject[index].checkbox.remove();
        combatObject[index].removeButton.remove();

        combatObject.splice(index, 1);
    }
    turn = 1;
    txt_turn.innerHTML = turn;
}

function checkTurnPass(){
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

function restoreCheckboxValues(){
    combatObject.forEach(row => {
        row.checkbox.checked = false;
    });
}

/*
0* - Sortear a array;
1* - Fazer uma cópia do restartCombat, mas reiniciando somente UM objeto (botar eventListener no botão de remover);
2* - Checar se tudo foi pressionado com os checkbox (botar eventListener tbm);
3* - Colocar a tabela em si;
4 - Não perder as informações no refresh do site;

*/
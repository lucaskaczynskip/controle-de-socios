// Formulário de edição dependentes
function getNewEditD() {
    const ss = SpreadsheetApp.openById(
     ssID
   ).getSheetByName('Edit Dependentes');
 
   const lastRow = ss.getLastRow();
   const range = ss.getRange(lastRow, 2, 1, 4).getValues();
 
   var edit = range[0];
 
   if(edit[0] == 'Atualizar') {
     updateD(edit[1]);
   } else {
     deleteD(edit[1])
   }
 }
 
 function updateD(cpf) {
   const ss = SpreadsheetApp.openById(
     ssID
   ).getSheetByName('Dependentes');
 
   const range = ss.getRange('D2:H').getValues();
 
   var relatives = []
 
   for(let i = 0; i < range.length; i++) {
     let count = 0;
 
     for(let j = 0; j < 10; j++) {
       if(range[i][j] != '') {
         count++;
       }
     }
 
     if(count) {
       relatives.push(range[i]);
     }
   }
 
   const ssEdit = SpreadsheetApp.openById(
     ssID
   ).getSheetByName('Edit Dependentes');
   const lastRow = ssEdit.getLastRow();
 
   const editRange = ssEdit.getRange(lastRow, 4, 1, 2).getValues();
   const edit = editRange[0];
 
   var row = 0;
   for(let i = 0; i < relatives.length; i++) {
     if(relatives[i][0] == cpf) {
       break;
     }
 
     row++;
   }
 
    for(let i = 0; i < edit.length; i++) {
     if(edit[i] != '') {
       if(edit[i] != relatives[row][i]) {
         ss.getRange(row+2, i+7).setValue(edit[i]);
       }
     }
   }
 }
 
 function deleteD(cpf) {
   const ss = SpreadsheetApp.openById(
     ssID
   ).getSheetByName('Dependentes');
 
   const range = ss.getRange('D2:D').getValues();
   
   const registeredDep = range;
   var count = 1;
 
   for(let i = 0; i < registeredDep.length; i++) {
     const aux = registeredDep[i];
 
     if(aux == cpf) {
       break;
     }
 
     count++
   }
 
   ss.deleteRow(count+1);
 }
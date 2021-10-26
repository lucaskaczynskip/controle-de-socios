const ssID = "1HeNyZPeLy7fUI_RygcUME_3YHZs0CajzjCITqQ7elZg";

function getNewRequest() {
  var ss = SpreadsheetApp.openById(
    ssID
  ).getSheetByName('Requisições');;
  
  var lastRow = ss.getLastRow();
  var range = ss.getRange('A2:E').getValues();
 
  return range[lastRow-2];
}

// Acionarod form de req

function memberExists() {
  var request = getNewRequest();
  request[4] = String(request[4]);

  switch(request[1]) {
    case 'Sócio':
      var members = getMembers();

      for(let i = 0; i < members.length; i++) {
        if(request[2] == members[i].cpf) {
          var aux = members[i];
          aux['status'] = 'Sócio';
          aux['hour'] = request[0];
          return aux;
        }
      }
      break;

    case 'Dependente':
      var relatives = getRelatives();

      for(let i = 0; i < relatives.length; i++) {
        if(request[4] == relatives[i].cpf) {
          var aux = relatives[i];
          aux['status'] = 'Dependente';
          aux['hour'] = request[0];
          return aux;
        }
      }
      break;
  }

  return false;
}

function autoSort(){
  var ss = SpreadsheetApp.openById(ssID).getSheetByName('Sócios');
  var range = ss.getRange(2, 1, ss.getLastRow() - 1, 16)
  range.sort({column:2, ascending: true})

  var ss = SpreadsheetApp.openById('12dRRsWUrhxE0r5B0ShS7nZdgVvXVcNhuRK7rrKvasbM').getActiveSheet();
  var range = ss.getRange(2, 1, ss.getLastRow() - 1, 14)
  range.sort({column:1, ascending: true})
}

function deleteReq() {
  var ss = SpreadsheetApp.openById(ssID).getSheetByName("Requisições");
  var range = ss.getRange('A2:E').getValues();

  var lastRow = ss.getLastRow();
  var row = 2;
  
  for (let i = 0; i < lastRow; i++) {
    ss.deleteRow(row);
    row++;
  }
}
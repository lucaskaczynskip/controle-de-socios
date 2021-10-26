// Formulário edição Sócios

function getNewEdit() {
    const ss = SpreadsheetApp.openById(
      ssID
    ).getSheetByName('Update/Delete');
  
    const lastRow = ss.getLastRow();
    const range = ss.getRange(lastRow, 2, 1, 11).getValues();
  
    var edit = range[0];
  
    if(edit[0] == 'Atualizar') {
      update(edit[1]);
    } else {
      deleteMember(edit[1]);
    }
  }
  
  function update(cpf) {
    const ss = SpreadsheetApp.openById(
      ssID
    ).getSheetByName('Sócios');
    const range = ss.getRange('C2:N').getValues();
  
    var members = [];
  
    for(let i = 0; i < range.length; i++) {
      let count = 0;
  
      for(let j = 0; j < 10; j++) {
        if(range[i][j] != '') {
          count++;
        }
      }
  
      if(count) {
        members.push(range[i]);
      }
    }
  
    const ssEdit = SpreadsheetApp.openById(
      ssID
    ).getSheetByName('Update/Delete');
    const lastRow = ssEdit.getLastRow();
    
    const editRange = ssEdit.getRange(lastRow, 4, 1, 11).getValues();
    const edit = editRange[0];
  
    var row = 0;
  
    for(let i = 0; i < members.length; i++) {
      if(members[i][0] == cpf) {
        break;
      }
  
      row++;
    }
  
    for(let i = 0; i < edit.length; i++) {
      if(edit[i] != '') {
        if(edit[i] != members[row][i+1]) {
          ss.getRange(row+2, i+4).setValue(edit[i]);
        }
      }
    }
  
    
  }
  
  function getDependents(cpf) {
    const ss = SpreadsheetApp.openById(
      ssID
    ).getSheetByName('Dependentes');
  
    var index = [];
  
    const range = ss.getRange("C:C").getValues();
    
    range.forEach((value, i) => {
      if(value == cpf) {
        var aux = i + 1;
        index.push(aux);
      }
    });
  
    var rows = []
  
    var count = 0;
    index.forEach((value) => {
      var aux = value - count;
      rows.push(aux);
      count++;
    })
  
    // console.log(index);
    // console.log(rows);
    return rows;
  }
  
  function deleteMember(cpf) {
    const ss = SpreadsheetApp.openById(
      ssID
    ).getSheetByName('Sócios');
    const ssPag = SpreadsheetApp.openById(
      '12dRRsWUrhxE0r5B0ShS7nZdgVvXVcNhuRK7rrKvasbM'
    ).getActiveSheet();
  
    const range = ss.getRange('C2:C').getValues();
    
    const registeredMember = range;
    var count = 1;
  
    for(let i = 0; i < registeredMember.length; i++) {
      const aux = registeredMember[i];
  
      if(aux[0] == cpf) {
        break;
      }
  
      count++;
    }
  
    var dependents = getDependents(cpf);
  
    const ssDep = SpreadsheetApp.openById(
      ssID
    ).getSheetByName('Dependentes');
    
    dependents.forEach((value) => {
      ssDep.deleteRow(value);
    });
  
    ssPag.deleteRow(count+1);
    ss.deleteRow(count+1);
  
    return true;
  }
  
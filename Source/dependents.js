class Dependent {
    constructor(timeStamp, cpfMember, name, cpf, birthDate, relatives, photo, email) {
      this.timeStamp = timeStamp;
      this.cpfMember = cpfMember;
      this.name = name;
      this.cpf = cpf;
      this.birthDate = birthDate;
      this.relatives = relatives;
      this.photo = photo;
      this.email = email;
    }
  }
  
  function getRelatives() {
    const ss = SpreadsheetApp.openById(
      ssID
    ).getSheetByName('Dependentes');
  
    const range = ss.getRange('A2:H').getValues();
  
    var relatives = [];
  
    for(let i = 0; i < range.length; i++) {
      const aux = range[i];
      var count = 0;
  
      for(let i = 0; i < aux.length; i++) {
        if(aux[i] != '') {
           count++;
        }
      }
  
      var imgId = aux[6].split('=');
      const img = imgId[1];
  
      if(count) {
        relatives[i] = new Dependent(
          aux[0],
          aux[1],
          aux[2],
          aux[3],
          aux[4],
          aux[5],
          img,
          aux[7]
        );
      }
    }
  
    return relatives;
  }
  
  // Acionador formulário de dependentes
  function relativeAlreadyExists() {
    const relatives = getRelatives();
  
    var cpf;
  
    const relativesCpf = SpreadsheetApp
      .openById(
        ssID
      )
      .getSheetByName('Dependentes')
      .getRange('D2:D')
      .getValues()
  
    var isTrue = false;
    for (let i = 0; i < relativesCpf.length; i++) {
      for (let j = i+1; j < relativesCpf.length; j++) {
        if (relativesCpf[i][0] == relativesCpf[j][0]) {
          cpf = relativesCpf[i][0];
          isTrue = true;
          break;
        }
      }
  
      if (isTrue) break;
    }
  
    if (cpf) {
      var overloadData = relatives.filter((relative) => relative.cpf == cpf);
  
      if (overloadData.length > 1) {
        var deletedMember;
  
        if (overloadData[0].timeStamp > overloadData[1].timeStamp || overloadData[0].timeStamp == "") {
          deletedMember = overloadData[0];
        } else {
          deletedMember = overloadData[1];
        }
  
        const ss = SpreadsheetApp.openById(
          ssID
        ).getSheetByName('Dependentes');
  
        var range = ss.getRange('A1:D').getValues();
  
        var count = 0;
  
        for (let i = 0; i < range.length; i++) {
          const aux = range[i];
  
          if (aux[0] == String(deletedMember.timeStamp)) {
            break;
          } else {
            count++
          }
        }
  
        var row = count + 1;
        
        var email = Session.getEffectiveUser().getEmail();
        GmailApp.createDraft(email, "Falha ao registrar o Dependente",
        "O CPF: " + cpf + " já está cadastrado no sistema.\nInsira outro cpf ou use o formulário de edição.");
        var draft = GmailApp.getDrafts()[0];
        var msg = draft.send();
  
        ss.deleteRow(row);
      }
    }
  }
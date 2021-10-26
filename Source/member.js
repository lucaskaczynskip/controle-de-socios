class Member {
    constructor(timeStamp,name, cpf, email, admDate, admForm, paymentForm, paymentDate, agency, account, tax, monthly, phone,photo) {
      this.timeStamp = timeStamp;     
      this.name = name;
      this.cpf = cpf;
      this.email = email;
      this.admDate = admDate;
      this.admForm = admForm;
      this.paymentForm = paymentForm;
      this.phone = phone;
      this.paymentDate = paymentDate;
      this.agency = agency;
      this.account = account;
      this.tax = tax;
      this.monthly = monthly;
      this.photo = photo;
    }
  }
  
  function getMembers() {
    const ss = SpreadsheetApp.openById(
      ssID
    ).getSheetByName('Sócios');;
  
    const range = ss.getRange("A2:N").getValues();
  
    var members = [];
  
    for (let i = 0; i < range.length; i++) {
      const aux = range[i];
      var count = 0;
  
      for (let i = 0; i < aux.length; i++) {
        if(aux[i] != "") count++;
      }
  
      const img = aux[13].split('=');
      
      if (count) {
        members[i] = new Member(
          aux[0], 
          aux[1], 
          aux[2], 
          aux[3], 
          aux[4], 
          aux[5], 
          aux[6], 
          aux[7], 
          aux[8], 
          aux[9], 
          aux[10],
          aux[11],
          aux[12],
          img[1]
        );
      }
    }
    
    return members;
  }
  
  // Acionador Formulario de Sócios
  function alreadyExists() {
    const members = getMembers();
    
    var cpf;
  
    const ssCpf = SpreadsheetApp.openById(
      ssID
    ).getSheetByName('Sócios');
  
    const rangeCpf = ssCpf.getRange("C2:C").getValues();
  
    var isTrue = false;
    for (var i = 0; i < rangeCpf.length; i++) {
      for (var j = i+1; j < rangeCpf.length; j++) {
        if (rangeCpf[i][0] === rangeCpf[j][0]) {
          cpf = rangeCpf[i][0];
          isTrue = true;
          break;
        }
      }
  
      if (isTrue) break;
    }
  
    if (cpf) {
      var overloadData = members.filter((member) => member.cpf === cpf);
  
      if (overloadData.length > 1) {
        var deletedMember;
  
        if (overloadData[0].timeStamp > overloadData[1].timeStamp || overloadData[0].timeStamp == "") {
          deletedMember = overloadData[0];
        } else {
          deletedMember = overloadData[1];
        }
  
        const ss = SpreadsheetApp.openById(
          ssID
        ).getSheetByName('Sócios');
  
        var range = ss.getRange('A1:C').getValues();
        
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
        GmailApp.createDraft(email, "Falha ao registrar o Sócio",
        "O CPF: " + cpf + " já está cadastrado no sistema.\nInsira outro cpf ou use o formulário de edição.");
        var draft = GmailApp.getDrafts()[0];
        var msg = draft.send();
  
        ss.deleteRow(row);
      }
    }
  }
  
  function validateMonth(cpf) {
    var date = Utilities.formatDate(new Date(), "GMT+3", "MM");
    var day = Utilities.formatDate(new Date(), "GMT+3", "dd");
    day = parseInt(day);
    
    var ss = SpreadsheetApp.openById(
      '12dRRsWUrhxE0r5B0ShS7nZdgVvXVcNhuRK7rrKvasbM'
    ).getActiveSheet();
  
    var range = ss.getRange('A2:N');
    var count = 1;
    var aux = range.getValues();
    
    for(let i = 0; i < aux.length; i++) {
      var a = aux[i];
      if(a[1] == cpf) {
        break;
      } else {
        count++;
      }
    }
  
    count = count + 1;
    var x = 2+parseInt(date);
  
    range = ss.getRange(count, x, 1, 1);
    var cell = range.getCell(1,1).getValue();
  
    var paymentDay = SpreadsheetApp
                      .openById(ssID)
                      .getSheetByName('Sócios')
                      .getRange(count, 8)
                      .getValue()
  
    if (memberStatus(cpf, date, day, paymentDay)) {
      if (cell.toUpperCase() == 'TAXA' || cell.toUpperCase() == 'L') {
        return 'Em dia';
      } else {
        return 'Atrasado';
      }
    } else {
      return 'Inativo';
    }
  
   
  }
  
  function memberStatus(cpf, month) {
    const ss = SpreadsheetApp.openById(
      '12dRRsWUrhxE0r5B0ShS7nZdgVvXVcNhuRK7rrKvasbM'
    ).getActiveSheet();
  
    var cpfRange = ss.getRange("B1:B").getValues();
  
    var count = 0;
    var aux;
  
    cpfRange.forEach((membercpf) => {
      if (membercpf[0] == cpf) {
        aux = count++;
      }
      count++;
    })
  
    aux++;
  
    const monthRange = ss.getRange(aux, 3, 1, 12).getValues();
  
    month = parseInt(month);
    
    var count_2 = 0;
  
    for (var i = month-1; i >= 0; i--) {
      if (monthRange[0][i].toUpperCase() == 'L' || monthRange[0][i].toUpperCase() == 'TAXA') {
        break;
      }
      count_2++;
    }
  
    if (count_2 >= 3) return false;
  
    return true;
  }
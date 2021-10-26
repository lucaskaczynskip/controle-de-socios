function sendPDF() {
    const member = memberExists();
  
    const date = Utilities.formatDate(member.hour, "GMT-3", "dd/MM/yyyy - HH:mm");
    
    switch(member.status){
      case 'Sócio':
      createSPDF(member.name, member.cpf, member.email, date, member.photo);
      break;
      case 'Dependente':
      createDPDF(member.name, member.cpfMember, member.cpf, member.email, date, member.relatives, member.photo);
      break;
    }
  }
   
  
function createSPDF(name, cpf, email, hour, img) {
 
  const docID = "1zQSoaNQJXz1INDe7lFBK3ovN1DrDiWJ-HmLe9CZnzRk"
  const folderID = "1M1Bnpm3CZsZQL7VInUdOd7s_ydd6emmy"
  const pdfID = "1F4zCIhkM_iCjcQhUS-39Tj90Mzt6MbO1"
  const docFile = DriveApp.getFileById(docID);
  const tempFolder = DriveApp.getFolderById(folderID);
  const pdfFolder = DriveApp.getFolderById(pdfID);
 
  const tempFile = docFile.makeCopy(tempFolder);
  const tempDocFile = DocumentApp.openById(tempFile.getId());
  const body = tempDocFile.getBody();

  var status = validateMonth(cpf);
  
  if (img == undefined){
    img = DriveApp.getFileById('1fPFrQOl2kLNrku_SYR-qI1PKNZkQhz-d').getBlob();
  }
  else{
    img = DriveApp.getFileById(img).getBlob();
  }
  
  replaceTextToImage(body, "{img}", img, 150)
  body.replaceText("{Nome}", name);
  body.replaceText("{CPF}", cpf);
  body.replaceText("{Carimbo de data/hora}", hour);
  body.replaceText("{Status}", status);
 
  var tables = body.getTables();
  var background = tables[0]
  background = background.getRow(0).getCell(0).setBackgroundColor('#000099');
  
  switch (status) {
    case "Em dia":
    background = background.setBackgroundColor('#009900');
    break;
    case "Atrasado":
    background = background.setBackgroundColor('#990000');
    break;
    case "Inativo":
    background = background.setBackgroundColor('#000000');
    break;
  }
 
  tempDocFile.saveAndClose();
 
  const pdfContentBlob = tempFile.getAs(MimeType.PDF);
  pdfFolder.createFile(pdfContentBlob).setName("New PDF");
  // Drive.Files.remove(tempFile.getId(), {supportsTeamDrives:true});
 
  GmailApp.createDraft(email, "Registro de acesso ao Clube piratini",
   "Olá " + name + "\nFoi registrado o seu acesso ao Clube piratini\nBem Vindo!", {
    attachments: [tempFile.getAs(MimeType.PDF)]
});
 
  var draft = GmailApp.getDrafts()[0];
  var msg = draft.send();
 
  return msg;
}

function createDPDF(name, cpfMember, cpf, email, hour, relatives, img){
  const docID = "1FlCy5skQbv7yaJ6IEyAu1jhUTgfyIBMUWbIb1NEgS3E";
  const folderID = "1M1Bnpm3CZsZQL7VInUdOd7s_ydd6emmy"
  const pdfID = "1F4zCIhkM_iCjcQhUS-39Tj90Mzt6MbO1"
  const docFile = DriveApp.getFileById(docID);
  const tempFolder = DriveApp.getFolderById(folderID);
  const pdfFolder = DriveApp.getFolderById(pdfID);

  const tempFile = docFile.makeCopy(tempFolder);
  const tempDocFile = DocumentApp.openById(tempFile.getId());
  const body = tempDocFile.getBody();

  var status = validateMonth(cpfMember);

  if (img == undefined){
    img = DriveApp.getFileById('1fPFrQOl2kLNrku_SYR-qI1PKNZkQhz-d').getBlob();
  }
  else{
    img = DriveApp.getFileById(img).getBlob();
  }

  replaceTextToImage(body, "{img}", img, 150)
  body.replaceText("{Nome}", name);
  body.replaceText("{CPF}", cpf);
  body.replaceText("{CPF sócio}", cpfMember);
  body.replaceText("{Carimbo de data/hora}", hour);
  body.replaceText("{relatives}", relatives);
  body.replaceText("{Status}", status);
 
  var tables = body.getTables();
  var background = tables[0]
  background = background.getRow(0).getCell(0).setBackgroundColor('#800080');

  switch (status) {
    case "Em dia":
    background = background.setBackgroundColor('#009900');
    break;
    case "Atrasado":
    background = background.setBackgroundColor('#990000');
    break;
    case "Inativo":
    background = background.setBackgroundColor('#000000');
    break;
  }
 

  tempDocFile.saveAndClose();
 
  const pdfContentBlob = tempFile.getAs(MimeType.PDF);
  pdfFolder.createFile(pdfContentBlob).setName("New PDF");
  // Drive.Files.remove(tempFile.getId(), {supportsTeamDrives:true});

  GmailApp.createDraft(email, "Registro de acesso ao Clube piratini",
   "Olá " + name + "\nFoi registrado o seu acesso ao Clube piratini\nBem Vindo!", {
    attachments: [tempFile.getAs(MimeType.PDF)]
});
 
  var draft = GmailApp.getDrafts()[0];
  var msg = draft.send();
 
  return msg;
}

function getIdFromUrl(url) { return url.match(/[-\w]{25,}/); }

function replaceTextToImage (body, searchText, image, width) {
  var next = body.findText(searchText);
  if (!next) return;
    var r = next.getElement();
    r.asText().setText("");
    var img = r.getParent().asParagraph().insertInlineImage(0, image);
    if (width && typeof width == "number") {
      var w = img.getWidth();
      var h = img.getHeight();
      img.setWidth(width);
      img.setHeight(width * h / w);
    }
    return next;
};

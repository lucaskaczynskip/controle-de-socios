function formReq() {
    var formReq = FormApp.openById('1LRUat5gXfJfO-MSf19sBSAA0W9gqRuaQHdmWJptrsoQ');
    ScriptApp.newTrigger('sendPDF')
      .forForm(formReq)
      .onFormSubmit()
      .create();
  }
  
  function formSoc() {
    var formSoc = FormApp.openById('1yekZhT1wmzXRG7NuJ1eqpqhDPTyfFMo033Je2PWb_FE');
    ScriptApp.newTrigger('alreadyExists')
      .forForm(formSoc)
      .onFormSubmit()
      .create();
  }
  
  function formDep() {
    var formDep = FormApp.openById('1yvWxvGGTashDeRVaQG3-S3gnVgDwGXXxRN8bgBbbdUw');
    ScriptApp.newTrigger('relativeAlreadyExists')
      .forForm(formDep)
      .onFormSubmit()
      .create();
  }
  
  function editSoc() {
    var formSoc = FormApp.openById('1vSB_ySnu0W3VL7eFTYNfI-yEdDVf0HDQx6FXr0ObcuU');
    ScriptApp.newTrigger('getNewEdit')
      .forForm(formSoc)
      .onFormSubmit()
      .create();
  }
  
  function editDep() {
    var formDep = FormApp.openById('1WgzR3M0AzsGrHTrcbUEWmephzMEVHcQbAoDXzimIz4k');
    ScriptApp.newTrigger('getNewEditD')
      .forForm(formDep)
      .onFormSubmit()
      .create();
  }
  
  function clearReq() {
    ScriptApp.newTrigger('deleteReq')
      .timeBased()
      .onWeekDay(ScriptApp.WeekDay.SUNDAY)
      .atHour(1)
      .create()
  }
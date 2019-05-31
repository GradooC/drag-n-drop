const input = document.querySelector('input');

const readFile = e => {
  const content = e.target.result;
  console.log(content);
  const val = content.match(/ФИЛИАЛ/);
  console.log(val);

  const wb = XLSX.utils.book_new();

  wb.Props = {
    Title: 'TEST',
    Author: 'Женя',
    Subject: 'test test',
    CreateDate: new Date()
  };

  wb.sheetNames.push('test sheet');

  const ws_data = [['hello'], ['world']];
  XLSX.utils.aoa;
};

const handleChosenFile = file => {
  const fileReader = new FileReader();
  fileReader.onloadend = readFile;
  fileReader.readAsText(file, 'CP1251');
};

input.onchange = e => {
  handleChosenFile(e.target.files[0]);
};

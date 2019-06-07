import XLSX from 'xlsx';
import './style.css';

const input = document.querySelector('input');
const dropZone = document.querySelector('#upload-container');

const getTitle = content => content.split('\n')[0].trim();

const readFile = e => {
  const content = e.target.result;

  // Create new workbook
  const wb = XLSX.utils.book_new();

  // Find the date
  const date = content.match(/\d{2}.\d{2}.\d{4}/)[0];
  const title = getTitle(content);

  // Separate text to cells content
  const lines = content.split('\n');
  const ws_data = lines.map(line => line.split('|').map(val => val.trim()));
  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  wb.Sheets[date] = ws;

  // Set workbook properties
  wb.Props = {
    Title: title,
    Author: 'Zhenya',
    Subject: title,
    CreateDate: new Date()
  };
  wb.SheetNames.push(date);
  
  // Set columns properties
  const wsCols = [
    { wch: 7 },
    { wch: 7 },
    { wch: 20 },
    { wch: 11 },
    { wch: 14 },
    { wch: 19 },
    { wch: 11 },
    { wch: 7 }
  ];
  ws['!cols'] = wsCols;

  // Write data to the file
  XLSX.writeFile(wb, `${title}.xlsx`);
};

// Handle chosen file
const handleChosenFile = file => {
  const fileReader = new FileReader();
  fileReader.onloadend = readFile;
  fileReader.readAsText(file, 'CP1251');
};

// Set onChange event
input.onchange = e => {
  const file = e.target.files[0];
  handleChosenFile(file);
};

// Set drop event
const preventDefaults = e => {
  e.preventDefault();
  e.stopPropagation();
};

// Prevent default drag'n'drop behavior
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropZone.addEventListener(eventName, preventDefaults, false);
});

dropZone.addEventListener('drop', e => {
  const file = e.dataTransfer.files[0];
  handleChosenFile(file);
});

import axios from 'axios';
import * as d3 from 'd3';
import { formInputRadio } from './formInputRadio';

// Creates a file list radio-button-group from files that can be visualized on the server.
// Includes legend tag.
export async function fileList(fieldsetClass = 'file-list') {
  const fileList = await requestFileList();
  const legend = d3.create('legend').text('Choose a file to visualize');
  const fieldset = d3.create('fieldset');
  fieldset.attr('class', fieldsetClass).append(() => legend.node());

  // For each retrieved filename add a radiobutton
  for (let fileName of fileList) {
    const radio = formInputRadio({
      name: fileName,
      radioGroup: 'file-list-radiogroup',
      labelText: fileName,
      cssClass: 'file-list-element',
    });
    fieldset.append(() => radio);
  }

  // Makes first radiobutton be checked without user interaction.
  fieldset.select('input').attr('checked', true);

  return fieldset.node();
}

// Returns value-property of selected radio-button
export function getCheckedFile() {
  return d3.select('.file-list-element input:checked').property('value');
}

// Requests list of to that can be visualized.
async function requestFileList() {
  const res = await axios.get('http://localhost:4567/files');
  return res.data;
}

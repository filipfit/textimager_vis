import * as d3 from 'd3';
import { getUniqueID } from '../UniqueID';

/*
Creates a checkbox linked to a label. 
Properties:
  name: "name"
*/
export function formCheckbox({ name, labelText = 'Label', cssClass } = {}) {
  const uid = getUniqueID();
  const container = d3.create('div').attr('class', 'form-checkbox-container ' + cssClass);
  const labelElement = d3.create('label').attr('for', uid).text(labelText);
  const inputElement = d3
    .create('input')
    .attr('type', 'checkbox')
    .attr('name', name)
    .attr('id', uid);
  container.append(() => inputElement.node());
  container.append(() => labelElement.node());
  return container.node();
}

// Gets name-properties of checked boxes.
export function getCheckedBoxes() {
  const checkedList = [];
  d3.selectAll('.form-checkbox-container input:checked').each(function () {
    checkedList.push(d3.select(this).property('name'));
  });
  return checkedList;
}

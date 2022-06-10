import * as d3 from 'd3';
import { getUniqueID } from '../UniqueID';

/*
Creates a radio-button linked to a label.
Properties:
  name: "radioGroup"
  value: "name"
*/
export function formInputRadio({ name, radioGroup, labelText = 'Label', cssClass }) {
  const uid = getUniqueID();
  const container = d3.create('div').attr('class', 'form-radio-container ' + cssClass);
  const labelElement = d3.create('label').attr('for', uid).text(labelText);
  const inputElement = d3
    .create('input')
    .attr('type', 'radio')
    .attr('name', radioGroup)
    .attr('id', uid)
    .attr('value', name);
  container.append(() => inputElement.node());
  container.append(() => labelElement.node());
  return container.node();
}

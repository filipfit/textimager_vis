import * as d3 from 'd3';
import { formCheckbox } from './formInputCheckbox';

// Creates a group of checkboxes with labels. Includes a legend tag.
export function checkboxList(formInputs, containerClass, legendText) {
  const legend = d3.create('legend').text(legendText);
  const fieldset = d3.create('fieldset');
  fieldset.attr('class', containerClass).append(() => legend.node());

  // For each element of formInputs create a checkbox with label.
  for (let formInput of formInputs)
    fieldset.append(() =>
      formCheckbox({
        name: formInput.name,
        labelText: formInput.label,
        cssClass: formInput.cssClass,
      })
    );

  return fieldset.node();
}

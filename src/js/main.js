import axios from 'axios';
import * as d3 from 'd3';
import { checkboxList } from './components/checkboxList';
import { fileList, getCheckedFile } from './components/fileList';
import { getCheckedBoxes } from './components/formInputCheckbox';
import form_inputs from './json/form_inputs.json';
import request_list from './json/request_list.json';
import { TextMarker } from './visualization/TextMarker';

const URL = 'http://localhost:4567';
const FILE_SELECTION_ANCHOR = d3.select('#file-selection-anchor');
const HIST_SELECTION_ANCHOR = d3.select('#histogram-selection-anchor');
const SUBMIT_BUTTON = d3.select('#btn--submit');
const VIS_ANCHOR = d3.select('#vis-anchor');
let DEBUG_BUTTON = d3.select('#debug-btn');

let data;

function histogram(data) {
  const height = 500;
  const values = Object.values(data);
  const barWidth = 20;
  const margin = 1;

  let scale = d3
    .scaleLinear()
    .domain([d3.min(values), d3.max(values)])
    .range([0, 500]);

  console.log(scale(values[0]));
  console.log(values, d3.min(values));

  let svg = d3
    .create('svg')
    .attr('height', height)
    .attr('width', barWidth * values.length);

  let group = svg
    .selectAll('g')
    .data(values)
    .enter()
    .append('g')
    .attr('transform', function (d, i) {
      return `translate(${i * barWidth}, 0)`;
    });

  group
    .append('rect')
    .attr('height', function (d) {
      return scale(d);
    })
    .attr('width', barWidth - margin);

  // group.append('text').attr('y', function (d) {
  //   return scale(d);
  // });

  return svg.node();
}

axios
  .get(
    'http://localhost:4567/histogram?type=pos&file=text/xmi/18001.xmi.gz.xmi.gz&filter=100'
  )
  .then((res) => {
    data = res.data.result;

    VIS_ANCHOR.append(() => histogram(data));
  });

/* fileList().then((d) => {
  FILE_SELECTION_ANCHOR.append(() => d);
});

HIST_SELECTION_ANCHOR.append(() =>
  checkboxList(form_inputs.textmark, 'textmark-selection', 'Textmark')
);

DEBUG_BUTTON.on('click', function () {
  collectFormData();
  axios
    .get(
      'http://localhost:4567/histogram?type=pos&file=text/xmi/18001.xmi.gz.xmi.gz&filter=100'
    )
    .then((res) => console.log(res.data.result));
});

// Sends request to backend for data required to visualize.
SUBMIT_BUTTON.on('click', function (e) {
  e.preventDefault();
  const { vis, file } = collectFormData();

  for (let v of vis) {
    const req = request_list[v];

    axios
      .get(URL + req['route'], {
        params: { file: file, type: req['type'] },
      })
      .then((res) => {
        console.log(res.data.Textmark);
        TextMarker.textmark(res.data, VIS_ANCHOR);
      });
  }
});

function collectFormData() {
  const file = getCheckedFile();
  const checkboxes = getCheckedBoxes();
  return { vis: checkboxes, file: file };
}
 */

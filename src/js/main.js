import * as d3 from 'd3';
import { TextMarker } from './TextMarker';

import axios from 'axios';
import { selectAll } from 'd3';

function changeBackground(color, selection) {
  selection.style('background-color', color);
}

let anchor = d3.select('.anchor');
anchor.text('This is a div!');

const test1 = 'http://localhost:4567/onetweet/943757026051620864';
const test2 = 'http://localhost:4567/test';
const testPostman = 'https://defc6baa-5f7f-4858-8de7-b1fadd9a970f.mock.pstmn.io/test';

axios.get(test1).then((res) => {
  console.log(res.data);
  TextMarker.markNamedEntities(res.data, anchor);
  changeBackground('lightgreen', anchor.selectAll('.PER'));
  changeBackground('orange', anchor.selectAll('.ORG'));
  changeBackground('lightblue', anchor.selectAll('.LOC'));
  changeBackground('lightseagreen', anchor.selectAll('.MISC'));
});

// axios.get('http://localhost:4567/onetweet/943757026051620864').then((res) => {
//   console.log(res.data);
//   TextMarker.markNamedEntities(res.data, anchor);
// });

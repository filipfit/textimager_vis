import * as d3 from 'd3';
import { TextMarker } from './TextMarker';

import axios from 'axios';

let anchor = d3.select('.anchor');
anchor.text('This is a div!');

const test1 = 'http://localhost:4567/onetweet/943757026051620864';
const test2 = 'http://localhost:4567/test';

// axios
//   .get('https://defc6baa-5f7f-4858-8de7-b1fadd9a970f.mock.pstmn.io/test')
//   .then((res) => {
//     console.log(res.data);
//     TextMarker.markNamedEntities(res.data, anchor);
//   });

axios.get('http://localhost:4567/onetweet/943757026051620864').then((res) => {
  console.log(res.data);
  TextMarker.markNamedEntities(res.data, anchor);
});

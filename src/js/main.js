import * as d3 from 'd3';
import data from '@/data/json/test.json';
import { TextMarker } from './TextMarker';
import { curveLinearClosed } from 'd3';
import axios from 'axios';

let anchor = d3.select('.anchor');
anchor.text('This is a div!');

TextMarker.markNamedEntities(data, anchor);

let el = document.getElementsByClassName('anchor');
console.log(el[0].innerHTML);
console.log(el[0].innerText);

axios.get('https://defc6baa-5f7f-4858-8de7-b1fadd9a970f.mock.pstmn.io/test');

axios.get('http://localhost:4567/test').then((res) => console.log(res.data));

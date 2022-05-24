import * as d3 from 'd3';
import data from '@/data/json/test.json';
import { markedHTML, markNamedEntities } from './mark_text';

console.log('Hello World!');

let anchor = d3.select('.anchor');
anchor.text('This is a div!');

markNamedEntities(data, anchor);

let el = document.getElementsByClassName('anchor');
console.log(el[0].innerHTML);
console.log(el[0].innerText);

// NOCOM

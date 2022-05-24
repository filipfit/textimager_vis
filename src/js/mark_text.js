import { extractNamedEntities, getText } from './preprocess';

export function insertString(str, index, strToAdd) {
  return str.slice(0, index) + strToAdd + str.slice(index, str.length);
}

/* @param text: string
 * @param markings: {begin: int, end: int, class_: string}[]
 */
export function markedHTML(text, markings) {
  let indexOffset = 0;
  let markedText = text;

  for (let marking of markings) {
    const tag1 = `<span class="${marking.class_}">`;
    const tag2 = '</span>';

    markedText = insertString(markedText, indexOffset + marking.begin, tag1);
    indexOffset += tag1.length;
    markedText = insertString(markedText, indexOffset + marking.end, tag2);
    indexOffset += tag2.length;
  }
  return markedText;
}

export function markNamedEntities(data, el) {
  const text = getText(data);
  const markings = extractNamedEntities(data);
  el.html(markedHTML(text, markings));
  el.selectAll('.NER').style('background-color', 'pink');
}

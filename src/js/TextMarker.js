import { extractNamedEntities, getText } from './preprocess';

/* TextMarker
 *
 * @date 26.05.2022
 *
 * @author Filip Fitzermann
 *
 * Helper class containing methods used to generate marked text HTML
 */
export class TextMarker {
  /**
   * Inserts a string into another string at given index.
   * @param {string} str String to insert
   * @param {number} index Index at which to insert
   * @param {string} strToInsert String to insert
   * @static
   * @returns {string} Returns the string after insertion.
   */
  static insertString(str, index, strToInsert) {
    return str.slice(0, index) + strToInsert + str.slice(index, str.length);
  }

  /**
   * Surrounds specified parts of a string with HTML span tags. Each span tag can have a specified
   *    class attrbiute. Useful for preparing text to be marked in different colors.
   * @param {string} text Text to be marked
   * @param {{begin: number, end: number, type: string}[]} markings List containing Objects with marking information.
   *    begin: Starting index of to be marked word
   *    end: Ending index of to be marked word
   *    type: Extra information to distinguish types of marked. Mostly used to be able to mark types of words differently.
   * @static
   * @returns Original text but with added span tags which each have specified class attributes.
   */
  static markedHTML(text, markings) {
    let indexOffset = 0;
    let markedText = text;

    for (let marking of markings) {
      const tag1 = `<span class="${marking.type}">`;
      const tag2 = '</span>';

      markedText = insertString(markedText, indexOffset + marking.begin, tag1);
      indexOffset += tag1.length;
      markedText = insertString(markedText, indexOffset + marking.end, tag2);
      indexOffset += tag2.length;
    }
    return markedText;
  }

  /**
   * 
   * @param {*} data 
   * @param {*} element 
   */
  static markNamedEntities(data, element) {
    const text = getText(data);
    const markings = extractNamedEntities(data);
    element.html(markedHTML(text, markings));
    element.selectAll('.NER').style('background-color', 'pink');
  }
}

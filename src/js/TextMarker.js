/** TextMarker
 *
 * @date 26.05.2022
 *
 * @author Filip Fitzermann
 *
 * Class containing methods used to generate marked text HTML.
 */
export class TextMarker {
  static markClassName = 'MARK';

  /**
   * @typedef marking
   * @type {object}
   * @property {number} begin - Starting index of marking.
   * @property {number} end - Ending index of marking.
   * @property {string} type - Type of marking: CSS-Class associated with that type of marking.
   */

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
   * @param {string} text Text to be marked.
   * @param {marking[]} markings List containing Objects with marking information.
   * @static
   * @returns Original text but with added span tags which each have specified class attributes.
   */
  static markedHTML(text, markings) {
    let indexOffset = 0;
    let markedText = text;

    for (let marking of markings) {
      const tag1 = `<span class="${TextMarker.markClassName} ${marking.type}">`;
      const tag2 = '</span>';

      markedText = TextMarker.insertString(markedText, indexOffset + marking.begin, tag1);
      indexOffset += tag1.length;
      markedText = TextMarker.insertString(markedText, indexOffset + marking.end, tag2);
      indexOffset += tag2.length;
    }
    return markedText;
  }

  /**
   * Generate marked text and insert it into an html element
   * @param {object} data - Object containing Text to mark and marking information.
   * @param {string} data.Text - Text to mark.
   * @param {marking[]} data.NamedEntities - List of markings.
   * @param {HTMLElement | D3.Selection} element - HTML element to insert the generated marked text into.
   * @static
   */
  static markNamedEntities(data, element) {
    const text = data.Text;
    const markings = data.NamedEntities;
    element.html(TextMarker.markedHTML(text, markings));
    element.selectAll(`.${TextMarker.markClassName}`).style('background-color', 'pink');
  }
}

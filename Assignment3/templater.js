/**
 * CSE183 Assignment 3 - Basic
 */
class Templater {
  /**
   * Create a templater
   * @param {string} template - A {{ }} tagged string
   */
  constructor(template) {
    this.template = template;
  }


  /**
   * Apply map to template to generate string
   * @param {object} map Object with propeties matching tags in template
   * @param {boolean} strict Throw an Error if any tags in template are
   *     not found in map
   * @return {string} template with all tags replaced
   * @throws An Error if strict is set and any tags in template are not
   *     found in map
   *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions - used to learn regular expressions
   */
  apply(map, strict) {
    if (this.template == undefined) {
      return undefined;
    }
    // find and replace all provided tags in template
    let replaced = '';

    const key = Object.keys(map); // array of keys
    for (let i = 0; i < key.length; i++) {
      const re = new RegExp('{{' + key[i] + '}}', 'g');
      replaced = this.template.replace(re, map[key[i]]);
      this.template = replaced;
    }

    // tags not foudn in maps
    if (replaced.match(/{{\w*}}/i)) {
      if (strict) {
        throw new Error('Error');
      }
    } else {
      // remove tag from template that was not supplied in map
      replaced = replaced.replace(/{{\w*}}\s*/i, '');
    }
    // removes the tag with any whitespace
    replaced = replaced.replace(/{{\w*\s*}}\s*/i, '');
    return replaced;
  }
}
module.exports = Templater;

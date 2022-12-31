class SelectorError extends Error {
  static uniquePart() {
    return new SelectorError('Element, id and pseudo-element should not occur more then one time inside the selector');
  }

  static wrongOrder() {
    return new SelectorError('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element" if selector parts arranged in an invalid order');
  }
}

module.exports = { SelectorError };

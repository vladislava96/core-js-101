const { AttrSelector } = require('./attr-selector');
const { ClassSelector } = require('./class-selector');
const { CombineSelector } = require('./combine-selector');
const { ElementSelector } = require('./element-selector');
const { IdSelector } = require('./id-selector');
const { PseudoClassSelector } = require('./pseudo-class-selector');
const { PseudoElementSelector } = require('./pseudo-element-selector');
const { SelectorError } = require('./selector-error');

class CompositeSelector {
  constructor() {
    this.elementSelector = null;
    this.idSelector = null;
    this.classSelectors = [];
    this.attrSelectors = [];
    this.pseudoClassSelectors = [];
    this.pseudoElementSelector = null;
    this.combineSelectors = [];
  }

  element(value) {
    if (this.elementSelector !== null) {
      throw SelectorError.uniquePart();
    }

    if (
      this.idSelector !== null
      || this.classSelectors.length > 0
      || this.attrSelectors.length > 0
      || this.pseudoClassSelectors.length > 0
      || this.pseudoElementSelector !== null
      || this.combineSelectors.length > 0
    ) {
      throw SelectorError.wrongOrder();
    }

    this.elementSelector = new ElementSelector(value);

    return this;
  }

  id(value) {
    if (this.idSelector !== null) {
      throw SelectorError.uniquePart();
    }

    if (
      this.classSelectors.length > 0
      || this.attrSelectors.length > 0
      || this.pseudoClassSelectors.length > 0
      || this.pseudoElementSelector !== null
      || this.combineSelectors.length > 0
    ) {
      throw SelectorError.wrongOrder();
    }

    this.idSelector = new IdSelector(value);

    return this;
  }

  class(value) {
    if (
      this.attrSelectors.length > 0
      || this.pseudoClassSelectors.length > 0
      || this.pseudoElementSelector !== null
      || this.combineSelectors.length > 0
    ) {
      throw SelectorError.wrongOrder();
    }

    this.classSelectors.push(new ClassSelector(value));

    return this;
  }

  attr(value) {
    if (
      this.pseudoClassSelectors.length > 0
      || this.pseudoElementSelector !== null
      || this.combineSelectors.length > 0
    ) {
      throw SelectorError.wrongOrder();
    }

    this.attrSelectors.push(new AttrSelector(value));

    return this;
  }

  pseudoClass(value) {
    if (this.pseudoClassSelectors.map((selector) => selector.value).includes(value)) {
      return this;
    }

    if (this.pseudoElementSelector !== null || this.combineSelectors.length > 0) {
      throw SelectorError.wrongOrder();
    }

    this.pseudoClassSelectors.push(new PseudoClassSelector(value));

    return this;
  }

  pseudoElement(value) {
    if (this.pseudoElementSelector !== null) {
      throw SelectorError.uniquePart();
    }

    if (this.combineSelectors.length > 0) {
      throw SelectorError.wrongOrder();
    }

    this.pseudoElementSelector = new PseudoElementSelector(value);

    return this;
  }

  combineWith(combinator, selector2) {
    this.combineSelectors.push(new CombineSelector(combinator, selector2));

    return this;
  }

  stringify() {
    return [
      this.elementSelector !== null ? this.elementSelector.stringify() : '',
      this.idSelector !== null ? this.idSelector.stringify() : '',
      this.classSelectors.map((selector) => selector.stringify()).join(''),
      this.attrSelectors.map((selector) => selector.stringify()).join(''),
      this.pseudoClassSelectors.map((selector) => selector.stringify()).join(''),
      this.pseudoElementSelector !== null ? this.pseudoElementSelector.stringify() : '',
      this.combineSelectors.map((selector) => selector.stringify()).join(''),
    ].join('');
  }
}

module.exports = { CompositeSelector };

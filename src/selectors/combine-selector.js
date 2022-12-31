class CombineSelector {
  constructor(combinator, selector) {
    this.combinator = combinator;
    this.selector = selector;
  }

  stringify() {
    return ` ${this.combinator} ${this.selector.stringify()}`;
  }
}

module.exports = { CombineSelector };

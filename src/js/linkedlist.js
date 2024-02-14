import Node from './node.js';

class LinkedList {
  constructor() {
    this.HEAD = null;
    this.length = 0;
  }

  append(value) {
    const newNode = new Node(value);
    this.length++;

    if (this.HEAD === null) {
      this.HEAD = newNode;
    } else {
      let pointer = this.HEAD;
      while (pointer.nextNode !== null) {
        pointer = pointer.nextNode;
      }

      pointer.nextNode = newNode;
    }
  }

  prepend(value) {
    const newNode = new Node(value);
    length++;
    if (this.HEAD === null) {
      return (this.HEAD = newNode);
    }
    newNode.nextNode = this.HEAD;
    this.HEAD = newNode;
  }

  size() {
    return this.length;
  }

  head() {
    return this.HEAD;
  }

  tail() {
    let pointer = this.HEAD;
    while (pointer.nextNode !== null) {
      pointer = pointer.nextNode;
    }
    return pointer;
  }

  at(index) {
    let pointer = this.HEAD;
    for (let i = 0; i < index; i++) {
      pointer = pointer.nextNode;
    }
    return pointer;
  }

  pop() {
    this.at(this.size() - 2).nextNode = null;
    this.length--;
  }

  contains(value) {
    let pointer = this.HEAD;
    while (pointer.nextNode !== null) {
      if (pointer.value === value) return true;
      pointer = pointer.nextNode;
    }
    return pointer.value === value;
  }

  toString() {
    let pointer = this.HEAD;
    let string = '';
    while (pointer.nextNode !== null) {
      string += `(${pointer.value}) -> `;
      pointer = pointer.nextNode;
    }
    string += `(${pointer.value}) -> null`;
    return string;
  }

  insertAt(value, index) {
    const newNode = new Node(value);
    this.length++;
    let pointer = this.HEAD;
    for (let i = 0; i < index - 1; i++) {
      pointer = pointer.nextNode;
    }
    const { nextNode } = pointer;
    pointer.nextNode = newNode;
    newNode.nextNode = nextNode;
  }

  removeAt(index) {
    let pointerOne = this.HEAD;
    this.length--;
    for (let i = 0; i < index - 1; i++) {
      pointerOne = pointerOne.nextNode;
    }

    let pointerTwo = this.HEAD;
    for (let i = 0; i < index + 1; i++) {
      pointerTwo = pointerTwo.nextNode;
    }
    pointerOne.nextNode = pointerTwo;
  }
}

export default LinkedList;

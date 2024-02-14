import LinkedList from './linkedlist';

export default class HashMap {
  constructor(size) {
    this.size = size;
    this.array = new Array(this.size).fill(null).map(() => new LinkedList());
  }

  set(key, value) {
    const loadFactor = this.length() / this.size;
    if (loadFactor >= 0.75) {
      const oldPairs = this.entries();
      this.size *= 2;
      this.array = new Array(this.size).fill(null).map(() => new LinkedList());
      oldPairs.forEach((element) => {
        this.set(element[0], element[1]);
      });
    }
    const hashedItem = this._hash(key) % this.size;
    if (
      this.array[hashedItem].HEAD === null ||
      key !== this.array[hashedItem].HEAD.value[0]
    ) {
      this.array[hashedItem].append([key, value]);
    } else {
      this.array[hashedItem].HEAD.value[1] = value;
    }
  }

  length() {
    let count = 0;
    this.array.forEach((el) => {
      count += el.size();
    });
    return count;
  }

  get(key) {
    const index = this._hash(key);
    if (this.has(key)) {
      return this.array[index].find(key);
    }
    return null;
  }

  has(key) {
    const index = this._hash(key);
    return this.array[index].contains(key);
  }

  entries() {
    const arr = [];
    this.array.forEach((el) => {
      let temp = el.HEAD;
      while (temp !== null) {
        arr.push(temp.value);
        temp = temp.nextNode;
      }
    });
    return arr;
  }

  remove(key) {
    const index = this._hash(key);
    if (this.has(key)) {
      this.array[index].delete(key);
      return true;
    }
    return false;
  }

  clear() {
    this.size = 16;
    this.array = new Array(this.size).fill(null).map(() => new LinkedList());
  }

  key() {
    const arr = [];

    this.array.forEach((el) => {
      let temp = el.HEAD;
      while (temp !== null) {
        arr.push(temp.value[0]);
        temp = temp.nextNode;
      }
    });

    return arr;
  }

  values() {
    const arr = [];

    this.array.forEach((el) => {
      let temp = el.HEAD;
      while (temp !== null) {
        arr.push(temp.value[1]);
        temp = temp.nextNode;
      }
    });

    return arr;
  }

  _hash(key) {
    let hashCode = 0;

    for (let i = 0; i < key.length; i++) {
      hashCode += key.charCodeAt(i);
    }
    return hashCode;
  }
}

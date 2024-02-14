class Node {
  constructor(value) {
    this.value = value || null;
    this.nextNode = null;
  }

  changeVal(value) {
    this.value = value;
  }
}

export default Node;

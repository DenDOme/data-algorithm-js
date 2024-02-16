import NodeTree from './nodeTree';

export default class BinaryTree {
  constructor(array) {
    this.array = this._parseArray(array);
    this.root = this.buildTree(this.array);
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) {
      return null;
    }
    const mid = parseInt((start + end) / 2);
    const node = new NodeTree(array[mid]);
    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);
    return node;
  }

  prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  insert(value, temp = this.root) {
    if (temp === null) {
      temp = new NodeTree(value);
      return temp;
    }

    if (value < temp.value) {
      temp.left = this.insert(value, temp.left);
    } else {
      temp.right = this.insert(value, temp.right);
    }
    return temp;
  }

  delete(value, temp = this.root) {
    if (temp === null) {
      return temp;
    }

    if (value < temp.value) {
      temp.left = this.delete(value, temp.left);
    } else if (value > temp.value) {
      temp.right = this.delete(value, temp.right);
    } else {
      if (temp.left === null) {
        return temp.right;
      }
      if (temp.right === null) {
        return temp.left;
      }

      temp.value = this._findNextSmallestRightData(temp.right);

      // Delete the copied node from minData()
      temp.right = this.delete(temp.value, temp.right);
    }
    return temp;
  }

  find(value, temp = this.root) {
    if (temp.value === value || temp.value === null) {
      return temp;
    }
    if (value < temp.value) {
      return this.find(value, temp.left);
    }
    return this.find(value, temp.right);
  }

  _findNextSmallestRightData(root) {
    let min = root.value;
    let newRoot = root;

    // Search for a left node with no left children.
    while (newRoot.left !== null) {
      min = root.left.value;
      newRoot = root.left;
    }

    return min;
  }

  _parseArray(array) {
    array.sort((a, b) => (a > b ? 1 : -1));
    return array.filter((value, index) => array.indexOf(value) === index);
  }

  log() {
    console.log(this.root);
  }
}

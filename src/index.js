import './main.css';
import BinaryTree from './js/binaryTree';

const newTree = new BinaryTree([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
]);
console.log(newTree.find(9));
newTree.prettyPrint(newTree.root);

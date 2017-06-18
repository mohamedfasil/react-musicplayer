
const Node = function(data) {
  this.data = data;
  this.previous = null;
  this.next = null;
};

class DoublyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  add(data) {
  	const node = new Node(data);
    if (this.length) {
      this.tail.next = node;
      node.previous = this.tail;
      this.tail = node;
    } else {
      this.head = node;
      this.tail = node;
    }
    this.length++;
    return node;
  }

  findElementAt(index) {
    let currentNode = this.head;
    const length = this.length;
    let count = 0;
    const message = {failure: `Failure: node not at position ${index}`};
    
    // If the index is invalid throw an error
    if (length === 0 || index < 0 || index >= length) {
      throw new Error(message.failure);
    }
    
    // Otherwise do normal stuff
    while (count < index) {
      currentNode = currentNode.next;
      count++;
    }
    return currentNode;
  }

  findRandomNode(current) {
  	let randomNode = this.findElementAt(this.getRandom());
  	while (current === randomNode) {
  		randomNode = this.findElementAt(this.getRandom());
  	}
  	return randomNode;
  }

  getRandom() {
  	const min = 0;
  	const max = this.length;
  	return Math.floor(Math.random() * (max - min));
  }
}

export default DoublyLinkedList;
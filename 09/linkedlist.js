let CLinkedList = function() {
  let obj = Object.create(CLinkedList.prototype);

  this.head = null;
  this.tail = null;

  return obj;
};

let Node = function(value, next, prev) {
  this.value = value;
  this.next = next;
  this.prev = prev;
};

// Add nodes methods

CLinkedList.prototype.addToHead = function(value) {
  const newNode = new Node(value, this.head, this.tail);
  if (this.head) this.head.prev = newNode;
  else this.tail = newNode;
  this.head = newNode;
  this.tail.next = this.head;
};

CLinkedList.prototype.addToTail = function(value) {
  const newNode = new Node(value, this.head, this.tail);
  if (this.tail) this.tail.next = newNode;
  else this.head = newNode;
  this.tail = newNode;
  this.head.prev = this.tail;
};

// Remove nodes methods
CLinkedList.prototype.removeHead = function() {
  if (!this.head) return null;
  let value = this.head.value;
  this.head = this.head.next;

  if (this.head) this.head.prev = this.tail;
  else this.tail = null;
  this.tail.next = this.head;

  return value;
};

CLinkedList.prototype.removeTail = function() {
  if (!this.tail) return null;
  let value = this.tail.value;
  this.tail = this.tail.prev;

  if (this.tail) this.tail.next = this.head;
  else this.head = null;
  this.head.prev = this.tail;

  return value;
};

module.exports = {
  CLinkedList
};

class Node{
    constructor(value,level,id){
        this.value = value;
        this.next = null;
        this.level = level;
        this.id = id;
    }
}

export class Queue{
    constructor(){
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    enqueue(value,level,id){
        const newNode = new Node(value,level,id);

        if(this.size === 0) this.first = newNode;
        else this.last.next = newNode;
        this.last = newNode;   
        return ++this.size;  
    }

    dequeue(){
        if(this.first==null) return;
        this.size--;
        const firstNode = this.first;
        this.first = this.first.next;
        firstNode.next=null;
        return {value:firstNode.value,level:firstNode.level,id:firstNode.id};
    }
}
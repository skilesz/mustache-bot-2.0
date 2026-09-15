// Queue class
export class Queue<T> {
    // Private vars
    private items: T[] = [];

    // enqueue()
    enqueue(item: T): void {
        this.items.push(item);
    }

    // dequeue()
    dequeue(): T | undefined {
        return this.items.shift();
    }

    // peek()
    peek(): T | undefined {
        return this.items[0];
    }

    // size()
    get size(): number {
        return this.items.length;
    }

    // clear()
    clear(): void {
        this.items = [];
    }
}
// IMPORTS
import { describe, expect, it } from "vitest";

import { Queue } from "../audio/queue.js";



// Queue Tests
describe("Queue", () => {
    // Starts empty
    it("starts empty", () => {
        const queue = new Queue<string>();

        expect(queue.size).toBe(0);
        expect(queue.peek()).toBeUndefined();
    });

    // Enqueues and dequeues items in FIFO order
    it("enqueues and dequeues items in FIFO order", () => {
        const queue = new Queue<string>();

        queue.enqueue("A");
        queue.enqueue("B");
        queue.enqueue("C");

        expect(queue.size).toBe(3);

        expect(queue.dequeue()).toBe("A");
        expect(queue.dequeue()).toBe("B");
        expect(queue.dequeue()).toBe("C");

        expect(queue.size).toBe(0);
    });

    // Peek returns the next item without removing it
    it("peek returns the next item without removing it", () => {
        const queue = new Queue<string>();

        queue.enqueue("A");
        queue.enqueue("B");

        expect(queue.peek()).toBe("A");
        expect(queue.size).toBe(2);

        expect(queue.peek()).toBe("A");
        expect(queue.size).toBe(2);
    });

    // Clears removes all items
    it("clear removes all items", () => {
        const queue = new Queue<string>();

        queue.enqueue("A");
        queue.enqueue("B");

        queue.clear();

        expect(queue.size).toBe(0);
        expect(queue.peek()).toBeUndefined();
    });

    // toArray returns the queue contents without exposing the internal array
    it("toArray returns the queue contents without exposing the internal array", () => {
        const queue = new Queue<string>();

        queue.enqueue("A");
        queue.enqueue("B");

        const items = queue.toArray();

        expect(items).toEqual(["A", "B"]);

        items.push("C");

        expect(queue.size).toBe(2);
        expect(queue.toArray()).toEqual(["A", "B"]);
    });
});
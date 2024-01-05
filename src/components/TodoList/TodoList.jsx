import React, { useEffect, useState } from "react";
import AddTodo from "../AddtTodo/AddTodo";
import Todo from "../Todo/Todo";
import styles from "./TodoList.module.css";

export default function TodoList({ filter }) {
    const [todos, setTodos] = useState(() => readTodosFromLocalStorage());
    // const [todos, setTodos] = useState(readTodosFromLocalStorage); //same
    // const [todos, setTodos] = useState(readTodosFromLocalStorage()); //not same
    // if not set it as call-back, it will be called every time add item

    const handleAdd = (todo) => setTodos([...todos, todo]);
    const handleUpdate = (updated) =>
        setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
    const handleDelete = (deleted) =>
        setTodos(todos.filter((t) => t.id !== deleted.id));

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const filtered = getFilteredItems(todos, filter);

    return (
        <section className={styles.container}>
            <ul className={styles.list}>
                {filtered.map((item) => (
                    <Todo
                        key={item.id}
                        todo={item}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                ))}
            </ul>

            <AddTodo onAdd={handleAdd} />
            {/* updated new todo in todos */}
        </section>
    );
}

function readTodosFromLocalStorage() {
    // console.log("readTodosFromLocalStorage");
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
    // if local storage has todos? -> parse to JSON
}

function getFilteredItems(todos, filter) {
    if (filter === "all") {
        return todos;
    }
    return todos.filter((todo) => todo.status === filter);
}

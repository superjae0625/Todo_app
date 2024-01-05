import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; //unique id
import styles from "./AddTodo.module.css";

export default function AddTodo({ onAdd }) {
    const [text, setText] = useState("");
    const handleChange = (e) => setText(e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault(); //prevent re-freshing
        if (text.trim().length === 0) {
            return;
        } //if enter empty text, do not add
        onAdd({ id: uuidv4(), text, status: "active" });
        setText(""); //clear text
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                className={styles.input}
                type="text"
                placeholder="Add Todo"
                value={text}
                onChange={handleChange}
            />
            <button className={styles.button}>Add</button>
        </form>
    );
}

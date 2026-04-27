"use client";
import { useState , useEffect} from "react";
import styles from "../page.module.css";
import shared from "../shared.module.css";
import Link from "next/link";

type Todo = { _id: string; name: string; id: number };

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  useEffect(()=> {
    fetch("${process.env.NEXT_PUBLIC_API_URL}/data", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res)=>res.json())
    .then((result)=> setTodos(result.data))
    .catch((err)=>console.log(err))
  },[]);
  
  function addTodos(){
    if (!name.trim()) return;

  fetch("${process.env.NEXT_PUBLIC_API_URL}/data", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      id: Date.now(),
    }),
  })
    .then((res) => res.json())
    .then((newTodo) => {
      setTodos([...todos, newTodo]);
      setName("");
    })
    .catch((err) => console.log(err));
  }
  function deleteTodos(id: number){
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/${id}`,{
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(()=>{
      setTodos(todos.filter((t)=>t.id !== id));
    })
    .catch((err)=>console.log(err));
  }
  function updateTodos(id:number){
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ name: editName }),
  })
    .then((res) => res.json())
    .then((updated) => {
      setTodos(
        todos.map((t) => (t.id === id ? updated.data : t))
      );
      setEditId(null);
      setEditName("");
    })
    .catch((err) => console.log(err));
  }


  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Todo List</h1>
        <div className={styles.inputRow}>
          <input
            className={styles.input}
            type="text"
            placeholder="Add a new todo..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className={styles.addBtn} onClick={addTodos}>Add</button>
        </div>

        <ul className={styles.list}>
          {todos.map((todo) => (
            <li key={todo._id} className={styles.item}>
              {editId === todo._id ? (
                <>
                  <input
                    className={styles.input}
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <button className={styles.saveBtn} onClick={() => updateTodos(todo.id)}>Save</button>
                  <button className={styles.cancelBtn} onClick={() => setEditId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span className={styles.todoName}>{todo.name}</span>
                  <div className={styles.actions}>
                    <button className={styles.editBtn} onClick={() => { setEditId(todo._id); setEditName(todo.name); }}>Edit</button>
                    <button className={styles.deleteBtn} onClick={() => deleteTodos(todo.id)}>Delete</button>
                  </div>
                </>
                
              )}
            </li>
          ))}
          <Link href="/login" className={shared.btn}>Log out</Link>
        </ul>
      </div>
    </div>
  );
}

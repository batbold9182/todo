"use client";
import Link from "next/link";
import styles from "../shared.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Register() {
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter();
    async function handleSignUp(){
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name,email,password}),
        });
        const data = await res.json();
        if(res.ok){
            console.log("success");
            alert("Successfully created");
            router.push("/login");
        } else {
            console.log(data.message);
            alert("Failed to signup");
        }
        
    }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create account</h1>
        <p className={styles.subtitle}>Sign up to get started</p>

        <div className={styles.field}>
          <label className={styles.label}>Name</label>
          <input className={styles.input} value={name} onChange={(e)=> setName(e.target.value)} placeholder="John Doe" />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input className={styles.input} value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="you@example.com" />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Password</label>
          <input className={styles.input} value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="••••••••" />
        </div>

        <button className={styles.btn} onClick={handleSignUp}>Create account</button>

        <p className={styles.footer}>
          Already have an account?{" "}
          <Link href="/login" className={styles.link}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

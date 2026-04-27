"use client";
import Link from "next/link";
import styles from "../shared.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    async function handleLogin(){
        const res = await fetch("${process.env.NEXT_PUBLIC_API_URL}/auth/login",{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email,password}),
        });
        const data = await res.json();
        if(res.ok) {
            localStorage.setItem("token" , data.token);
            router.push("/todos");
        } else {
            console.log(data.message);
        }
        
        
    }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Sign in to your account</p>

        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input className={styles.input} value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="you@example.com" />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Password</label>
          <input className={styles.input} value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="********"/>
        </div>

        <button className={styles.btn} onClick={handleLogin}>Sign in</button>

        <p className={styles.footer}>
          Don&apos;t have an account?{" "}
          <Link href="/register" className={styles.link}>Register</Link>
        </p>
      </div>
    </div>
  );
}

'use client'
import Image from "next/image";
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  const [task, setTask] = useState('');
  const [editid, setEditid] = useState(null)

    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:8000/gettask/');

      if (!response.ok) {
        console.log("Http Error")
      }
      else {
        const result = await response.json()
        console.log("Working: ", result)
        setData(result.ss);
      }

    }

  useEffect(() => {
    fetchData()
  }, [])

  console.log("Value: ", task)

  const CreateOrUpdateRecord = async (e) => {
    e.preventDefault()

    const data = {
      task : task
    }

    try{
      let url =  'http://127.0.0.1:8000/createtask/';
      let method = "POST";

      if (editid){
        url = `http://127.0.0.1:8000/updatetask/${editid}/`;
        method = "PUT"
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type':"application/json",
        },
        body: JSON.stringify(data)
      })

      if (response.ok){
        const result = await response.json()
        console.log("Created")
        setTask('')
        fetchData();
      }
      else{
        console.log("Failed")
      }

    } catch (error) {
      console.log("Error" , error)
    }
  }

  const handleEdit = (record) => {
    setTask(record.task);
    setEditid(record.id);
  }

  const deleteTask = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/deletetask/${editid}/`, {
      method:"DELETE",
    })

    if (response.ok){
      console.log("Deleted")
      fetchData()
    }
    else{
      console.log("Failed")
    }
  }

  return (
    <main className="">
      <h1 className="text-4xl font-extrabold tracking-wide text-center pt-5 mb-3">Todo App </h1>
      <form onSubmit={CreateOrUpdateRecord} style={{ display: "flex", justifyContent: "space-evenly", width: "80%", margin: "auto auto" }}>
        <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Enter Your Task" className="rounded border px-16 p-2" style={{ width: "80%" }} />

        <button type="submit">{editid ? "Update" : "Create"} Task</button>
      </form>

      <h2 className="text-2xl font-extrabold tracking-wide text-center pt-5 mb-3">All Tasks</h2>

      <table className="border-collapse border mt-3 border-slate-500 " style={{ width: "80%", margin: "auto auto" }}>
        <thead>
          <tr>
            <th className="border border-slate-600 text-xl p-3">Sr. No.</th>
            <th className="border border-slate-600 text-xl p-3">Task</th>
            <th className="border border-slate-600 text-xl p-3">Date Created</th>
            <th className="border border-slate-600 text-xl p-3">Actions</th>

          </tr>
        </thead>
        <tbody>
        {data && data.map((record, index) => (
          <tr key={record}>
            <td className="border border-slate-700 px-3 p-2">{index+1}</td>
            <td className="border border-slate-700 px-3 p-2">{record.task}</td>
            <td className="border border-slate-700 px-3 p-2">{record.created_date}</td>
            <td className="border border-slate-700 px-3 p-2">
              <button onClick={() => handleEdit(record)}>Edit</button>
              <button className="ml-5" onClick={() => deleteTask(record)}>Delete</button>
            </td>

          </tr>
      ))}

        </tbody>
      </table>
      
        
    </main>
  );
}

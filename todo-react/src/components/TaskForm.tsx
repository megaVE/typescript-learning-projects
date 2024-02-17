import { ITask } from "../interfaces/Task"

import styles from "./TaskForm.module.css"

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react"

interface TaskFormProps {
  btnText: string
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>
  task?: ITask | null
  handleUpdate?: (id: number, title: string, difficulty: number) => void
}

export default function TaskForm({ btnText, setTaskList, task, handleUpdate }: TaskFormProps) {
  const [id, setId] = useState<number>(0)
  const [title, setTitle] = useState<string>("")
  const [difficulty, setDifficulty] = useState<number>(0)

  useEffect(() => {
    if(task) {
      setId(task.id)
      setTitle(task.title)
      setDifficulty(task.difficulty)
    }
  }, [task])

  function handleAddTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if(handleUpdate) {
      handleUpdate(id, title, difficulty)
    } else {
      const id = Math.floor(Math.random() * 1000)
      const newTask: ITask = { id, title, difficulty }

      setTaskList!(state => [...state, newTask])

      setTitle("")
      setDifficulty(0)
    }
  }

  function handleChange (e: ChangeEvent<HTMLInputElement>) {
    if(e.target.name === "title") {
      setTitle(e.target.value)
    }

    if(e.target.name === "difficulty") {
      setDifficulty(parseInt(e.target.value))    
    }
  }

  return (
    <form className={styles.form} onSubmit={handleAddTask}>
      <div className={styles.input_container}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Task title"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="difficulty">Difficulty:</label>
        <input
          type="text"
          name="difficulty"
          id="difficulty"
          placeholder="Task difficulty"
          value={difficulty}
          onChange={handleChange}
        />
      </div>
      <input type="submit" value={btnText} />
    </form>
  )
}
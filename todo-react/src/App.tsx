import styles from "./App.module.css"

import { useState } from "react";

import { ITask } from "./interfaces/Task";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

// type  = 

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  function handleDeleteTask(id: number) {
    setTaskList(state => state.filter(task => task.id !== id))
  }

  function toggleModal (display: boolean) {
    const modal = document.querySelector("#modal")
    
    if (display) {
      modal!.classList.remove("hide")
    } else {
      modal!.classList.add("hide")
    }
  }

  function editTask(task: ITask) {
    toggleModal(true)
    setTaskToUpdate(task)
  }

  function updateTask(id: number, title: string, difficulty: number) {
    const updatedTask = { id, title, difficulty }

    setTaskList(state => state.map(task => task.id === updatedTask.id ? updatedTask : task))

    toggleModal(false)
  }

  return (
    <div>
      <Modal>
        <TaskForm
          btnText="Edit Task"
          task={taskToUpdate}
          handleUpdate={updateTask}
        />
      </Modal>
      <Header />
      <main className={styles.main}>
        <div>
          <h2>What will you do?</h2>
          <TaskForm
            btnText="Create Task"
            setTaskList={setTaskList}
          />
        </div>
        <div>
          <h2>Your tasks:</h2>
          <TaskList
            taskList={taskList}
            handleDelete={handleDeleteTask}
            handleEdit={editTask}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;

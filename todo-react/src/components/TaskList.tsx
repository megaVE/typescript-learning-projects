import styles from "./TaskList.module.css"

import { ITask } from "../interfaces/Task"

interface TaskListProps {
  taskList: ITask[]
  handleDelete: (id: number) => void
  handleEdit: (task: ITask) => void
}

export default function TaskList({ taskList, handleDelete, handleEdit }: TaskListProps) {
  return (
    <>
      {taskList.length > 0 ? (
        taskList.map(task => (
          <div key={task.id} className={styles.task}>
            <div className={styles.details}>
              <h4>{task.title}</h4>
            </div>
            <p>Difficulty: {task.difficulty}</p>
            <div className={styles.actions}>
              <i className="bi bi-pencil" onClick={() => handleEdit(task)} ></i>
              <i className="bi bi-trash" onClick={() => handleDelete(task.id)}></i>
            </div>
          </div>
        ))
      ) : (
        <p>There are no registered tasks</p>
      )}
    </>
  )
}
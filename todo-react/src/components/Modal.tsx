import { PropsWithChildren } from "react"

import styles from "./Modal.module.css"

interface ModalProps extends PropsWithChildren {}

export default function Modal({ children }: ModalProps) {
  function closeModal(e: React.MouseEvent): void {
    const modal = document.querySelector("#modal")

    modal!.classList.add("hide")
  }

  return (
    <div id="modal" className="hide">
      <div className={styles.fade} onClick={closeModal}></div>
      <div className={styles.modal}>
        <h2>Text modal</h2>
        {children}
      </div>
    </div>
  )
}

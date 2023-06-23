import { useState } from 'react'
import { deleteEmpleado } from '../Logic/Functions'
import Alert from './Alert'
// eslint-disable-next-line react/prop-types
export default function Modal ({ id, text, valID }) {
  const [alert, setAlert] = useState(false)

  return (
    <dialog id={id} className="modal">
      <form method="dialog" className="modal-box">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">{text}</p>
        <button className="btn hover:border-red-600"
          onClick={(e) => {
            e.preventDefault()
            deleteEmpleado(valID)
            setAlert(true)
            setTimeout(() => {
              setAlert(false) // Cambiar el estado a false después de X segundos
            }, 3000)
          }}
        >Confirmar</button>
      </form>
      {
        alert &&
        <Alert
          style='alert-warning'
          text='Eliminacion Exitosa !!'
        />
      }

    </dialog>
  )
}

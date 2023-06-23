import { useState } from 'react'
import Input from './Components/CustomInput'
import Alert from './Components/Alert'
import { add, getEmpleados, update, LimpiarCampos } from './Logic/Functions'
import Modal from './Components/Modal'

function App () {
  const [nombre, setNombre] = useState()
  const [edad, setEdad] = useState()
  const [pais, setPais] = useState()
  const [cargo, setCargo] = useState()
  const [anios, setAnios] = useState()
  const [editar, setEditar] = useState(false)
  const [alert, setAlert] = useState(null)
  const [id, setId] = useState(0)
  const [valid, setValid] = useState()

  const [empleados, setEmpleados] = useState([])

  const handleSubmit = (Alert) => {
    add(nombre, edad, pais, cargo, anios)

    if (alert === Alert) {
      setAlert(null)
    } else {
      setAlert(Alert)
      setTimeout(() => {
        setAlert(null) // Cambiar el estado a false después de X segundos
        LimpiarCampos(setNombre, setEdad, setPais, setCargo, setAnios)
      }, 3000)
    }
  }
  const handleUpdate = (Alert) => {
    update(nombre, edad, pais, cargo, anios, id)

    if (alert === Alert) {
      setAlert(null)
    } else {
      setAlert(Alert)
      setTimeout(() => {
        setAlert(null) // Cambiar el estado a false después de X segundos
        setEditar(!editar)
        LimpiarCampos(setNombre, setEdad, setPais, setCargo, setAnios)
      }, 3000)
    }
  }

  const handleDelete = (valID) => {
    setValid(valID)
    window.my_modal_1.showModal()
  }
  getEmpleados(setEmpleados)

  const editarCampo = (val) => {
    setEditar(true)
    setNombre(val.nombre)
    setEdad(val.edad)
    setPais(val.pais)
    setCargo(val.cargo)
    setAnios(val.anios)
    setId(val.id)
  }

  return (
    <main className="grid place-items-center min-h-screen w-full pb-10 px-4 gap-10 relative">
      <Modal
        id='my_modal_1'
        text='Está seguro que desea eliminar este registro'
        valID={valid}
      />
      {alert === 'alert' &&
        <Alert
        style='alert-info'
        text={`Empleado ${nombre} agregado con éxito!!`}
        />
      }
      {alert === 'alert2' &&
        <Alert
        style='alert-success'
        text='Actualización Exitosa!!'
        />

      }

      <section className="w-96 border  border-slate-600 p-4 rounded-md ">

        <form className="w-full flex flex-col gap-4" action="">
          <Input
            label='Nombre'
            type='text'
            event={(event) => { setNombre(event.target.value) }}
            value={nombre}
          />
          <Input
            label='Edad'
            type='number'
            event={(event) => { setEdad(event.target.value) }}
            value={edad}
          />
          <Input
            label='Pais'
            type='text'
            event={(event) => { setPais(event.target.value) }}
            value={pais}
          />
          <Input
            label='Cargo'
            type='text'
            event={(event) => { setCargo(event.target.value) }}
            value={cargo}
          />
          <Input
            label='Años'
            type='number'
            event={(event) => { setAnios(event.target.value) }}
            value={anios}
          />
          <div className='w-full flex justify-center'>
            {
              editar
                ? <div className='flex gap-2'>
                  <button className='w-28 h-10 bg-slate-900 text-white font-bold rounded-lg'
                    onClick={(e) => {
                      e.preventDefault()
                      handleUpdate('alert2')
                    }}
                  >Actualizar
                  </button>
                  <button className='w-28 h-10 bg-slate-900 text-white font-bold rounded-lg'
                    onClick={(e) => {
                      e.preventDefault()
                      LimpiarCampos(setNombre, setEdad, setPais, setCargo, setAnios)
                      setEditar(!editar)
                    }}
                  >Cancelar
                  </button>
                </div>
                : <button className='w-28 h-10 bg-slate-900 text-white font-bold rounded-lg'
                  onClick={(e) => {
                    e.preventDefault()
                    handleSubmit('alert')
                  }}
                  >Registrar
              </button>
            }

          </div>
        </form>
      </section>
      <section className='flex flex-col gap-4 w-4/5 justify-center items-center border-2 p-4 border-slate-600 rounded-md'>
        <div className="overflow-x-auto w-4/5">
          <table className="table ">
            {/* head */}
            <thead>
              <tr>
                <th>Id</th>
                <th>Nonbre</th>
                <th>Edad</th>
                <th>Pais</th>
                <th>Cargo</th>
                <th>Años</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
             {empleados.map((val, key) => {
               return (
              <tr key={key}>
                <th>{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.cargo}</td>
                <td>{val.anios}</td>
                <td className='flex gap-2'>
                  <button className='w-8 h-8 p-2 bg-slate-900 text-white font-bold rounded-lg'
                      onClick={() => {
                        editarCampo(val)
                      }}
                    ><img src="edit.svg" width={20} alt="editButton" />
                  </button>
                     <button className='w-8 h-8  p-2 bg-slate-900 text-white font-bold rounded-lg'
                       onClick={(e) => {
                         handleDelete(val.id)
                       }}
                     ><img src="trash.svg" width={20} alt="deleteIcon" /></button>
                </td>
              </tr>
               )
             })}
            </tbody>
          </table>
        </div>
      </section>

    </main>
  )
}

export default App

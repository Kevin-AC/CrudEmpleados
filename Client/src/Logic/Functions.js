import Axios from 'axios'
export const add = (nombre, edad, pais, cargo, anios) => {
  Axios.post('http://localhost:3001/create', {
    nombre,
    edad,
    pais,
    cargo,
    anios

  }).then(() => {

  })
}

export const getEmpleados = (setEmpleados) => {
  Axios.get('http://localhost:3001/empleados').then((response) => {
    setEmpleados(response.data)
  })
}

export const update = (nombre, edad, pais, cargo, anios, id) => {
  Axios.put('http://localhost:3001/update', {
    id,
    nombre,
    edad,
    pais,
    cargo,
    anios

  }).then(() => {

  })
}

export const deleteEmpleado = (id) => {
  Axios.delete(`http://localhost:3001/delete/${id}`, { id })
    .then(() => {

    })
}

export const LimpiarCampos = (setNombre, setEdad, setPais, setCargo, setAnios) => {
  setNombre('')
  setEdad('')
  setPais('')
  setCargo('')
  setAnios('')
}

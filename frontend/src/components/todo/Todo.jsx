import React, { useEffect, useState } from 'react'
import './todo.css'
import TodoCards from './TodoCards'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Update from './Update'
import axios from 'axios'

const Todo = () => {
  let id = sessionStorage.getItem('id')
  const [Inputs, setInputs] = useState({
    title: '',
    body: '',
  })
  const fetch = async () => {
    await axios
      .get(`${window.location.origin}/api/v1/getTasks/${id}`)
      .then((response) => {
        setArray(response.data.list)
      })
  }
  const [Array, setArray] = useState([])
  const [toUpdateArray, setToUpdateArray] = useState([])
  useEffect(() => {
    if (id) {
      const fetch = async () => {
        await axios
          .get(`${window.location.origin}/api/v1/getTasks/${id}`)
          .then((response) => {
            setArray(response.data.list)
          })
      }
      fetch()
    }
  }, [id])

  const show = () => {
    document.getElementById('textarea').style.display = 'block'
  }

  const change = (e) => {
    const { name, value } = e.target
    setInputs({ ...Inputs, [name]: value })
  }
  const submit = async () => {
    if (Inputs.title === '' || Inputs.body === '') {
      toast.error("Title Or Body Can't Be Empty")
    } else {
      if (id) {
        await axios
          .post(`${window.location.origin}/api/v1/addTask`, {
            title: Inputs.title,
            body: Inputs.body,
            id: id,
          })
          .then((response) => {
            console.log(response)
          })
        setInputs({ title: '', body: '' })
        toast.success('Your Task Is Added')
        fetch()
      } else {
        setArray([...Array, Inputs])
        setInputs({ title: '', body: '' })
        toast.success('Your Task Is Added')
        toast.error('Your Task Is Not Saved ! Please SignUp')
      }
    }
  }

  const del = async (Cardid) => {
    if (id) {
      await axios
        .delete(`${window.location.origin}/api/v1/deleteTask/${Cardid}`, {
          data: { id: id },
        })
        .then(() => {
          toast.success('Your Task Is Deleted')
          fetch()
        })
    } else {
      toast.error('Please SignUp First')
    }
  }

  const dis = (value) => {
    if (id) document.getElementById('todo-update').style.display = value
  }
  const update = (value) => {
    if (id) setToUpdateArray(Array[value])
    else toast.error('Please SignUp First')
  }

  return (
    <>
      <div className='todo'>
        <ToastContainer />
        <div className='todo-main container d-flex justify-content-center align-items-center my-4 flex-column'>
          <div className='d-flex flex-column todo-inputs-div w-lg-50 w-100 p-1'>
            <input
              type='text'
              placeholder='TITLE'
              className='my-2 p-2 todo-inputs'
              onClick={show}
              name='title'
              value={Inputs.title}
              onChange={change}
            />
            <textarea
              id='textarea'
              type='text'
              placeholder='BODY'
              name='body'
              className=' p-2 todo-inputs'
              value={Inputs.body}
              onChange={change}
            />
          </div>
          <div className=' w-50 w-100 d-flex justify-content-end my-3'>
            <button className='home-btn px-2 py-1' onClick={submit}>
              Add
            </button>
          </div>
        </div>
        <div className='todo-body'>
          <div className='container-fluid'>
            <div className='row '>
              {Array &&
                Array.map((item, index) => (
                  <div
                    className='col-lg-3 col-11 mx-lg-5 mx-3 my-2'
                    key={index}
                  >
                    <TodoCards
                      title={item.title}
                      body={item.body}
                      id={item._id}
                      delid={del}
                      display={dis}
                      updateId={index}
                      toBeUpdate={update}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className='todo-update ' id='todo-update'>
        <div className='container update'>
          <Update display={dis} update={toUpdateArray} fetch={fetch} />
        </div>
      </div>
    </>
  )
}

export default Todo
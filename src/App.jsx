import React from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';




function App() {
  const [isForm, setIsForm] = React.useState(false)
  const [editState, setEditState] = React.useState(false)
  const [task, setTask] = React.useState({})
  const [todos, setToDos] = React.useState([
    {
      title: "Read",
      description: "read a book",
      id: 1
    },
    {
      title: "Write",
      description: "write a blog",
      tag: ["marketing", "finance"],
      id: 2
    }
  ])
  console.log(task, todos)
  function setUpTask() {
    setIsForm(true)
  }

  function cancelTask() {
    setIsForm(false)
    setEditState(false)
  }

  function handleChange(e) {
    setTask(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  function saveDetails(e) {
    e.preventDefault()
    if (editState) {
      setToDos(prev => {
        debugger;
        let newArr = [...prev]
        for (let i = 0; i < newArr.length; i++) {
          if (newArr[i].id === task.id) {
            newArr[i] = { ...task }
          }
        }
        return newArr
      })
    } else {
      let idArr = []
      for (let i = 0; i < todos.length; i++) {
        idArr.push(todos[i].id)
      }
      task.id = Math.max(...idArr) + 1

      setToDos(prev => {
        let newArr = [...prev]
        newArr.push(task)
        return newArr
      })
    }
    setTask({})
    setIsForm(false)
    setEditState(false)
  }

  function editTask(id) {
    setEditState(true)
    setIsForm(true)
    setTask(prev => {
      let newArr = todos.filter(el => el.id === id)
      return newArr[0]
    }
    )
  }


  function removeTask(id) {
    setToDos(prev => {
      return prev.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <h1>Todo Table</h1>
      <button
        onClick={setUpTask}
        className='add-task'>
        Add Task +
      </button>
      {/* <Input.Search placeholder='Search todo here...' className='search' /> */}
      <ProTable
        toolBarRender={false}
        search={
          false
        }
        dataSource={todos}
        pagination={false}

        columns={[
          { title: "Time Stamp", dataIndex: "timeStamp" },
          { title: "Title", dataIndex: "title" },
          { title: "Description", dataIndex: "description" },
          { title: "Due Date", dataIndex: "duedate" },
          { title: "Status", dataIndex: "status" },
          { title: "Tag", dataIndex: "tag" },
          {
            dataIndex: 'id',
            title: "Modify",
            render: (id) => [
              <button
                onClick={() => editTask(id)}
                className='formBtn edit'>Edit</button>
            ]
          },
          {
            dataIndex: 'id',
            title: "Delete",
            render: function (id) {
              return [
                <button onClick={() => {
                  removeTask(id)
                }} className='formBtn del'>Delete</button>
              ]
            }
          }
        ]}>
      </ProTable>
      {
        isForm &&
        <div className='formModal'>
          <form action="#">
            <div className='pairInput'>
              <label htmlFor="TimeStamp">Timestamp:
                <input
                  onChange={handleChange}
                  type="date"
                  id="TimeStamp"
                  name="timeStamp"
                  // value={task ? task.timeStamp : ""}
                  required
                />
              </label>

              <label htmlFor="title">Title:
                <input
                  onChange={handleChange}
                  type="text"
                  id="title"
                  name="title"
                  maxLength="100"
                  value={task ? task.title : ""}
                  required
                />
              </label>

            </div>
            <div className='pairInput'>
              <label htmlFor="desc">Description:
                <input
                  onChange={handleChange}
                  type="text"
                  id="desc"
                  name="description"
                  maxLength="100"
                  value={task ? task.description : ""}
                  required
                />
              </label>
              <label htmlFor="duedate">Due Date:
                <input
                  onChange={handleChange}
                  type="date"
                  id="dueDate"
                  name="duedate"
                // value={task ? task.dueDate : ""}
                />
              </label>
            </div>
            <fieldset>
              <legend>Task domain(s):</legend>
              <input
                onChange={handleChange}
                type="checkbox"
                id="ops"
                value="Operation"
                name="tags"
              />
              <label htmlFor="ops">Operation</label> <br />
              <input
                onChange={handleChange}
                type="checkbox"
                id="finance"
                value="Finace"
                name="tags"
              />
              <label htmlFor="finance">Finance</label> <br />
              <input
                onChange={handleChange}
                type="checkbox"
                id="marketing"
                value="Marketing"
                name="tags"
              />
              <label htmlFor="marketing">Marketing</label> <br />
              <input
                onChange={handleChange}
                type="checkbox"
                id="tech"
                value="Tech"
                name="tags"
              />
              <label htmlForr="tech">Tech</label>
            </fieldset>

            <fieldset required>
              <legend> Task status:</legend>
              <input
                onChange={handleChange}
                type="radio"
                id="open"
                value="Open"
                name="status"
              />
              <label htmlFor="open">Open</label> <br />
              <input
                onChange={handleChange}
                type="radio"
                id="working"
                value="Working"
                name="status"
              />
              <label htmlFor="working">Working</label> <br />
              <input
                onChange={handleChange}
                type="radio"
                id="done"
                value="Done"
                name="status"
              />
              <label htmlFor="done">Done</label> <br />
              <input
                onChange={handleChange}
                type="radio"
                id="due"
                value="Overdue"
                name="status"
              />
              <label htmlFor="due">Overdue</label>
            </fieldset>
            <div className='btnContainer'>
              <button id='submit' type="button" onClick={saveDetails}>Save</button>
              <button id="cancel" type="button" onClick={cancelTask}>Cancel</button>
            </div>
          </form>
        </div>
      }
    </>
  )
}

export default App

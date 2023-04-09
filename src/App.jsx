import React from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ProTable } from '@ant-design/pro-components';

function App() {
  let dt = new Date()
  let validDateFormat = dt.toISOString().split('T')[0]

  const [isForm, setIsForm] = React.useState(false)
  const [editState, setEditState] = React.useState(false)
  const [delId, setDelId] = React.useState(0)
  const [taskDeleteModal, setTaskDeleteModal] = React.useState(false)
  const [task, setTask] = React.useState({})
  // some prepopulated data 
  const [todos, setToDos] = React.useState([
    {
      timeStamp: "2023-04-05",
      title: "Read",
      description: "read a book",
      id: 1,
      status: "Open"
    },
    {
      timeStamp: "2023-04-08",
      title: "Write",
      description: "write a blog",
      tag: ["marketing", "finance"],
      id: 2,
      status: "Open"
    }
  ])
  console.log(todos)

  function setUpTask() {
    setIsForm(true)
  }

  function cancelTask() {
    setIsForm(false)
    setEditState(false)
  }

  function handleChange(e) {
    setTask(prev => {
      if (e.target.type === "checkbox") {
        const targetTag = e.target.value;
        const wasChecked = e.target.checked;
        const wasUnchecked = !wasChecked;
        const newTags = prev.tags || [];

        if (wasChecked && !newTags.includes(targetTag)) {
          newTags.push(targetTag)
        } else if (wasUnchecked && newTags.includes(targetTag)) {
          const index = newTags.indexOf(e.target.value)
          newTags.splice(index, 1)
        }
        const newTask = {
          ...prev,
          tags: newTags
        }
        return newTask;
      }
      return {
        ...prev,
        timeStamp: validDateFormat,
        [e.target.name]: e.target.value
      }
    })
  }

  function saveDetails(e) {
    const renderOnly = task.timeStamp && task.title && task.description && task.status
    e.preventDefault()
    if (editState) {
      setToDos(prev => {
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
      task.id = idArr.length ? Math.max(...idArr) + 1 : 1
      if (renderOnly) {
        setToDos(prev => {
          let newArr = [...prev]
          newArr.push(task)
          return newArr
        })
      }

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
    setTaskDeleteModal(true)
    setDelId(id)

  }
  function CancelDelete() {
    setTaskDeleteModal(false)
  }
  function finallyRemove() {
    setToDos(prev => {
      return prev.filter(todo => todo.id !== delId)
    })
    setTaskDeleteModal(false)
  }

  return (
    <>
      <h1>Todo Table</h1>
      <button
        onClick={setUpTask}
        className='add-task'>
        Add Task +
      </button>

      <ProTable
        toolBarRender={false}
        search={
          false
        }
        dataSource={todos}
        pagination={
          { pageSize: 5 }
        }
        rowKey={'id'}
        columns={[
          { title: "Time Stamp", dataIndex: "timeStamp" },
          { title: "Title", dataIndex: "title" },
          { title: "Description", dataIndex: "description" },
          { title: "Due Date", dataIndex: "duedate" },
          { title: "Status", dataIndex: "status" },
          {
            title: "Tag",
            render: function (task) {
              return (task.tags || []).map(
                t => <div className={`tag ${t}`} key={t}>{t}</div>
              )
            }
          },
          {
            dataIndex: 'id',
            title: "Modify",
            render: (id) => [
              <button
                key={`task-${id}`}
                onClick={() => editTask(id)}
                className='formBtn edit'>Edit</button>
            ]
          },
          {
            dataIndex: 'id',
            title: "Delete",
            render: function (id) {
              return [
                <button
                  key={`task-${id}`}
                  onClick={() => {
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
            </div>
            <label htmlFor="duedate">Due Date:
              <input
                onChange={handleChange}
                type="date"
                id="dueDate"
                name="duedate"
                value={task ? task.duedate : ""}
              />
            </label>

            <fieldset>
              <legend>Task domain(s):</legend>
              <input
                onChange={handleChange}
                type="checkbox"
                id="ops"
                value="Operation"
                name="ops"
                checked={task.tags && task.tags.includes("Operation")}
              />
              <label htmlFor="ops">Operation</label> <br />
              <input
                onChange={handleChange}
                type="checkbox"
                id="finance"
                value="Finance"
                name="finance"
                checked={task.tags && task.tags.includes("Finance")}
              />
              <label htmlFor="finance">Finance</label> <br />
              <input
                onChange={handleChange}
                type="checkbox"
                id="marketing"
                value="Marketing"
                name="marketing"
                checked={task.tags && task.tags.includes("Marketing")}
              />
              <label htmlFor="marketing">Marketing</label> <br />
              <input
                onChange={handleChange}
                type="checkbox"
                id="tech"
                value="Tech"
                name="tech"
                checked={task.tags && task.tags.includes("Tech")}

              />
              <label htmlFor="tech">Tech</label>
            </fieldset>

            <fieldset required>
              <legend> Task status:</legend>
              <input
                onChange={handleChange}
                type="radio"
                id="open"
                value="Open"
                name="status"
                checked={task.status === "Open"}
              />
              <label htmlFor="open">Open</label> <br />
              <input
                onChange={handleChange}
                type="radio"
                id="working"
                value="Working"
                name="status"
                checked={task.status === "Working"}
              />
              <label htmlFor="working">Working</label> <br />
              <input
                onChange={handleChange}
                type="radio"
                id="done"
                value="Done"
                name="status"
                checked={task.status === "Done"}
              />
              <label htmlFor="done">Done</label> <br />
              <input
                onChange={handleChange}
                type="radio"
                id="due"
                value="Overdue"
                name="status"
                checked={task.status === "Overdue"}
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
      {taskDeleteModal &&
        <div className="formModal">
          <div className='taskDeleteModal'>
            <h3>Are you Sure you want to delete the task?</h3>
            <button className='delFinally' onClick={finallyRemove}>Sure</button>
            <button className='sure' onClick={CancelDelete}>Cancel</button>
          </div>
        </div>
      }
    </>
  )
}

export default App

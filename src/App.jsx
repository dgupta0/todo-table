import React from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';




function App() {
  const [isForm, setIsForm] = React.useState(false)
  const [task, setTask] = React.useState({})
  const [todos, setToDos] = React.useState([
    {
      title: "Read",
      description: "read a book"
    },
    {
      title: "Write",
      description: "write a blog",
      tag: ["marketing", "finance"]
    }
  ])

  function setUpTask() {
    setIsForm(prev => !prev)
  }

  function handleChange(e) {
    console.log(task)
    console.log(e.target, e.target.value)
    setTask(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  function saveDetails() {
    setToDos(prev => {
      let newArr = [...prev]
      newArr.push(task)
      console.log(newArr)
      return newArr
    })
    setTask({})
    setIsForm(false)

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
            title: "Modify",
            render: () => [
              <button className='formBtn edit'>Edit</button>
            ]
          },
          {
            title: "Delete",
            render: () => [
              <button className='formBtn del'>Delete</button>
            ]
          }
        ]}>
      </ProTable>
      {
        isForm &&
        <div className='formModal'>
          <form>
            <div className='pairInput'>
              <label htmlFor="TimeStamp">Timestamp:
                <input
                  onChange={handleChange}
                  type="date"
                  id="TimeStamp"
                  name="timeStamp"
                />
              </label>

              <label htmlFor="title">Title:
                <input
                  onChange={handleChange}
                  type="name"
                  id="title"
                  name="title"
                  maxLength="100"
                />
              </label>

            </div>
            <div className='pairInput'>
              <label htmlFor="desc">Description:
                <input
                  onChange={handleChange}
                  type="name"
                  id="desc"
                  name="description"
                  maxLength="100"
                />
              </label>
              <label htmlFor="duedate">Due Date:
                <input
                  onChange={handleChange}
                  type="date"
                  id="dueDate"
                  name="duedate"
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
              <button id="cancel" type="button" onClick={setUpTask}>Cancel</button>
            </div>
          </form>
        </div>
      }
    </>
  )
}

export default App

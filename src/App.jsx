import React from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ProTable } from '@ant-design/pro-components';
import { Input } from 'antd';




function App() {
  const [isForm, setIsForm] = React.useState(false)
  const [task, setTask] = React.useState([])

  function setUpTask() {
    setIsForm(prev => !prev)

  }
  function saveDetails() {
    console.log("click")
  }
  const todos = [{
    title: "Read",
    description: "read a book"
  },
  {
    title: "Write",
    description: "write a blog"
  }
  ]
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
          { title: "Time Stamp" },
          { title: "Title", dataIndex: "title" },
          { title: "Description", dataIndex: "description" },
          { title: "Due Date" },
          { title: "Status" },
          { title: "Tag" },
          { title: "Modify" },
          { title: "Delete" }
        ]}>
      </ProTable>
      {isForm &&
        <div className='formModal'>
          <form>
            <label for="TimeStamp">Timestamp:</label>
            <input type="date" id="TimeStamp" name="TimeStamp" />
            <label for="title">Todo Title:</label>
            <input type="name" id="title" name="title" maxlength="100" /> <br />
            <label for="desc">Task Description:</label>
            <input type="name" id="desc" name="desc" maxlength="100" />
            <label for="duedate">Due Date:</label>
            <input type="date" id="duedate" name="duedate" />
            <fieldset>
              <legend>Task domain(s):</legend>
              <input type="checkbox" id="ops" name="ops" />
              <label for="ops">Operation</label> <br />
              <input type="checkbox" id="finance" name="finance" />
              <label for="finance">Finance</label> <br />
              <input type="checkbox" id="marketing" name="marketing" />
              <label for="marketing">Marketing</label> <br />
              <input type="checkbox" id="tech" name="tech" />
              <label for="tech">Tech</label>
            </fieldset>
            <fieldset required>
              <legend> Task status:</legend>
              <input type="radio" id="open" name="open" />
              <label for="open">Open</label> <br />
              <input type="radio" id="working" name="working" />
              <label for="working">Working</label> <br />
              <input type="radio" id="done" name="done" />
              <label for="done">Done</label> <br />
              <input type="radio" id="due" name="due" />
              <label for="due">Overdue</label>
            </fieldset>
            <button id='submit' type="button" onClick={saveDetails}>Save</button>
            <button id="cancel" type="button" onClick={setUpTask}>Cancel</button>
          </form>
        </div>
      }

    </>
  )
}

export default App

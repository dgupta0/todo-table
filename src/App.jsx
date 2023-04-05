import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ProTable } from '@ant-design/pro-components';



function App() {
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
      <ProTable
        toolBarRender={false}
        search={false}
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
    </>
  )
}

export default App

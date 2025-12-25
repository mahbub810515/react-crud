import React, { useEffect, useState } from 'react'
import { getDatabase, ref, set,push, onValue } from "firebase/database";


const App = () => {

  let [task, setTask] = useState('')
  let [tasklist, setTasklist] = useState([]);

  const db = getDatabase();
  // get user input from ui
  const handleInputTask = (e) => {
    setTask(e.target.value)
  }
  const handleSubmitTask = () => {
    set(push(ref(db, 'todolist/')), {
      item: task,
    }).then(() => {

    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    const starCountRef = ref(db, 'todolist/',);
    onValue(starCountRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push({ ...item.val(), id: item.key });
      })
      setTasklist(array)
    });
  }, []);
  

  return (
    <div>
      <>
        {/* component */}
        <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
          <div className="bg-green-200 rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
            <div className="mb-4">
              <h1 className="font-bold rounded-4 py-3 bg-green-400 text-white text-2xl text-center">Todo List</h1>
              <div className="flex mt-4">
                <input onChange={handleInputTask} value={task}
                  className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 r"
                  placeholder="Add Todo"
                />
                <button onClick={handleSubmitTask} className="flex-no-shrink p-2 border rounded  hover:text-white hover:bg-green-500">
                  Add
                </button>
              </div>
            </div>
            <div>
              {tasklist.map((Litem) => (
                <div className="flex mb-4 items-center">
                  <p className="w-full text-white bg-green-400 p-2.5 rounded">
                    {Litem.item}
                  </p>
                  <button className="flex-no-shrink p-2 ml-2 border rounded text-red border-red hover:text-white hover:bg-red-500">
                    Remove
                  </button>
                </div>
              ))}

            </div>
          </div>
        </div>
      </>
      {/* end todo ui component    */}
    </div>
  )
}

export default App

import React, { useEffect, useState } from 'react'
import { getDatabase, ref, set,push, onValue, remove } from "firebase/database";


const App = () => {

  let [task, setTask] = useState('')
  let [tasklist, setTasklist] = useState([]);
  let [editModal, setEditModal] = useState(false);

  const db = getDatabase();
  // get user input from ui
  const handleInputTask = (e) => {
    setTask(e.target.value)
  }
  const handleSubmitTask = () => {
    set(push(ref(db, 'todolist/')), {
      item: task,
    }).then(() => {
        setTask('');
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
  const handleDelete=(id)=>{
      remove(ref(db, 'todolist/'+id,))
  }  
  const handleEditModal=(id)=>{
      setEditModal(!editModal)
  }

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
                  <button onClick={()=>handleDelete(Litem.id)} className="flex-no-shrink p-2 ml-2 border rounded text-red border-red hover:text-white hover:bg-red-500">
                    Remove
                  </button>
                  <button onClick={()=>handleEditModal(Litem.id)} className="flex-no-shrink p-2 ml-2 border rounded text-red border-red hover:text-white hover:bg-red-500">
                    Edite
                  </button>
                </div>
              ))}

            </div>
          </div>
        </div>
        {editModal &&        
        <div className='w-full h-screen  bg-gray-500/85 flex items-center justify-center absolute top-0 left-0'>
          <div className='w-100 h-20 rounded bg-white relative flex items-center justify-center'>
            <button onClick={()=> setEditModal(false)} className='bg-red-500 px-1 absolute top-0 right-0'>X</button>
            <input className='border rounded p-2' type="text" placeholder='update your task'/>
            <button className='p-2.5 ml-3 border rounded hover:bg-green-500 hover:text-white'>Update</button>
          </div>
        </div>
        }
      </>
      {/* end todo ui component    */}
    </div>
  )
}

export default App

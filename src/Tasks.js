import React, { createContext } from "react";
import App from "./App";
import {v4} from "uuid";

const Task=[
{
    id: v4(),
    name: "Task 1",
    description: "Clean the House",
    status:"todo"
  },
{
    id: v4(),
    name: "Task 2 ",
    description: "Go shopping",
    status:"todo"
  },
{
    id: v4(),
    name: "Task 3",
    description: "Office work",
    status:"todo"
  },
  {
    id: v4() ,
    name: "Task 4",
    description: "Create guest list",
    status:"todo"
  },
  {
    id: v4(),
    name: "Task 5",
    description: "workout",
    status:"todo"
  },
   {
    id: v4(),
    name: "Task 6",
    description: "Make food",
    status:"todo"
  },
   {
    id: v4(),
    name: "Task 7",
    description: "Call with mentor",
    status:"todo"
  }
];

const labels=["todo","progress","completed"];
const labelsMap={
  todo:"todo",
  progress:"progress",
  completed:"completed"
};
  const state=Task;
const Update=(id,status)=>{
  const {Task}= state ;
  const todo= Task.find((todo)=>todo.id===id);
  todo.status=status;
  

};

console.log(Task);
const Taskcontext = createContext(Task);

const Tasks=()=>{
    return(
        <>
        <Taskcontext.Provider value={Task}>
                <App/>
        </Taskcontext.Provider>

        </>
    )
}

export default Tasks;
export {Taskcontext};
export {labelsMap,labels,Update};
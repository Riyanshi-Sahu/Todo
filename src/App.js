import React, {useState , useContext} from 'react';
import './App.css';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
// import {v4} from "uuid";
// import Tasks from './Tasks';
import {Taskcontext} from "./Tasks";
import {labelsMap,labels,Update} from "./Tasks";



// const item = {
//   id: v4(),
//   name: "Task 1"
// }
// const item2 = {
//   id: v4(),
//   name: "Task 2 "
// }
// const item3 = {
//   id: v4(),
//   name: "Task 3"
// }
// const item4 = {
//   id: v4(),
//   name: "Task 4"
// }
// const item5 = {
//   id: v4(),
//   name: "Task 5"
// }
// const item6 = {
//   id: v4(),
//   name: "Task 6"
// }
// const item7 = {
//   id: v4(),
//   name: "Task 7"
// }

function App() {
  const list = useContext(Taskcontext);
 
 
  const [clicked , setClicked]=useState({});
  // const [text, setText] = useState("")

  const [state, setState] = useState({
    "todo": {
      title: "Todo",
      items: list
    },
    "in-progress": {
      title: "In Progress",
      items: []
    },
    "done": {
      title: "Completed",
      items: []
    },
    // columnOrder: ['todo', 'in-progress', 'done'],
  })
  console.log(list);
  

  const handleDragEnd = ({destination, source}) => {
    if (!destination) {
      return
    }
console.log(destination);
console.log(source);
    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    // Creating a copy of item before removing it from state
    const itemCopy = {...state[source.droppableId].items[source.index]}

    
   if(source.droppableId=='todo' && destination.droppableId=='done'){
     return;
   }

   
    setState(prev => {
      prev = {...prev}
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1)

      
      
      // Adding to new items array location
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

      return prev
      
    })
    // setState({
    //   homeIndex: null,
    // });
  }

  // const TaskDescription=()=>{ {el.description} };
  const handleClick=(index)=>()=>{
    setClicked(state => ({
      ...state, // <-- copy previous state
      [index]: !state[index] // <-- update value by index key
    }));
    

  //   if(clicked){
  //  setClicked(false)
  //   }
  //   else{
  //     setClicked(true)
  //   }
  
  };

  // To assign event
// const startEvent = new Event("start");

// // To trigger the event Listener
// document.addEventListener("start", () => {
//     console.log("The start event was triggered")
// });

// // To trigger the Event
// document.dispatchEvent(startEvent);

  // const onDragStart = start => {
  //   const homeIndex =state.columnOrder.indexOf(start.source.droppableId);

  //   setState({
  //     homeIndex,
  //   });
  // };

  return (
    <div className="App">
      
      <DragDropContext 
      // onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
      >
        {_.map(state, (data, key) => {
          return(
       
            <div key={key} className={"column"}>
              <h3>{data.title}</h3>
         
              <Droppable droppableId={key} >
             
               {/* type={data.title==='Completed' ? 'Completed':'Todo'} */}
                {(provided, snapshot) => {
                 
                  return(
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"droppable-col"}
                    >
                    
                      {data.items.map((el, index) => {
                        return(
                          <Draggable key={el.id} index={index} draggableId={el.id} >
                         
                            {(provided, snapshot) => {
                              /* console.log(snapshot) */
                          
                              return(
                                <div
                                  className={`item ${snapshot.isDragging && "dragging"}`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >

                                  <button onClick={handleClick(el.id)}>{el.name}</button>
                                 
                                  {clicked[el.id]?<p>{el.description}</p>:null}
                                
                                  
                                
                                  


                                  {/* {el.name}
                                  {el.description} */}
                                  
                               
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
            </div>
          )
        })}
      </DragDropContext>
    </div>
  );
}

export default App;

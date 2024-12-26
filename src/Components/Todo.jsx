import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '../assets/todo_icon.png';
import Todolistitem from './Todolistitem';

const Todo = () => {
  const [todolist, settodolist] = useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")):[]);
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === '') {
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    settodolist((prev) => [...prev, newTodo]);
    inputRef.current.value = '';
  };

  const delTodo = (id) => {
    settodolist((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    settodolist((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todolist))
  },[todolist])

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
      {/* Title */}
      <div className='flex items-center mt-7 gap-2'>
        <img className='w-8' src={todo_icon} alt='' />
        <h1 className='text-3xl font-serif'>TO-DO LIST</h1>
      </div>

      {/* Input */}
      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input
          ref={inputRef}
          className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-500'
          type='text'
          placeholder='ADD your Task'
        />
        <button
          onClick={add}
          className='border-none rounded-full bg-orange-500 w-32 h-14 text-white text-lg font-medium cursor-pointer'
        >
          ADD+
        </button>
      </div>

      {/* Todo List Items */}
      <div>
        {todolist.map((item) => (
          <Todolistitem
            key={item.id}
            text={item.text}
            id={item.id}
            isComplete={item.isComplete}
            toggleComplete={toggleComplete}
            delTodo={delTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;

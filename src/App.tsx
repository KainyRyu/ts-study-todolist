import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AntdTodo from './pages/antd/todo/Todo';
import AntdTodoFinish from './pages/antd/todo/TodoFinish';
import Todo from './pages/todo/Todo';
import TodoFinish from './pages/todo/TodoFinish';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />

        <Route path="todo">
          <Route index element={<Todo />} />
          <Route path="finish" element={<TodoFinish />} />
        </Route>

        <Route path="antd">
          <Route path="todo">
            <Route index element={<AntdTodo />} />
            <Route path="finish" element={<AntdTodoFinish />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

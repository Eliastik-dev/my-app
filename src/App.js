import React, { useEffect, useState } from "react";
import ListBooks from "./ListBooks";
import MyBooks from "./MyBooks";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddBook from "./AddBook";
import MyBorrows from "./MyBorrows";
import Login from "./Login";
import AddUser from "./AddUser";
import Header from "./Header";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';

export const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

const UserConnected = ({ setUserInfo, userInfo }) => {
  const history = useNavigate();
  React.useEffect(() => {
    setUserInfo(null)
    axios.get('/isConnected').then(response => {
      setUserInfo(response.data)
    })
  }, [history, setUserInfo])

  return (<>
    {userInfo && <Header userInfo={userInfo} setUserInfo={setUserInfo} />}
  </>)

}

function App() {

  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    axios.interceptors.request.use(function (request) {
      const token = sessionStorage.getItem(AUTH_TOKEN_KEY)
      if(token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
      return request
    }, (error) => {
      return Promise.reject(error);
    });
  })

  return (
    <div>
        <UserConnected userInfo={userInfo} setUserInfo={setUserInfo} />
        <div className="App">
          <Routes>
            <Route path="listBooks" element={<ListBooks />} />
            <Route path="myBooks" element={<MyBooks />} />
            <Route path="addBook" element={<AddBook />} />
            <Route path="addBook/:bookId" element={<AddBook />} />
            <Route path="myBorrows" element={<MyBorrows />} />          
            <Route path="addUser" element={<AddUser setUserInfo={setUserInfo} />} />
            <Route path="*" element={<Login setUserInfo={setUserInfo} />} />
          </Routes>
        </div>
    </div>
  );
}

export default App;

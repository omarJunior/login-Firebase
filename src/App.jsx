//npm i firebase@8.7.1
//npm install react-router-dom@5.2.0

import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  } from 'react-router-dom'
import { auth } from './firebase'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Admin from './components/Admin'
import Reset from './components/Reset'




function App({ callback }) {

  const [firebaseUser, setFirebaseUser] = useState(false)

  useEffect(()=>{
    //Detectar que un usuario este authenticado en firebase
    auth.onAuthStateChanged(user => {
      if(user){
        setFirebaseUser(user)
      }else{
        setFirebaseUser(null)
      }
    })
  },[])

  return firebaseUser !== false ? (
   <Router>
      <div ref={callback} className="container mt-4">
      <Navbar firebaseUser={firebaseUser}/>

      <Switch>

        <Route exact path="/">
          Inicio
        </Route>

        <Route path="/login">
          <Login data="Hola mundo"/>
        </Route>

        <Route path="/admin">
          <Admin />
        </Route>

        <Route path="/reset">
          <Reset />
        </Route>

      </Switch>

    </div>
   </Router>
  ):
  (
    <p>Cargando...</p>
  )
}

export default App;

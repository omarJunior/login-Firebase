import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { auth } from '../firebase'
import FireStore from './FireStore'

const Admin = (props) => {

    const [ user, setUser ]= useState(null)

    useEffect(()=>{
        if(auth.currentUser){
            setUser(auth.currentUser)
        }else{
            props.history.push('/login')
        }
    }, [props.history])

  return (
    <div className="mt-5">
        {
            user && (
               <FireStore user={user}/>   
            )
        }
    </div>
  )
}

export default withRouter(Admin)
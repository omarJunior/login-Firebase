import React, { useState, useCallback } from 'react'
import { auth } from '../firebase'
import { withRouter } from 'react-router-dom'

const Reset = (props) => {

    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)

    const procesarDatos = async(e)=>{
        e.preventDefault()
        console.warn("Estas clickeandome")

        if(!email.trim()){
            setError('Ingrese un email')
            return
        }
        recuperar()

        setError(null)
    }

    const recuperar = useCallback(async()=>{
        try {
            await auth.sendPasswordResetEmail(email)
            console.log("Correo enviado")
            props.history.push('/login')

        } catch (error) {
            console.error(error.message)
        }
    }, [email, props.history])

  return (
    <div className='mt-5'>
        <h3 className='text-center'>
            Reiniciar contraseña
        </h3>
        <hr />
        <div className="row justify content-center">
            <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                <form onSubmit={procesarDatos}>
                    {
                        error && (
                            <div className='alert alert-danger'>
                                {error}
                            </div>
                        )
                    }
                    <input 
                        type="text" 
                        className="form-control mb-2" 
                        placeholder='Ingrese un email...'
                        onChange={(e)=> setEmail(e.target.value) }
                        value={email}/>
                        
                    <button 
                        type="submit" 
                        className="btn btn-dark btn-lg btn-block">
                        Reiniciar contraseña
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default withRouter(Reset)
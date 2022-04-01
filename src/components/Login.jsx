import React, { useCallback, useState } from 'react'
import { auth, db } from '../firebase'
import { withRouter } from 'react-router-dom'


const Login = (props) => {

    const [email, setEmail] = useState("prueba@prueba.com")
    const [pass, setPass] = useState("123456")
    const [error, setError] = useState(null)
    const [esRegistro, setEsRegistro] = useState(false)
    

    const procesarDatos = async(e)=>{
        e.preventDefault()
        if(!email.trim()){
            setError('Ingrese un email')
            return
        }
        if(!pass.trim()){
            setError('Ingrese una contraseña')
            return
        }
        if(pass.length < 6){
            setError('Password de 6 caracteres o mas')
            return
        }
        setError(null)
        if(esRegistro){
            registrar()
        }else{
            login()
        }
        
    }

    const login = useCallback(async()=>{
        try{
            const resp = await auth.signInWithEmailAndPassword(email, pass)
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/admin')

        }catch(error){
            console.error(error)
            if(error.code === "auth/invalid-email"){
                setError('Email no valido')
            }
            if(error.code === "auth/user-not-found" || error.code === "auth/wrong-password"){
                setError('Usuario o contraseñas incorrectas')
            }
            
        }
    }, [email, pass, props.history])

    const registrar = useCallback(async()=> {

        try {
            const resp = await auth.createUserWithEmailAndPassword(email, pass)
            await db.collection('usuarios').doc(resp.user.uid).set({
                email: resp.user.email,
                uid: resp.user.uid
            })
            await db.collection(resp.user.uid).add({
                name : 'Tarea de ejemplo',
                fecha : Date.now()
            })
            setEmail('')
            setPass('')
            setError(null)

        } catch (error) {
            console.error(error)
            if(error.code === "auth/invalid-email"){
                setError('Email no valido')
            }
            if(error.code === "auth/email-already-in-use"){
                setError('El email ya esta en uso por otra cuenta')
            }
        }
    }, [email, pass, props.history])
    

  return (
    <div className='mt-5'>
        <h3 className='text-center'>
            { esRegistro ? 'Registro de usuarios' : 'Login de acceso' }
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
            
                    <input 
                        type="password" 
                        className="form-control mb-2" 
                        placeholder='Ingrese una contraseña...'
                        onChange={(e)=> setPass(e.target.value) }
                        value={pass}/>
                        
                    <button 
                        type="submit" 
                        className="btn btn-dark btn-lg btn-block">
                            {
                                esRegistro ? 'Registrarse' : 'Acceder'
                            }
                    </button>

                    <button 
                        type='button'
                        className="btn btn-info btn-sm btn-block" 
                        onClick={()=> setEsRegistro(!esRegistro)}>
                        {
                            esRegistro ? '¿Ya estas registrado?': '¿No tienes cuenta?'
                        }
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default withRouter(Login)
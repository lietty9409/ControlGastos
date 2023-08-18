import React from 'react';
import {useNavigate} from 'react-router-dom';
import {ReactComponent as IconoCerrarSesion} from '../imagenes/log-out.svg';
import Boton from './Boton';
import {auth} from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';

const BotonCerrarSesion = () => {
    const navigate= useNavigate();

    const cerrarSesion = async() => {
        try{
            await signOut(auth);
            navigate('/iniciar-sesion');
        }catch(error){
            console.log(error)
        }
    }
    return ( 
        <Boton iconoGrande as = 'button' onClick={cerrarSesion}>
            <IconoCerrarSesion/>
        </Boton>
     );
}
 
export default BotonCerrarSesion;
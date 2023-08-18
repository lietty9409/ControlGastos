import React,{useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ContenedorFiltros,Formulario,Input,InputGrande,ContenedorBoton} from '../elementos/ElementosDeFormulario';
import Boton from '../elementos/Boton';
import {ReactComponent as IconoPlus} from '../imagenes/plus.svg';
import SelectCategorias from './SelectCategorias';
import DatePicker from './DatePicker';
import fromUnixTime from 'date-fns/fromUnixTime';
import getUnixTime from 'date-fns/getUnixTime'
import agregarGasto from '../firebase/agregarGasto';
import {useAuth} from '../contextos/AuthContext';
import Alerta from '../elementos/Alerta';
import editarGasto from '../firebase/editarGasto';



const FormularioGasto = ({gasto}) => {
    const[inputDescripcion,cambiarInputDescripcion]= useState('');
    const[inputCantidad,cambiarInputCantidad]= useState('');
    const[categoria,cambiarCategoria] = useState('comida');
    const[fecha,cambiarFecha]= useState(new Date());
    const[estadoAlerta,cambiarEstadoAlerta] = useState(false);
    const[alerta,cambiarAlerta]=useState({});
    const {usuario} = useAuth();
    const navigate = useNavigate();

    //comprobamos si ya hay algún gasto y si lo hay actualizamos todo el state con el valor del gasto
    useEffect( ()=> {
        if(gasto){
    //Comprobamos que sea del usuario actual        
            if(gasto.data().uidUsuario ===usuario.uid){
                cambiarCategoria(gasto.data().categoria);
                cambiarFecha (fromUnixTime(gasto.data().fecha));
                cambiarInputDescripcion(gasto.data().descripcion);
                cambiarInputCantidad(gasto.data().cantidad);
            }else{
                navigate('/lista');
            }
        }

    },[gasto,usuario,navigate]);

    const handleChange =(e) => {
        if(e.target.name === 'descripcion'){
            cambiarInputDescripcion(e.target.value);
        } else if(e.target.name === 'cantidad'){
            cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g,''));
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        //Transformamos la cantidad en números y le pasamos 2 decimales con el método toFixed()
        let cantidad = parseFloat(inputCantidad).toFixed(2);

        //Comprobamos q haya una descripción y valor
        if(inputDescripcion !=='' && inputCantidad !== ''){
            if(cantidad){
                if(gasto){
                    editarGasto({
                        id:gasto.id,
                        categoria: categoria,
                        descripcion:inputDescripcion,
                        cantidad:cantidad,
                        fecha: getUnixTime(fecha)
                    }).then(() => {
                        navigate('/lista');
                    }).catch((error) => {
                        console.log(error);
                    })
                } else {
                    agregarGasto({
                        categoria: categoria,
                        descripcion: inputDescripcion,
                        cantidad: cantidad,
                        fecha: getUnixTime(fecha),
                        uidUsuario: usuario.uid
                    })
                    //Aqui devolvemos una promesa,cuando se ejecute lo anterior 
                    //entonces todo vuelve al inicio con los campos vacios y la fecha actual        
                    .then(() => {
                        cambiarCategoria('hogar');
                        cambiarInputDescripcion('');
                        cambiarInputCantidad('');
                        cambiarFecha(new Date());
    
                        cambiarEstadoAlerta(true);
                        cambiarAlerta({tipo:'exito', mensaje:'El gasto se añadió correctamente'})
                    })
                    .catch((error) => {
                        cambiarEstadoAlerta(true);
                        cambiarAlerta({tipo:'error', mensaje:'El gasto no se añadió correctamente'})
    
                    })
                }
                
            }else{
                cambiarEstadoAlerta(true);
                cambiarAlerta({tipo:'error', mensaje:'El valor que ingresaste no es correcto'})
            }     
        }else{
            cambiarEstadoAlerta(true);
            cambiarAlerta({tipo:'error', mensaje:'Por favor rellena todos los campos'});
        }
    }
        
    return ( 
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategorias
                    categoria = {categoria}
                    cambiarCategoria = {cambiarCategoria}
                />
                <DatePicker
                    fecha={fecha}
                    cambiarFecha={cambiarFecha}
                />
            </ContenedorFiltros>
            <div>
                <Input
                    type='text'
                    name='descripcion'
                    id='descripcion'
                    placeholder='Descripción del gasto'
                    value={inputDescripcion}
                    onChange={handleChange}
                />
                <InputGrande
                    type='text'
                    name='cantidad'
                    id='cantidad'
                    placeholder='$0.00'
                    value={inputCantidad}
                    onChange={handleChange}
                    />
            </div>
            <ContenedorBoton>
                <Boton as='button' primario conIcono type='submit'>
                    {gasto ? 'Editar Gasto' : 'Agregar gasto'}
                    <IconoPlus/>
                </Boton>
            </ContenedorBoton>
            <Alerta
                tipo={alerta.tipo} 
                mensaje={alerta.mensaje}
                estadoAlerta= {estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />
        </Formulario>
     );
}

export default FormularioGasto;
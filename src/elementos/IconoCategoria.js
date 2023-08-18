import React from 'react';
import {ReactComponent as IconoComida} from '../imagenes/cat_comida.svg';
import {ReactComponent as IconoCompras} from '../imagenes/cat_compras.svg';
import {ReactComponent as IconoCuentasYPagos} from '../imagenes/cat_cuentas-y-pagos.svg';
import {ReactComponent as IconoDiversion} from '../imagenes/cat_diversion.svg';
import {ReactComponent as IconoHogar} from '../imagenes/cat_hogar.svg';
import {ReactComponent as IconoRopa} from '../imagenes/cat_ropa.svg';
import {ReactComponent as IconoSaludEHigiene} from '../imagenes/cat_salud-e-higiene.svg';
import {ReactComponent as IconoTransporte} from '../imagenes/cat_transporte.svg';
import {ReactComponent as IconoFamilia} from '../imagenes/family.svg';


const IconoCategoria = ({nombre}) => {
    switch(nombre){
        case'comida':
            return <IconoComida/>;
        case 'compras':
            return <IconoCompras/>;
        case 'cuentas y pagos':
            return <IconoCuentasYPagos/>;
        case 'diversion':
            return <IconoDiversion/>;
        case 'hogar':
            return <IconoHogar/>;
        case 'ropa':
            return <IconoRopa/>;
        case 'salud e higiene':
            return <IconoSaludEHigiene/>;
        case 'transporte':
            return <IconoTransporte/>;
        case 'envios':
            return <IconoFamilia/>    
        default:
            break;              
    }
}
 
export default IconoCategoria;
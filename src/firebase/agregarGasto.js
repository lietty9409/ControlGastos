import {db} from '../firebase/firebaseConfig';
import { collection,addDoc } from 'firebase/firestore';


const agregarGasto = ({categoria,cantidad,descripcion,fecha,uidUsuario}) => {
   return addDoc(collection(db,'gastos'),{
        categoria: categoria,
        descripcion: descripcion,
        cantidad:Number(cantidad),
        fecha:fecha,
        uidUsuario:uidUsuario
    });   
}
 
export default agregarGasto;
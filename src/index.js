import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Helmet} from "react-helmet";
import WebFont from 'webfontloader';
import Contenedor from './elementos/Contenedor';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import InicioSesion from './componentes/InicioSesion';
import RegistroUsuario from './componentes/RegistroUsuarios';
import GastosPorCategoria from './componentes/GastosPorCategoria';
import EditarGastos from './componentes/EditarGastos';
import ListaDeGastos from './componentes/ListaDeGastos';
import favicon from './imagenes/logo.png';
import Fondo from './elementos/Fondo';
import { AuthProvider } from './contextos/AuthContext';
import RutaPrivada from './componentes/RutaPrivada';
import { TotalGastadoProvider } from './contextos/TotalGastadoEnElMesContext';

WebFont.load({
    google: {
      families: ['Work Sans: 400,500,700', 'sans-serif']
    }
  });


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Helmet>
      <link rel='shortcut icon' href={favicon} type='image/x-icon'/>
    </Helmet>
    <AuthProvider>
      <TotalGastadoProvider>
        <BrowserRouter>
          <Contenedor>
            <Routes>
              <Route path='/iniciar-sesion' element={<InicioSesion/>}/>
              <Route path='/crear-cuenta' element={<RegistroUsuario/>}/>

              <Route path='/categorias' element={
                <RutaPrivada>
                  <GastosPorCategoria/>
                </RutaPrivada>
              } />

              <Route path='/lista' element={
                <RutaPrivada>
                  <ListaDeGastos/>
                </RutaPrivada>
              } />

              <Route path='/editar/:id' element={
                <RutaPrivada>
                  <EditarGastos/>
                </RutaPrivada>
              } />

              <Route path='/' element={
                <RutaPrivada>
                  <App/>
                </RutaPrivada>
              } />

            </Routes>
          </Contenedor>
        </BrowserRouter>
      </TotalGastadoProvider>
    </AuthProvider>
    <Fondo/>
  </>
);


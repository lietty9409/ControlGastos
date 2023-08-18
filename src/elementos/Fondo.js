import React from 'react';
import { styled } from 'styled-components';
import {ReactComponent as Puntos} from '../imagenes/puntos.svg';





const Fondo = () => {
    return ( 
        <>
            <PuntosArriba/>
                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio='none'>
                    <path 
                        fillOpacity="1" 
                        d="M0,96L80,90.7C160,85,320,75,480,101.3C640,128,800,192,960,208C1120,224,1280,192,1360,176L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z">     
                    </path>
                </Svg>
            <PuntosAbajo/>
          </>
     );
}
 


const Svg = styled.svg`
    height: 50vh;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 0;
    path {
        fill: rgba(135,182,194, .15);
    }
`;
 
const PuntosArriba = styled(Puntos)`
    position: fixed;
    z-index: 1;
    top: 2.5rem; /* 40px */
    left: 2.5rem; /* 40px */
`;
 
const PuntosAbajo = styled(Puntos)`
    position: fixed;
    z-index: 1;
    bottom: 2.5rem; /* 40px */
    right: 2.5rem; /* 40px */
`;

export default Fondo;

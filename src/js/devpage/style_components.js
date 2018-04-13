import React from "react";
import styled from 'styled-components';

export const MainComponent = styled.div`
    background: transparent;
    display: flex;
    flex: 0 1 auto;
    flex-direction: row;
    justify-content: space-around;
    margin: 0% 0% 0% 0%;
`;

export const SubComponent = styled.div`
    background: transparent;
    display: flex;
    flex: 0 1 auto;
    flex-direction: column;
    width: 100%;
    height: 100px;
    min-height: 100px;
    margin: 0% 0% 0% 0%;
`;
export const PageAndSelector = styled.div`
    background: transparent;
    display: flex;
    flex-direction: column;
`
// Hacer que form styled herede de wrapper las props en comun, cambiarles nombres, meter en form a ListExampleMessages

/*export const PublishFormStyled = styled.div`
    width: 20%;
    position: absolute !important;
    top: 0px !important;
    right: 0px !important
    
`*/

export const PublishFormStyled = styled.div`
    display: flex;
    width: 20%;
    flex-direction: column;
    background: transparent;
    margin: 0% 0% 0% 0%;
`
import styled from 'styled-components';

export const Errors = styled.div`
    color: white;
    background: #cc3300;
    font-size: 1.75rem;
    margin: 3% 25%;
    display: flex;
    align-content: center;
    justify-content: center;

`;

export const OuterDiv = styled.div`

`;

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    text-align: center;
    border: 1px solid black;
    border-radius: 6px;
    box-shadow: 7px 8px 25px -1px black;
    margin: 3.5%;
    padding: 2%;
   background: #3B945E;
`;

export const StyledBtn = styled.button`
    margin: 0 40%;
    background: #6E9B7B;
    color: white;
    font-size: 1.75rem;
    border-radius: 0.5rem;
    padding: 0.5rem;
    border: 3px solid #72CB91;

    &:hover{
        cursor: pointer;
    }

    &:disabled{
        opacity: 0.25;
        border: 3px solid red;
    }
`;

export const StyledInput = styled.input`
   margin: 2% 20%;
   text-align: center;
   background: #E3E7D9;
`;

export const StyledLabel = styled.label`
    display: flex;
    flex-direction: column;
    color: white;
`;

export const StyledTitle = styled.h1`
    margin-top: 1.5%;
`;
import styled from 'styled-components'
const ButtonIniciarStructure = styled.div`
  margin-top:16px;
  margin-bottom: 16px;
  border: 1px solid  ${({ theme}) => theme.colors.secondary};
  padding: 18px 32px;
  background-color: ${({ theme}) => theme.colors.primary};
  color: ${({ theme}) => theme.colors.contrastText};
  border-radius: 6px;
  overflow: hidden;
  text-align: center;
`;

export default function ButtonIniciar({ textButton, urlButton }){
  return (
    <a href={urlButton} target="_blank" rel="noreferrer">
      <ButtonIniciarStructure>
        {textButton}  
      </ButtonIniciarStructure>
    </a>
  );
}
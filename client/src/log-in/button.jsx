import styled from "styled-components";

export default function Button({ content,onClick }) {
  return <StyledButton onClick={onClick}>{content}</StyledButton>;
}

const StyledButton = styled.button`
background: linear-gradient(to right, #2e1e0a 0%, #5d3d17 79%);

  text-transform: uppercase;
  letter-spacing: 0.2rem;
  width: 65%;
  height: 3rem;
  border: none;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
`;
import styled from 'styled-components';
import logoImage from './LOGO.png';
export default function Icon({ children }) {
  return <StyledIcon>{children}</StyledIcon>;
}

const StyledIcon = styled.div`
  height: 3.5rem;
  width: 3.5rem;
  background-image: url(${logoImage});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4rem;
  cursor: pointer;
`;

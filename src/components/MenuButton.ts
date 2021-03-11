import styled from 'styled-components'

type Props = {
  size?: number
  color?: string
}

const MenuButton = styled.button<Props>`
  ${({ size = 24, color = 'currentColor' }) => `
    width: ${size}px;
    height: ${size}px;
    background-image: radial-gradient(${color} 40%, transparent 40%);
  `}
  background-color: transparent;
  background-repeat: repeat-y;
  background-size: 33.33% 33.33%;
  background-position: center;
  border: none;
  outline: none;
  cursor: pointer;
  color: inherit;
`

export default MenuButton

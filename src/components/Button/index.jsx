import styled from 'styled-components'

const Button = styled.button`
  font-size: 1rem;
  height: 40px;
  line-height: 40px;
  text-align: center;
  padding: 0 20px;
  border-radius: 5px;
`

export const PrimaryButton = styled(Button)`
  background: #fff;
  border: 1px solid #fae379;
`
PrimaryButton.displayName = 'PrimaryButton'

export const ConfirmButton = styled(Button)`
  background: #fae379;
  border: none;
`
ConfirmButton.displayName = 'ConfirmButton'


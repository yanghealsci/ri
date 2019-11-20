import styled from 'styled-components'

const OverLay = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Modal = props => {
  const {
    title,
    contentStyle
  } = props


  const defaultContentStyle = {
    width: 400,
    background: '#fff',
    padding: 30
  }

  const defaultTitleStyle = {
    height: 40,
    lineHeight: '40px',
    textAlign: 'center'
  }

  return <OverLay>
    <div style={{
      ...defaultContentStyle,
      ...contentStyle
    }}>
      <div style={defaultTitleStyle}>{title}</div>
      <div style={{padding: '20px 0'}}>{props.children}</div>
    </div>
  </OverLay>
}

export default Modal
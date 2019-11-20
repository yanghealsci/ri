import styled from 'styled-components'

const VerticalLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const Header = styled.header`
  padding: 0 50px;
  background: #fae379;
`

export const Content = styled.div`
  flex: 1;
`

export const Footer = styled.footer`
  padding: 30px 50px;
  background: #fae379;
`

const Layout = props => {
  return <VerticalLayout>
    <Header>{props.header}</Header>
    <Content>{props.children}</Content>
    <Footer>{props.footer}</Footer>
  </VerticalLayout>
}

export default Layout
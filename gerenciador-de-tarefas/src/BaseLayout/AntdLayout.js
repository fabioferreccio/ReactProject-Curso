import React, { useState } from 'react';
import { 
  Layout
} from 'antd';
const { Header, Footer, Content } = Layout;

function AntdLayout(props) {
  return (
    <Layout>
      <Header>Gerenciador de Tarefas</Header>
      <Content>
        {props.children}
      </Content>
      <Footer>
        <small>Copyright &copy; 2020 - By Fabio Ferreccio</small>
      </Footer>
    </Layout>
  );
}

export default AntdLayout;
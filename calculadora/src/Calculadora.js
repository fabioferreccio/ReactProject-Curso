import React from 'react';
import { 
  Layout, Space, Card, Row, Col
} from 'antd';
import './Calculadora.css';

const { Header, Footer, Content } = Layout;

function Calculadora() {
  return (
    <Layout>
      <Header>Calculadora Demo</Header>
      <Content>
        <Space direction="horizontal" align="center">
          <Card style={{ width: 300 }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" span={6}><div>C</div></Col>
              <Col className="gutter-row" span={18}><div>Input</div></Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" span={6}><div>7</div></Col>
              <Col className="gutter-row" span={6}><div>8</div></Col>
              <Col className="gutter-row" span={6}><div>9</div></Col>
              <Col className="gutter-row" span={6}><div>/</div></Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" span={6}><div>4</div></Col>
              <Col className="gutter-row" span={6}><div>5</div></Col>
              <Col className="gutter-row" span={6}><div>6</div></Col>
              <Col className="gutter-row" span={6}><div>*</div></Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" span={6}><div>1</div></Col>
              <Col className="gutter-row" span={6}><div>2</div></Col>
              <Col className="gutter-row" span={6}><div>3</div></Col>
              <Col className="gutter-row" span={6}><div>-</div></Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" span={6}><div>0</div></Col>
              <Col className="gutter-row" span={6}><div>.</div></Col>
              <Col className="gutter-row" span={6}><div>=</div></Col>
              <Col className="gutter-row" span={6}><div>+</div></Col>
            </Row>
          </Card>
        </Space>
      </Content>
      <Footer>
          <small>Copyright &copy; 2020 - By Fabio Ferreccio</small>
      </Footer>
    </Layout>
  );
}

export default Calculadora;


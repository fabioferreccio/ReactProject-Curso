import React, { useState } from 'react';
import { 
  Layout, Space, Card, Row, Col,
  Button, Input
} from 'antd';
import CalculadoraService from './Calculadora.service';
import './Calculadora.css';

const { Header, Footer, Content } = Layout;

function Calculadora() {

  const [calcular, concatenarNumero, SOMA, SUBTRACAO, MULTIPLICACAO, DIVISAO] = CalculadoraService();
  const [txtNumeros, setTxtNumeros] = useState('0');
  const [numero1, setNumero1] = useState('0');
  const [numero2, setNumero2] = useState(null);
  const [operacao, setOperacao] = useState(null);

  function adicionarNumero(numero){
    let resultado;

    if(operacao === null){
      resultado = concatenarNumero(numero1, numero);
      setNumero1(resultado);
    }else{
      resultado = concatenarNumero(numero2, numero);
      setNumero2(resultado);
    }
    setTxtNumeros(resultado);
  }

  function definirOperacao(op){
    // Caso 1: Operação definida e numero2 preenchido, realiza à operação;
    if(numero2 !== null && operacao !== null){
      const resultado = calcular(parseFloat(numero1), parseFloat(numero2), operacao);
      setNumero1(resultado.toString());
      setNumero2(null);
      setOperacao(op);
      setTxtNumeros(resultado.toString());
    }else if(numero1 === '0' && txtNumeros !== '0' && operacao === null){
      // Caso 2: Continuação de operações após à igualdade
      setNumero1(txtNumeros);
      setNumero2(null);
      setOperacao(op);
    }else if(operacao === null){
      // Caso 3: Não há definição de operação
      setOperacao(op)
      return;
    }
  }

  function acaoCalcular(){
    if(numero2 === null){
      return;
    }

    const resultado = calcular(parseFloat(numero1), parseFloat(numero2), operacao);
    setTxtNumeros(resultado.toString());
    setNumero1('0');
    setNumero2(null);
    setOperacao(null);
  }

  function limpar(){
    setTxtNumeros('0');
    setNumero1('0');
    setNumero2(null);
    setOperacao(null);
  }

  return (
    <Layout>
      <Header>Calculadora Demo</Header>
      <Content>
        <Space direction="horizontal" align="center">
          <Card style={{ width: 300 }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" span={6}><Button onClick={limpar} type="danger">C</Button></Col>
              <Col className="gutter-row" span={18}><Input value={txtNumeros} name="txtNumeros" data-testid="txtNumeros" readOnly="readyonly" /></Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" span={6}><Button onClick={() => adicionarNumero('7')}>7</Button></Col>
              <Col className="gutter-row" span={6}><Button onClick={() => adicionarNumero('8')}>8</Button></Col>
              <Col className="gutter-row" span={6}><Button onClick={() => adicionarNumero('9')}>9</Button></Col>
              <Col className="gutter-row" span={6}><Button onClick={() => definirOperacao(DIVISAO)}>/</Button></Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" span={6}><Button onClick={() => adicionarNumero('4')}>4</Button></Col>
              <Col className="gutter-row" span={6}><Button onClick={() => adicionarNumero('5')}>5</Button></Col>
              <Col className="gutter-row" span={6}><Button onClick={() => adicionarNumero('6')}>6</Button></Col>
              <Col className="gutter-row" span={6}><Button onClick={() => definirOperacao(MULTIPLICACAO)}>*</Button></Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" span={6}><Button onClick={() => adicionarNumero('1')}>1</Button></Col>
              <Col className="gutter-row" span={6}><Button onClick={() => adicionarNumero('2')}>2</Button></Col>
              <Col className="gutter-row" span={6}><Button onClick={() => adicionarNumero('3')}>3</Button></Col>
              <Col className="gutter-row" span={6}><Button onClick={() => definirOperacao(SUBTRACAO)}>-</Button></Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" span={6}><Button onClick={() => adicionarNumero('0')}>0</Button></Col>
              <Col className="gutter-row" span={6}><Button onClick={() => adicionarNumero('.')}>.</Button></Col>
              <Col className="gutter-row" span={6}><Button onClick={acaoCalcular} className="sucess">=</Button></Col>
              <Col className="gutter-row" span={6}><Button  onClick={() => definirOperacao(SOMA)}>+</Button></Col>
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


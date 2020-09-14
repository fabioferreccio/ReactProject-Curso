import React, { useState } from 'react';
import { 
  Layout, Card, Alert, Modal, Row, Col,
  Form, Button, Spin
} from 'antd';
import NumberFormat from 'react-number-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import ListarMoedas from "./listar-moedas";
import axios from 'axios';
import './conversor-moedas.css';

const { Header, Footer, Content } = Layout;
//const { Option } = Select

function ConversorMoedas() {
  // SERVICE URLs:
  const FIXER_URL = 'http://data.fixer.io/api/latest?access_key=eba7130a5b2d720ce43eb5fcddd47cc3';

  // Define Variaveis:
  const [valorInput, setValorInput] = useState(null);
  const [moedaDe, setMoedaDe] = useState('BRL');
  const [moedaPara, setMoedaPara] = useState('USD');
  const [resultadoConversao, setResultadoConversao] = useState('');
  const [form] = Form.useForm();
  
  const [exibirAlert, setExibirAlert] = useState(false);
  const [exibirSpinner, setExibirSpinner] = useState(false);
  const [exibirModal, setExibirModal] = useState(false);
  
  function handleValor(event){
    setValorInput(event.target.value);
  }
  function handleMoedaDe(sel,obj){
    setMoedaDe(sel);
  }
  function handleMoedaPara(sel,obj){
    setMoedaPara(sel);
  }
  function handleFecharModal(){
    setValorInput('1');
    setMoedaDe('BRL');
    setMoedaPara('USD');
    setExibirModal(false);
  }

  const handleClose = () => {
    setExibirAlert(false);
  };

  function onSubmitConvert(e) {
    if(valorInput !== null){
      setExibirSpinner(true);
      
      let valor = parseFloat(valorInput.replace("R$ ","").replace(",","").replace(".",""))/100;
      axios.get(FIXER_URL)
        .then(res => {
          const cotacao = obterCotacao(res.data);
          if (cotacao) {
            setResultadoConversao(`${valor} ${moedaDe} = ${cotacao} ${moedaPara}`);
            setExibirModal(true);
            setExibirSpinner(false);
            setExibirAlert(false);
          } else {
            exibirErro();
          }
        }).catch(err => exibirErro());
    }
  };

  function obterCotacao(dadosCotacao) {
    if (!dadosCotacao || dadosCotacao.success !== true) {
      return false;
    }

    let valor = parseFloat(valorInput.replace("R$ ","").replace(",","").replace(".",""))/100;
    const cotacaoDe = dadosCotacao.rates[moedaDe];
    const cotacaoPara = dadosCotacao.rates[moedaPara];
    const cotacao = (1 / cotacaoDe * cotacaoPara) * valor;
    return cotacao.toFixed(2);
  }

  function exibirErro() {
    setExibirAlert(true);
    setExibirSpinner(false);
  }

  

  return (
    <Layout>
      <Header>Conversor de Moedas</Header>
      <Content>
      <Card className="cm-card--content">
        {exibirAlert ? (
          <Alert message="Erro obtendo dados de conversão tente novamente." type="error" closable afterClose={handleClose}/>
        ):null}
        <Form form={form} onFinish={onSubmitConvert}>
          <Row>
            {/*{ xs: 8, sm: 16, md: 24, lg: 32 }]*/}
            <Col xs={24} sm={6}>
                <NumberFormat onChange={handleValor} value={valorInput} required decimalSeparator="," className="ant-input" placeholder="0" prefix={'R$ '} decimalScale={2} fixedDecimalScale/>
            </Col>
            <Col xs={24} sm={6}>
                <ListarMoedas xValue={moedaDe} xChange={handleMoedaDe}/>
            </Col>
            <Col xs={24} sm={3} style={{textAlign: 'center', paddingTop: '5px' }}>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Col>
            <Col xs={24} sm={6}>
              <ListarMoedas xValue={moedaPara} xChange={handleMoedaPara} />
            </Col>
            <Col xs={24} sm={3}>
              <Form.Item>
                <Button type="default" htmlType="submit">
                  <span className={exibirSpinner ? null : 'hidden'}><Spin size="small" /></span>
                  <span className={!exibirSpinner ? null : 'hidden'}>Converter</span>
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Modal title="Conversão" closable 
          visible={exibirModal}
          onCancel={handleFecharModal}
          footer={[
            <Button type="primary" onClick={handleFecharModal}>
              Nova conversão
            </Button>,
          ]}>
          <p>{resultadoConversao}</p>
        </Modal>
      </Card>
      </Content>
      <Footer>
        <small>Copyright &copy; 2020 - By Fabio Ferreccio</small>
      </Footer>
    </Layout>
  );
}

export default ConversorMoedas;

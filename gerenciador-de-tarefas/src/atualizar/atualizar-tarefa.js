
import React, { useState, useEffect } from 'react';
import AntdLayout from '../BaseLayout/AntdLayout';
import { 
  PageHeader, Descriptions, Modal, 
  ConfigProvider, Form, Input, Button
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks } from '@fortawesome/free-solid-svg-icons'
import { navigate, A } from 'hookrouter';
import PropTypes from 'prop-types';

const routes = [
  {
    path: '../',
    breadcrumbName: 'Tarefas',
  },
  {
    path: '/atualiza',
    breadcrumbName: 'Atualiza Tarefa',
  }
];

function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <A href={paths.join('/')}>{route.breadcrumbName}</A>
  );
}

function AtualizarTarefa(props) {
  const [form] = Form.useForm();
  const [exibirModal, setExibirModal] = useState(false);
  const [carregarTarefas, setCarregarTarefas] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    function obterTarefas(){
      const tarefaDB = localStorage['tarefa'];
      let listarTarefas = tarefaDB ? JSON.parse(tarefaDB) : [];

      listarTarefas = listarTarefas.map(tarefa => {
          if(tarefa.id.toString() === props.id){
              form.setFieldsValue({ tarefa: tarefa.nome})
          }
          return tarefa;
      });

      setDataSource(listarTarefas);
    }

    if(carregarTarefas){
      obterTarefas();
      setCarregarTarefas(false);
    }
  }, [carregarTarefas, form, props.id]);

  const rulesTarefa = [
    { required: true, message: 'por favor insira uma tarefa' },
    { min: 5, message: 'Uma tarefa deve possuir ao menos 5 caracteres.' },
    { max: 100, message: 'Uma tarefa deve possuir no maxímo 100 caracteres.' }
  ];

  const onFinishForm = (values) => {
    // 1 - Obtém as tarefas:
    let tarefas = dataSource;

    // 2 - Persistir as alteração
    tarefas = tarefas.map(tarefa => {
        if(tarefa.id.toString() === props.id){
            tarefa.nome = values.tarefa;
        }
        return tarefa;
    });
    localStorage['tarefa'] = JSON.stringify(tarefas);

    setExibirModal(true);
  };

  function handleFecharModal(){
    navigate('/');
  }

  return (
    <AntdLayout>
        <PageHeader
          ghost={false}
          onBack={() => window.location = "../"}
          title="Atualiza Tarefa"
          breadcrumb={{routes, itemRender}}
        >
          <Descriptions size="small" column={3}>
            <ConfigProvider>
              <Form noValidate form={form} layout="inline" onFinish={onFinishForm}>
                <Form.Item  name="tarefa" label="Tarefa" rules={rulesTarefa} style={{width: "80%"}}>
                  <Input data-testid="txt-tarefa" prefix={<FontAwesomeIcon icon={faTasks} style={{ color: "#7f767666" }} />} placeholder="Digite a tarefa" />
                </Form.Item>

                <Form.Item>
                  <Button data-testid="btn-cadastrar" type="primary" htmlType="submit">
                    Atualizar
                  </Button>
                </Form.Item>
              </Form>
            </ConfigProvider>
          </Descriptions>
        </PageHeader>

        <Modal title="Sucesso" closable
          data-testid="modal"
          visible={exibirModal}
          onCancel={handleFecharModal}
          footer={[
            <Button key="1" type="primary" onClick={handleFecharModal}>
              Continuar
            </Button>,
          ]}>
          <p>Tarefa atualizada com sucesso!</p>
        </Modal>
    </AntdLayout>
  );
}

AtualizarTarefa.prototype = {
  id: PropTypes.number.isRequired
}

export default AtualizarTarefa;
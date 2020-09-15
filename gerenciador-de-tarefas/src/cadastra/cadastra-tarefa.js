import React, { useState } from 'react';
import AntdLayout from '../BaseLayout/AntdLayout';
import { 
  PageHeader, Descriptions, Modal, 
  ConfigProvider, Form, Input, Button
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks } from '@fortawesome/free-solid-svg-icons'
import { navigate, A } from 'hookrouter';
import Tarefa from '../Models/tarefa.model';

const routes = [
  {
    path: './',
    breadcrumbName: 'Tarefas',
  },
  {
    path: '/cadastrar',
    breadcrumbName: 'Cadastrar Tarefas',
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

function CadastrarTarefa() {
  const [form] = Form.useForm();
  const [exibirModal, setExibirModal] = useState(false);
  
  const rulesTarefa = [
    { required: true, message: 'por favor insira uma tarefa' },
    { min: 5, message: 'Uma tarefa deve possuir ao menos 5 caracteres.' },
    { max: 100, message: 'Uma tarefa deve possuir no maxímo 100 caracteres.' }
  ];

  const onFinishForm = (values) => {
    // 1 - Obtém as tarefas:
    const tarefaDB = localStorage['tarefa'];
    const tarefas = tarefaDB ? JSON.parse(tarefaDB) : [];

    // 2 - Persistir as tarefas
    tarefas.push(new Tarefa(new Date().getTime(), values.tarefa, false));
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
          onBack={() => window.location = "./"}
          title="Cadastrar Tarefas"
          breadcrumb={{routes, itemRender}}
        >
          <Descriptions size="small" column={3}>
            <ConfigProvider>
              <Form noValidate form={form} layout="inline" onFinish={onFinishForm}>
                <Form.Item name="tarefa" label="Tarefa" rules={rulesTarefa} style={{width: "80%"}}>
                  <Input data-testid="txt-tarefa" prefix={<FontAwesomeIcon icon={faTasks} style={{ color: "#7f767666" }} />} placeholder="Digite a tarefa" />
                </Form.Item>

                <Form.Item>
                  <Button data-testid="btn-cadastrar" type="primary" htmlType="submit">
                    Adicionar
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
          <p>Tarefa adicionada com sucesso!</p>
        </Modal>
    </AntdLayout>
  );
}

export default CadastrarTarefa;
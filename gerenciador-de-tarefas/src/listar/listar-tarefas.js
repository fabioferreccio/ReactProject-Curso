import React, { useState, useEffect } from 'react';
import AntdLayout from '../BaseLayout/AntdLayout';
import { PageHeader, Table, Button, Descriptions, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import ConcluirTarefa from './concluir-tarefa';
import './listar-tarefas.css';

function ListarTarefa() {
  const [carregarTarefas, setCarregarTarefas] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    function obterTarefas(){
      const tarefaDB = localStorage['tarefa'];
      let listarTarefas = tarefaDB ? JSON.parse(tarefaDB) : [];
      setDataSource(listarTarefas);
      console.log(listarTarefas);
    }

    if(carregarTarefas){
      obterTarefas();
      setCarregarTarefas(false);
    }
  }, [carregarTarefas]);
  
  const columns = [
    {
      title: 'Tarefa',
      dataIndex: 'nome',
      width: '75%',
      sorter: (a, b) => a.nome.toLowerCase() <= b.nome.toLowerCase(),
      render: (text, record) => (
        <span style={{textDecoration: record.concluida ? 'line-through' : 'none' }}>
          {text} 
        </span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle" align='end'>
          <ConcluirTarefa
            className={record.concluida ? 'hidden': null}
            tarefa={record} 
            recarregarTarefas={setCarregarTarefas} />
          <Button 
            className={record.concluida ? 'warning hidden':'warning'}
            icon={<FontAwesomeIcon icon={faEdit} style={{ color: "#00000066" }} />} 
            size="small"
            href={'/atualizar/' + record.id} />
          
        </Space>
      ),
    }
  ];

  return (
    <AntdLayout>
        <PageHeader
          ghost={false}
          title="Tarefas a fazer"
          extra={[
            <Button key="1" type="primary" href="/cadastrar">
              Nova Tarefa
            </Button>,
          ]}
        >
          <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 3 }}/>
          <Descriptions size="small"></Descriptions>
        </PageHeader>
    </AntdLayout>
  );
}

export default ListarTarefa;
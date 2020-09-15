import React, { useState, useEffect } from 'react';
import AntdLayout from '../BaseLayout/AntdLayout';
import { PageHeader, Table, Button, Descriptions, Space, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit } from '@fortawesome/free-solid-svg-icons';
import ConcluirTarefa from './concluir-tarefa';
import RemoverTarefa from './remover-tarefa';
import './listar-tarefas.css';

function ListarTarefa() {
  const [carregarTarefas, setCarregarTarefas] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [filtroTarefa, setFiltroTarefa] = useState("");

  function handleFiltrar(event){
    event.preventDefault();
    setFiltroTarefa(event.target.value);
    setCarregarTarefas(true);
  }

  useEffect(() => {
    function obterTarefas(){
      const tarefaDB = localStorage['tarefa'];
      let listarTarefas = tarefaDB ? JSON.parse(tarefaDB) : [];
      
      // Implementação do filtro
      listarTarefas = listarTarefas.filter(
        t => t.nome.toLowerCase().indexOf(filtroTarefa.toLowerCase()) === 0
      );

      setDataSource(listarTarefas);
      //console.log(listarTarefas);
    }

    if(carregarTarefas){
      obterTarefas();
      setCarregarTarefas(false);
    }
  }, [carregarTarefas, filtroTarefa]);
  
  const columns = [
    {
      title: 'Tarefa',
      dataIndex: 'nome',
      width: '75%',
      onFilter: (value, record) => record.nome.indexOf(value) === 0,
      sorter: (a, b) => a.nome.toLowerCase() < b.nome.toLowerCase() ? 1 : -1,
      sortDirections: ['descend', 'ascend'],
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
          <RemoverTarefa 
            tarefa={record} 
            recarregarTarefas={setCarregarTarefas} />
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
            <Input
              key = "1"
              style={{width: "unset"}}
              prefix={
                <FontAwesomeIcon 
                  icon={faSearch} 
                  style={{ color: "#7f767666" }} />
              }
              value={filtroTarefa}
              onChange={handleFiltrar}
              placeholder="Buscar Tarefa" />,
            <Button key="2" type="primary" href="/cadastrar">
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
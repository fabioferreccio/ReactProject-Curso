import React, { useState } from 'react';
import AntdLayout from '../BaseLayout/AntdLayout';
import { PageHeader, Button, Descriptions } from 'antd';
// import { A } from 'hookrouter';

function ListarTarefa() {

  return (
    <AntdLayout>
        <PageHeader
          ghost={false}
          // onBack={() => window.history.back()}
          title="Listar Tarefas"
          extra={[
            <Button key="1" type="primary" href="/cadastrar">
              Nova Tarefa
            </Button>,
          ]}
        >
          <Descriptions size="small" column={3}>
            {/* <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
            <Descriptions.Item label="Association">
              <a>421421</a>
            </Descriptions.Item>
            <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
            <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
            <Descriptions.Item label="Remarks">
              Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item> */}
          </Descriptions>
        </PageHeader>
    </AntdLayout>
  );
}

export default ListarTarefa;
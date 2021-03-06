import React from 'react';
import './gerenciador-tarefas.css';
import { useRoutes } from 'hookrouter';
import ListarTarefas from './listar/listar-tarefas';
import CadastrarTarefa from './cadastra/cadastra-tarefa';
import AtualizarTarefa from './atualizar/atualizar-tarefa';

const routes = {
  '/': () => <ListarTarefas />,
  '/cadastrar': () => <CadastrarTarefa />,
  '/atualizar/:id': ({id}) => <AtualizarTarefa id={id} />
};

function GerenciadorTarefas() {
  const routeResult = useRoutes(routes);
  return routeResult || <div>Error</div>;
}

export default GerenciadorTarefas;

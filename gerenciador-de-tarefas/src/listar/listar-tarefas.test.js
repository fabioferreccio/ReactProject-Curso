import React from 'react';
import ReactDOM from 'react-dom';
//import { render, fireEvent } from '@testing-library/react';
import ListarTarefas from './listar-tarefas';

describe('Teste - Componente - ListarTarefas', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  it('Deve renderizar o componente sem erros', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ListarTarefas />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

});

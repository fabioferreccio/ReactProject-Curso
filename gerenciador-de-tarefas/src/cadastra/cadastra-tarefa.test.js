import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CadastraTarefa from './cadastra-tarefa';

describe('Teste - Componente - CadastraTarefa', () => {
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
    ReactDOM.render(<CadastraTarefa />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Deve cadastra uma nova tarefa', () => {
    const { getByTestId } = render(<CadastraTarefa />);
    fireEvent.change(getByTestId('txt-tarefa'), { target: { value: 'Testar Componente' }});
    fireEvent.click(getByTestId('btn-cadastrar'));
    expect(getByTestId('modal')).toHaveTextContent("Sucesso");
    expect(getByTestId('modal')).toHaveTextContent("Tarefa adicionada com sucesso!");
  });

});

import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Axios from 'axios';
import ConversorMoedas from './conversor-moedas';

jest.mock('axios');

describe('ConversorDeMoedas', () => {
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
      ReactDOM.render(<ConversorMoedas />, div);
      ReactDOM.unmountComponentAtNode(div);
  });

  it('deve simular uma conversão de moedas', async () => {
    const { findByTestId, getByTestId } = render(<ConversorMoedas />);
    const resp = { data: {success: true, rates: { BRL: 4.564292, USD: 1.101049 }}};
    
    Axios.get.mockResolvedValueOnce(() => Promise.resolve(resp));
    expect(Axios.get).not.toHaveBeenCalled();
    fireEvent.click(getByTestId('btn-converter'));
    
    //const modal = await findByTestId('modal');
    //expect(modal).toHaveTextContent('1 BRL = 0.24 USD');
  });

});

import React from 'react';
import ReactDOM from 'react-dom';
import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Calculadora from './Calculadora';

describe('Calculadora', () => {
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
        ReactDOM.render(<Calculadora />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Deve limpar o campo de números', () => {
        render(<Calculadora />)

        const keyNumber = screen.getByText('2');
        const keyClear = screen.getByText('C');
        const screenTxt = screen.getByTestId('txtNumeros');

        fireEvent.click(keyNumber); // Busca no codigo por um componente com texto 2 e realiza um click;
        fireEvent.click(keyClear);

        expect(screenTxt).toHaveValue('0');
    });

    it('Deve somar 2+3 e obter 5', () => {
        render(<Calculadora />)

        // Busca no codigo por um componente com texto 2 e realiza um click;
        const keyNumber = screen.getByText('2');
        const keyOp = screen.getByText('+');
        const keyNumber2 = screen.getByText('3');
        const keyEqual = screen.getByText('=');
        const screenTxt = screen.getByTestId('txtNumeros');

        fireEvent.click(keyNumber);
        fireEvent.click(keyOp);
        fireEvent.click(keyNumber2);
        fireEvent.click(keyEqual);

        expect(screenTxt).toHaveValue('5');
    });

    it('Deve subtrair 2-3 e obter -1', () => {
        render(<Calculadora />)

        // Busca no codigo por um componente com texto 2 e realiza um click;
        const keyNumber = screen.getByText('2');
        const keyOp = screen.getByText('-');
        const keyNumber2 = screen.getByText('3');
        const keyEqual = screen.getByText('=');
        const screenTxt = screen.getByTestId('txtNumeros');

        fireEvent.click(keyNumber);
        fireEvent.click(keyOp);
        fireEvent.click(keyNumber2);
        fireEvent.click(keyEqual);

        expect(screenTxt).toHaveValue('-1');
    });

    it('Deve dividir 3/3 e obter 1', () => {
        render(<Calculadora />)

        // Busca no codigo por um componente com texto 2 e realiza um click;
        const keyNumber = screen.getByText('3');
        const keyOp = screen.getByText('/');
        const keyNumber2 = screen.getByText('3');
        const keyEqual = screen.getByText('=');
        const screenTxt = screen.getByTestId('txtNumeros');

        fireEvent.click(keyNumber);
        fireEvent.click(keyOp);
        fireEvent.click(keyNumber2);
        fireEvent.click(keyEqual);

        expect(screenTxt).toHaveValue('1');
    });

    it('Deve multiplicar 3*3 e obter 9', () => {
        render(<Calculadora />)

        // Busca no codigo por um componente com texto 2 e realiza um click;
        const keyNumber = screen.getByText('3');
        const keyOp = screen.getByText('*');
        const keyNumber2 = screen.getByText('3');
        const keyEqual = screen.getByText('=');
        const screenTxt = screen.getByTestId('txtNumeros');

        fireEvent.click(keyNumber);
        fireEvent.click(keyOp);
        fireEvent.click(keyNumber2);
        fireEvent.click(keyEqual);

        expect(screenTxt).toHaveValue('9');
    });

    it('Deve multiplicar 2.5*2 e obter 5', () => {
        render(<Calculadora />)

        // Busca no codigo por um componente com texto 2 e realiza um click;
        const keyNumber = screen.getByText('2');
        const keyPonto = screen.getByText('.');
        const keyNumber3 = screen.getByText('5');
        const keyOp = screen.getByText('*');
        const keyNumber2 = screen.getByText('2');
        const keyEqual = screen.getByText('=');
        const screenTxt = screen.getByTestId('txtNumeros');

        fireEvent.click(keyNumber);
        fireEvent.click(keyPonto);
        fireEvent.click(keyNumber3);
        fireEvent.click(keyOp);
        fireEvent.click(keyNumber2);
        fireEvent.click(keyEqual);

        expect(screenTxt).toHaveValue('5');
    });

});



import React from 'react';
import ReactDOM from 'react-dom';
import CalculadoraService from './Calculadora.service';

describe('Teste do CalculadoraService', () => {
    const [calcular, concatenarNumero, SOMA, SUBTRACAO, MULTIPLICACAO, DIVISAO] = CalculadoraService();

    it('deve garantir que 1+4=5', () =>{
        let soma = calcular(1, 4, SOMA);
        expect(soma).toEqual(5);
    });

    it('deve garantir que 1-4=-3', () =>{
        let soma = calcular(1, 4, SUBTRACAO);
        expect(soma).toEqual(-3);
    });

    it('deve garantir que 1*4=4', () =>{
        let soma = calcular(1, 4, MULTIPLICACAO);
        expect(soma).toEqual(4);
    });

    it('deve garantir que 1/4=0.25', () =>{
        let soma = calcular(1, 4, DIVISAO);
        expect(soma).toEqual(0.25);
    });

    it('Para operação invalída deve retornar 0', () =>{
        let soma = calcular(1, 4, '%');
        expect(soma).toEqual(0);
    });
});
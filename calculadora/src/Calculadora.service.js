function CalculadoraService(){

    const SOMA = '+';
    const SUBTRACAO = '-';
    const MULTIPLICACAO = '*';
    const DIVISAO = '/';
    
    function calcular(numero1, numero2, operacao){
        let resultado;
        
        switch(operacao){
            case SOMA:
                resultado = numero1 + numero2;
                break;
            case SUBTRACAO:
                resultado = numero1 - numero2;
                break;
            case DIVISAO:
                resultado = numero1 / numero2;
                break;
            case MULTIPLICACAO:
                resultado = numero1 * numero2;
                break;
            default:
                resultado = 0;
                break;
        }
        return resultado;
    }

    function concatenarNumero(numAtual, numConcat){
        // Caso 1: Contém '0' ou null, renicia o valor
        if(numAtual === '0' || numAtual === null)
        {
            numAtual = '';
        }

        // Caso 2: Primeiro digito for '.' concatena '0' antes do ponto
        if(numConcat === '.' && numAtual === '')
        {
            return '0.';
        }

        // Caso 3: Se '.' for digitado e já houver ponto, apenas retorna
        if(numConcat === '.' && numAtual.indexOf('.') > -1)
        {
            return numAtual;
        }

        return numAtual + numConcat;
    }

    return [
        calcular,
        concatenarNumero,
        SOMA, SUBTRACAO, MULTIPLICACAO, DIVISAO
    ];
}

export default CalculadoraService;
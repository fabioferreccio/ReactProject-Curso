function Tarefa(id, nome, concluida){
    this.id = id;
    this.key = id;
    this.nome = nome;
    this.concluida = concluida;

    return {
        id: id,
        key: id.toString(),
        nome:nome,
        concluida: concluida
    };
}

export default Tarefa;
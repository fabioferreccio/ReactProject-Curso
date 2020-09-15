import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

function ConcluirTarefa(props){
    const [exibirModal, setExibeModal] = useState(false);

    function handleAbrirModal(event){
        event.preventDefault();
        setExibeModal(true);
    }

    function handleFecharModal(event){
        event.preventDefault();
        setExibeModal(false);
    }

    function handleConcluirTarefa(event){
        event.preventDefault();
        const tarefasDB = localStorage['tarefa'];
        let tarefas = tarefasDB ? JSON.parse(tarefasDB) : [];
        debugger
        tarefas = tarefas.map(tarefa => {
            if(tarefa.id === props.tarefa.id){
                tarefa.concluida = true;
            }
            return tarefa;
        });
        localStorage['tarefa'] = JSON.stringify(tarefas);
        setExibeModal(false);
        props.recarregarTarefas(true);
    }

    return(
        <span className={props.className}>
            <Button 
                data-testid="btn-abrir-modal"
                icon={<FontAwesomeIcon icon={faClipboardCheck} style={{ color: "#00000066" }} />} 
                size="small"
                onClick={handleAbrirModal} />
            <Modal 
                data-testid="modal"
                closable
                title="Concluir Tarefa" 
                visible={exibirModal}
                onCancel={handleFecharModal}
                footer={[
                    <Button 
                        key="1" 
                        type="primary"
                        data-testid="btn-concluir"
                        onClick={handleConcluirTarefa}>
                        Sim
                    </Button>,
                    <Button 
                        key="2" 
                        type="ghost"
                        data-testid="btn-fechar-modal"
                        onClick={handleFecharModal}>
                        Não
                    </Button>,
                ]}>
                <p>
                    Deseja realmente concluir a seguinte tarefa?<br />
                    <strong>{props.tarefa.nome}</strong>
                </p>
            </Modal>
        </span>
    );
}

ConcluirTarefa.protoTypes = {
    tarefa: PropTypes.object.isRequired,
    recarregarTarefas: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired
}

export default ConcluirTarefa;
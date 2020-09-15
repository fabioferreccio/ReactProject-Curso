import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function RemoverTarefa(props){
    const [exibirModal, setExibeModal] = useState(false);

    function handleAbrirModal(event){
        event.preventDefault();
        setExibeModal(true);
    }

    function handleFecharModal(event){
        event.preventDefault();
        setExibeModal(false);
    }

    function handleRemoverTarefa(event){
        event.preventDefault();
        const tarefasDB = localStorage['tarefa'];
        let tarefas = tarefasDB ? JSON.parse(tarefasDB) : [];
        
        tarefas = tarefas.filter(tarefa => tarefa.id !== props.tarefa.id);
        
        localStorage['tarefa'] = JSON.stringify(tarefas);
        setExibeModal(false);
        props.recarregarTarefas(true);
    }

    return(
        <span>
            <Button type="primary" danger
                data-testid="btn-abrir-modal"
                icon={<FontAwesomeIcon icon={faTrashAlt} style={{ color: "#ffffffdd" }} />} 
                size="small"
                onClick={handleAbrirModal} />
            <Modal 
                data-testid="modal"
                closable
                title="Remover Tarefa" 
                visible={exibirModal}
                onCancel={handleFecharModal}
                footer={[
                    <Button 
                        key="1" 
                        type="primary"
                        data-testid="btn-remover"
                        onClick={handleRemoverTarefa}>
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
                    Deseja realmente remover a seguinte tarefa?<br />
                    <strong>{props.tarefa.nome}</strong>
                </p>
            </Modal>
        </span>
    );
}

RemoverTarefa.protoTypes = {
    tarefa: PropTypes.object.isRequired,
    recarregarTarefas: PropTypes.func.isRequired
}

export default RemoverTarefa;
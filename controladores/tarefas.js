const { pool } = require('../config');

const getTarefas = (request, response) => {
    pool.query(`select t.codigo, t.titulo, 
        t.corpo, t.codigo_coluna as coluna, c.titulo as titulocoluna
        from tarefas t
        join colunas c on t.codigo_coluna = c.codigo
        order by t.codigo`, 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao consultar as tarefas: ' + error
            });
        }
        response.status(200).json(results.rows);
    })
}

const addTarefa = (request, response) => {
    const {coluna, titulo, corpo} = request.body;
    pool.query(`insert into tarefas (codigo_coluna, titulo, corpo)  
    values ($1, $2, $3)
    returning codigo, codigo_coluna, titulo, corpo`, 
    [coluna, titulo, corpo] , 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao inserir a tarefa!' + error
            });
        }
        response.status(200).json({
            status : 'success' , message : "Tarefa criada!",
            objeto : results.rows[0]
        });
    })
}

const updateTarefa = (request, response) => {
    const {codigo, titulo, corpo, coluna} = request.body;
    pool.query(`UPDATE tarefas
	SET titulo=$1, corpo=$2, codigo_coluna=$4
	WHERE codigo=$3
    returning codigo, codigo_coluna, titulo, corpo`, 
    [titulo, corpo, codigo, coluna] , 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao atualizar a tarefa!' + error
            });
        }
        response.status(200).json({
            status : 'success' , message : "Tarefa atualizada!",
            objeto : results.rows[0]
        });
    })
}

const updateColunaTarefa = (request, response) => {
    const coluna = parseInt(request.params.coluna);
    const codigo = parseInt(request.params.codigo);
    pool.query(`UPDATE tarefas
	SET codigo_coluna=$1
	WHERE codigo=$2
    returning codigo, codigo_coluna, titulo, corpo`, 
    [coluna, codigo] , 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao movimentar a tarefa!' + error
            });
        }
        response.status(200).json({
            status : 'success' , message : "Tarefa atualizada!",
            objeto : results.rows[0]
        });
    })
}

const deleteTarefa = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM tarefas WHERE codigo=$1`, 
                [codigo] , 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao remover a tarefa! ' + (error ? error : '')
            });
        }
        response.status(200).json({
            status : 'success' , message : "Tarefa removida!"
        });
    })
}

const getTarefaPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM tarefas WHERE codigo=$1`, 
                [codigo] , 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao recuperar a tarefa!'
            });
        }
        response.status(200).json(results.rows[0]);
    })
}

module.exports = {
    getTarefas, addTarefa, updateTarefa, deleteTarefa, getTarefaPorCodigo, updateColunaTarefa
}

const {pool} = require('../config');

const getColunas = (request, response) => {
    pool.query('SELECT * FROM colunas order by codigo',
        (error, results) => {
            if (error){
                return response.status(400).json(
                    {
                        status : 'error', 
                        message : 'Erro ao consultar o prédio: ' + error
                    }
                );
            }
            response.status(200).json(results.rows);
        }       
    )
}


const addColuna = (request, response) => {
    const {titulo} = request.body;
    pool.query(`INSERT INTO colunas (titulo) 
    values ($1) returning codigo, titulo`,
    [titulo],
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao inserir o estado: ' + error
            })
        }
        response.status(200).json({
            status : "success" , message : "Estado criado",
            objeto: results.rows[0]
        })
    })
}

const updateColuna = (request, response) => {
    const {codigo, titulo} = request.body;
    pool.query(`UPDATE colunas SET titulo=$1
    where codigo=$2 returning codigo, titulo`,
    [titulo, codigo],
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao alterar o estado: ' + error
            })
        }
        response.status(200).json({
            status : "success" , message : "Estado alterado",
            objeto: results.rows[0]
        })
    })
}

const deleteColuna = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM colunas WHERE codigo = $1`,
    [codigo],
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao remover o coluna: ' + 
                (error ? error :'Não removeu nenhum dado')
            })
        }
        response.status(200).json({
            status : "success" , message : "Estado removido"
        })
    })
}

const getColunaPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM colunas WHERE codigo = $1`,
    [codigo],
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao recuperar o estado: ' + 
                (error ? error :'Não encontrou nenhum dado')
            })
        }
        response.status(200).json(results.rows[0])
    })
}

module.exports = {
    getColunas, addColuna, updateColuna, deleteColuna, getColunaPorCodigo
}


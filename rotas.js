const { Router } = require('express');

const controleColunas = require('./controladores/colunas');
const controleTarefas = require("./controladores/tarefas");

const rotas = new Router();

rotas.route('/tarefas')
   .get(controleTarefas.getTarefas)
   .post(controleTarefas.addTarefa)
   .put(controleTarefas.updateTarefa)

rotas.route('/tarefas/:codigo')
   .get(controleTarefas.getTarefaPorCodigo)
   .delete(controleTarefas.deleteTarefa)

rotas.route('/tarefas/:codigo/:coluna')
   .put(controleTarefas.updateColunaTarefa)

rotas.route('/colunas')
     .get(controleColunas.getColunas)
     .post(controleColunas.addColuna)
     .put(controleColunas.updateColuna)

rotas.route('/colunas/:codigo')
     .get(controleColunas.getColunaPorCodigo)
     .delete(controleColunas.deleteColuna)

module.exports = rotas;
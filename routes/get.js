const express=require('express');
const { createTodo, getTodo, updateTodo, deleteTodo, getallTodo, updateMission } = require('../controller/list_controller');
const { authorization } = require('../Mallware/Auth');


const routes=express.Router();

routes.route('/create/todo').post(authorization, createTodo)
routes.route('/get/all/list').get(authorization, getTodo)
routes.route('/get/one/list/:id').get(authorization, getallTodo)
routes.route('/update/list/:id').put(authorization, updateTodo)
routes.route('/update/mission/:id').put(authorization, updateMission)
routes.route('/delete/student/:id').delete(authorization, deleteTodo)

module.exports=routes
const todo = require("../models/todo");


exports.createTodo = async (req, res) => {
    try{
        const user = req.locals;
        const {work, isDone, color} = req.body;
        const result = await todo.createTodo(work, isDone, color, user);
        res.status(200).json(result);
    }
    catch(err){
        res.status(400).json({errMessage: err});
    }
    
};

exports.getTodo = async (req, res) => {
    try{
        const user = req.locals;
        const day = req.params.day;
        const result = await todo.getTodo(day, user); //userId
        res.status(200).json({ todoArr : result.todoArr});
    }
    catch(err){
        res.status(400).json({errMessage: err});
    }
};

exports.putTodo = async (req, res) => {
    try{
        const user = req.locals;
        if (req.body.isDone === true || req.body.isDone === false){
            const todoId = req.params.id;
            const {isDone} = req.body;
            const result = await todo.isDoneTodo(todoId, isDone, user);
            res.status(200).json(result);
            
        }
        else{
            const todoId = req.params.id;
            const {work, color} = req.body;
            const result = await todo.putTodo(todoId, work, color, user);
            res.status(200).json(result);
        }
    }
    catch(err){
        res.status(400).json({errMessage: err});
    }
};

exports.deleteTodo = async (req, res) => {
    try{
        const user = req.locals;
        const todoId = req.params.id;
        const result = await todo.deleteTodo(todoId, user); //userId
        res.status(200).json({success : result});
    }
    catch(err){
        res.status(400).json({errMessage: err});
    }
};
const express = require('express');
const router = express.Router()
module.exports = router;

var { Todos } = require('../models/todos');

//Post Method
router.post('/post', async (req, res) => {
    const data = new Todos({
        description: req.body.description,
        completed: req.body.completed
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json({ success: true, response: 'Data saved successfully.', data: dataToSave });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message});
    }
});

//Get all Method
router.get('/getAll', async function (req, res, next) {
    try{
        const resTodoList = await Todos.find();
        res.json({ success: true, todoList: resTodoList });
    }
    catch(error){
        res.status(400).json({ success: false, error: error.message});
    }
});

//Get by ID Method
router.get('/getOne/:id', async function (req, res) {
    try{
        const data = await Todos.findById(req.params.id);
        if(data !== null && data !== ''){
            res.json({ success: true, todo: data});
        }else{
            res.status(404).json({ success: false, error: 'Data not found.'});
        }
    }
    catch(error){
        res.status(400).json({ success: false, error: error.message});
    }
});

//Update by ID Method
router.put('/update/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Todos.findByIdAndUpdate(
            id, updatedData, options
        );       

        if(result !== null && result !== ''){
            res.status(200).json({ success: true, response: result });
        }else{
            const newRecord = new Todos({
                description: req.body.description,
                completed: req.body.completed
            })
            const newRecordResult = await Todos.create(newRecord);
            res.status(201).send();
        }
    }
    catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
});

//Delete by ID Method
router.delete('/delete/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const data = await Todos.findByIdAndDelete(id);
        if(data !== null && data !== ''){
            res.status(200).json({success: true, response: 'id: ' +`${id}` + ' has been deleted.'});
        }else{
            res.status(204).send();
        }
    }
    catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
});
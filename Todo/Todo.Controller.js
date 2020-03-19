const mongoose = require('../DBSchema/SchemaMapper');
const Todo = mongoose.model('Todo');

var TodoController = function(){
    this.Insert = (data)=>{
        return new Promise((resolve,reject)=>{
            let todo = new Todo({
                description:data.description,
                completed:data.completed
            });
            todo.save().then(()=>{
                resolve({status:200,message:'todo added successfully'});
            }).catch((err)=>{
                reject({status:500,message:'todo creation failed due to Error: '+err});
            });
        })
    };

    this.retrieve = ()=>{
        return new Promise((resolve,reject)=>{
            Todo.find().then((data)=>{
                resolve({status:200,message:{success:true,data:data}});
            }).catch((err)=>{
                reject({status:500,message:'No data to be found. Error: '+err});
            })
        });
    };


    this.retrieveByID = (id)=>{
        return new Promise((resolve,reject)=>{
            Todo.findById(id).then((data)=>{
                resolve({status:200,message:data});
            }).catch((err)=>{
                reject({status:500,message:'No data to be found. Error: '+err});
            })
        });
    };

    this.update = (id,data)=>{
        return new Promise((resolve,reject)=>{

            let todo = {
                description:data.description,
                completed:data.completed
            };
            Todo.findByIdAndUpdate({_id: id},todo).then(()=>{
                resolve({status:200,message:'todo updated successfully'});
            }).catch((err)=>{
                reject({status:500,message:'todo updating failed due to Error: '+err});
            });
        })
    };

    this.delete = (id)=>{
        return new Promise((resolve,reject)=>{
            Todo.findByIdAndDelete(id).then(()=>{
                resolve({status:200,message:'Deletion Successful'});
            }).catch((err)=>{
                reject({status:500,message:'No data to be found. Error: '+err});
            })
        });
    }
};

module.exports = new TodoController();
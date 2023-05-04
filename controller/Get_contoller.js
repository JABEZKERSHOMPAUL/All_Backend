const Todo = require("../model/list_model")

const createTodo = async (req, res) => {
    try {
        const todo = new Todo({
            todo: req.body.todo,
            createdBy:req.userId,
        })
        const createTodo = await Todo.save();
        console.log(createTodo);
        if (createTodo) {
            res.json({ message: 'Created' })
        }

    } catch (error) {
        console.log(error)

    }
}

const getTodo = async (req, res) => {
    try {
        const getAll = await Todo.find({createdBy:req.userId})
        if (getAll) {
            res.send(getAll)
        }


    } catch (error) {
        console.log(error)
    }
}

const updateTodo = async (req, res) => {
    try {

        const update = await Todo.findByIdAndUpdate(req.params.id, req.body)
        if (update) {
            res.json({ message: 'Updated' })
        } else {
            res.json({ message: 'Not Updated' })
        }



    } catch (error) {
        console.log(error)

    }
}

const updateMission = async (req, res) => {
    try {
        const update = await Todo.findByIdAndUpdate(req.params.id, { isCompleted: true })
        if (update) {
            res.json({ message: 'Updated' })
        } else {
            res.json({ message: 'Not Updated' })
        }

    } catch (error) {
        console.log(error)

    }
}
const deleteTodo = async (req, res) => {
    try {
        const deleteTodo = await Todo.findByIdAndDelete(req.params.id)
        if (deleteTodo) {
            res.json({ message: 'deleted' })
        } else {
            res.json({
                message: 'Not deleted'
            })
        }

    } catch (error) {
        console.log(error)

    }
}
const getallTodo = async (req, res) => {
    try {
        const getAll = await Todo.findById(req.params.id)
        if (getAll) {
            res.send(getAll)
        } else {
            res.json({ message: "id not found" })
        }
    } catch (error) {
        console.log(error)
    }

}

// Pagenation code with Query
const movieListAggregation =async(req,res)=>{
    try {
        const {search,limit,skip}=req.body
       let query=[]
       if(search!==""){
        query.push({
            $match:{
                $or:[
                    {
                        moviename:{
                            $regex:search+ '.*',
                            $options:'si'
                        }
                    },
                    {
                        directedby:{
                            $regex:search+ '.*',
                            $options:'si'
                        }
                    },
                    {
                        produced:{
                            $regex:search+ '.*',
                            $options:'si'
                        }
                    }
                ]
            }
        })
       }
       const withoutlimit =Object.assign([],query)
       withoutlimit.push({$count:'count'})

       query.push(
        {$skip:skip},
        {$limit:limit},
        {
            $project:{
                moviename:1,
                relesedate:1,
                produced:1,
                directedby:1
            }
        }
        )

        const finalquery =[
            {
                $facet:{
                    overall:withoutlimit,
                    documentdata:query
                }
            }
        ]

        const getAlldata = await studentDetail.aggregate(finalquery)
        const data = getAlldata[0].documentdata
        const fullCount = getAlldata[0]?.overall[0]?.count

        if(data.length>0){
            res.json({
                status:1,
                response:{
                    result:data,
                    fullcount:fullCount,
                    length:data.length
                }
            })
        }else{
            res.json({
                status:0,
                response:{
                    result:[],
                    fullcount:fullCount,
                    length:data.length
                }
            })
        }

    } catch (error) {
        console.log(error)
    }

}

module.exports = { createTodo, getTodo, updateTodo, deleteTodo, getallTodo, updateMission }
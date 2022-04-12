import express from "express"
import cors from "cors"
import env from "dotenv"
import {
    MongoClient,
    ObjectId
} from "mongodb";




const app = express()
app.use(cors( {credentials: true, origin: true}))

const port = process.env.PORT || 3000
app.use(express.urlencoded({
    extended: true
}))


app.use(express.json())

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('pages/index')
})



env.config()

// Add headers before the routes are defined


const uri = "mongodb+srv://kia:" + process.env.PASS + "@cluster0.hdlqw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);


await client.connect();
const database = client.db("users");
const collections = database.collection("user_info");



app.get("/api/users", (req, res, next) => {
    async function get_users() {
        let json_user = []
        const users = collections.find({})
        await users.forEach(function (result) {
            json_user.push(result)
            console.log(result)
        })
        res.json(json_user)
        json_user = []
    }
    get_users()
})

app.get("/api/users/:id", (req, res, next) => {
    async function get_users() {
        let json_user = []
        const users = collections.find({
            _id: ObjectId(req.params.id)
        })
        await users.forEach(function (result) {
            json_user.push(result)
            console.log(result)
        })
        res.json(json_user)
        json_user = []
    }
    get_users()
})

app.post("/api/users", (req, res, next) => {
    async function add_user() {
        try {
            const doc = {
                name: req.body.name,
                age: req.body.age
            }
            const result = await collections.insertOne(doc)
            console.log(
                `A document was inserted with the _id: ${result.insertedId}`,
            );
            res.sendStatus(200)
        } finally {}
    }
    add_user();
})


app.put("/api/users/:id", (req, res, next) => {

    const found_user_object = collections.findOne(ObjectId(req.params.id))

    found_user_object.then(function (result) {
        if (result != null) {
            update_user()
        } else {
            res.sendStatus(404)
        }
    })

    function update_user() {
        try {
            collections.updateOne({
                _id: ObjectId(req.params.id)
            }, {
                $set: {
                    name: req.body.name,
                    age: req.body.age
                }
            })
            res.sendStatus(200)
        } finally {}
    }
})

app.delete("/api/users/:id", (req, res) => {
    function delete_user() {
        var delete_item = {
            _id: ObjectId(req.params.id)
        }
        collections.deleteOne(delete_item, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            res.sendStatus(200)
        })


    }
    delete_user()
})




app.listen(port, () => {
    console.log('Express server listening on http://localhost:' + port)
})
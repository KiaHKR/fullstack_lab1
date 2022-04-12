import express from "express"
import cors from "cors"
import env from "dotenv"
import {
    MongoClient,
    ObjectId
} from "mongodb";




const app = express()
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(cors())

const port = process.env.PORT || 3000
app.use(express.urlencoded({
    extended: true
}))
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Expose-Headers', '*')

    // Pass to next layer of middleware
    next();
});

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


app.options('/api/users/:id', cors()) // enable pre-flight request for DELETE request


app.get("/api/users", (req, res, next) => {
    async function get_users() {
        let json_user = []
        const users = collections.find({})
        await users.forEach(function (result) {
            json_user.push(result)
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


app.put("/api/users/:id", async (req, res) => {
    const found_user_object = collections.findOne(ObjectId(req.params.id))

    found_user_object.then(function (result) {
        if (result != null) {
            update_user()
        } else {
            res.sendStatus(404)
        }
    })

    function update_user() {
        collections.updateOne({
            _id: ObjectId(req.params.id)
        }, {
            $set: {
                name: req.body.name,
                age: req.body.age,
            }
        }).then(async response =>{
            console.log(response)
        })
        res.sendStatus(200)
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
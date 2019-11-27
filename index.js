require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let movies = 
[
{
    id: 1,
    judul: "frozen",
    tahun: 2019
},
{
    id : 2,
    judul: "joker",
    tahun: 2019
}
]

app.get("/", (req, res) => {
    res.send("Welcome Bitches!");
});

app.get("/movies", (req, res) => {
    res.status(200).send(movies)
})

app.get("/movies/:id", (req, res) => {
    const idParams = req.params.id
    const movie = movies.find(item => item.id == idParams)

    res.send(movie)
})


// app.put("/movies", (req, res) => {
    
    // })
    
    app.post("/movies", (req, res) => {
        const lastIndex = movies.length;
        const id = movies[lastIndex].id;
        const judul = req.body.judul
        const tahun = req.body.tahun
        
        //to call in one call    
        const movie = {id, judul, tahun};
        
        movies.push(movie);
        res.send({
            message: "add data success",
            movies
        })
    })
    
    app.delete("/movies/:id", (req, res) => {
        try {

            const id = req.params.id
            const filterMovies = movies.filter(item => item.id != id);
            
            res.send({
                message: "delete sucess",
                movies
            });
            }catch (error) {
                res.send(error)
            }
        })

    app.put("/movies/:id", (req, res) => {
    const moviesId = req.params.id
    movies.map(data => {
        if(data.id == moviesId) {
            data.judul = req.body.judul
            data.tahun = req.body.tahun
        }
    })
    res.send({
        message: "update sucess",
        movies
    })

    })

app.listen(3001, () => console.log(`check to port + ${process.env.PORT}`));

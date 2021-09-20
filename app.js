const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');


const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-khalid:admin123@cluster0.p4m6v.mongodb.net/scoreDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).
then(() => {
    console.log('connected seccessfully')
}).catch(() => {
    console.log('something went wrong');
})

const scoreschema = mongoose.Schema({
    name: String,
    score: Number
})

const Score = mongoose.model("Score", scoreschema);

const scores = [];

 Score.find({}, (err, allScores) => {
    if (!err) {
        scores.push(...allScores)
    } else { console.log("error");}
}).sort({ score: -1 })


app.route("/")
    .get((req, res) => {
        res.redirect("/start");
    });

app.route("/start")
    .get((req, res) => {
        res.render("start", {scores});
    })
    .post((req, res) => {
        app.set("playerName", req.body.name)
        res.render("play")

    })

app.route("/play")
    .get((req, res) => {
        res.render("play");
    })
    .post((req, res) => {
        app.set("playerScore",req.body.score)

        const score = new Score({
            name : app.get("playerName"),
            score : Number(req.body.score)
        })
        score.save();
        scores.push(score);
        
        scores.sort(function(a,b){
            if(a.score< b.score) return 1;
            if(a.score >b.score) return -1;
            return 0;
          });
        res.redirect("/gameover")
    })

app.route("/gameover")
    .get((req, res) => {
        res.render("gameover", {playerName : app.get("playerName"), playerScore : app.get("playerScore")});
    })
 
    
      

    const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});


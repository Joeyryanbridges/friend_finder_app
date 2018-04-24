var path = require("path");
var friends = require('../data/friends.js');

var newfriends = function showFriends(app) {
    app.get("/api/friends", function (req, res) {
        return res.json(friends);
    });
    app.post("/api/friends", function (req, res) {
        var newFriend = req.body
        var friendScore = newFriend.scores;
        var scoreArray = [];
        var game = 0;

        for (i = 0; i < friends.length; i++) {
            var scoreDiff = 0;
            for (j = 0; j < friendScore.length; j++) {
                scoreDiff += Math.abs(friends[i].scores[j] - friendScore[j])
            }
            scoreArray.push(scoreDiff);
        }

        for (i = 0; i < scoreArray.length; i++) {
            if (scoreArray[i] <= scoreArray[game]) {
                game = i;
            }
        }
        res.json(friends[game]);
        friends.push(newFriend);
    });
};

module.exports = newfriends;
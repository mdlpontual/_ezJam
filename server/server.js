const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "https://localhost:3000",
        clientId: "83d9a92b6f8c461e80095f72997a86d7", 
        clientSecret: "66344c6075b849ef84a7f8698c49eeed",
        refreshToken
    })
    
    spotifyApi.refreshAccessToken().then(
        (data) => {
          res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in,
          })
        }).catch(() => {
            res.sendStatus(400)
    })
})

app.post("/login", (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "https://localhost:3000",
        clientId: "83d9a92b6f8c461e80095f72997a86d7",
        clientSecret: "66344c6075b849ef84a7f8698c49eeed"
    })
    
    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    })
    .catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
})

app.listen(3001);
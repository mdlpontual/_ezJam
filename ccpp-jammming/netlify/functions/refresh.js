require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');

exports.handler = async (event) => {
    const { refreshToken } = JSON.parse(event.body);

    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.VITE_REDIRECT_URI,
        clientId: process.env.VITE_CLIENT_ID,
        clientSecret: process.env.VITE_CLIENT_SECRET,
    });
    spotifyApi.setRefreshToken(refreshToken);

    try {
        const data = await spotifyApi.refreshAccessToken();
        return {
            statusCode: 200,
            body: JSON.stringify({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in,
            }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Token refresh failed.' }),
        };
    }
};

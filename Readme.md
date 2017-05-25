Satoshi's Wheel of Fortune
==========================
Pick a name from a list randomly and in a provably honest way using Bitcoin's
blockchain. [Demo](http://178.62.249.188/).

The admin can set a list of names and a (future) block number. The client app then
uses the api from blockchain.info to retrieve the nonce for the given block
number and extracts a name from the list using the formula `n = nonce %
num_participants`.

The username and password for the admin can be set in the file `.deploy/settings`.

Run locally with:

    npm install
    meteor run --settings .deploy/settings.json

To deploy you need to have
[pm2-meteor](https://github.com/andruschka/pm2-meteor) installed locally. You
also need a server with node, mongo and [pm2](https://github.com/Unitech/pm2).
Then edit the file `.deploy/pm2-meteor.json` and deploy with:

    cd .deploy
    pm2-meteor deploy


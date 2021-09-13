// Rename this sample file to main.js to use on your project.
// The main.js file will be overwritten in updates/reinstalls.

var rn_bridge = require('rn-bridge');
var level = require('level');

var dataDir = rn_bridge.app.datadir();

var db = level(dataDir + '/db');

// Echo every message received from react-native.
rn_bridge.channel.on('message', async (msg) => {
  const value = await db.get('name');
  rn_bridge.channel.send(msg + ' value from db: ' + value);
});

db.put('name', 'Level', function (err) {
  if (err) return console.log('Ooops!', err); // some kind of I/O error
  // Inform react-native node is initialized.
  rn_bridge.channel.send(
    'Node was initialized.' + err ? 'Error: ' + err.message : '',
  );
});

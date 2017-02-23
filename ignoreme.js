{ Error: ER_BAD_DB_ERROR: Unknown database 'employee'
    at Handshake.Sequence._packetToError (/Applications/XAMPP/xamppfiles/htdocs/node/badgeSoftReact/node_modules/mysql/lib/protocol/sequences/Sequence.js:52:14)
    at Handshake.ErrorPacket (/Applications/XAMPP/xamppfiles/htdocs/node/badgeSoftReact/node_modules/mysql/lib/protocol/sequences/Handshake.js:103:18)
    at Protocol._parsePacket (/Applications/XAMPP/xamppfiles/htdocs/node/badgeSoftReact/node_modules/mysql/lib/protocol/Protocol.js:280:23)
    at Parser.write (/Applications/XAMPP/xamppfiles/htdocs/node/badgeSoftReact/node_modules/mysql/lib/protocol/Parser.js:75:12)
    at Protocol.write (/Applications/XAMPP/xamppfiles/htdocs/node/badgeSoftReact/node_modules/mysql/lib/protocol/Protocol.js:39:16)
    at Socket.<anonymous> (/Applications/XAMPP/xamppfiles/htdocs/node/badgeSoftReact/node_modules/mysql/lib/Connection.js:103:28)
    at emitOne (events.js:96:13)
    at Socket.emit (events.js:188:7)
    at readableAddChunk (_stream_readable.js:176:18)
    at Socket.Readable.push (_stream_readable.js:134:10)
    at TCP.onread (net.js:551:20)
    --------------------
    at Protocol._enqueue (/Applications/XAMPP/xamppfiles/htdocs/node/badgeSoftReact/node_modules/mysql/lib/protocol/Protocol.js:141:48)
    at Protocol.handshake (/Applications/XAMPP/xamppfiles/htdocs/node/badgeSoftReact/node_modules/mysql/lib/protocol/Protocol.js:52:41)
    at Connection.connect (/Applications/XAMPP/xamppfiles/htdocs/node/badgeSoftReact/node_modules/mysql/lib/Connection.js:130:18)
    at /Applications/XAMPP/xamppfiles/htdocs/node/badgeSoftReact/node_modules/knex/lib/dialects/mysql/index.js:106:18
    at Promise._execute (/Applications/XAMPP/xamppfiles/htdocs/node/badgeSoftReact/node_modules/knex/node_modules/bluebird/js/release/debuggability.js:300:9)
    at Promise._resolveFromExecutor (/Applications/XAMPP/xamppfiles/htdocs/node/badgeSoftReact/node_modules/knex/node_modules/bluebird/js/release/promise.js:481:18)
    at new Promise (/Applications/XAMPP/xamppfiles/htdocs/node/badgeSoftReact/node_modules/knex/node_modules/bluebird/js/release/promise.js:77:14)
    at Client_MySQL.acquireRawConnection (/Applications/XAMPP/xamppfiles/htdocs/node/badgeSoftReact/node_modules/knex/lib/dialects/mysql/index.js:104:12)
    at Object.create (/Applications/XAMPP/xamppfiles/htdocs/node/badgeSoftReact/node_modules/knex/lib/client.js:239:16)
    at Pool._createResource (/Applications/XAMPP/xamppfiles/htdocs/node/badgeSoftReact/node_modules/generic-pool/lib/generic-pool.js:354:17)
    at Pool._ensureMinimum (/Applications/XAMPP/xamppfiles/htdocs/node/badgeSoftReact/node_modules/generic-pool/lib/generic-pool.js:408:12)
    at new Pool (/Applications/XAMPP/xamppfiles/htdocs/node/badgeSoftReact/node_modules/generic-pool/lib/generic-pool.js:157:8)
    at Client_MySQL.initializePool (/Applications/XAMPP/xamppfiles/htdocs/node/badgeSoftReact/node_modules/knex/lib/client.js:269:17)
    at Client_MySQL.Client (/Applications/XAMPP/xamppfiles/htdocs/node/badgeSoftReact/node_modules/knex/lib/client.js:116:12)
    at new Client_MySQL (/Applications/XAMPP/xamppfiles/htdocs/node/badgeSoftReact/node_modules/knex/lib/dialects/mysql/index.js:62:20)
    at Knex (/Applications/XAMPP/xamppfiles/htdocs/node/badgeSoftReact/node_modules/knex/lib/index.js:60:34)
  code: 'ER_BAD_DB_ERROR',
  errno: 1049,
  sqlState: '42000',
  fatal: true }

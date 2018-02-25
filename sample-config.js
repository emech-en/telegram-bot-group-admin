var config = {};

// CONFIGURATION EXAMPLE
//
// config['GROUP_ID'] = {
//     'handler-name': { 'handler-config': 'config-value' }
// }

config['GROUP_ID'] = {
    'censore': {
        'censoreList': ['fuck', 'another bad word']
    },
    'close-group': {
        'openAt': '08:00',
        'closeAt': '01:00'
    }
}

module.exports = config;
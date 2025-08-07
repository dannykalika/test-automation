module.exports = {
    spec: [
        'tests/data/*spec.js'
    ],
    extension: ['js', 'mjs'],
    require: [
        'chai/register-expect'
    ],
    'full-trace': true,
    invert: false,
    timeout: 10000,
    slow: 5000,
    ui: 'bdd',
    recursive: true,
    bail: false,
    retries: 0,
    diff: true,
    exit: true,
    parallel: true,
};

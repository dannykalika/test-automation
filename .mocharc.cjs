module.exports = {
    spec: [
        'tests/api/specs/*spec.js'
    ],
    extension: ['js', 'mjs'],
    require: [
        'chai/register-expect'
    ],
    'full-trace': true,
    invert: false,
    timeout: 5000,
    slow: 1000,
    ui: 'bdd',
    recursive: true,
    bail: false,
    retries: 0,
    diff: true,
    exit: true,
    parallel: true,
};

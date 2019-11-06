module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "require": true,
        "module": true,
        "__dirname": true,
        "Phaser": true,
        "gameSettings": true,
        "game": true,
        "config": true,
        "_": true,

        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "quotes": ["warn", "single"],
        "no-var": ["warn"]
    }
};
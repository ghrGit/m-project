module.exports = {
    globals: {
        __PROJECTNAME__: true,
    },
    extends: ['sifu/vue'],
    rules: {
        'no-var': 0,
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
}

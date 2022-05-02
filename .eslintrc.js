module.exports = {
  'extends': 'google',
  'parserOptions': {
    'ecmaVersion': 8,
    'sourceType': 'script',
  },
  'env': {
    'browser': true,
  },
  'plugins': [
    'html',
  ],
  'rules': {
    'require-jsdoc': 'off',
    'max-len': ['error', {'code': 100}],
    'camelcase': ['error', {
      'ignoreDestructuring': true,
      'ignoreImports': true,
      'allow': ['client_id', 'access_type', 'redirect_uris'],
    }],
  },
};

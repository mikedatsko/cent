export default {
  name: 'Currency',
  many: 'Currencies',
  code: 'currency',
  codeMany: 'currencies',
  fields: [
    {
      name: 'title',
      type: 'TEXT'
    },
    {
      name: 'code',
      type: 'TEXT'
    }
  ]
};

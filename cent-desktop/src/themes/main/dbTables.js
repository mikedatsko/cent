export default [
  {
    name: 'currency',
    fields: [
      {
        name: 'name',
        type: 'TEXT',
        params: ['NOT', 'NULL']
      },
      {
        name: 'symbol',
        type: 'TEXT',
        params: ['NOT', 'NULL']
      },
      {
        name: 'code',
        type: 'TEXT',
        params: ['NOT', 'NULL']
      }
    ]
  },
  {
    name: 'source',
    fields: [
      {
        name: 'name',
        type: 'TEXT',
        params: ['NOT', 'NULL']
      },
      {
        name: 'currency',
        type: 'TEXT',
        params: ['NOT', 'NULL']
      }
    ]
  },
  {
    name: 'category',
    fields: [
      {
        name: 'name',
        type: 'TEXT',
        params: ['NOT', 'NULL']
      }
    ]
  },
  {
    name: 'transactions',
    fields: [
      {
        name: 'sourceFrom',
        type: 'TEXT',
        params: ['NOT', 'NULL']
      },
      {
        name: 'sourceTo',
        type: 'TEXT',
        params: ['NOT', 'NULL']
      },
      {
        name: 'category',
        type: 'TEXT',
        params: ['NOT', 'NULL']
      }
    ]
  }
];

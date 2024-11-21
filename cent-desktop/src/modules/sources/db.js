export default [
  {
    name: 'source',
    fields: [
      {
        name: '_id',
        type: 'INTEGER',
        params: ['PRIMARY', 'KEY', 'AUTOINCREMENT']
      },
      {
        name: 'id',
        type: 'TEXT',
        params: ['UNIQUE', 'NOT', 'NULL']
      },
      {
        name: 'title',
        type: 'TEXT',
        params: ['NOT', 'NULL']
      },
      {
        name: 'currency',
        type: 'TEXT',
        params: ['NOT', 'NULL']
      },
      {
        name: 'credit',
        type: 'INTEGER',
        params: ['NOT', 'NULL']
      },
      {
        name: 'created',
        type: 'TEXT',
        params: ['NOT', 'NULL']
      },
      {
        name: 'modified',
        type: 'TEXT',
        params: ['NOT', 'NULL']
      }
    ]
  }
];

export default [
  {
    name: 'post',
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
        name: 'content',
        type: 'TEXT',
        params: ['NOT', 'NULL']
      },
      {
        name: 'intro',
        type: 'TEXT',
        params: ['NOT', 'NULL']
      },
      {
        name: 'image',
        type: 'TEXT',
        params: ['NOT', 'NULL']
      },
      {
        name: 'isFeatured',
        type: 'INTEGER',
        params: ['NOT', 'NULL']
      },
      {
        name: 'isPublished',
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
  },
  {
    name: 'post_file',
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
  },
  {
    name: 'post_config',
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
        name: 'name',
        type: 'TEXT',
        params: ['NOT', 'NULL']
      },
      {
        name: 'type',
        type: 'TEXT',
        params: ['NOT', 'NULL']
      },
      {
        name: 'value',
        type: 'TEXT',
        params: ['NOT', 'NULL']
      }
    ]
  }
];

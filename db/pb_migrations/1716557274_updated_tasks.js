/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qsyqrq0uecgarrt")

  collection.indexes = [
    "CREATE INDEX `idx_jaHLQXt` ON `tasks` (`start`)",
    "CREATE INDEX `idx_yaziY5W` ON `tasks` (\n  `owner`,\n  `assigned`\n)"
  ]

  // remove
  collection.schema.removeField("3zyjshic")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rmgi3ymq",
    "name": "end",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mgswfllu",
    "name": "completed",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hfufizxt",
    "name": "start",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nm6ugzyf",
    "name": "task",
    "type": "editor",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qsyqrq0uecgarrt")

  collection.indexes = [
    "CREATE INDEX `idx_jaHLQXt` ON `tasks` (`due`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3zyjshic",
    "name": "tags",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("rmgi3ymq")

  // remove
  collection.schema.removeField("mgswfllu")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hfufizxt",
    "name": "due",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nm6ugzyf",
    "name": "content",
    "type": "editor",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
})

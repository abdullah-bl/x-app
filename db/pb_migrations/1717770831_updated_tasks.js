/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qsyqrq0uecgarrt")

  collection.indexes = [
    "CREATE INDEX `idx_jaHLQXt` ON `tasks` (`due`)",
    "CREATE INDEX `idx_yaziY5W` ON `tasks` (\n  `owner`,\n  `assigned`,\n  `completed_by`\n)",
    "CREATE INDEX `idx_tTyX2TC` ON `tasks` (`completed`)",
    "CREATE INDEX `idx_Ujc4Kjl` ON `tasks` (`task`)"
  ]

  // remove
  collection.schema.removeField("rmgi3ymq")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qsyqrq0uecgarrt")

  collection.indexes = [
    "CREATE INDEX `idx_jaHLQXt` ON `tasks` (`start`)",
    "CREATE INDEX `idx_yaziY5W` ON `tasks` (\n  `owner`,\n  `assigned`,\n  `completed_by`\n)",
    "CREATE INDEX `idx_tTyX2TC` ON `tasks` (`completed`)",
    "CREATE INDEX `idx_Ujc4Kjl` ON `tasks` (`task`)"
  ]

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

  return dao.saveCollection(collection)
})

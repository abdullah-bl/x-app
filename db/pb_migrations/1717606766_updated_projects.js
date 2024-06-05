/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ddzfajetfyhlkcn")

  collection.indexes = [
    "CREATE INDEX `idx_VJno78F` ON `projects` (`name`)",
    "CREATE INDEX `idx_WPHjEsV` ON `projects` (\n  `tags`,\n  `status`\n)",
    "CREATE INDEX `idx_uOiv8h1` ON `projects` (\n  `reference`,\n  `number`\n)"
  ]

  // remove
  collection.schema.removeField("h2n300v2")

  // remove
  collection.schema.removeField("kbmwdb09")

  // remove
  collection.schema.removeField("7yel7b2c")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ddzfajetfyhlkcn")

  collection.indexes = [
    "CREATE INDEX `idx_VJno78F` ON `projects` (`name`)",
    "CREATE INDEX `idx_WPHjEsV` ON `projects` (\n  `tags`,\n  `status`\n)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h2n300v2",
    "name": "contract",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kbmwdb09",
    "name": "tender",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7yel7b2c",
    "name": "members",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
})

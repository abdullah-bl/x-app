/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ddzfajetfyhlkcn")

  collection.indexes = [
    "CREATE INDEX `idx_VJno78F` ON `projects` (`name`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rhiz8drb",
    "name": "closed",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ddzfajetfyhlkcn")

  collection.indexes = [
    "CREATE INDEX `idx_VJno78F` ON `projects` (`name`)",
    "CREATE INDEX `idx_uOiv8h1` ON `projects` (\n  `reference`,\n  `number`\n)"
  ]

  // remove
  collection.schema.removeField("rhiz8drb")

  return dao.saveCollection(collection)
})

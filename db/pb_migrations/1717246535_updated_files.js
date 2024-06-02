/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zhnotvjjye0d3sv")

  collection.indexes = [
    "CREATE INDEX `idx_UUPcTnR` ON `files` (`target_id`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "huhi3ref",
    "name": "target_id",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zhnotvjjye0d3sv")

  collection.indexes = [
    "CREATE INDEX `idx_UUPcTnR` ON `files` (\n  `payment`,\n  `project`\n)"
  ]

  // remove
  collection.schema.removeField("huhi3ref")

  return dao.saveCollection(collection)
})

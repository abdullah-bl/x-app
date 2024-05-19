/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6zoz5h777kerlpw")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_OzgKIfW` ON `items` (\n  `name`,\n  `reference`\n)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "blh54x50",
    "name": "number",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oskvvcjs",
    "name": "reference",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6zoz5h777kerlpw")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_OzgKIfW` ON `items` (`name`)"
  ]

  // remove
  collection.schema.removeField("blh54x50")

  // remove
  collection.schema.removeField("oskvvcjs")

  return dao.saveCollection(collection)
})

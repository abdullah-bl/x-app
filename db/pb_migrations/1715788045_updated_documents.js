/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zhnotvjjye0d3sv")

  collection.indexes = [
    "CREATE INDEX `idx_UUPcTnR` ON `documents` (\n  `payment`,\n  `project`\n)"
  ]

  // remove
  collection.schema.removeField("ntmxz9m5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2cpoy1iw",
    "name": "project",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "ddzfajetfyhlkcn",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qlcxl564",
    "name": "payment",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "ruonkdfcm5npfdv",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zhnotvjjye0d3sv")

  collection.indexes = [
    "CREATE INDEX `idx_HeOwcTu` ON `documents` (`target_id`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ntmxz9m5",
    "name": "target_id",
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
  collection.schema.removeField("2cpoy1iw")

  // remove
  collection.schema.removeField("qlcxl564")

  return dao.saveCollection(collection)
})

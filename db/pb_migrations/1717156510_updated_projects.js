/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ddzfajetfyhlkcn")

  collection.indexes = [
    "CREATE INDEX `idx_VJno78F` ON `projects` (`name`)",
    "CREATE INDEX `idx_WPHjEsV` ON `projects` (\n  `tags`,\n  `status`\n)",
    "CREATE INDEX `idx_5QnoR5C` ON `projects` (`budgets`)"
  ]

  // remove
  collection.schema.removeField("swd95ga7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ikiqjtdg",
    "name": "status",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "q5ssqq227rxx2v5",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ddzfajetfyhlkcn")

  collection.indexes = [
    "CREATE INDEX `idx_VJno78F` ON `projects` (`name`)",
    "CREATE INDEX `idx_WPHjEsV` ON `projects` (\n  `tags`,\n  `status_seq`\n)",
    "CREATE INDEX `idx_5QnoR5C` ON `projects` (`budgets`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "swd95ga7",
    "name": "status_seq",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // remove
  collection.schema.removeField("ikiqjtdg")

  return dao.saveCollection(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ddzfajetfyhlkcn")

  collection.indexes = [
    "CREATE INDEX `idx_VJno78F` ON `projects` (`name`)",
    "CREATE INDEX `idx_WPHjEsV` ON `projects` (\n  `tags`,\n  `status`\n)"
  ]

  // remove
  collection.schema.removeField("7tfstaex")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ddzfajetfyhlkcn")

  collection.indexes = [
    "CREATE INDEX `idx_VJno78F` ON `projects` (`name`)",
    "CREATE INDEX `idx_WPHjEsV` ON `projects` (\n  `tags`,\n  `status`\n)",
    "CREATE INDEX `idx_GG3y8QG` ON `projects` (`budgets`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7tfstaex",
    "name": "budgets",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "cwuf2sztru2xnx5",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})

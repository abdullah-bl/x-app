/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bqpc7ufr",
    "name": "status",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "active",
        "inactive",
        "completed",
        "cancelled",
        "on-hold",
        "draft"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ddzfajetfyhlkcn")

  collection.indexes = [
    "CREATE INDEX `idx_VJno78F` ON `projects` (`name`)"
  ]

  // remove
  collection.schema.removeField("7tfstaex")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bqpc7ufr",
    "name": "status",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Active",
        "Inactive",
        "Cancelled"
      ]
    }
  }))

  return dao.saveCollection(collection)
})

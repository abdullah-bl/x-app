/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qsyqrq0uecgarrt")

  collection.listRule = "assigned.id ~ @request.auth.id || owner.id = @request.auth.id"
  collection.viewRule = "assigned.id ~ @request.auth.id || owner.id = @request.auth.id"
  collection.updateRule = "@request.auth.id = owner.id || assigned.id ~ @request.auth.id"
  collection.indexes = [
    "CREATE INDEX `idx_jaHLQXt` ON `tasks` (`start`)",
    "CREATE INDEX `idx_yaziY5W` ON `tasks` (\n  `owner`,\n  `assigned`,\n  `completed_by`\n)",
    "CREATE INDEX `idx_tTyX2TC` ON `tasks` (`completed`)",
    "CREATE INDEX `idx_Ujc4Kjl` ON `tasks` (`task`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u05pfwfl",
    "name": "completed_by",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "miyvottn",
    "name": "linked_id",
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
  const collection = dao.findCollectionByNameOrId("qsyqrq0uecgarrt")

  collection.listRule = ""
  collection.viewRule = ""
  collection.updateRule = "@request.auth.id = owner.id"
  collection.indexes = [
    "CREATE INDEX `idx_jaHLQXt` ON `tasks` (`start`)",
    "CREATE INDEX `idx_yaziY5W` ON `tasks` (\n  `owner`,\n  `assigned`\n)"
  ]

  // remove
  collection.schema.removeField("u05pfwfl")

  // remove
  collection.schema.removeField("miyvottn")

  return dao.saveCollection(collection)
})

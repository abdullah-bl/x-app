/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qsyqrq0uecgarrt")

  collection.createRule = "@request.auth.id = user.id"
  collection.updateRule = "@request.auth.id = user.id"
  collection.deleteRule = "@request.auth.id = user.id"
  collection.indexes = [
    "CREATE INDEX `idx_jaHLQXt` ON `tasks` (`due`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zsfqnor0",
    "name": "priority",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "None",
        "Low",
        "Medium",
        "High"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q5fsiie6",
    "name": "user",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qsyqrq0uecgarrt")

  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null
  collection.indexes = []

  // remove
  collection.schema.removeField("zsfqnor0")

  // remove
  collection.schema.removeField("q5fsiie6")

  return dao.saveCollection(collection)
})

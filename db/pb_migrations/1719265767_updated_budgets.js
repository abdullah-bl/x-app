/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cwuf2sztru2xnx5")

  collection.createRule = "@request.auth.roles = \"fm\""
  collection.updateRule = "@request.auth.roles = \"fm\""
  collection.deleteRule = "@request.auth.roles = \"fm\""

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kskauojc",
    "name": "year",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 2020,
      "max": null,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cwuf2sztru2xnx5")

  collection.createRule = "@request.auth.role = \"admin\" || @request.auth.role = \"fm\""
  collection.updateRule = "@request.auth.role = \"admin\" || @request.auth.role = \"fm\""
  collection.deleteRule = "@request.auth.role = \"admin\" || @request.auth.role = \"fm\""

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kskauojc",
    "name": "year",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 2023,
      "max": null,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
})

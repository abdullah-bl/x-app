/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ddzfajetfyhlkcn")

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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ddzfajetfyhlkcn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bqpc7ufr",
    "name": "status",
    "type": "select",
    "required": true,
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

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ddzfajetfyhlkcn")

  // remove
  collection.schema.removeField("bqpc7ufr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vgwdyjjf",
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

  // add
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

  // remove
  collection.schema.removeField("vgwdyjjf")

  return dao.saveCollection(collection)
})

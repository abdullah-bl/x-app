/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mux03nxylen27ci")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zjgnrjor",
    "name": "submissionDate",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mux03nxylen27ci")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zjgnrjor",
    "name": "submitionDate",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})

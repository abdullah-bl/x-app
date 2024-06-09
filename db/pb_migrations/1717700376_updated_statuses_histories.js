/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wby5tpevibkcvwo")

  // remove
  collection.schema.removeField("p7xswzou")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wby5tpevibkcvwo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "p7xswzou",
    "name": "timestamp",
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

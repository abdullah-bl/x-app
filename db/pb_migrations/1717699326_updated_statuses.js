/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q5ssqq227rxx2v5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5icx1cqu",
    "name": "active",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q5ssqq227rxx2v5")

  // remove
  collection.schema.removeField("5icx1cqu")

  return dao.saveCollection(collection)
})

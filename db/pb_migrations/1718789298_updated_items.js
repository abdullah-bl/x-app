/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6zoz5h777kerlpw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pwzzucj6",
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
  const collection = dao.findCollectionByNameOrId("6zoz5h777kerlpw")

  // remove
  collection.schema.removeField("pwzzucj6")

  return dao.saveCollection(collection)
})

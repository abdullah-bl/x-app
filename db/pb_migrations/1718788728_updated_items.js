/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6zoz5h777kerlpw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2a14nwyr",
    "name": "note",
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
  const collection = dao.findCollectionByNameOrId("6zoz5h777kerlpw")

  // remove
  collection.schema.removeField("2a14nwyr")

  return dao.saveCollection(collection)
})

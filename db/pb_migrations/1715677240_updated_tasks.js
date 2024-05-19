/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qsyqrq0uecgarrt")

  // remove
  collection.schema.removeField("wysnrmqr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nm6ugzyf",
    "name": "content",
    "type": "editor",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qsyqrq0uecgarrt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wysnrmqr",
    "name": "content",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("nm6ugzyf")

  return dao.saveCollection(collection)
})

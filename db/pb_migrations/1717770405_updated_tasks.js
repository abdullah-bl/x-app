/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qsyqrq0uecgarrt")

  // remove
  collection.schema.removeField("nm6ugzyf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qsvfjoy9",
    "name": "task",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qsyqrq0uecgarrt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nm6ugzyf",
    "name": "task",
    "type": "editor",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // remove
  collection.schema.removeField("qsvfjoy9")

  return dao.saveCollection(collection)
})

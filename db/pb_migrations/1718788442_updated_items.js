/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6zoz5h777kerlpw")

  // remove
  collection.schema.removeField("djz6mmbh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "plvnh5ty",
    "name": "type",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "djz6mmbh",
    "name": "type",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Program",
        "Project",
        "General",
        "Other"
      ]
    }
  }))

  // remove
  collection.schema.removeField("plvnh5ty")

  return dao.saveCollection(collection)
})

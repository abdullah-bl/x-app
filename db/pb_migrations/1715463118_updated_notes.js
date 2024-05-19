/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("knmral8vc753xss")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tprlhtsp",
    "name": "colors",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "bold",
        "minimal",
        "fancy",
        "plain"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("knmral8vc753xss")

  // remove
  collection.schema.removeField("tprlhtsp")

  return dao.saveCollection(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q5ssqq227rxx2v5")

  // remove
  collection.schema.removeField("hnqet2zt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mvfy0kmb",
    "name": "color",
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
  const collection = dao.findCollectionByNameOrId("q5ssqq227rxx2v5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hnqet2zt",
    "name": "color",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "a",
        "b"
      ]
    }
  }))

  // remove
  collection.schema.removeField("mvfy0kmb")

  return dao.saveCollection(collection)
})

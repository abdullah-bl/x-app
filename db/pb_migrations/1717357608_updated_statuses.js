/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q5ssqq227rxx2v5")

  collection.indexes = [
    "CREATE INDEX `idx_MKOxuj2` ON `statuses` (`name`)"
  ]

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q5ssqq227rxx2v5")

  collection.indexes = []

  // remove
  collection.schema.removeField("hnqet2zt")

  return dao.saveCollection(collection)
})

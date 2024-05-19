/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6zoz5h777kerlpw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eqkfxjnr",
    "name": "budgets",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "cwuf2sztru2xnx5",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6zoz5h777kerlpw")

  // remove
  collection.schema.removeField("eqkfxjnr")

  return dao.saveCollection(collection)
})

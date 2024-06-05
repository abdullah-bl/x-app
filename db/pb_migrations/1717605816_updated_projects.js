/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ddzfajetfyhlkcn")

  // remove
  collection.schema.removeField("mchsjhpv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7yel7b2c",
    "name": "members",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ddzfajetfyhlkcn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mchsjhpv",
    "name": "estimated_cost",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // remove
  collection.schema.removeField("7yel7b2c")

  return dao.saveCollection(collection)
})

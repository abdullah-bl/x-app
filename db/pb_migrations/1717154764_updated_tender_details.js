/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mux03nxylen27ci")

  collection.name = "tenders"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mux03nxylen27ci")

  collection.name = "tender_details"

  return dao.saveCollection(collection)
})

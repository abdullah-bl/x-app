/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("knmral8vc753xss")

  collection.updateRule = ""
  collection.deleteRule = "owner.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("knmral8vc753xss")

  collection.updateRule = null
  collection.deleteRule = ""

  return dao.saveCollection(collection)
})

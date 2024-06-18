/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("avlx58z6rttpavt")

  collection.createRule = "project.owner = @request.auth.id"
  collection.updateRule = "project.owner = @request.auth.id"
  collection.deleteRule = "project.owner = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("avlx58z6rttpavt")

  collection.createRule = ""
  collection.updateRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
})

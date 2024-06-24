/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cwuf2sztru2xnx5")

  collection.createRule = "@request.auth.roles ~ \"fm\""
  collection.updateRule = "@request.auth.roles ~ \"fm\""
  collection.deleteRule = "@request.auth.roles ~ \"fm\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cwuf2sztru2xnx5")

  collection.createRule = "@request.auth.roles = \"fm\""
  collection.updateRule = "@request.auth.roles = \"fm\""
  collection.deleteRule = "@request.auth.roles = \"fm\""

  return dao.saveCollection(collection)
})

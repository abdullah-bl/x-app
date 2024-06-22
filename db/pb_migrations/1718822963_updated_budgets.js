/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cwuf2sztru2xnx5")

  collection.createRule = "@request.auth.role = \"admin\" || @request.auth.role = \"fm\""
  collection.updateRule = "@request.auth.role = \"admin\" || @request.auth.role = \"fm\""
  collection.deleteRule = "@request.auth.role = \"admin\" || @request.auth.role = \"fm\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cwuf2sztru2xnx5")

  collection.createRule = ""
  collection.updateRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6zoz5h777kerlpw")

  collection.createRule = "@request.auth.role = \"admin\" || @request.auth.role = \"fm\""
  collection.updateRule = "@request.auth.role = \"admin\" || @request.auth.role = \"fm\""
  collection.deleteRule = "@request.auth.role = \"admin\" || @request.auth.role = \"fm\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6zoz5h777kerlpw")

  collection.createRule = "@request.auth.role = \"admin\" || @request.auth.role = \"financial manager\""
  collection.updateRule = "@request.auth.role = \"admin\" || @request.auth.role = \"financial manager\""
  collection.deleteRule = "@request.auth.role = \"admin\" || @request.auth.role = \"financial manager\""

  return dao.saveCollection(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ddzfajetfyhlkcn")

  collection.listRule = "@request.auth.id != \"\""
  collection.viewRule = "@request.auth.id != \"\""
  collection.createRule = "owner.id = @request.auth.id "
  collection.updateRule = "owner.id = @request.auth.id || @request.auth.roles ~ \"pm\""
  collection.deleteRule = "@request.auth.roles ~ \"pm\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ddzfajetfyhlkcn")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = "owner.id = @request.auth.id"
  collection.updateRule = "owner.id = @request.auth.id"
  collection.deleteRule = null

  return dao.saveCollection(collection)
})

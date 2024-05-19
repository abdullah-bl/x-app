/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("trxlfreii1o1p3s")

  collection.name = "chats"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("trxlfreii1o1p3s")

  collection.name = "chat"

  return dao.saveCollection(collection)
})

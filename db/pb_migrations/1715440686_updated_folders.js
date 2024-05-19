/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9tizn7bfytz47gt")

  collection.name = "lists"
  collection.indexes = [
    "CREATE INDEX `idx_xqN1qW1` ON `lists` (`name`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9tizn7bfytz47gt")

  collection.name = "folders"
  collection.indexes = [
    "CREATE INDEX `idx_xqN1qW1` ON `folders` (`name`)"
  ]

  return dao.saveCollection(collection)
})

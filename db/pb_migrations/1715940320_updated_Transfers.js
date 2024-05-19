/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kf6ni2qvk0arc3t")

  collection.name = "transfers"
  collection.indexes = [
    "CREATE INDEX `idx_P9E0Vhh` ON `transfers` (\n  `from`,\n  `to`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kf6ni2qvk0arc3t")

  collection.name = "Transfers"
  collection.indexes = [
    "CREATE INDEX `idx_P9E0Vhh` ON `Transfers` (\n  `from`,\n  `to`\n)"
  ]

  return dao.saveCollection(collection)
})

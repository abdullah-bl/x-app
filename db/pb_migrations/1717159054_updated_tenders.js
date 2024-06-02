/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mux03nxylen27ci")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_x3otcJS` ON `tenders` (\n  `project`,\n  `reference`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mux03nxylen27ci")

  collection.indexes = []

  return dao.saveCollection(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zhnotvjjye0d3sv")

  collection.name = "files"
  collection.indexes = [
    "CREATE INDEX `idx_UUPcTnR` ON `files` (\n  `payment`,\n  `project`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zhnotvjjye0d3sv")

  collection.name = "documents"
  collection.indexes = [
    "CREATE INDEX `idx_UUPcTnR` ON `documents` (\n  `payment`,\n  `project`\n)"
  ]

  return dao.saveCollection(collection)
})

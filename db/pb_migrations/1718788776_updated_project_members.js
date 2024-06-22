/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("avlx58z6rttpavt")

  collection.name = "members"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_Ta699YY` ON `members` (\n  `project`,\n  `member`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("avlx58z6rttpavt")

  collection.name = "project_members"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_Ta699YY` ON `project_members` (\n  `project`,\n  `member`\n)"
  ]

  return dao.saveCollection(collection)
})

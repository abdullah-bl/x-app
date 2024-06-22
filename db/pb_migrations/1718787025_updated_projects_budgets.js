/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wltyrtdqttrtdnj")

  collection.name = "obligations"
  collection.indexes = [
    "CREATE INDEX `idx_bgBiu10` ON `obligations` (\n  `project`,\n  `budget`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wltyrtdqttrtdnj")

  collection.name = "projects_budgets"
  collection.indexes = [
    "CREATE INDEX `idx_bgBiu10` ON `projects_budgets` (\n  `project`,\n  `budget`\n)"
  ]

  return dao.saveCollection(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qsyqrq0uecgarrt")

  collection.listRule = "assignee.id ~ @request.auth.id || owner.id = @request.auth.id"
  collection.viewRule = "assignee.id ~ @request.auth.id || owner.id = @request.auth.id"
  collection.updateRule = "@request.auth.id = owner.id || assignee.id ~ @request.auth.id"
  collection.indexes = [
    "CREATE INDEX `idx_jaHLQXt` ON `tasks` (`dueDate`)",
    "CREATE INDEX `idx_yaziY5W` ON `tasks` (\n  `owner`,\n  `assignee`,\n  `dueBy`\n)",
    "CREATE INDEX `idx_Ujc4Kjl` ON `tasks` (`content`)",
    "CREATE INDEX `idx_l81ENeD` ON `tasks` (`dueBy`)"
  ]

  // remove
  collection.schema.removeField("mgswfllu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "luyvqvyu",
    "name": "status",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "todo",
        "inprogress",
        "done"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2lijedp7",
    "name": "assignee",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hfufizxt",
    "name": "dueDate",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u05pfwfl",
    "name": "dueBy",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "miyvottn",
    "name": "target",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qsvfjoy9",
    "name": "content",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qsyqrq0uecgarrt")

  collection.listRule = "assigned.id ~ @request.auth.id || owner.id = @request.auth.id"
  collection.viewRule = "assigned.id ~ @request.auth.id || owner.id = @request.auth.id"
  collection.updateRule = "@request.auth.id = owner.id || assigned.id ~ @request.auth.id"
  collection.indexes = [
    "CREATE INDEX `idx_jaHLQXt` ON `tasks` (`due`)",
    "CREATE INDEX `idx_yaziY5W` ON `tasks` (\n  `owner`,\n  `assigned`,\n  `completed_by`\n)",
    "CREATE INDEX `idx_tTyX2TC` ON `tasks` (`completed`)",
    "CREATE INDEX `idx_Ujc4Kjl` ON `tasks` (`task`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mgswfllu",
    "name": "completed",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("luyvqvyu")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2lijedp7",
    "name": "assigned",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hfufizxt",
    "name": "due",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u05pfwfl",
    "name": "completed_by",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "miyvottn",
    "name": "linked_id",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qsvfjoy9",
    "name": "task",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})

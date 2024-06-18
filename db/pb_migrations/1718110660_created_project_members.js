/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "avlx58z6rttpavt",
    "created": "2024-06-11 12:57:40.701Z",
    "updated": "2024-06-11 12:57:40.701Z",
    "name": "project_members",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vwulyl7d",
        "name": "project",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "ddzfajetfyhlkcn",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "8ygkcq5o",
        "name": "member",
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
      },
      {
        "system": false,
        "id": "fw9lmlsk",
        "name": "role",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "read",
            "write"
          ]
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_Ta699YY` ON `project_members` (\n  `project`,\n  `member`\n)"
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("avlx58z6rttpavt");

  return dao.deleteCollection(collection);
})

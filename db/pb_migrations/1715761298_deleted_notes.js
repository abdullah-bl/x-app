/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("knmral8vc753xss");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "knmral8vc753xss",
    "created": "2024-05-11 15:16:40.195Z",
    "updated": "2024-05-12 08:44:41.398Z",
    "name": "notes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fcikvrzl",
        "name": "content",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": 300,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "4rqte3sq",
        "name": "owner",
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
        "id": "tprlhtsp",
        "name": "color",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "blue",
            "red",
            "yellow",
            "orange",
            "white",
            "black"
          ]
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "owner.id = @request.auth.id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})

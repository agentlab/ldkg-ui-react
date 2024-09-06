# Local Development

# ...with latest unpublished sparql-jsld-client

Change to package.json to this

```json
  //...
  "dependencies": {
    //...
    "@agentlab/sparql-jsld-client": "file:../sparql-jsld-client",
    //...
  },
  "pnpm": {
    "overrides": {
      "@agentlab/sparql-jsld-client": "file:../sparql-jsld-client"
    }
  },
  //...
```

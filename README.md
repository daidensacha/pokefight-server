![](images/mockup.png)

# Pokefight Express API Server Project

WBS Coding School project to create a Node Express API server, and a React App to access and display Pokemon data.

View [Pokefight API server](https://oodaiden-pokemon-server.onrender.com/) hosted on Render.

View [Pokefight React App](https://tubular-syrniki-1dace7.netlify.app/) hosted on Netlify.


Basic data for the Pokemnon (id, name, type, and base) is taken from a pokedex.json file.

To this I added additional functionallity for pagination.

Added fields:
- currentPage,
- totalPages
- next_page
- previous_page
- limit (items per page)

## Endpoints
Get all Pokemon endpoint

```js
https://oodaiden-pokemon-server.onrender.com/pokemon
```

Define required page, and limit (items per page)
```js
https://oodaiden-pokemon-server.onrender.com/pokemon?page=1&limit=20
```

Get Pokemon by ID
```js
https://oodaiden-pokemon-server.onrender.com/pokemon/62
```

Get Pokemon attributes by id/name, id/type, or id/base (requires pokemon ID)
```js
//name
https://oodaiden-pokemon-server.onrender.com/pokemon/62/name

//type
https://oodaiden-pokemon-server.onrender.com/pokemon/62/type

// base
https://oodaiden-pokemon-server.onrender.com/pokemon/62/base

```

Get Pokemon by query: id, name, or type
```js
// id // Returns the Pokemon with the matching id
https://oodaiden-pokemon-server.onrender.com/pokemon?id=56

// name // Returns the Pokemon with matching name
https://oodaiden-pokemon-server.onrender.com/pokemon?name=Venusaur

// type // Returns array of Pokemon with the type
https://oodaiden-pokemon-server.onrender.com/pokemon?type=Poison
```

### Example Data
Results array contains the Pokemon objects.
```json
{
  "currentPage": 2,
  "totalPages": 41,
  "next": {
    "page": 3,
    "limit": 20
  },
  "previous": {
    "page": 1,
    "limit": 20
  },
  "results": [
    {
      "id": 1,
      "name": {
        "english": "Bulbasaur",
        "japanese": "フシギダネ",
        "chinese": "妙蛙种子",
        "french": "Bulbizarre"
      },
      "type": [
        "Grass",
        "Poison"
      ],
      "base": {
        "HP": 45,
        "Attack": 49,
        "Defense": 49,
        "Sp. Attack": 65,
        "Sp. Defense": 65,
        "Speed": 45
      }
    },
    .....
  ```

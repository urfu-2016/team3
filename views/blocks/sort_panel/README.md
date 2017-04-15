# Блок "SortPanel"

Панель с параметрами сортировки контента в блоке `root`

### Handlebars

```handlebars
{{> sort_panel/index _fields=array_of_names}}
```

### Stylus

```stylus
@import 'sort_panel'
```

### JavaScript

```javascript
import sortPanel from 'sort_panel'

sortPanel(root, sortingRules);
```

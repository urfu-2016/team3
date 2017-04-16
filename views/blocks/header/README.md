# Блок "Header"

Шапка сайта

### Handlebars

```handlebars
{{> header/index _title=title _user=user}}
```

### Stylus

**Fonts**: [*material-design-icons*](https://github.com/google/material-design-icons)
```stylus
@import 'header'
```

### JavaScript

```javascript
import header from './index';

header();
```

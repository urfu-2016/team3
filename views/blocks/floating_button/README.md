# Блок "Floating Button"

Круглая кнопка в стиле Material Design

### Handlebars

```handlebars
{{> floating_button/default _icon='incon_name'}}
{{! или }}
{{> floating_button/mini _icon='incon_name'}}
```

### Stylus

**Fonts**: [*material-design-icons*](https://github.com/google/material-design-icons)

```stylus
@import 'floating_button'
```

### JavaScript

```javascript
import { createFloatingButton, createFloatingButtonMini } from './index';

createFloatingButton('add');
createFloatingButtonMini('add');
```

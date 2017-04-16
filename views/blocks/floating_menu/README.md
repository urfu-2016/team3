# Блок "Floating Menu"

Кнопка меню в стиле Material Design и красивой анимацией всплытия-погружения

### Handlebars

```handlebars
{{> floating_menu/index _items=array_of_objects}}
```

```javascript
array_of_objects = [
    {
        icon: 'icon_name_1',
        link: '/link_1'
    },
    {
        icon: 'icon_name_2',
        link: '/link_2'
    }
];
```

### Stylus

**Fonts**: [*material-design-icons*](https://github.com/google/material-design-icons)
```stylus
@import 'floating_menu'
```

### JavaScript

```javascript
import floatingMenu from './index';

floatingMenu();
```

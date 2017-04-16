# Блок "Quest Description"

Описание квеста

### Handlebars

```handlebars
{{> quest_description/index props}}
```

**props**:

* **_title** - Название
* **_date** - Дата создания
* **_likes** - Кол-во лайков
* **_followers** - Кол-во всех игроков
* **_finish** - Кол-во закончивших игру
* **_author_link** - Ссылка на автора
* **_author_name** - Имя автора
* **_author_avatar** - Аватар автора
* **_images** - Фотографии квеста
* **__description** - Описание

### Stylus

**Fonts**: [*material-design-icons*](https://github.com/google/material-design-icons)
```stylus
@import 'quest_description'
```

### JavaScript

```javascript
import questDescription from './index';

questDescription();
```

# Блок "Description"

Показывает *название*, *описание*, *автора* и *статистику*

### Handlebars

```handlebars
{{> description/full props}}
{{! или }}
{{> description/short props}}
```

**props**:

* **_title** - Название
* **_likes** - Кол-во лайков
* **_followers** - Кол-во всех игроков
* **_finish** - Кол-во закончивших игру
* **_description** - Описание (*используется в **description/full***)
* **_author_link** - Ссылка на автора
* **_author_name** - Имя автора
* **_author_avatar** - Аватар автора
* **_date** - Дата создания

### Stylus

**Fonts**: [*material-design-icons*](https://github.com/google/material-design-icons)

```stylus
@import 'description'
```

### JavaScript (только для FULL)

```javascript
import {addFollowers, addLikes} from './index';

addFollowers();
addLikes();
```

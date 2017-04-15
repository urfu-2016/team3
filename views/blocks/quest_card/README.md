# Блок "Quest Card"

Карточка квеста для главной страницы

### Handlebars

```handlebars
{{> quest_card/index props}}
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
* **_link** - Ссылка на квест

### Stylus

**Fonts**: [*material-design-icons*](https://github.com/google/material-design-icons)
```stylus
@import 'quest_card'
```

### JavaScript

```javascript
import searchPanel from '../../blocks/sort_panel';
import {description, sortingRules} from './index';

description();
searchPanel(document.querySelector('.quests-list'), sortingRules);
```

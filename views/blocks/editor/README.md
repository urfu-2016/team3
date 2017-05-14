# Блок "Editor"

Текстовый редактор

### Использование

```javascript
import Editor from './index';

const editor = new Editor(document.getElementById('editor'), {
    autosave: true // включает автосохранение
});

editor.text() // получить текст
```

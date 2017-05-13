'use strict';

const BUTTONS = [
    {
        cmd: 'bold',
        icon: 'format_bold'
    },
    {
        cmd: 'italic',
        icon: 'format_italic'
    },
    {
        cmd: 'underline',
        icon: 'format_underlined'
    },
    {
        cmd: 'insertOrderedList',
        icon: 'format_list_numbered'
    },
    {
        cmd: 'insertUnorderedList',
        icon: 'format_list_bulleted'
    }
];

const EMOJI = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '😊', '😇', '😉', '😌',
    '😍', '😘', '😗', '😙', '😚', '😋', '😜', '😝', '😛', '😎', '😏',
    '😒', '😞', '😔', '😟', '😕', '😣', '😖', '😫', '😩', '😤', '😠',
    '😡', '😶', '😐', '😑', '😯', '😦', '😧', '😮', '😲', '😵', '😳',
    '😱', '😨', '😰', '😢', '😥', '😭', '😓', '😪', '😴', '😬', '😷', '😈'
];

const throttle = (func, delay) => {
    let isCalled = false;

    return function () {
        if (!isCalled) {
            isCalled = true;
            setTimeout(() => {
                func(arguments);
                isCalled = false;
            }, delay);
        }
    };
};

class Editor {
    constructor(node, opts) {
        opts = opts || {};
        this._node = node;
        this._storageName = opts.storage || 'EditorStorage';
        this._autosave = opts.autosave || false;
        this._delay = (opts.delay || 10) * 1000;
        this._name = opts.name || 'text';

        this._init();

        this._node.classList.add('editor');
        this._node.appendChild(this._toolbar);
        this._node.appendChild(this._emojitools);
        this._node.appendChild(this._editor);
        this._node.appendChild(this._textarea);
    }
    _init() {
        const buttons = BUTTONS.filter(button => document.queryCommandSupported(button.cmd));

        this._toolbar = document.createElement('section');
        this._toolbar.classList.add('editor__toolbar');
        buttons.forEach(button => {
            const item = document.createElement('button');
            item.classList.add('material-icons');
            item.innerText = button.icon;
            item.addEventListener('click', event => {
                event.preventDefault();
                document.execCommand(button.cmd);
            });
            this._toolbar.appendChild(item);
        });

        this._emojitools = document.createElement('section');
        this._emojitools.classList.add('editor__emoji');
        EMOJI.forEach(emoji => {
            const item = document.createElement('button');
            item.type = 'button';
            item.innerText = emoji;
            item.addEventListener('click', event => {
                event.preventDefault();
                document.execCommand('insertText', false, emoji);
                this._emojitools.dataset.show = 'false';
            });
            this._emojitools.appendChild(item);
        });

        const emoji = document.createElement('button');
        emoji.innerText = '😃';
        emoji.addEventListener('click', event => {
            event.preventDefault();
            const status = this._emojitools.dataset.show === 'true';
            this._emojitools.dataset.show = status ? 'false' : 'true';
        });
        this._toolbar.appendChild(emoji);

        this._editor = document.createElement('section');
        this._editor.classList.add('editor__textarea');
        this._editor.setAttribute('contenteditable', 'true');
        this._editor.addEventListener('click', () => {
            if (this._emojitools.dataset.show === 'true') {
                this._emojitools.dataset.show = 'false';
            }
        });
        if (this._autosave) {
            this._editor.innerHTML = this.getLocalStorage();
            this._editor.addEventListener('input', throttle(this.saveLocalStorage.bind(this), this._delay));
        }

        this._textarea = document.createElement('textarea');
        this._textarea.classList.add('editor__hidden_block');
        this._textarea.setAttribute('disabled', 'disabled');
        this._textarea.setAttribute('name', this._name);
    }
    text() {
        return this._editor.innerHTML;
    }
    clear() {
        this._editor.innerHTML = '';
    }
    render() {
        this._textarea.value = this._editor.innerHTML;
        this._textarea.removeAttribute('disabled');
    }
    saveLocalStorage() {
        localStorage.setItem(this._storageName, this._editor.innerHTML);
    }
    getLocalStorage() {
        return localStorage.getItem(this._storageName);
    }
    removeLocalStorage() {
        localStorage.removeItem(this._storageName);
    }
}

module.exports = Editor;

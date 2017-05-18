'use strict';

const BUTTONS = [
    {
        cmd: 'bold',
        icon: 'format_bold',
        nodeName: 'B'
    },
    {
        cmd: 'italic',
        icon: 'format_italic',
        nodeName: 'I'
    },
    {
        cmd: 'underline',
        icon: 'format_underlined',
        nodeName: 'U'
    },
    {
        cmd: 'insertOrderedList',
        icon: 'format_list_numbered',
        nodeName: 'OL'
    },
    {
        cmd: 'insertUnorderedList',
        icon: 'format_list_bulleted',
        nodeName: 'UL'
    }
];

const EMOJI = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
    '🙂', '🙃', '😉', '😌', '😍', '😘', '😗', '😙', '😚', '😋',
    '😜', '😝', '😛', '🤑', '🤗', '🤓', '😎', '🤡', '🤠', '😏',
    '😒', '😞', '😔', '😟', '😕', '🙁', '😣', '😖', '😫', '😩',
    '😤', '😠', '😡', '😶', '😐', '😑', '😯', '😦', '😧', '😮',
    '😲', '😵', '😳', '😱', '😨', '😰', '😢', '😥', '🤤', '😭',
    '😓', '😪', '😴', '🙄', '🤔', '🤥', '😬', '🤐', '🤢', '🤧',
    '😷', '🤒', '🤕', '😈'
].map(emoji => ((((emoji.charCodeAt(0) - 0xD800) * 0x400) + (emoji.charCodeAt(1) - 0xDC00) + 0x10000)).toString(16));

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
        this._buttons = {};

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
                const state = item.dataset.active === 'true';
                item.dataset.active = state ? 'false' : 'true';
                this._editor.focus();
            });
            this._buttons[button.nodeName] = item;
            this._toolbar.appendChild(item);
        });

        this._emojitools = document.createElement('section');
        this._emojitools.classList.add('editor__emoji');
        EMOJI.forEach(emoji => {
            const item = document.createElement('img');
            item.dataset.type = 'emoji';
            item.src = `https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/${emoji}.png`;
            item.addEventListener('click', event => {
                event.preventDefault();
                document.execCommand('insertHtml', false, item.outerHTML);
                this._emojitools.dataset.show = 'false';
            });
            this._emojitools.appendChild(item);
        });

        const emoji = document.createElement('img');
        emoji.dataset.type = 'emoji';
        emoji.src = `https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/${EMOJI[10]}.png`;
        emoji.addEventListener('click', event => {
            event.preventDefault();
            const state = this._emojitools.dataset.show === 'true';
            this._emojitools.dataset.show = state ? 'false' : 'true';
            this._editor.focus();
        });
        this._toolbar.appendChild(emoji);

        this._editor = document.createElement('section');
        this._editor.classList.add('editor__textarea');
        this._editor.setAttribute('contenteditable', 'true');
        if (this._node.dataset.placeholder) {
            this._editor.setAttribute('placeholder', this._node.dataset.placeholder);
        }
        this._editor.addEventListener('click', event => {
            this._emojitools.dataset.show = 'false';
            const cursor = document.caretRangeFromPoint(event.clientX, event.clientY);
            let parentNode = cursor.commonAncestorContainer;
            const tags = [];
            while (parentNode !== this._editor) {
                parentNode = parentNode.parentNode;
                tags.push(parentNode.nodeName);
            }
            this._changeToolbarButton(tags);
        });
        if (this._autosave) {
            this._editor.innerHTML = this.getFromLocalStorage();
            this._editor.addEventListener('input', throttle(this.saveToLocalStorage.bind(this), this._delay));
        }

        this._textarea = document.createElement('textarea');
        this._textarea.classList.add('editor__hidden_block');
        this._textarea.setAttribute('disabled', 'disabled');
        this._textarea.setAttribute('name', this._name);
    }
    _changeToolbarButton(tags) {
        Object.keys(this._buttons).forEach(button => {
            this._buttons[button].dataset.active = 'false';
        });
        tags.forEach(tag => {
            if (this._buttons[tag]) {
                this._buttons[tag].dataset.active = 'true';
            }
        });
    }
    text() {
        return this._editor.innerHTML;
    }
    setText(text) {
        this._editor.innerHTML = text;
    }
    clear() {
        this._editor.innerHTML = '';
    }
    render() {
        this._textarea.value = this._editor.innerHTML;
        this._textarea.removeAttribute('disabled');
    }
    saveToLocalStorage() {
        localStorage.setItem(this._storageName, this._editor.innerHTML);
    }
    getFromLocalStorage() {
        return localStorage.getItem(this._storageName);
    }
    removeFromLocalStorage() {
        localStorage.removeItem(this._storageName);
    }
}

module.exports = Editor;

// https://learn.javascript.ru/file
// https://developer.mozilla.org/ru/docs/Web/API/FileReader/readAsDataURL

// https://www.youtube.com/watch?v=-AR-6X_98rM  !!!!! Cool!!!!
// посмотрю! уже открыл)))
// создал новую ветку Alex...


jsEditor()
function jsEditor() {
    const editorWrap = document.querySelector('.editor-wrap');
    const editorAddInput = document.querySelector('.editor-wrap .editor-menu input[type="file"]');
    editorAddInput.addEventListener('change', (e) => addImg(e));

    function addImg(e) {
        for (const files of e.target.files) {
            const reader = new FileReader();
            reader.onloadend = function () {
                const img = new Image();
                img.src = reader.result;
                const prevImg = `<div class="itemPrevImg animationRotateStart">
                                    <button class="btn-remove">&#10005;</button>
                                    <img src="${img.src}" alt="${e.target.files[0].lastModifiedDate}" title="Type: ${e.target.files[0].type} size: ${e.target.files[0].size} last Modified Date: ${e.target.files[0].lastModifiedDate}">
                             </div>`;
                document.querySelector('.editor-list-img').insertAdjacentHTML('afterBegin', prevImg);
                removeImg();
            };
            reader.readAsDataURL(files);
        };
    };

    function removeImg() {
        for (const btnRemove of document.querySelectorAll('.btn-remove')) {
            btnRemove.addEventListener('click', () => {
                btnRemove.parentNode.classList.remove('animationRotateStart'); // animation
                btnRemove.parentNode.classList.add('animationRotateFinish'); // animation
                setTimeout(() => {
                    btnRemove.parentNode.remove();
                }, 500); // 500 time animation
            });
        };
    };


    // Context Menu
    const contextMenuAddList = `<li>Add Images</li>
                                <li>Herring under a fur coat</li>
                                <li>Fried bacon with potatoes</li>`;

    editorWrap.addEventListener('contextmenu', contextMenuAddImg);
    function contextMenuAddImg(e) {
        e.preventDefault(); // remove default menu
        const contextMenu = document.querySelector('.contextMenu');
        const addContextMenu = editorWrap.insertAdjacentHTML('beforebegin', `<nav class="contextMenu" style="top: ${e.clientY}px; left: ${e.clientX}px"><button class="btn-remove">&#10006;</button><ul>${contextMenuAddList}</ul></nav>`); // container context menu
        contextMenu ? (contextMenu.remove(), addContextMenu) : addContextMenu; // Check if the menu is already open
        contextMenuClose();
    };
    function contextMenuClose() {
        document.querySelector('.contextMenu .btn-remove').addEventListener('click', () => {
            document.querySelector('.contextMenu').remove();
        });
    };



}
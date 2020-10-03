// https://learn.javascript.ru/file
// https://developer.mozilla.org/ru/docs/Web/API/FileReader/readAsDataURL

// https://www.youtube.com/watch?v=-AR-6X_98rM  !!!!! Cool!!!!

jsEditor()
function jsEditor() {
    const editorWrap = document.querySelector('.editor-wrap');
    const editorAddInput = document.querySelector('.editor-wrap input[type="file"]');
    editorAddInput.addEventListener('change', (e) => addImg(e));

    function addImg(e) {

       

        for (const files of e.target.files) {

            console.log(files.name)
            console.log(files.lastModifiedDate)
            console.log(files.size)

            const reader = new FileReader();
            reader.onloadend = function () {
                const img = new Image();
                img.src = reader.result;
                const prevImg = `<div class="item-prev-img animationRotateStart" data-lastmodifieddate="${e.target.files[0].lastModifiedDate}" data-size="${e.target.files[0].size}" data-type="${e.target.files[0].type}">
                                    <button class="btn-remove-img">&#10005;</button>
                                    <img src="${img.src}" alt="${e.target.files[0].lastModifiedDate}" title="last Modified Date: ${e.target.files[0].lastModifiedDate}">
                             </div>`;
                document.querySelector('.editor-list-img').insertAdjacentHTML('afterBegin', prevImg);
                removeImg();
                outputInfo(); // To display information about the image
            };
            reader.readAsDataURL(files);








        };
    };

    function removeImg() {
        for (const btnRemove of document.querySelectorAll('.btn-remove-img')) {
            btnRemove.addEventListener('click', () => {
                btnRemove.parentNode.classList.remove('animationRotateStart'); // animation
                btnRemove.parentNode.classList.add('animationRotateFinish'); // animation
                setTimeout(() => {
                    btnRemove.parentNode.remove();
                }, 500); // 500 time animation
            });
        };
    };



/*     // Context Menu
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
    }; */






function outputInfo() {

    const editorInfo = document.querySelector('.editor-info');
    const itemPrevImg = document.querySelectorAll('.item-prev-img');


    itemPrevImg.forEach((items) => {

        const lastModifiedDate = items.dataset.lastmodifieddate;
        const size = items.dataset.size;
        const type = items.dataset.type;

        items.addEventListener('mouseover', () => {
            /* console.log( items.dataset.lastmodifieddate  ) */
            editorInfo.innerHTML = `Size: ${size}Mb. | Type: ${type} | Last Modified Date: ${lastModifiedDate}`;
        });
    });
};







};
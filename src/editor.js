// https://www.youtube.com/watch?v=-AR-6X_98rM  !!!!! Cool!!!!

jsEditor()
function jsEditor() {
    const editorInfo = document.querySelector('.editor-info');
    const editorAddInput = document.querySelector('.editor-wrap input[type="file"]');
    editorAddInput.addEventListener('change', (e) => addImg(e));

    function addImg(e) {
        for (const files of e.target.files) {
            const reader = new FileReader();
            reader.onloadend = function () {
                const img = new Image();
                img.src = reader.result;
                const prevImg = `<div class="item-prev-img animationRotateStart" data-lastmodifieddate="${files.lastModifiedDate}" data-size="${files.size}" data-type="${files.type}">
                                    <button class="btn-remove-img">&#10005;</button>
                                    <img src="${img.src}" alt="${files.lastModifiedDate}" title="last Modified Date: ${files.lastModifiedDate}">
                             </div>`;
                document.querySelector('.editor-list-img').insertAdjacentHTML('afterBegin', prevImg);
                removeImg();
                outputInfo(); // To display information about the image
                addDivBottom(); // Insert a new bottom block with the publish button
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
                    removeElements();
                }, 500); // 500 time animation
            });
        };
    };



    // Context Menu
/*     const contextMenuAddList = `<li>Add Images</li>`;
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
        const itemPrevImg = document.querySelectorAll('.item-prev-img');
        itemPrevImg.forEach((items) => {
            const lastModifiedDate = items.dataset.lastmodifieddate;
            const size = Math.round(items.dataset.size / 1024); // converting bytes to kilobytes and rounded up to whole number
            const type = items.dataset.type;
            items.addEventListener('mouseover', () => {
                editorInfo.innerHTML = `Size: ${size}Kb. | Type: ${type} | Last Modified Date: ${lastModifiedDate}`;
            });
        });
    };

    function addDivBottom() {
        const btnNext = `<button class="btn btn-black">Publish</button>`;
        if(!document.querySelector('.editor-bottom')) {
            document.querySelector('.editor-list-img').insertAdjacentHTML('afterEnd', `<div class="editor-bottom">${btnNext}</div>`);
        };
        document.querySelector('.editor-bottom').addEventListener('click', () => alert('Sending images for publication'));
    };


    function removeElements() {
        if(!document.querySelector('.item-prev-img')) {
            document.querySelector('.editor-bottom').remove(); // remove div.editor-bottom
            editorInfo.innerHTML = ''; // clean div.editor-info
        };
    };




};
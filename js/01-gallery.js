import { galleryItems } from './gallery-items.js';

const pictureContainer = document.querySelector('.gallery')
const pictureMarkup = createPictureCardMarkup(galleryItems);
pictureContainer.insertAdjacentHTML("beforeend", pictureMarkup)
pictureContainer.addEventListener('click', onPictureShowModalClick);


function createPictureCardMarkup(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `<div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </div>`
    }).join("");
};


function onPictureShowModalClick(e) {
    e.preventDefault();

    if (e.target.nodeName !== 'IMG') {
        return;
    }

    const pictureCard = basicLightbox.create(
        `<img src="${e.target.dataset.source}" width="800" height="600">`);
    pictureCard.show();

    if (pictureCard.visible()) {
        pictureContainer.addEventListener('keydown', (e) => {
            if (e.code === 'Escape') {
                pictureCard.close()
            }
        }
        );
    };
}

export default function ImagePopup(props) {
    return (
        <div className={`popup popup_type_image 
        ${Object.keys(props.card).length !== 0 && 'popup__opened'}`} 
        onClick={props.closePopupsOnOutsideClick}>
            <div className="popup__container-image">
                <button type="button" className="popup__close" onClick={props.onClose}></button>
                <img className="fullscreen" src={props.card.link} 
                alt={`Описание фотографии: ${props.card.name}`} />
                <p className="fullscreen-subtitle">{props.card.name}</p>
            </div>
        </div>
    )
}

export default function Card(props) {
    return (
        <ul className="elements__list">
            <li className="elements__item">
                <img src={props.card.link} alt={`${props.card.name}`} className="elements__photo"
                    onClick={() => props.handlePopup.onCardClick(props.card)} />
                <button aria-label="удаление" className="elements__delete"
                    type="button" onClick={props.handlePopup.onConfirmationCardDeletion}></button>
                <div className="elements__description">
                    <h2 className="elements__title">{props.card.name}</h2>
                    <div className="elements__likes">
                        <button aria-label="лайк" className="elements__like" type="button"></button>
                        <span className="elements__like-counter">{props.card.likes.length}</span>
                    </div>
                </div>
            </li>
        </ul>

    )
}
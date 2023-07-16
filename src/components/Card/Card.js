export default function Card(props) {
    const { card, handlePopup } = props;
    return (
        <ul className="elements__list">
            <li className="elements__item">
                <img src={card.link} alt={`${card.name}`} className="elements__photo"
                    onClick={() => handlePopup.onCardClick(card)} />
                <button aria-label="удаление" className="elements__delete"
                    type="button" onClick={handlePopup.onConfirmationCardDeletion}></button>
                <div className="elements__description">
                    <h2 className="elements__title">{card.name}</h2>
                    <div className="elements__likes">
                        <button aria-label="лайк" className="elements__like" type="button"></button>
                        <span className="elements__like-counter">{card.likes.length}</span>
                    </div>
                </div>
            </li>
        </ul>

    )
}
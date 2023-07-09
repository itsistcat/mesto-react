export default function PopupWithForm({ popup, ...props }) {
    
    return (
        <div className={`popup popup_type_${popup.classSelector} ${props.isOpened && 'popup__opened'}`} 
        onClick={props.closePopupsOnOutsideClick}>
            <div className="popup__container">
                <h2 className="popup__title">{popup.title}</h2>
                <button aria-label="закрыть" className="popup__close" type="button" 
                onClick={props.onClose} />
                <form name={popup.formName} className="popup__form popup__form_type_profile" noValidate>
                    {props.children}
                    <button aria-label="сохранить" className="popup__save" type="submit">{popup.submitBtn}</button>
                </form>
            </div>
        </div>
    );
}
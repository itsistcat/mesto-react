import headerLogo from '../../images/logo.svg';

export default function Header() {
    return (
        <header className="header">
            <img className="logo" src={headerLogo} alt="Логотип" />
        </header>
    );

    // "<%=require('./images/logo.svg')%>"
}
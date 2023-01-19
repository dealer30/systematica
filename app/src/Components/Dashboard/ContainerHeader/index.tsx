import './index.css'

function Header(props: any) {
    return (
        <header className="header-container">
            <p>{props.title}</p>
        </header>
    )
}

export default Header;

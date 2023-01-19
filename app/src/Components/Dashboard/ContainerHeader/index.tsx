import './index.css'

function Header(props: any) {
    return (
        <header className="header-container no-select">
            <p>{props.title}</p>
        </header>
    )
}

export default Header;

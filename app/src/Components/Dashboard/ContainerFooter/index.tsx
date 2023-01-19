import './index.css'

function Footer({ children } : { children: React.ReactNode }) {
    return (
        <footer className="container-footer">
            { children }
        </footer>
    )
}

export default Footer

import './index.css'

function Container({ children } : { children: React.ReactNode }) {
    return (
        <div className="container-dashboard">
            { children }
        </div>
    )
}

export default Container

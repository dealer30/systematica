import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "../Contexts/auth"
import Edit from "../Pages/Edit"
import Error from "../Pages/Error"
import Home from "../Pages/Home"
import Login from "../Pages/Login"
import New from "../Pages/New"
import { PrivateRoute } from "./private"

const RoutesApp = () => {

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<Login/>} />
                    <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>}/>
                    <Route path='/system/edit/:uuid' element={<PrivateRoute><Edit/></PrivateRoute>}/>
                    <Route path='/system/new' element={<PrivateRoute><New /></PrivateRoute>}/>
                    <Route path='*' element={<Error error={404}/>}></Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default RoutesApp

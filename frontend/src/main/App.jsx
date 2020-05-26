import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import "font-awesome/css/font-awesome.min.css"
import "./App.css"
import React from "react"
import { BrowserRouter } from "react-router-dom"

import Routes from "./Routes"
import Logo from "../components/template/Logo"
import Nav from "../components/template/Nav"
import Footer from "../components/template/Footer"
import translate from "../components/helpers/Translation"
export default props =>
    <BrowserRouter>
        <div className="app">
            <Logo />
            <Nav translate={translate}/>
            <Routes/>
            <Footer />
        </div>
    </BrowserRouter>
    
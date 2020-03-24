import React from "react"
import Main from "./Main"

export default props =>
<Main icon="home" title="Home" subtitle="Simplify your finances">
    <div className="p-3 mt-3">
        <div className="display-4">Welcome</div>
        <hr/>
        <p className="mb-0">
            Simple financial controll is an application which
            takes notes of your incomes and expenses, helping you
            with saving your money.
        </p> 
    </div>  
</Main>
import React from "react"
import Header from "./Header"

export default props =>{
    
    return(
        <React.Fragment>
            <Header {...props} />
            <main className="content container-fluid">
                {props.children}                
            </main>
        </React.Fragment>
    )
    
}

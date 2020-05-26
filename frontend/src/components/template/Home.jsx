import React, {Component} from "react"
import Main from "./Main"

export default class Home extends Component {
    constructor(props){
        super(props)
        this.translate = this.props.translate
    }
    render = () =>
        <Main icon="home" title={this.translate('HOME_TITLE')} translate={this.translate} subtitle={this.translate('HOME_SUBTITLE')}>
            <div className="p-3 mt-3">
                <div className="display-4">{this.translate('HOME_WELCOME')}</div>
                <hr/>
                <p className="mb-0">
                    {this.translate('HOME_DESCRIPTION')}
                </p> 
            </div>  
        </Main>
    
}

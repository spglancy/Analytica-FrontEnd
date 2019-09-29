import React from 'react'
import Authentication from '../Authentication/Authentication'
import CommandListContainer from './CommandListContainer/CommandListContainer'
import firestore from './firebase.js'
import StatsList from './StatListContainer/StatsList'
import Navbar from './NavBar/navbar'

import './App.css'

export default class App extends React.Component{
    constructor(props){
        super(props)
        this.Authentication = new Authentication()

        this.anchor = this.queryParamParse().anchor
        //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null. 
        this.twitch = window.Twitch ? window.Twitch.ext : null
        this.state={
            finishedLoading:false,
            theme:'light',
            commands:[],
            helper: this.helper.bind(this),
            active: 'WatchTime',
            refresh: false,
            viewers: [],
            db: null
        }
    }

    queryParamParse(){
        let query = window.location.search
        let obj = {}
        query.substring(1).split('&').map(v=>{
            let s = v.split('=')
            obj[s[0]] = decodeURIComponent(s[1])
        })

        return obj
    }

    contextUpdate(context, delta){
        if(delta.includes('theme')){
            this.setState(()=>{
                return {theme:context.theme}
            })
        }
    }

    componentDidMount(){
        if(this.twitch){
            this.twitch.onAuthorized((auth)=>{
                this.Authentication.setToken(auth.token, auth.userId)
                if(!this.state.finishedLoading){
                    this.setState(()=>{
                        return {finishedLoading:true}
                    })
                }
            })

            this.twitch.onContext((context,delta)=>{
                this.contextUpdate(context,delta)
            })

            this.twitch.configuration.onChanged(()=>{
                let config = this.twitch.configuration.broadcaster ? this.twitch.configuration.broadcaster.content : ''
                try{
                    config = JSON.parse(config)
                }catch(e){
                    config = ''
                }

                this.setState(()=>{
                    return{
                        commands:config
                    }
                })
            })
        }
        const db = firestore.firestore()
        db.collection('gamesdonequick_Prod')
        .get()
        // .then(res => console.log(res))
        .then(res => res.docs[0].data())
        .then(res => {
            const viewers = Object.entries(res).slice(0, 5).sort((a, b) => {
                if(a[1] === b[1]) {
                    return 0;
                }
                else {
                    return (a[1] > b[1]) ? -1 : 1
                }
            })
          this.setState({viewers,
                         db})
        })
    }

    componentWillUnmount(){
        if(this.twitch){
            this.twitch.unlisten('broadcast', ()=>console.log('successfully unlistened'))
        }
    }

    helper(str) {
        this.setState({active: str})
        let endpoint = 1
        switch(str) {
          case 'Subs':
            endpoint = 2
            break
          case 'WatchTime':
            endpoint = 0
            break
          case 'Chat':
            endpoint = 1
          default:
            break
        }
        this.state.db.collection('gamesdonequick_Prod')
        .get()
        // .then(res => console.log(res))
        .then(res => res.docs[endpoint].data())
        .then(res => {
            const viewers = Object.entries(res).slice(0, 5).sort((a, b) => {
                if(a[1] === b[1]) {
                    return 0;
                }
                else {
                    return (a[1] > b[1]) ? -1 : 1
                }
            })
          this.setState({viewers})
        })
    }
    
    render(){
        // if(this.state.finishedLoading && this.state.commands.length > 0){
        //     return (
        //         <div className={this.state.theme === 'light' ? "App App-light" : "App App-dark"}>
        //             <CommandListContainer commands={this.state.commands} authentication={this.Authentication} panel={this.anchor === 'panel'} />
        //         </div>
        //     )
        // }else{
        //     return (
        //         <div className={this.state.theme === 'light' ? "App App-light" : "App App-dark"}>
        //             No commands configured.
        //         </div>
        //     )
        // }
        return (
            <div className="container">
              <h1>Top {this.state.active}</h1>
              <StatsList viewers={this.state.viewers} active={this.state.active}/>
              <Navbar helper={this.state.helper}/>
            </div>
          )

    }
}
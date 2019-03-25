import React, { Component } from 'react';

class Video extends Component {
    componentDidMount = () =>{
        console.log(this.props.location.search)
    }
    render() {
        // console.log(window.location)
        return (
            <div>
                video
            </div>
        )
    }
}
export default Video
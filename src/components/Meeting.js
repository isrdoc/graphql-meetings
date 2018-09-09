import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

export default class Meeting extends Component {
  render() {
    let title = this.props.meeting.destination.title
    /*
    if (this.props.isDraft) {
      title = `${title} (Draft)`
    }
    */

    return (
        <article className="bb b--black-10">
          <div className="flex flex-column flex-row-ns">
            <div className="w-100 w-60-ns pl3-ns">
              <h1 className="f3 fw1 baskerville mt0 lh-title">{title}</h1>
              <p className="f6 lh-copy mv0">By {this.props.meeting.author.name}</p>
            </div>
          </div>
        </article>
    )
  }
}

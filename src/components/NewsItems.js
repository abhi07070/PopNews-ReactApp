import React, { Component } from 'react'

export class NewsItems extends Component {

  render() {
    let { title, description, imageurl, newsUrl, author, date, name} = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{ width: '18rem' }}>
        <span className="badge bg-dark">{name}</span>
        <img src={!imageurl ? "https://www.kitco.com/news/2022-05-04/images/goldchart_0504_pm.png" : imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className='card-text'><small className='text-muted'>By {author ? author : "Unknown"} on {new Date(date).toUTCString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-dark d-flex justify-content-center">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItems

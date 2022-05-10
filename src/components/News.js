import React, { Component } from 'react';
import NewsItems from './NewsItems';
import PropTypes from 'prop-types'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - PopNews`;
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async update() {
    <News pageSize={5} />
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=225b63c8ad794e4ca99c4cd0d74b124c&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }
  async componentDidMount() {
    this.update();
  }

  handlePreviousClick = async () => {
    this.setState({
      page: this.state.page - 1
    });
    this.update();
  }
  handleNextClick = async () => {
    this.setState({
      page: this.state.page + 1
    })
    this.update();
  }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=225b63c8ad794e4ca99c4cd0d74b124c&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
    })
  };

  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center'>PopNews- Top Headlines on {this.capitalizeFirstLetter(this.props.category)}</h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">

            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-3 mx-5 my-3 " key={element.url}>
                  <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} name={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-around">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 35)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    )
  }
}

export default News

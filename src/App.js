import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: null
    };

    //Binding functions
    this.randomQuote = this.randomQuote.bind(this);
    this.nextQuote = this.nextQuote.bind(this);
    this.tweetQuote = this.tweetQuote.bind(this);
  }

  //Fetching Quotes
  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then(response => response.json())
      .then(res => {
        this.setState({
          quotes: res.quotes
        });
        const data = this.randomQuote();
        this.setState({
          quote: data.quote,
          author: data.author
        });
      })
      .catch(error => console.error(error));
  }

  //Geting random quote
  randomQuote() {
    const randomIndex = Math.floor(Math.random() * this.state.quotes.length);
    return this.state.quotes[randomIndex];
  }

  //Next quote
  nextQuote() {
    const randomNumber = this.randomQuote();
    this.setState({
      quote: randomNumber.quote,
      author: randomNumber.author
    });
  }

  //Tweet quote
  tweetQuote() {
    const myQuotes = `${this.state.quote} ${this.state.author}`;
    const link = `https://twitter.com/intent/tweet?text=${myQuotes}`;
    return link;
  }

  render() {
    return (
      // Card
      <div className="card m-md-3">
        {/* Card image */}
        <div className="view">
          <img
            src="https://placeimg.com/640/480"
            className="card-img-top"
            alt="api-img"
          />
          <a href="~">
            <div className="mask rgba-white-slight" />
          </a>
        </div>
        {/* Card content */}
        <div className="card-body text-center">
          {/* Text */}
          <p className="card-text">
            <div id="quote-box" className="text-center">
              <div id="text" className="blockquote">
                <p className="mb-0">{this.state.quote}</p>
                <p className="blockquote-footer" id="author">
                  {this.state.author}
                </p>
                <hr />
              </div>
              <div>
                <button
                  id="new-quote"
                  className="btn btn-success mr-2"
                  onClick={this.nextQuote}
                >
                  <FontAwesomeIcon icon={faRedoAlt} />
                </button>
                <a
                  href={this.tweetQuote()}
                  className="text-white text-decoration-none"
                  id="tweet-quote"
                >
                  <button className="btn btn-primary" onClick={this.tweetQuote}>
                    <FontAwesomeIcon icon={faTwitter} />
                  </button>
                </a>
              </div>
            </div>
          </p>
        </div>
      </div>
    );
  }
}

export default App;

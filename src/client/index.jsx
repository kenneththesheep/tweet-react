import React from 'react';
import ReactDOM from 'react-dom';

import tweets from './tweets'

class User extends React.Component {
  render() {
    function dhm(ms){
    let days = Math.floor(ms / (24*60*60*1000));
    let daysms=ms % (24*60*60*1000);
    let hours = Math.floor((daysms)/(60*60*1000));
    let hoursms=ms % (60*60*1000);
    let minutes = Math.floor((hoursms)/(60*1000));
    let minutesms=ms % (60*1000);
    let sec = Math.floor((minutesms)/(1000));
    return days+" days: "+hours+" hours:"+minutes+" minutes: "+sec + " seconds ago";
    }
    let newTime=dhm(new Date().getTime()-Date.parse(this.props.date));
    console.log(newTime);
    return (
      <div className="card-title">
        <h5>
          <img src={this.props.user.profile_image_url_https} style={{width: "7%"}}/>
          &nbsp;&nbsp;&nbsp;<a href={this.props.user.url}>{this.props.user.name}</a>
          <span className="text-muted"> @{this.props.user.screen_name}</span>
          &nbsp;&nbsp;
                  <span  style={{fontSize: "10px"}}>{newTime}</span>

        </h5>

      </div>
    )
  }
}






class TweetText extends React.Component {
  render() {
    return (
      <div>
        <p className="card-text">
          {this.props.text}
        </p>
      </div>
    )
  }
}


class Likes extends React.Component {
  render () {
    return (
      <span>
        <i className="material-icons md-18">thumb_up</i> {this.props.likes}
      </span>
    )
  }
}

class Retweets extends React.Component {
  render() {
    return (
      <span>
        <i className="material-icons md-18">double_arrow</i> {this.props.retweets}
      </span>
    )
  }
}

class TweetMedia extends React.Component {
  render() {

    if (this.props.entities) {
      if (this.props.entities.media) {
        return (
          <div>
            <img className ="img-card-bottom mw-100" src={this.props.entities.media[0].media_url}/>
          </div>
        )
      }
      return (
        <div></div>
      )
    }
    return (
      <div></div>
    )
  }
}


class Tweet extends React.Component {

  render() {
      return (
        <div className="card mt-2 mb-2 pb-2 ">
          <div className="card-body">
            <User user={this.props.tweet.user} date={this.props.tweet.created_at} index={this.props.tweetIndex}/>
            <TweetText text={this.props.tweet.text}/>
          </div>
          <div className="card-footer">
            <Likes likes={this.props.tweet.favorite_count}/> <Retweets retweets={this.props.tweet.retweet_count}/>
          </div>
          <TweetMedia entities={this.props.tweet.entities}/>
        </div>
      );
  }
}


class App extends React.Component {
  render() {
    //From the bottom, it shows how to access the tweet array
    console.log(this.props.tweets.tweets.length)
    let tweetsList = this.props.tweets.tweets.map( ( tweet, index ) => {
      console.log (tweet);
      return <Tweet tweet={tweet} tweetIndex= {index}/>
    })

    return (
      <div>
        <h1> <i class="fas fa-chevron-left"></i> @{this.props.tweets.tweets[0].user.screen_name}</h1>
        <ol>
        {tweetsList}
        </ol>
      </div>
    );
  }
}

const element = document.getElementById('app');
//to use tweets within the app
ReactDOM.render(<App tweets= {tweets} />, element );//

console.log("tweet react");
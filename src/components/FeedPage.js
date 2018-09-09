import React, { Component, Fragment } from 'react'
// import Post from '../components/Post'
import Meeting from '../components/Meeting'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'

class FeedPage extends Component {
  componentDidReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.meetingsQuery.refetch()
    }
  }

  componentDidMount() {
    this.props.subscribeToNewMeetings()
  }

  render() {
    console.log('this.props.meetingsQuery.meetings', this.props.meetingsQuery.meetings)

    if (this.props.meetingsQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    return (
      <Fragment>
        <h1>Feed</h1>
        {this.props.meetingsQuery.meetings &&
          this.props.meetingsQuery.meetings.map(meeting => (
            <Meeting
              key={meeting.id}
              meeting={meeting}
              refresh={() => this.props.meetingsQuery.refetch()}
            />
          ))}
        {this.props.children}
      </Fragment>
    )
  }
}

/*
<Post
  key={post.id}
  post={post}
  refresh={() => this.props.meetingsQuery.refetch()}
  isDraft={!post.isPublished}
/>
*/
/*
const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      id
      text
      title
      isPublished
      author {
        name
      }
    }
  }
`
*/
const MEETINGS_QUERY = gql`
  query MeetingsQuery {
    meetings {
      id
      destination {
        id
        title
      }
      isPublished
      author {
        name
      }
    }
  }
`
/*
const FEED_SUBSCRIPTION = gql`
  subscription FeedSubscription {
    feedSubscription {
      node {
        id
        text
        title
        isPublished
        author {
          name
        }
      }
    }
  }
`
*/
const MEETINGS_SUBSCRIPTION = gql`
  subscription MeetingsSubscription {
    meetingsSubscription {
      node {
        id
        destination {
          id
          title
        }
        isPublished
        author {
          name
        }
      }
    }
  }
`

export default graphql(MEETINGS_QUERY, {
  name: 'meetingsQuery', // name of the injected prop: this.props.meetingsQuery...
  options: {
    fetchPolicy: 'network-only',
  },
  props: props =>
    Object.assign({}, props, {
      subscribeToNewMeetings: params => {
        return props.meetingsQuery.subscribeToMore({
          document: MEETINGS_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            console.log('updateQuery')
            if (!subscriptionData.data) {
              return prev
            }
            const newMeeting = subscriptionData.data.meetingsSubscription.node
            if (prev.meetings.find(meeting => meeting.id === newMeeting.id)) {
              return prev
            }
            return Object.assign({}, prev, {
              meetings: [...prev.meetings, newMeeting],
            })
          },
        })
      },
    }),
})(FeedPage)

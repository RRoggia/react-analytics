import React from 'react';
import './SubscriptionsPostAnalytics.css'
import NumberCard from '../NumberCard/NumberCard.js'
import ErrorMessage from '../ErrorMessage/ErrorMessage.js'
import Refresh from '../Refresh/Refresh.js'
import SubscriptionPostAnalyticsByYear from '../SubscriptionPostAnalyticsByYear/SubscriptionPostAnalyticsByYear'
import axios from 'axios'

class SubscriptionsPostAnalytics extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            subscriptionsPostAnalytics: [],
            error: {
                hidden: true,
                message: 'Could not load data.'
            }
        }
        this.fetchSubscriptionsPostAnalytics = this.fetchSubscriptionsPostAnalytics.bind(this)
        this.enableError = this.enableError.bind(this)
        this.disbaleError = this.disableError.bind(this)
    }

    componentDidMount(){
        this.fetchSubscriptionsPostAnalytics()
    }

    enableError( errorMessage ) {
        this.setState( { error: { hidden: false, message: errorMessage } } )
    }

    disableError() {
        this.setState( { error: { hidden: true, message: '' } } )
    }

    async fetchSubscriptionsPostAnalytics() {
        try {
            const result = await axios.get( 'http://localhost:3003/api/v1/analytics/subscriptions/post/overview' )
            const subscriptionsPayload = result.data

            let subscriptions = []
            
            for(let subscription in subscriptionsPayload) {
                subscriptions = [
                    ...subscriptions,
                    { subscription, numberOfPosts: subscriptionsPayload[subscription]}
                ]
            }

            this.setState( { subscriptionsPostAnalytics: subscriptions} )
            this.disableError()
        } catch( e ) {
            if( !e.response ){
                this.enableError(e.message)
            }else{
                this.enableError(e.response.data.message)
            }
        }
        
    }

    render() {
        return (
            <div >
                <h1>Posts</h1>
                <Refresh onClick={this.fetchSubscriptionsPostAnalytics} />
                <ErrorMessage { ...this.state.error }/>
                <div className='dashboard'>
                    {
                        this.state.subscriptionsPostAnalytics.map( subscriptionPostAnalytics => {
                            return <NumberCard key={subscriptionPostAnalytics.subscription} {...subscriptionPostAnalytics} />
                        })
                    }
                </div>
                <div className='dashboard'>
                    <SubscriptionPostAnalyticsByYear />
                </div>
            </div>
        )
    }
}

export default SubscriptionsPostAnalytics
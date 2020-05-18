import React from 'react'
import NumberCard from '../NumberCard/NumberCard'
import { Bar } from 'react-chartjs-2';
import axios from 'axios'

  const getStyle = subscription => {
    return subscription === 'curadoria' ? {
        backgroundColor: '#009bbf',
        borderColor: '#009bbf',
        borderWidth: 1,
        hoverBackgroundColor: '#009bbf',
        hoverBorderColor: '#009bbf'
    }
    :
    {
        backgroundColor: '#ffae3c',
        borderColor: '#ffae3c',
        borderWidth: 1,
        hoverBackgroundColor: '#ffae3c',
        hoverBorderColor: '#ffae3c',
    }
  }

class SubscriptionPostAnalyticsByYear extends React.Component {
    constructor( props ){
        super( props )
        
        this.state = {
            subscriptionsPostPerYear: {
                labels:[],
                data:[]
            },
            subscriptionsAverage: []
        }
    }

    componentDidMount() {
        this.fetchSubscriptionsPostAnalyticsByYear()
    }

    async fetchSubscriptionsPostAnalyticsByYear() {
        try {
            const result = await axios.get( 'http://localhost:3003/api/v1/analytics/subscriptions/post/year' )
            const subscriptionsPayload = result.data

            let datasets = []
            let labels = new Set()
            const average =[]
            for(let subscription in subscriptionsPayload) {
                subscriptionsPayload[subscription].map( entry => labels.add(entry.year))
                
                const yearsSorted = [ ...labels].sort( (a,b) => a - b)
                
                let mediaDePosts = 0
                const data = yearsSorted.map ( year => {
                    const entry = subscriptionsPayload[subscription].find(entry => entry.year === year) 
                    const valor = ( entry && entry.numberOfPosts ) ? entry.numberOfPosts : 0
                    
                    mediaDePosts += valor

                    return valor
                })

                mediaDePosts = mediaDePosts / subscriptionsPayload[subscription].length
                average.push( {
                    subscription: `media de posts no ano - ${subscription}`,
                    numberOfPosts: mediaDePosts
                })
                
                const displayData = {
                    label: subscription,
                    ...getStyle(subscription),
                    data
                }

                datasets.push( displayData )
            }

            const b = {
                labels: [...labels].sort( (a, b) => a - b),
                datasets
            }
            console.log(b)
            this.setState({subscriptionsAverage:average})
            this.setState({subscriptionsPostPerYear: b})

        } catch( e ) {
            console.log(e)
        }
        
    }

    render() {
        return (
            <div >
                <Bar data={ this.state.subscriptionsPostPerYear } width={1000} />
                {
                    this.state.subscriptionsAverage.map(average => <NumberCard { ...average }/> )
                }
            </div>
        )
    }
}

export default SubscriptionPostAnalyticsByYear
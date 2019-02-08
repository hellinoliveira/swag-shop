import React, { Component } from 'react'
import './wishlist.css'

import ProductCondensed from '../product-condensed/product-condensed'
import NotificationService, { NOTIF_WISHLIST_CHANGED } from '../services/notification-service';

let ns = new NotificationService()

class Wishlist extends Component {

    constructor(props) {
        super(props)

        this.state = { wishlist: [] }

        this.createWishlist = this.createWishlist.bind(this)
        this.onWishListChanged = this.onWishListChanged.bind(this)
    }

    componentDidMount() {
        ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged);
    }

    componentWillUnmount() {
        ns.removeObserver(this, NOTIF_WISHLIST_CHANGED)
    }

    onWishListChanged(newWishList) {
        this.setState({ wishlist: newWishList })
    }

    createWishlist = () => {
        const list = this.state.wishlist.map((product) =>
            <ProductCondensed product={product} key={product._id} />
        )
        return list
    }

    render() {
        return (
            <div className="card">
                <div className="card-block">
                    <h4 className="card-title">Wish List</h4>
                    <ul className="list-group">
                        {this.createWishlist()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Wishlist
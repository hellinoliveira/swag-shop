import React, { Component } from 'react'
import './product.css'
import DataService from '../services/data-service'
import NotificationService, { NOTIF_WISHLIST_CHANGED } from '../services/notification-service';

let ns = new NotificationService()
let ds = new DataService()

class Product extends Component {

    constructor(props) {
        super(props)

        this.state = { onWishList: ds.itemOnWishList() }

        this.toogleWishList = this.toogleWishList.bind(this);
        this.onWishListChanged = this.onWishListChanged.bind(this);
    }
    toogleWishList = () => {
        if (this.state.onWishList) {
            ds.removeWishListItem(this.props.product)
        } else {
            ds.addWishListItem(this.props.product);
        }
    }

    componentDidMount() {
        ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged);
    }

    componentWillUnmount() {
        ns.removeObserver(this, NOTIF_WISHLIST_CHANGED)
    }

    onWishListChanged(newWishList) {
        this.setState({ onWishList: ds.itemOnWishList(this.props.product) })
    }

    render() {

        var btnClass;

        if (this.state.onWishList) {
            btnClass = "btn btn-danger"
        } else {
            btnClass = "btn btn-primary"
        }

        return (
            <div className="card product">
                <img className="card-img-top" src={this.props.product.imgUrl} alt="Product"></img>
                <div className="card-block">
                    <h4 className="card-title">{this.props.product.title}</h4>
                    <p className="card-text"> Price: {this.props.product.price}$</p>
                    <button onClick={() => this.toogleWishList()} className={btnClass}>
                        {this.state.onWishList ? "Remove from Whishlist" : "Add to Whishlist"}</button>
                </div>
            </div>
        )
    }
}

export default Product
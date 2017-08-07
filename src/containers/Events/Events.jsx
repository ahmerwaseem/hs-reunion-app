import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {whosGoing} from '../../actions/users';
import {getEvents} from '../../actions/events';
import { rsvpEvent, cancelRsvp, getReservations } from '../../actions/reservations';
import './Events.css';
import className from 'classnames';
import ModalWindow from '../../components/ModalWindow/ModalWindow';


class Events  extends Component{
  constructor(props) {
    super(props);
   // console.log(this.props.events, "props", this.props.eventList);
    this.buyClick = this.buyClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.state = {
      buyTicketsModal : false,
      cancelModal : false,
      confirmBuyModal : false,
      confirmCancelModal : false,
      selected: 1
    }

    this.eventID = "";
    this.cost = "";
  }

  componentDidMount(){
     window.scrollTo(0, 0);
    this.props.getEvents();
    this.props.getReservations();
    this.props.whosGoing();

    setTimeout(()=>{
      this.setState({
        hotelModal:true
      })
    },3500)

  }
  

  cancelClick = (eventID,cost) => {
    this.cost = cost;
    this.eventID = eventID;
      this.setState({
        cancelModal: true
      })
  }

  buyClick = (eventID, cost) => {
    this.eventID = eventID;
    this.cost = cost;
    if (this.props.user.signedIn != undefined && this.props.user.signedIn){
        this.setState({
          buyModal: true
        })
      }
    else{
      this.props.history.push("/login");
    }
  }

  render(){
    return(
      <div className="Events">
        <h5>Upcoming Events</h5>
        <ul className="EventList">
          {(()=>{
          //  console.log(this.props.events, "props.events")
            if(this.props.events != null ){
              return this.props.events.eventList.map((item)=> {
                const {
                  id,
                  name,
                  weekday,
                  month,
                  day,
                  year,
                  time,
                  cost,
                  description,
                  city,
                  state,
                  zipcode,
                  address,
                  location
                } = item;

                let isGoing = false;

                return( 
                  <li className="EventItem" key={id}>
                    <div className="card">
                      <p className="card-header">{name}</p>
                      <div className="card-block">
                        <p className="card-title">{description}</p>
                      </div>
                      <div className="card-block">
                        <p className="card-title"><span className="detail">Where:</span>{" " +location+", "+address+" "}{city+" "}{state+", "}{zipcode}</p>
                      </div>
                      <div className="card-block">
                        <p className="card-title"><span className="detail">When: </span>{" "+weekday+", "}{month+" "} {day+", "} {year} {" at "+time} </p>
                      </div>
                      <div className="card-block">
                        <p className="card-title"><span className="detail">Cost per ticket: </span> { (cost!="FREE") ? "$"+cost : cost } </p>
                      </div>
                        {(()=>{
                        let whosGoing = [];
                        if (this.props.user.whosGoing != undefined){
                          this.props.user.whosGoing.map(item=> {
                            if (item.eventid == id)
                             whosGoing.push(item);
                          })

                          return (
                            <div className="dropdown">
                              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Attendees
                              </button>
                              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                {(whosGoing.length == 0) ? (<a className="dropdown-item" >None</a>): 
                                whosGoing.map((item=> {return ( <a className="dropdown-item" >{`${item.firstname} ${item.lastname}`}</a>)}))}
                              </div>
                            </div>                          
                          )
                        }
                      })()}
                      {(()=>{
                        if (this.props.reservations!= null && this.props.user.userInfo != null){
                            this.props.reservations.reservationList.map(item=>{
                            //console.log(item.userid,this.props.user.userInfo.userId ,item.eventid,id);
                              if(item.userid == this.props.user.userInfo.userId && item.eventid == id)
                              isGoing = true;
                            });
                        } 
                        const submitText = ((isGoing) ? "TICKETS CONFIRMED" : "GET TICKETS")
                        return (
                          <button disabled={isGoing} className="btn btn-primary"
                            onClick={()=>this.buyClick(id,cost)}
                          > 
                            {submitText}
                          </button>
                        )
                      })()}
                      {(()=>{
                        if (isGoing) {
                          return(
                              <button 
                                className="btn btn-secondary "
                                onClick={()=>this.cancelClick(id,cost)}
                              > 
                              CANCEL TICKETS 
                              </button>

                          )
                        }})()}
                        {(()=>{
                        if(isGoing){
                            return(
                              <div className="alert alert-success" role="alert">
                                We will look forward to seeing you there! 
                              </div>
                            )
                        }
                        else{
                          return(
                            <div className="alert alert-warning" role="alert">
                              Don't miss out, get your tickets today! 
                            </div>
                          )
                        }
                        })()}
                      </div>
                  </li>
                  
                ) 
                  
              });
            }
            return ( <p> Loading.... </p>)
          })()}
          
        </ul>

          <ModalWindow 
            animation= {true}
            showModal= {this.state.buyModal} 
            title = {this.cost != "FREE" ? 
            "Buy Tickets": "Rerserve your tickets"
            }
            content = {this.cost != "FREE" ? 
            "Enter Credit Card number and click Buy Now to purchase tickets." : "Click RSVP to confirm your tickets."
            }
            submit = {this.cost != "FREE" ? 
            "Buy Now" : "RSVP"
            }
            cancel = "Cancel"
            onCancel = {(e)=>{this.setState({buyModal:false,selected:1})}}
            onSubmit = {(e)=>{
                this.props.rsvpEvent(this.props.user.userInfo.userId,this.eventID, this.state.selected);
                this.props.whosGoing();
                this.setState({
                  buyModal:false,
                  confirmBuyModal: true,
                  selected: 1,
                })
              }
            }
          >
          <div className="form-group">  
            {(()=>{
              
            if(this.cost != "FREE"){
            return ( 
          
                <div>
                  <label>
                    Credit Card Number:
                  </label>
                  <input type="text" required/>
                </div>
              
            )
            }})()}
                <div className="qty">Qty:
                  <select id="tickets" onChange={(e)=>{this.setState({selected: e.target.value})}}>
                    <option value={1} defaultValue>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </div>
            
                        
            {(()=>{

            if(this.cost != "FREE"){
            return ( 
              <div className="qty">{`Total: $${this.cost * this.state.selected}.00`} </div>
            )
            }})()}

            
          </div>  
                


          </ModalWindow>

           <ModalWindow 
            animation= {true}
            showModal= {this.state.cancelModal} 
            title = "Ticket Cancellation"
            content = {(this.cost != "FREE") ?  "Click 'Get Refund' to complete your refund and cancel your tickets." : 
                    "Click 'Cancel' to cancel your tickets."}
            submit = {(this.cost == "FREE") ? "Cancel" : "Get Refund"}
            cancel = "Exit"
            onCancel = {(e)=>{this.setState({cancelModal:false})}}
            onSubmit = {(e, numTickets)=>{
             //  console.log(e,"yoyo");
                this.props.cancelRsvp(this.props.user.userInfo.userId,this.eventID);
                this.props.whosGoing();
                this.setState({
                  cancelModal:false,
                  confirmCancelModal: true
                })
              }
            }
          />

          <ModalWindow 
            animation= {true}
            showModal= {this.state.confirmBuyModal} 
            title = "Tickets confirmed"
            content = "Your tickets have been confirmed. We look forward to seeing you."
            cancel = "Close"
            onCancel = {(e)=>{this.setState({confirmBuyModal:false})}}
          />

           <ModalWindow 
            animation= {true}
            showModal= {this.state.confirmCancelModal} 
            title = "Tickets Cancelled"
            content = {`Your tickets have been cancelled${(this.cost != "FREE") ? " and refunded" : ""}.`}
            cancel = "Close"
            onCancel = {(e)=>{this.setState({confirmCancelModal:false})}}
            />

            <ModalWindow 
            animation= {true}
            showModal= {this.state.hotelModal} 
            title = "Hotels.com Deal"
            content = {<div> <span> Need accommodations? Go to </span>  <a href="http://www.hotels.com">Hotels.com</a>  <span> and enter coupon code: "WVHS2017" for 20% off your hotel stay! </span> </div>}
            cancel = "Close"
            onCancel = {(e)=>{this.setState({hotelModal:false})}}
            />

      </div>
)
  }

}

const mapStateToProps = (state) => {
 // console.log(state,"state");
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ 
      getEvents : getEvents,
      rsvpEvent : rsvpEvent, 
      cancelRsvp : cancelRsvp,
      getReservations : getReservations,
      whosGoing : whosGoing,

    }, 
    dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Events) ;
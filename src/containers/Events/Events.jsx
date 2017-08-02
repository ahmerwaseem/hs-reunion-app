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
    console.log(this.props.events, "props", this.props.eventList);
    this.buyClick = this.buyClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.state = {
      buyTicketsModal : false,
      cancelModal : false
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
  

  cancelClick = (eventID) => {
    this.eventID = eventID;
      this.setState({
        cancelModal: true
      })
  }

  buyClick = (eventID, cost) => {
    this.eventID = eventID;
    this.cost = cost;
    console.log('clicked')
    if (this.props.user.signedIn != undefined && this.props.user.signedIn){
      // const { reservationList } = this.props.reservations;
      // let isGoing = false;
      // console.log("==",this.props.reservations, this.props.reservations.reservationList);
      // for ( let i in reservationList){
      //    console.log("==",reservationList[i].userid,this.props.user.userInfo.userId ,reservationList[i].eventid,eventID);
      //     if(reservationList[i].userid == this.props.user.userInfo.userId 
      //       &&  reservationList[i].eventid == eventID){
      //       isGoing = true;
      //     }

      // }
      // if (!isGoing){
      //   //rsvp
      //   console.log("rsvp")
      //   this.props.rsvpEvent(this.props.user.userInfo.userId,eventID);
      // }
      // else{
      //   //cancel
      //   console.log("cancel")
      //   this.props.cancelRsvp(this.props.user.userInfo.userId,eventID);

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
        <h5>Events</h5>
        <ul className="EventList">
          {(()=>{
            console.log(this.props.events, "props.events")
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
                  <li className="EventItem " key={id}>
                    <div className="card">
                      <p className="card-header">{name}</p>
                      <div className="card-block">
                        <p className="card-title">{description}</p>
                      </div>
                      <div className="card-block">
                        <p className="card-title"><span className="detail">Where:</span>{" "+address+" "}{city+" "}{state+", "}{zipcode}</p>
                      </div>
                      <div className="card-block">
                        <p className="card-title"><span className="detail">When: </span>{" "+weekday+", "}{month+" "} {day+", "} {year} {" at "+time} </p>
                      </div>
                      <div className="card-block">
                        <p className="card-title"><span className="detail">Ticket Cost: </span> { (cost!="FREE") ? "$"+cost : cost } (Limit one per person) </p>
                      </div>
                        {(()=>{
                        let whosGoing = [];
                        if (this.props.user.whosGoing != undefined){
                          this.props.user.whosGoing.map(item=> {
                            if (item.eventid == id)
                             whosGoing.push(item);
                          })

                          return (
                            <div>
                                  {whosGoing.map((item=> {return ( <div >{`${item.firstname} ${item.lastname}`}</div>)}))}
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
                        const submitText = ((isGoing) ? "RSVP'D" : "BUY TICKET & RSVP")
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
                                onClick={()=>this.cancelClick(id)}
                              > 
                              CANCEL RESERVATION 
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
                              Don't miss out, buy your ticket today! 
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
            "Buy Ticket": "RSVP"
            }
            content = {this.cost != "FREE" ? 
            "Enter Credit Card number and click Buy Now to purchase ticket" : "Click RSVP to confirm your ticket."
            }
            submit = {this.cost != "FREE" ? 
            "Buy Now" : "RSVP"
            }
            cancel = "Cancel"
            onCancel = {(e)=>{this.setState({buyModal:false})}}
            onSubmit = {(e)=>{
                this.setState({
                  buyModal:false,
                  confirmBuyModal: true
                })
                this.props.rsvpEvent(this.props.user.userInfo.userId,this.eventID);
                this.props.whosGoing();
              }
            }
          >
            {this.cost != "FREE" ? 
            <div>
              <div><label>Credit Card Number:</label></div>
              <div><input type="text" required/></div>
            </div> : ""
            }

            <div>
              <div>{`Total: ${this.cost}`} </div>
            </div>

          </ModalWindow>

           <ModalWindow 
            animation= {true}
            showModal= {this.state.cancelModal} 
            title = "Cancel Reservation"
            content = {(this.cost != "FREE") ?  "Click 'Get Refund' to complete your refund and cancel your reservation." : 
                    "Click Cancel to cancel your reservation"}
            submit = {(this.cost == "FREE") ? "Cancel" : "Get Refund"}
            cancel = "Exit"
            onCancel = {(e)=>{this.setState({cancelModal:false})}}
            onSubmit = {(e)=>{
                this.setState({
                  cancelModal:false,
                  confirmCancelModal: true
                })
                this.props.cancelRsvp(this.props.user.userInfo.userId,this.eventID);
                this.props.whosGoing();
              }
            }
          />

          <ModalWindow 
            animation= {true}
            showModal= {this.state.confirmBuyModal} 
            title = "Ticket confirmed"
            content = "Your ticket has been confirmed. We look forward to seeing you."
            cancel = "Close"
            onCancel = {(e)=>{this.setState({confirmBuyModal:false})}}
          />

           <ModalWindow 
            animation= {true}
            showModal= {this.state.confirmCancelModal} 
            title = "Cancelled"
            content = {`Your reservation has been cancelled${(this.cost != "FREE") ? " and refunded" : ""} .`}
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
  console.log(state,"state");
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
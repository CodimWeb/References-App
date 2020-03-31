import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { closeProfile, showActiveSlide } from '../../redux/actions/actions';
// import { IS_ACTIVE_SLIDE_FAQ } from '../../redux/actions/actionTypes';
import Slider from "react-slick";
import getCookie from '../../config/getCookie.js'
import axios from 'axios';

class Profile extends Component {
    constructor(props){
        super(props)

        this.state = {
            mobileSlided: false,
            id: null,
            firstName: null,
            lastName: null,
            picture: null,
            email: '',
            linkedin: '',
            facebook: '',
            instagram: '',
            isEditEmail: false,
            isEditLinkedin: false,
            isEditFacebook: false,
            isEditInstagram: false
            
        }
    }

    componentDidMount() {
        //get faq
        axios.get('/faq/')
        .then((response) => {
            let faq = response.data;
            var faqStr = '';
            faq.map((item)=>{
                faqStr = faqStr +'<div class="profile__faq__item">'+
                                    '<h4 class="h4 profile__faq__item__title">'+
                                        item.title +
                                    '</h4>'+
                                    item.text +
                                '</div>'
            })
            document.querySelector('.profile__faq').innerHTML = faqStr;
        })

        // get profile
        axios.get('/profile/')
        .then((response) => {
           let data = response.data;
           this.setState({
                firstName: data.first_name,
                lastName: data.last_name,
                picture: data.picture,
                email: data.email ? data.email: '',
                linkedin: data.linkedin ? data.linkedin : '',
                facebook: data.facebook ? data.facebook : '',
                instagram: data.instagram ? data.instagram : ''
           })
        })
    }

    mobileSlided = () => {
        this.setState({mobileSlided: true})
    }

    mobileSlidedBack = () => {
        this.setState({mobileSlided: false})
    }

    handleEdit = (type) => {
        if( type == 'email') {
            this.setState({ isEditEmail: true });
        } 
        else if( type == 'linkedin') {
            this.setState({ isEditLinkedin: true });
        }
        else if( type == 'facebook') {
            this.setState({ isEditFacebook: true });
        }
        else if( type == 'instagram') {
            this.setState({ isEditInstagram: true });
        }   
    }

    handleSave = (e, type) => {
        e.preventDefault();
        let emailValue = document.getElementById('profile-email').value;
        let linkedinValue = document.getElementById('profile-linkedin').value;
        let facebookValue = document.getElementById('profile-facebook').value;
        let instagramValue = document.getElementById('profile-instagram').value;
        if( type == 'email') {
            if(emailValue) {
                this.setState({ 
                    isEditEmail: false,
                    email: emailValue
                });
            }
        } 
        else if( type == 'linkedin') {
            if(linkedinValue) {
                this.setState({ 
                    isEditLinkedin: false,
                    linkedin: linkedinValue
                });
            }
        }
        else if( type == 'facebook') {
            if(facebookValue) {
                this.setState({ 
                    isEditFacebook: false,
                    facebook: facebookValue
                });
            }
        }
        else if( type == 'instagram') {
            let value = document.getElementById('profile-instagram').value;
            if(instagramValue) {
                this.setState({ 
                    isEditInstagram: false,
                    instagram: instagramValue
                });
            }
        } 

        let csrftoken = getCookie('csrftoken');
        axios.defaults.headers.post['X-CSRFToken'] = csrftoken;
        let data = new FormData();
        data.append('email', emailValue);
        data.append('linkedin', linkedinValue);
        data.append('facebook', facebookValue);
        data.append('instagram', instagramValue);
        axios.post('/profile/', data).then((response) => {
            
        });
    }
        

    render(){
        let { isOpenProfile, showActiveSlide } = this.props;
        // let { mobileSlided } = this.state;
        const { mobileSlided, 
                firstName, 
                lastName, 
                picture, 
                email, 
                linkedin, 
                facebook, 
                instagram,
                isEditEmail,
                isEditLinkedin, 
                isEditFacebook, 
                isEditInstagram
            } = this.state;
        
        if(isOpenProfile) {
            document.querySelector('body').classList.add('modal-open')
        } else {
            document.querySelector('body').classList.remove('modal-open')
        }

        const settings = {
            autoplay: false,
            dots: false,
            infinite: false,
            speed: 500,
            centerMode: true,
            centerPadding: "105px",
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            draggable: false,
            className: 'profile__slider',
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        centerMode: true,
                        centerPadding: "0",
                        speed: 50,
                    }
                }
            ]
        };

        return (
            <div id="profile" className={`profile ${ isOpenProfile ? 'open' : ''} ${mobileSlided ? 'slided' : ''}`}>
                <div className="header profile__header">
                    <div className="container">
                        <div className="row header__row">
                            <div className="col-4 col-md-3 header__logo__container">
                                <Link to="/references" className="header__logo">
                                    <img src="/app/img/logo.svg" alt="" className="header__logo__img"/>
                                </Link>
                                <a href="#" className="go-back" onClick={(e) => {e.preventDefault(); this.mobileSlidedBack()}}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 12H3" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M7 16L3 12L7 8" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>back</span>
                                </a>
                            </div>
                            <div className="col-2 col-md-5 col-lg-6 col-xl-5">

                            </div>
                            <div className="col-4 col-md-3 col-lg-2 col-xl-3">
                                <div className="profile__logout-container">
                                    <a href="/accounts/logout/" className="profile__logout">
                                        Logout
                                        <svg className="icon-log-out" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke="" d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M16 17L21 12L16 7" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M21 12H9" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </a>
                                </div>    
                            </div>
                            <div className="col-2 col-md-1">
                                <button className="btn profile__btn-close" onClick={this.props.onCloseProfile}>
                                    <i className="icon icon-close"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`profile__content ${mobileSlided ? 'active' : ''}`}>
                    <p className="profile__nav__slide__title">
                        {showActiveSlide.title}
                    </p>
                    { showActiveSlide.position && this.slider ? this.slider.slickGoTo(showActiveSlide.position -1) : null }
                    <Slider ref={slider => (this.slider = slider)} {...settings}>
                        <div className="profile__item profile__user__slide" data-item="profile">
                            <div className="profile__item__panel">
                                <div className="profile__item__option">
                                    <div className="profile__item__header">
                                        <p className="title">profile</p>
                                        <a href="#" className="go-back" onClick={(e) => {e.preventDefault(); this.mobileSlidedBack()}}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 12H3" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M7 16L3 12L7 8" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span>back</span>
                                        </a>
                                    </div>
                                    <div className="profile__item__content reset-overflow">
                                        <div className="profile__user">
                                            <div className="profile__user__ava">
                                                {/* default image */}
                                                {/* <div htmlFor="profile-ava" className="profile__user__default__ava">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M19 7H16V5.5C16 4.83696 15.7366 4.20107 15.2678 3.73223C14.7989 3.26339 14.163 3 13.5 3H10.5C9.83696 3 9.20108 3.26339 8.73223 3.73223C8.26339 4.20107 8 4.83696 8 5.5V7H5C4.20435 7 3.44129 7.31607 2.87868 7.87868C2.31607 8.44129 2 9.20435 2 10V18C2 18.7956 2.31607 19.5587 2.87868 20.1213C3.44129 20.6839 4.20435 21 5 21H19C19.7957 21 20.5587 20.6839 21.1213 20.1213C21.6839 19.5587 22 18.7956 22 18V10C22 9.20435 21.6839 8.44129 21.1213 7.87868C20.5587 7.31607 19.7957 7 19 7ZM10 5.5C10 5.36739 10.0527 5.24021 10.1464 5.14645C10.2402 5.05268 10.3674 5 10.5 5H13.5C13.6326 5 13.7598 5.05268 13.8536 5.14645C13.9473 5.24021 14 5.36739 14 5.5V7H10V5.5ZM20 18C20 18.2652 19.8946 18.5196 19.7071 18.7071C19.5196 18.8946 19.2652 19 19 19H5C4.73478 19 4.48043 18.8946 4.29289 18.7071C4.10536 18.5196 4 18.2652 4 18V10C4 9.73478 4.10536 9.48043 4.29289 9.29289C4.48043 9.10536 4.73478 9 5 9H19C19.2652 9 19.5196 9.10536 19.7071 9.29289C19.8946 9.48043 20 9.73478 20 10V18Z" fill="#5568FE"/>
                                                        <path d="M12 10.5C11.3078 10.5 10.6311 10.7053 10.0555 11.0899C9.47993 11.4744 9.03133 12.0211 8.76642 12.6606C8.50152 13.3002 8.4322 14.0039 8.56725 14.6828C8.7023 15.3618 9.03564 15.9854 9.52513 16.4749C10.0146 16.9644 10.6383 17.2977 11.3172 17.4328C11.9961 17.5678 12.6999 17.4985 13.3394 17.2336C13.9789 16.9687 14.5256 16.5201 14.9101 15.9445C15.2947 15.3689 15.5 14.6922 15.5 14C15.5 13.0717 15.1313 12.1815 14.4749 11.5251C13.8185 10.8687 12.9283 10.5 12 10.5ZM12 15.5C11.7033 15.5 11.4133 15.412 11.1666 15.2472C10.92 15.0824 10.7277 14.8481 10.6142 14.574C10.5007 14.2999 10.4709 13.9983 10.5288 13.7074C10.5867 13.4164 10.7296 13.1491 10.9393 12.9393C11.1491 12.7296 11.4164 12.5867 11.7074 12.5288C11.9983 12.4709 12.2999 12.5006 12.574 12.6142C12.8481 12.7277 13.0824 12.92 13.2472 13.1666C13.412 13.4133 13.5 13.7033 13.5 14C13.5 14.3978 13.342 14.7794 13.0607 15.0607C12.7794 15.342 12.3978 15.5 12 15.5Z" fill="#5568FE"/>
                                                    </svg>
                                                </div> */}
                                                {/* or user image */}
                                                <img src={picture} alt="user photo"/>
                                            </div>
                                            <div className="profile__user__data">
                                                <div className="h3 profile__user__name">{firstName} <span>{lastName}</span></div>
                                                {/* <input type="file" id="profile-ava" className="hidden" /> */}
                                                
                                                {/* load */}

                                                {/* <label htmlFor="profile-ava" className="btn profile__load__photo">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M19 7H16V5.5C16 4.83696 15.7366 4.20107 15.2678 3.73223C14.7989 3.26339 14.163 3 13.5 3H10.5C9.83696 3 9.20108 3.26339 8.73223 3.73223C8.26339 4.20107 8 4.83696 8 5.5V7H5C4.20435 7 3.44129 7.31607 2.87868 7.87868C2.31607 8.44129 2 9.20435 2 10V18C2 18.7956 2.31607 19.5587 2.87868 20.1213C3.44129 20.6839 4.20435 21 5 21H19C19.7957 21 20.5587 20.6839 21.1213 20.1213C21.6839 19.5587 22 18.7956 22 18V10C22 9.20435 21.6839 8.44129 21.1213 7.87868C20.5587 7.31607 19.7957 7 19 7ZM10 5.5C10 5.36739 10.0527 5.24021 10.1464 5.14645C10.2402 5.05268 10.3674 5 10.5 5H13.5C13.6326 5 13.7598 5.05268 13.8536 5.14645C13.9473 5.24021 14 5.36739 14 5.5V7H10V5.5ZM20 18C20 18.2652 19.8946 18.5196 19.7071 18.7071C19.5196 18.8946 19.2652 19 19 19H5C4.73478 19 4.48043 18.8946 4.29289 18.7071C4.10536 18.5196 4 18.2652 4 18V10C4 9.73478 4.10536 9.48043 4.29289 9.29289C4.48043 9.10536 4.73478 9 5 9H19C19.2652 9 19.5196 9.10536 19.7071 9.29289C19.8946 9.48043 20 9.73478 20 10V18Z"/>
                                                        <path d="M12 10.5C11.3078 10.5 10.6311 10.7053 10.0555 11.0899C9.47993 11.4744 9.03133 12.0211 8.76642 12.6606C8.50152 13.3002 8.4322 14.0039 8.56725 14.6828C8.7023 15.3618 9.03564 15.9854 9.52513 16.4749C10.0146 16.9644 10.6383 17.2977 11.3172 17.4328C11.9961 17.5678 12.6999 17.4985 13.3394 17.2336C13.9789 16.9687 14.5256 16.5201 14.9101 15.9445C15.2947 15.3689 15.5 14.6922 15.5 14C15.5 13.0717 15.1313 12.1815 14.4749 11.5251C13.8185 10.8687 12.9283 10.5 12 10.5ZM12 15.5C11.7033 15.5 11.4133 15.412 11.1666 15.2472C10.92 15.0824 10.7277 14.8481 10.6142 14.574C10.5007 14.2999 10.4709 13.9983 10.5288 13.7074C10.5867 13.4164 10.7296 13.1491 10.9393 12.9393C11.1491 12.7296 11.4164 12.5867 11.7074 12.5288C11.9983 12.4709 12.2999 12.5006 12.574 12.6142C12.8481 12.7277 13.0824 12.92 13.2472 13.1666C13.412 13.4133 13.5 13.7033 13.5 14C13.5 14.3978 13.342 14.7794 13.0607 15.0607C12.7794 15.342 12.3978 15.5 12 15.5Z" />
                                                    </svg>
                                                </label> */}

                                                {/* or update */}

                                                {/* <div class="profile__edit__photo">
                                                    <button class="btn profile__delete__photo">
                                                        <i class="icon icon-trash"></i>
                                                        <span>delete</span>  
                                                    </button>
                                                    <label htmlFor="profile-ava" class="btn">
                                                        <i class="icon icon-download"></i>
                                                        <span>upload new photo</span>  
                                                    </label>
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className="profile__user__list__wrap">
                                            <div className="profile__user__list">
                                                <form action="">
                                                    <div className={`profile__user__item ${isEditEmail ? 'is-edit' : ''}`}>
                                                        <div className="profile__user__item__data">
                                                            <div className="profile__user__item__content">
                                                                <p className="profile__user__item__label">email</p>
                                                                {email ?
                                                                 (<p className="profile__user__item__link">{email}</p>)
                                                                 :
                                                                 (<p className="profile__user__item__link">{'Add your Email link'}</p>)
                                                                }
                                                            </div>
                                                            <button type="button" className="btn profile__user__edit" onClick={() => {this.handleEdit('email')}}>
                                                                <i className="icon icon-edit"></i>
                                                            </button>
                                                        </div>
                                                        <div className="profile__user__item__edit">
                                                            {/* <i class="icon icon-fb"></i> */}
                                                            <input type="text" className="form-control profile__user__item__field" id="profile-email" defaultValue={email}/>
                                                            <button className="btn profile__user__item__save" onClick={(e) => {this.handleSave(e,'email')}}>
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M20.12 8.71L15.29 3.88C14.7279 3.31723 13.9654 3.0007 13.17 3H6C5.20435 3 4.44129 3.31607 3.87868 3.87868C3.31607 4.44129 3 5.20435 3 6V18C3 18.7956 3.31607 19.5587 3.87868 20.1213C4.44129 20.6839 5.20435 21 6 21H18C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18V10.83C20.9993 10.0346 20.6828 9.27207 20.12 8.71ZM10 19V17H14V19H10ZM19 18C19 18.2652 18.8946 18.5196 18.7071 18.7071C18.5196 18.8946 18.2652 19 18 19H16V16C16 15.7348 15.8946 15.4804 15.7071 15.2929C15.5196 15.1054 15.2652 15 15 15H9C8.73478 15 8.48043 15.1054 8.29289 15.2929C8.10536 15.4804 8 15.7348 8 16V19H6C5.73478 19 5.48043 18.8946 5.29289 18.7071C5.10536 18.5196 5 18.2652 5 18V6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5H8V10C8 10.2652 8.10536 10.5196 8.29289 10.7071C8.48043 10.8946 8.73478 11 9 11H13C13.2652 11 13.5196 10.8946 13.7071 10.7071C13.8946 10.5196 14 10.2652 14 10C14 9.73478 13.8946 9.48043 13.7071 9.29289C13.5196 9.10536 13.2652 9 13 9H10V5H13.17C13.4348 5.00368 13.6884 5.10727 13.88 5.29L18.71 10.12C18.8027 10.2134 18.876 10.3243 18.9258 10.4461C18.9755 10.5679 19.0008 10.6984 19 10.83V18Z" fill="#5568FE"></path>
                                                                </svg>
                                                            </button>
                                                        </div>  
                                                    </div>
                                                    <div className={`profile__user__item ${isEditLinkedin ? 'is-edit' : ''}`}>
                                                        <div className="profile__user__item__data">
                                                            <div className="profile__user__item__content">
                                                                <p className="profile__user__item__label">linkedin</p>
                                                                {linkedin ?
                                                                 (<a href={linkedin} target="blank" className="profile__user__item__link">{linkedin}</a>)
                                                                 :
                                                                 (<p className="profile__user__item__link">{'Add your Linkedin link'}</p>)
                                                                }
                                                            </div>
                                                            <button type="button" className="btn profile__user__edit" onClick={() => {this.handleEdit('linkedin')}}>
                                                                <i className="icon icon-edit"></i>
                                                            </button>
                                                        </div>
                                                        <div className="profile__user__item__edit">
                                                            {/* <i class="icon icon-fb"></i> */}
                                                            <input type="text" className="form-control profile__user__item__field" id="profile-linkedin" defaultValue={linkedin}/>
                                                            <button className="btn profile__user__item__save" onClick={(e) => {this.handleSave(e,'linkedin')}}>
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M20.12 8.71L15.29 3.88C14.7279 3.31723 13.9654 3.0007 13.17 3H6C5.20435 3 4.44129 3.31607 3.87868 3.87868C3.31607 4.44129 3 5.20435 3 6V18C3 18.7956 3.31607 19.5587 3.87868 20.1213C4.44129 20.6839 5.20435 21 6 21H18C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18V10.83C20.9993 10.0346 20.6828 9.27207 20.12 8.71ZM10 19V17H14V19H10ZM19 18C19 18.2652 18.8946 18.5196 18.7071 18.7071C18.5196 18.8946 18.2652 19 18 19H16V16C16 15.7348 15.8946 15.4804 15.7071 15.2929C15.5196 15.1054 15.2652 15 15 15H9C8.73478 15 8.48043 15.1054 8.29289 15.2929C8.10536 15.4804 8 15.7348 8 16V19H6C5.73478 19 5.48043 18.8946 5.29289 18.7071C5.10536 18.5196 5 18.2652 5 18V6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5H8V10C8 10.2652 8.10536 10.5196 8.29289 10.7071C8.48043 10.8946 8.73478 11 9 11H13C13.2652 11 13.5196 10.8946 13.7071 10.7071C13.8946 10.5196 14 10.2652 14 10C14 9.73478 13.8946 9.48043 13.7071 9.29289C13.5196 9.10536 13.2652 9 13 9H10V5H13.17C13.4348 5.00368 13.6884 5.10727 13.88 5.29L18.71 10.12C18.8027 10.2134 18.876 10.3243 18.9258 10.4461C18.9755 10.5679 19.0008 10.6984 19 10.83V18Z" fill="#5568FE"></path>
                                                                </svg>
                                                            </button>
                                                        </div>  
                                                    </div>
                                                    <div className={`profile__user__item ${isEditFacebook ? 'is-edit' : ''}`}>
                                                        <div className="profile__user__item__data">
                                                            <div className="profile__user__item__content">
                                                                <p className="profile__user__item__label">facebook</p>
                                                                {facebook ?
                                                                 (<a href={facebook} target="blank" className="profile__user__item__link">{facebook}</a>)
                                                                 :
                                                                 (<p className="profile__user__item__link">{'Add your Facebook link'}</p>)
                                                                }
                                                            </div>
                                                            <button type="button" className="btn profile__user__edit" onClick={() => {this.handleEdit('facebook')}}>
                                                                <i className="icon icon-edit"></i>
                                                            </button>
                                                        </div>
                                                        <div className="profile__user__item__edit">
                                                            {/* <i class="icon icon-fb"></i> */}
                                                            <input type="text" className="form-control profile__user__item__field" id="profile-facebook" defaultValue={facebook}/>
                                                            <button className="btn profile__user__item__save" onClick={(e) => {this.handleSave(e,'facebook')}}>
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M20.12 8.71L15.29 3.88C14.7279 3.31723 13.9654 3.0007 13.17 3H6C5.20435 3 4.44129 3.31607 3.87868 3.87868C3.31607 4.44129 3 5.20435 3 6V18C3 18.7956 3.31607 19.5587 3.87868 20.1213C4.44129 20.6839 5.20435 21 6 21H18C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18V10.83C20.9993 10.0346 20.6828 9.27207 20.12 8.71ZM10 19V17H14V19H10ZM19 18C19 18.2652 18.8946 18.5196 18.7071 18.7071C18.5196 18.8946 18.2652 19 18 19H16V16C16 15.7348 15.8946 15.4804 15.7071 15.2929C15.5196 15.1054 15.2652 15 15 15H9C8.73478 15 8.48043 15.1054 8.29289 15.2929C8.10536 15.4804 8 15.7348 8 16V19H6C5.73478 19 5.48043 18.8946 5.29289 18.7071C5.10536 18.5196 5 18.2652 5 18V6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5H8V10C8 10.2652 8.10536 10.5196 8.29289 10.7071C8.48043 10.8946 8.73478 11 9 11H13C13.2652 11 13.5196 10.8946 13.7071 10.7071C13.8946 10.5196 14 10.2652 14 10C14 9.73478 13.8946 9.48043 13.7071 9.29289C13.5196 9.10536 13.2652 9 13 9H10V5H13.17C13.4348 5.00368 13.6884 5.10727 13.88 5.29L18.71 10.12C18.8027 10.2134 18.876 10.3243 18.9258 10.4461C18.9755 10.5679 19.0008 10.6984 19 10.83V18Z" fill="#5568FE"></path>
                                                                </svg>
                                                            </button>
                                                        </div>      
                                                    </div>
                                                    <div className={`profile__user__item ${isEditInstagram ? 'is-edit' : ''}`}>
                                                        <div className="profile__user__item__data">
                                                            <div className="profile__user__item__content">
                                                                <p className="profile__user__item__label">instagram</p>
                                                                {instagram ?
                                                                 (<a href={instagram} target="blank" className="profile__user__item__link">{instagram}</a>)
                                                                 :
                                                                 (<p className="profile__user__item__link">{'Add your Instagram link'}</p>)
                                                                }
                                                            </div>
                                                            <button type="button" className="btn profile__user__edit" onClick={() => {this.handleEdit('instagram')}}>
                                                                <i className="icon icon-edit"></i>
                                                            </button>
                                                        </div>
                                                        <div className="profile__user__item__edit">
                                                            {/* <i class="icon icon-fb"></i> */}
                                                            <input type="text" className="form-control profile__user__item__field" id="profile-instagram" defaultValue={instagram}/>
                                                            <button className="btn profile__user__item__save" onClick={(e) => {this.handleSave(e,'instagram')}}>
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M20.12 8.71L15.29 3.88C14.7279 3.31723 13.9654 3.0007 13.17 3H6C5.20435 3 4.44129 3.31607 3.87868 3.87868C3.31607 4.44129 3 5.20435 3 6V18C3 18.7956 3.31607 19.5587 3.87868 20.1213C4.44129 20.6839 5.20435 21 6 21H18C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18V10.83C20.9993 10.0346 20.6828 9.27207 20.12 8.71ZM10 19V17H14V19H10ZM19 18C19 18.2652 18.8946 18.5196 18.7071 18.7071C18.5196 18.8946 18.2652 19 18 19H16V16C16 15.7348 15.8946 15.4804 15.7071 15.2929C15.5196 15.1054 15.2652 15 15 15H9C8.73478 15 8.48043 15.1054 8.29289 15.2929C8.10536 15.4804 8 15.7348 8 16V19H6C5.73478 19 5.48043 18.8946 5.29289 18.7071C5.10536 18.5196 5 18.2652 5 18V6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5H8V10C8 10.2652 8.10536 10.5196 8.29289 10.7071C8.48043 10.8946 8.73478 11 9 11H13C13.2652 11 13.5196 10.8946 13.7071 10.7071C13.8946 10.5196 14 10.2652 14 10C14 9.73478 13.8946 9.48043 13.7071 9.29289C13.5196 9.10536 13.2652 9 13 9H10V5H13.17C13.4348 5.00368 13.6884 5.10727 13.88 5.29L18.71 10.12C18.8027 10.2134 18.876 10.3243 18.9258 10.4461C18.9755 10.5679 19.0008 10.6984 19 10.83V18Z" fill="#5568FE"></path>
                                                                </svg>
                                                            </button>
                                                        </div>      
                                                    </div>
                                                </form>    
                                            </div>
                                        </div>    
                                    </div>    
                                </div>    
                            </div>
                        </div>
                        <div className="profile__item" data-item="membership">
                            <div className="profile__item__panel">
                                <div className="profile__item__option">
                                    <div className="profile__item__header">
                                        <p className="title">membership</p>
                                        <a href="#" className="go-back" onClick={(e) => {e.preventDefault(); this.mobileSlidedBack()}}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 12H3" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M7 16L3 12L7 8" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span>back</span>
                                        </a>
                                    </div>
                                    <div className="profile__item__content">
                                        <div className="profile__membership">
                                            <label className="profile__membership__item">
                                                <input type="radio" name="membership" className="hidden" />
                                                <div className="profile__membership__info">
                                                    <h4 className="h4 profile__membership__title">Free Demo Version</h4>
                                                    <p className="profile__membership__subtitle">Here is a brief information about the tariff, conditions and so on that would be immediately clear</p>
                                                </div>
                                            </label>
                                            <label className="profile__membership__item">
                                                <input type="radio" name="membership" className="hidden" />
                                                <div className="profile__membership__info">
                                                    <h4 className="h4 profile__membership__title">Annual Premium Access</h4>
                                                    <p className="profile__membership__subtitle">Here is a brief information about the tariff, conditions and so on that would be immediately clear</p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>    
                                </div>
                            </div>
                        </div>
                        <div className="profile__item " data-item="faq">
                            <div className="profile__item__panel">
                                <div className="profile__item__option">
                                    <div className="profile__item__header">
                                        <p className="title">faq</p>
                                        <a href="#" className="go-back" onClick={(e) => {e.preventDefault(); this.mobileSlidedBack()}}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 12H3" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M7 16L3 12L7 8" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span>back</span>
                                        </a>
                                    </div>
                                    <div className="profile__item__content">
                                        <div className="profile__faq">
                                           
                                            {/* <div className="profile__faq__item">
                                                <h4 className="h4 profile__faq__item__title">1. My order & ordering</h4>
                                                <p className="profile__faq__item__text">FAQ pages often expand into content aggregator destinations within websites; bringing in new users and driving them onto related pages – most typically deeper blog pages and service pages closely related to the questions being resolved.</p>
                                            </div> */}
                                            {/* <div className="profile__faq__item">
                                                <h4 className="h4 profile__faq__item__title">2. Delivery & Returns</h4>
                                                <p className="profile__faq__item__text">The FAQ page is the primary way to help people visiting your site to get their intended destination faster by removing knowledge (informational and often trust) barriers that are in place.
                                                <br/>    
                                                <br/>    
                                                An effective FAQ resource can educate, inform and guide the user in a natural way through your website’s content and toward the goals and end results you have set.</p>
                                            </div>
                                            <div className="profile__faq__item">
                                                <h4 className="h4 profile__faq__item__title">3. To Live a Meaningful Life, Remember This One Thing</h4>
                                                <p className="profile__faq__item__text">FAQ pages have begun to reappear into the priority website checks and improvement areas for SEO experts and marketing professionals alike. In no small part, this has been driven by the growth in voice search, mobile search, and personal/home assistants. These predominantly rely on the pre-results (Google Answers and Featured Snippets) and can be targeted specifically with FAQ pages.</p>
                                            </div> */}
                                        </div>    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile__item" data-item="about-us">
                            <div className="profile__item__panel">
                                <div className="profile__item__option">
                                    <div className="profile__item__header">
                                        <p className="title">about us</p>
                                        <a href="#" className="go-back" onClick={(e) => {e.preventDefault(); this.mobileSlidedBack()}}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 12H3" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M7 16L3 12L7 8" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span>back</span>
                                        </a>
                                    </div>
                                    <div className="profile__item__content">
                                        <div className="profile__about-us">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        </div>
                                    </div>    
                                </div>
                            </div>
                        </div>
                        <div className="profile__item" data-item="terms">
                            <div className="profile__item__panel">
                                <div className="profile__item__option">
                                    <div className="profile__item__header">
                                        <p className="title">terms</p>
                                        <a href="#" className="go-back" onClick={(e) => {e.preventDefault(); this.mobileSlidedBack()}}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 12H3" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M7 16L3 12L7 8" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span>back</span>
                                        </a>
                                    </div>
                                    <div className="profile__item__content">
                                        <div className="profile__terms">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        </div>
                                    </div>    
                                </div>
                            </div>
                        </div>
                        <div className="profile__item" data-item="privacy">
                            <div className="profile__item__panel">
                                <div className="profile__item__option">
                                    <div className="profile__item__header">
                                        <p className="title">privacy</p>
                                        <a href="#" className="go-back" onClick={(e) => {e.preventDefault(); this.mobileSlidedBack()}}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 12H3" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M7 16L3 12L7 8" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span>back</span>
                                        </a>
                                    </div>
                                    <div className="profile__item__content">
                                        <div className="profile__privacy">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        </div>
                                    </div>    
                                </div>
                            </div>
                        </div>
                        <div className="profile__item" data-item="contact-us">
                            <div className="profile__item__panel">
                                <div className="profile__item__option">
                                    <div className="profile__item__header">
                                        <p className="title">contact us</p>
                                        <a href="#" className="go-back" onClick={(e) => {e.preventDefault(); this.mobileSlidedBack()}}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 12H3" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M7 16L3 12L7 8" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span>back</span>
                                        </a>
                                    </div>
                                    <div className="profile__item__content">
                                        <div className="profile__contact-us">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        </div>
                                    </div>    
                                </div>
                            </div>
                        </div>
                    </Slider>
                    <div className="profile__mibile__nav">
                        <nav className="header__navbar">
                            <ul className="header__nav">
                                <li className="header__nav__item">
                                    <a href="#" className="header__nav__link profile__nav__link active" data-target="1"
                                        onClick={(e)=>{
                                            e.preventDefault();
                                            this.props.onShowActiveSlide({
                                                title: e.target.textContent,
                                                position: parseInt(e.target.getAttribute('data-target'))
                                            })
                                            this.mobileSlided()}}>Profile</a>
                                </li>
                                <li className="header__nav__item">
                                    <a href="#" className="header__nav__link profile__nav__link" data-target="2" 
                                        onClick={(e)=>{
                                            e.preventDefault(); 
                                            this.props.onShowActiveSlide({
                                                title: e.target.textContent,
                                                position: parseInt(e.target.getAttribute('data-target'))
                                            })
                                            this.mobileSlided()}}>Membership</a>
                                </li>
                            </ul>
                        </nav>
                        <div className="profile__helpers">
                            <ul className="profile__helpers__list">
                                <li className="profile__helpers__item">
                                    <a href="#" className="profile__helpers__link profile__nav__link" data-target="3" 
                                        onClick={(e)=>{
                                            e.preventDefault(); 
                                            this.props.onShowActiveSlide({
                                                title: e.target.textContent,
                                                position: parseInt(e.target.getAttribute('data-target'))
                                            })
                                            this.mobileSlided()}}>FAQ</a>
                                </li>
                                <li className="profile__helpers__item">
                                    <a href="#" className="profile__helpers__link profile__nav__link" data-target="4" 
                                        onClick={(e)=>{
                                            e.preventDefault(); 
                                            this.props.onShowActiveSlide({
                                                title: e.target.textContent,
                                                position: parseInt(e.target.getAttribute('data-target'))
                                            })
                                            this.mobileSlided()}}>About Us</a>
                                </li>
                                <li className="profile__helpers__item">
                                    <a href="#" className="profile__helpers__link profile__nav__link" data-target="5" 
                                        onClick={(e)=>{
                                            e.preventDefault(); 
                                            this.props.onShowActiveSlide({
                                                title: e.target.textContent,
                                                position: parseInt(e.target.getAttribute('data-target'))
                                            }) 
                                            this.mobileSlided()}}>Terms</a>
                                </li>
                                <li className="profile__helpers__item">
                                    <a href="#" className="profile__helpers__link profile__nav__link" data-target="6" 
                                        onClick={(e)=>{
                                            e.preventDefault(); 
                                            this.props.onShowActiveSlide({
                                                title: e.target.textContent,
                                                position: parseInt(e.target.getAttribute('data-target'))
                                            })
                                            this.mobileSlided()}}>Privacy</a>
                                </li>
                                <li className="profile__helpers__item">
                                    <a href="#" className="profile__helpers__link profile__nav__link" data-target="7" 
                                        onClick={(e)=>{
                                            e.preventDefault(); 
                                            this.props.onShowActiveSlide({
                                                title: e.target.textContent,
                                                position: parseInt(e.target.getAttribute('data-target'))
                                            })
                                            this.mobileSlided()}}>Contact Us</a>
                                </li>
                            </ul>
                        </div>
                        <ul className="profile__social">
                            <li><a href="#"><i className="icon icon-fb"></i></a></li>
                            <li><a href="#"><i className="icon icon-twitter"></i></a></li>
                            <li><a href="#"><i className="icon icon-linkedin"></i></a></li>
                        </ul>
                    </div> 
                </div>
                <div className="footer">
                    <div className="container">
                        <div className="row footer__row">
                            <div className="col-9 col-md-9 col-lg-9 col-xlg-9">
                                <ul className="footer-list">
                                    <li className="footer-list__item">
                                        <a href="#" className={`footer-list__link ${showActiveSlide.position == 1 || showActiveSlide.position ==  0 ? 'active': ''} `} data-target="1" 
                                            onClick={(e)=>{e.preventDefault();
                                                this.props.onShowActiveSlide({
                                                    title: e.target.textContent,
                                                    position: parseInt(e.target.getAttribute('data-target'))
                                                })
                                            }}>Profile</a>
                                    </li>
                                    <li className="footer-list__item">
                                        <a href="#" className={`footer-list__link ${showActiveSlide.position == 2 ? 'active': ''} `} data-target="2"
                                            onClick={(e)=>{e.preventDefault();
                                                this.props.onShowActiveSlide({
                                                    title: e.target.textContent,
                                                    position: parseInt(e.target.getAttribute('data-target'))
                                                })
                                            }}>Membership</a>
                                    </li>
                                    <li className="footer-list__item">
                                        <a href="#" className={`footer-list__link ${showActiveSlide.position == 3 ? 'active': ''} `} data-target="3" 
                                            onClick={(e)=>{e.preventDefault();
                                                this.props.onShowActiveSlide({
                                                    title: e.target.textContent,
                                                    position: parseInt(e.target.getAttribute('data-target'))
                                                })
                                            /*this.props.onDisActiveSlideFaq();*/}}>FAQ</a>
                                    </li>
                                    <li className="footer-list__item">
                                        <a href="#" className={`footer-list__link ${showActiveSlide.position == 4 ? 'active': ''} `} data-target="4"
                                            onClick={(e)=>{e.preventDefault();
                                                this.props.onShowActiveSlide({
                                                    title: e.target.textContent,
                                                    position: parseInt(e.target.getAttribute('data-target'))
                                                })
                                            }}>About Us</a>
                                    </li>
                                    <li className="footer-list__item">
                                        <a href="#" className={`footer-list__link ${showActiveSlide.position == 5 ? 'active': ''} `} data-target="5"
                                            onClick={(e)=>{e.preventDefault();
                                                this.props.onShowActiveSlide({
                                                    title: e.target.textContent,
                                                    position: parseInt(e.target.getAttribute('data-target'))
                                                })
                                            }}>Terms</a>
                                    </li>
                                    <li className="footer-list__item">
                                        <a href="#" className={`footer-list__link ${showActiveSlide.position == 6 ? 'active': ''} `} data-target="6"
                                            onClick={(e)=>{e.preventDefault();
                                                this.props.onShowActiveSlide({
                                                    title: e.target.textContent,
                                                    position: parseInt(e.target.getAttribute('data-target'))
                                                })
                                            }}>Privacy</a>
                                    </li>
                                    <li className="footer-list__item">
                                        <a href="#" className={`footer-list__link ${showActiveSlide.position == 7 ? 'active': ''} `} data-target="7"
                                            onClick={(e)=>{
                                                e.preventDefault();
                                                this.props.onShowActiveSlide({
                                                    title: e.target.textContent,
                                                    position: parseInt(e.target.getAttribute('data-target'))
                                                })
                                            }}>Contact Us</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-3 col-md-3 col-lg-3 col-xlg-3">
                                <ul className="footer-social">
                                    <li className="footer-social__item">
                                        <a href="#" className="footer-social__link">
                                            <i className="icon icon-fb"></i>
                                        </a>
                                    </li>
                                    <li className="footer-social__item">
                                        <a href="#" className="footer-social__link">
                                            <i className="icon icon-twitter"></i>
                                        </a>
                                    </li>
                                    <li className="footer-social__item">
                                        <a href="#" className="footer-social__link">
                                            <i className="icon icon-linkedin"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isOpenProfile: state.toggleProfile.isOpenProfile,
        showActiveSlide: state.showActiveSlide  
    }
}

const mapDispachToProps = (dispatch) => {
    return {
        onCloseProfile: () => dispatch(closeProfile()),
        onShowActiveSlide: (payload) => dispatch(showActiveSlide(payload))
    }
}

export default connect(mapStateToProps, mapDispachToProps)(Profile);
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { openProfile, showActiveSlide } from '../../redux/actions/actions';
import { ACTIVE_SLIDE } from '../../redux/actions/actionTypes';

const Footer = (props) => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row footer__row">
                    <div className="col-9 col-md-9 col-lg-9 col-xlg-9">
                        <ul className="footer-list">
                            <li className="footer-list__item">
                                <a href="#" className="footer-list__link" data-target="1" onClick={e => 
                                                                                { e.preventDefault();
                                                                                  props.onOpenProfile();
                                                                                  props.onShowActiveSlide({
                                                                                    title: e.target.textContent,
                                                                                    position: parseInt(e.target.getAttribute('data-target'))
                                                                                  })
                                                                                }}>Profile</a>
                            </li>
                            <li className="footer-list__item">
                                <a href="#" className="footer-list__link" data-target="2" onClick={e => 
                                                                                { e.preventDefault();
                                                                                  props.onOpenProfile();
                                                                                  props.onShowActiveSlide({
                                                                                    title: e.target.textContent,
                                                                                    position: parseInt(e.target.getAttribute('data-target'))
                                                                                  })
                                                                                }}>Membership</a>
                            </li>
                            <li className="footer-list__item">
                                <a href="#" className="footer-list__link" data-target="3" onClick={e => 
                                                                                { e.preventDefault();
                                                                                  props.onOpenProfile();
                                                                                  props.onShowActiveSlide({
                                                                                    title: e.target.textContent,
                                                                                    position: parseInt(e.target.getAttribute('data-target'))
                                                                                  })
                                                                                }}>FAQ</a>
                            </li>
                            <li className="footer-list__item">
                                <a href="#" className="footer-list__link" data-target="4" onClick={e => 
                                                                                { e.preventDefault();
                                                                                  props.onOpenProfile();
                                                                                  props.onShowActiveSlide({
                                                                                    title: e.target.textContent,
                                                                                    position: parseInt(e.target.getAttribute('data-target'))
                                                                                  })
                                                                                }}>About Us</a>
                            </li>
                            <li className="footer-list__item">
                                <a href="#" className="footer-list__link" data-target="5" onClick={e => 
                                                                                { e.preventDefault();
                                                                                  props.onOpenProfile();
                                                                                  props.onShowActiveSlide({
                                                                                    title: e.target.textContent,
                                                                                    position: parseInt(e.target.getAttribute('data-target'))
                                                                                  })
                                                                                }}>Terms</a>
                            </li>
                            <li className="footer-list__item">
                                <a href="#" className="footer-list__link" data-target="6" onClick={e => 
                                                                                { e.preventDefault();
                                                                                  props.onOpenProfile();
                                                                                  props.onShowActiveSlide({
                                                                                    title: e.target.textContent,
                                                                                    position: parseInt(e.target.getAttribute('data-target'))
                                                                                  })
                                                                                }}>Privacy</a>
                            </li>
                            <li className="footer-list__item">
                                <a href="#" className="footer-list__link" data-target="7" onClick={e => 
                                                                                { e.preventDefault();
                                                                                  props.onOpenProfile();
                                                                                  props.onShowActiveSlide({
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
    );
}

const mapStateToProps = (state) => {
    return {
        isOpenProfile: state.toggleProfile.isOpenProfile,
        showActiveSlide: state.showActiveSlide.position
    }
}

const mapDispachToProps = (dispatch) => {
    return {
        onOpenProfile: () => dispatch(openProfile()),
        onShowActiveSlide: (payload) => dispatch(showActiveSlide(payload))
    }
}

export default connect(mapStateToProps, mapDispachToProps)(Footer);
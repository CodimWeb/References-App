import React from 'react';
import { Link } from 'react-router-dom';

const ViewItem = (props) => {
    const { data } = props;
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let timestemp = Date.parse(data.date);
    let date = new Date(timestemp);
    let day = date.getDate();
    day < 10 ? day = '0' + day : day = day;
    let month = date.getMonth();
    let monthName = monthNames[month];
    let year = date.getFullYear();
    let fullDate = `${monthName} ${day}, ${year}`;

    return (
        <div className="col-12 col-lg-6 col-xl-4">
            <div className="view-item">
                <div className="view-card">
                    <div className="references-item__user references-item__user--view">
                        <a href={ data.viewed_user_data.linkedin } className="references-item__user-ava references-item__user-ava--view">
                            <img src={data.viewed_user_data.picture} alt="" />
                        </a>
                        <div className="references-item__user-info references-item__user-info--view">
                            <div className="references-item__user-container">
                                {data.is_new ? <div className="references-item__label">new</div> : null}
                                <a href={ data.viewed_user_data.linkedin } className={`h4 references-item__user-name references-item__user-name--view ${ data.isFindByReferenceName ? 'finded' : '' }`}>
                                    <span>{data.viewed_user_data.first_name} {data.viewed_user_data.last_name }</span>
                                </a>
                            </div>
                            <div><span className="references-item__user-position references-item__user-position--view">{data.viewed_user_data.position}</span></div>
                            <div><span className="references-item__user-company references-item__user-company--view">{data.viewed_user_data.company}</span></div>
                        </div>
                    </div>
                    <div className="view-info">
                        <div className="view-info__date">
                            <span className="view-info__date__title">Viewed:</span>
                            <span>{fullDate}</span>
                        </div>
                        <div className="view-info__link-container">
                            <Link to={`/view/${data.playlist}`} className="view-info__link">{data.playlist_data.name}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewItem
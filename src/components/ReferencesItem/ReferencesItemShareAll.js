import React from 'react';

const ReferencesItemShareAll = (props) => {
    const {data, moveToLeft, moveToRight} = props;
    console.log()
    const item = data.references_data[0];
    let position = props.position + 1;
    return (
        <div className="col-12 col-lg-3 grid-item" data-position={position}>
            <div className="references-item references-item--share-all"> 
                <div className="references-item__body">
                    <div className="references-item__image">
                        <img src={item.video_data.pic} alt="" />
                    </div>
                    <div className="references-item__user">
                        <div className="references-item__user-info references-item__user-info--share-all">
                            <div className="share-all-control">
                                <button type="button" className="btn btn-share-prev" onClick={()=>{moveToLeft()}}>
                                    <svg className="icon-share-desctop icon-arrow-left" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.58301 1.5L1.08301 5L4.58301 8.5" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <svg className="icon-share-mobile icon-arrow-up" width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 6L7 1L1 6" stroke="#5568FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                <button type="button" className="btn btn-share-next" onClick={(e)=>{moveToRight()}}>
                                    <svg className="icon-share-desctop icon-arrow-right" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.41699 8.5L4.91699 5L1.41699 1.5" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <svg className="icon-share-mobile icon-arrow-down" width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L7 6L13 1" stroke="#5568FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="references-item__user-container references-item__user-container--share-all">
                                { item.reference_user_data.linkedin ? 
                                    (
                                        <a href={item.reference_user_data.linkedin} className="h4 references-item__user-name references-item__user-name--share-all">
                                            <span>{ item.reference_user_data.first_name} {item.reference_user_data.last_name}</span>
                                        </a>
                                    )
                                    :
                                    (
                                        <span className="h4 references-item__user-name references-item__user-name--share-all">
                                            <span>{ item.reference_user_data.first_name} {item.reference_user_data.last_name}</span>
                                        </span>
                                    )
                                }
                            </div>
                            <div>
                                <span className="references-item__user-position references-item__user-position--share-all">
                                    { item.reference_user_data.position }
                                </span>
                            </div>
                            <div>
                                <span className="references-item__user-company references-item__user-company--share-all">
                                    { item.reference_user_data.company }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReferencesItemShareAll;
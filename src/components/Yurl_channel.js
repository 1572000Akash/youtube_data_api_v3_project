import millify from "millify";
import { MdOutlineWatchLater } from 'react-icons/md'
import { AiOutlineEye } from 'react-icons/ai'
const ytDuration = require('youtube-duration')
function Yurl_channel(props) {
    return (
        <>

            {(props.input_text === "Youtube URL") ?
                (props.videoDatau.length === 0) ? <div></div> :
                    <div className='container-fluid'>
                        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5'>

                            {props.videoDatau.map((val, index) => {
                                return (

                                    <div key={index} className='col' style={{ marginTop: "60px" }}>
                                        <div className="card mx-3" style={{ position: "relative" }}>
                                            <img className="card-img-top" src={props.videoDatau[index][0]?.snippet?.thumbnails?.high.url} alt="Card image cap" />


                                            <div style={{ position: "absolute", top: "-4%", right: "-4%" }}>
                                                <button style={{ width: "38px", height: "40px", borderRadius: "50%" }} className='btn btn-danger' onClick={() => props.handleDelete(index)}><div style={{ border: "1px solid white" }}></div></button>
                                            </div>


                                            <div className="card-body" style={{ height: "100px" }}>

                                                <h5 style={{ margin: "0px" }} className="card-title text-truncate">{props.videoDatau[index][0]?.snippet?.title}</h5>
                                                <div >
                                                    <p>By: {props.videoDatau[index][0]?.snippet?.channelTitle}</p>
                                                </div>
                                                <div style={{ display: "flex", bottom: "5%", marginTop: "-17px" }}>
                                                    <p><MdOutlineWatchLater /> {ytDuration.format(props.videoDatau[index][0]?.contentDetails?.duration)}</p>


                                                    <p className="card-text" style={{ marginLeft: "auto" }}><AiOutlineEye />  {millify(props.videoDatau[index][0]?.statistics?.viewCount)}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                )
                            })}



                        </div>
                    </div>
                :
                (props.videoDatac.length === 0) ? <div></div> :
                    <div className='container-fluid mt-5'>
                        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5'>
                            {props.videoDatac[0].map((val, index) => {
                                
                                return (
                                    <>
                                        <div key={index} className='col'>
                                            <div className="card mt-5 mx-" style={{ position: "relative", }}>
                                                <img className="card-img-top" src={val?.snippet?.thumbnails?.high.url} alt="Card image cap" />
                                                <div style={{ position: "absolute", top: "-5%", right: "-3%" }}>
                                                    {/* <button style={{ width: "35px", height: "35px", borderRadius: "50%" }} className='btn btn-danger' onClick={() => Del(index)}><div style={{ border: '0.5px solid white' }}></div></button> */}
                                                </div>
                                                <div className="card-body" style={{ height: "93px" }}>
                                                    <p className="card-title text-truncate" style={{ fontSize: '11px' }}><b>{val?.snippet?.title}</b></p>
                                                    <p style={{ textAlign: 'left', fontSize: '10px' }} >By{val?.snippet?.channelTitle}</p>
                                                    <div style={{ display: "flex", bottom: "5%" }}>
                                                        <p style={{ fontSize: '10px' }} ></p>
                                                        <p className="card-text" style={{ marginLeft: "auto", fontSize: '10px' }}></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                )
                            })}
                        </div>
                    </div>


            }
        </>
    )
}
export default Yurl_channel
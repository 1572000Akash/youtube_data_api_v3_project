import image7 from '../image 7.svg'
import '../youtube.css'
function Header(props) {
    return (
        <>
            <div className='row text-center'>
                <div className='col-lg-12 col-md-12 col-sm-12 '>
                    <img src={image7} />
                    <h3 className='mt-5'>Tool To Search Within Video in 2 Simple Steps:-</h3>
                    <div style={{ display: "inline-flex", alignItems: "center" }}>
                        <button className="header_button1">1</button>
                        <div style={{ border: "1px dashed green", width: "100px", height: "0px" }}></div>
                        <button className='btn btn-light header_button2'>2</button>
                    </div>
                    <p className='mt-3'><b>Select The Video Link or Video Channel From Youtube</b>(You Can Select Upto 10 Videos or 1 Channel in this demo version)</p>

                </div>
            </div>

            <div className="input-group justify-content-center" >

                <div className="dropdown mb-2">
                    <button className="btn btn-light dropdown-toggle header_dropdowntoggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {props.input_text}<i className='fa fa-angle-down' style={{ fontSize: "25px", position: "absolute", right: "5%" }}></i>
                    </button>
                    <ul className="dropdown-menu header_dropdownmenu_ul" aria-labelledby="dropdownMenuButton1">
                        <li>

                            <a onClick={props.youtube_channel} className="dropdown-item" href="#">
                                <button className="youtube_channel_url_active"style={{ border: `2px solid ${props.color}` }}>
                                    <div style={{ border: `4px solid ${props.color}`, borderRadius: "70%", marginLeft: "-2px" }}>

                                    </div>

                                </button> Youtube Channel
                            </a>
                        </li>
                        <li>
                            <a onClick={props.youtube_url} className="dropdown-item" href="#">
                                <button className="youtube_channel_url_active" style={{border: `2px solid ${props.color1} ` }}>
                                    <div style={{ border: `4px solid ${props.color1}`, borderRadius: "70%", marginLeft: "-2px" }}>

                                    </div>

                                </button> Youtube Url
                            </a>

                        </li>
                    </ul>
                </div>

                <div className="form-group w-50 mb-5">
                    <div style={{ position: "relative" }}>
                        <form onSubmit={props.Search}>
                        <input type="text" className="form-control" onChange={props.getInput} style={{ height: "50px", paddingRight: "50px" }} placeholder={props.input_text} />
                        <div style={{ position: "absolute", top: "10%", right: "8px" }}>
                            <button type="button" className="btn btn-success input_button" onClick={props.Search}><span>+</span></button>
                        </div>
                        </form>
                    </div>
                </div>


            </div>
        </>
    )
}
export default Header
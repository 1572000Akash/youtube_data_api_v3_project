import React, { useState } from "react";
import YouTube from "react-youtube";
import { FiSearch } from 'react-icons/fi'
import 'font-awesome/css/font-awesome.min.css';
import millify from "millify";
import { MdOutlineWatchLater } from 'react-icons/md'
import { AiOutlineEye } from 'react-icons/ai'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
const ytDuration = require('youtube-duration')



function Content(prop) {
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [show, setShow] = useState(false);
    const [times, setTimes] = useState()
    const [input, setInput] = useState()
    const [final, setFinal] = useState([])
    const [id, setid] = useState([])
    const [display, setdisplay] = useState('none')

    
    
    function trimString(s) {
        var l = 0, r = s.length - 1;
        while (l < s.length && s[l] == ' ') l++;
        while (r > l && s[r] == ' ') r -= 1;
        return s.substring(l, r + 1);
    }

    function compareObjects(o1, o2) {
        var k = '';
        for (k in o1) if (o1[k] != o2[k]) return false;
        for (k in o2) if (o1[k] != o2[k]) return false;
        return true;
    }

    function itemExists(haystack, needle) {
        for (var i = 0; i < haystack.length; i++) if (compareObjects(haystack[i], needle)) return true;
        return false;
    }
    function searchFor(toSearch) {
        toSearch = trimString(toSearch); // trim it
        if (prop.caption.length === 0) {
        }
        else {
            prop.caption.map((val) => {
                let results = []
                let arr = []
                for (var i = 0; i < val.length; i++) {
                    for (var key in val[i]) {

                        if (val[i][key].indexOf(toSearch) != -1) {

                            if (!itemExists(results, val[i])) results.push(val[i]);
                        }
                    }
                }

                if(results.length===0){

                }
                else{
                    return setFinal((val) => {
                        return [...val, results]
                    });
                }
            })
        }
    }

    const handleShow = (index) => {
        // let per = final[final.length - 1].start
        setTimes(parseInt(final[index].start))
        setShow(true)

    }

    function play(val1, val2) {
        setShow(true)
        setTimes(val1)
        setid(val2)

    }
    function onchandled(e) {
        setInput(e.target.value)
        setFinal([])
    }
    function displayshow(){
        setdisplay('block')
    }
    function displaydbshow(){
        setdisplay('none')
    }

    return (

        <div className="container mt-5 " >


            <div style={{ position: "relative" }}>
                <input type="text" className="form-control" onChange={onchandled} style={{ height: "50px", paddingRight: "50px" }} placeholder="search" />
                <div className="keyframes_input">
                    <button type="button" className="btn btn-success input_button" onClick={() => { searchFor(input) }}><FiSearch /></button>
                </div>
                <h1>{(final.length === 0) ? <div></div> : <div className="mt-3 "><h2>About {prop.caption.length} Results</h2></div>}</h1>
            </div>

            {

                (final.length === 0) ? <div>No data Found</div> : 
                <div>
                    {
                        prop.caption.map((captions, cap) => {
                            return (
                                <>
                                    <div onClick={()=>{displayshow()}}className="card card-video mb-3" key={cap} onDoubleClick={()=>{displaydbshow()}}>
                                        <div className="row g-0">
                                            <div className="col-lg-2 col-md-3">
                                                <img src={prop.capSnippet[cap][0]?.snippet?.thumbnails?.high.url} className="img-fluid rounded-start" style={{ height: "120px", width: "100%" }} />
                                            </div>
                                            <div className="col-lg-10 col-md-9">
                                                <div class="card-body">
                                                    <h2 className="card-title mt-1 text-truncate" style={{ fontSize: "20px" }} >{prop.capSnippet[cap][0]?.snippet?.title}</h2>
                                                    <p clasName="card-text">By: {prop.capSnippet[cap][0]?.snippet?.channelTitle}</p>
                                                    <div className="d-flex">
                                                        <p className="card-text"><MdOutlineWatchLater /> {ytDuration.format(prop.capSnippet[cap][0]?.contentDetails?.duration)}</p>
                                                        <p className="card-text" style={{ marginLeft: "auto" }}><AiOutlineEye />  {millify(prop.capSnippet[cap][0]?.statistics?.viewCount)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-lg-12 p-3 keyframes_scroll" style={{display:`${display}`}}>
                                            <h5 style={{ marginTop: "0px" }}>in this video</h5>
                                            <div className="mt-0 keyframes_bullet_parent" >
                                                {
                                                    final[cap].map((val, index) => {
                                                        let per = (val.start / captions[captions.length - 1].start) * 100
                                                        return <button className="keyframes_bullet" onClick={() => { play(val.start, prop.videoid[cap]); onOpenModal() }} style={{ marginLeft: `${per - 0.5}%` }}>
                                                        </button>
                                                    })
                                                }
                                                {
                                                    <div className="adjusta adjustb adjustc">
                                                        {final[cap].map((val, index) => {
                                                            return (
                                                                <div className="box">
                                                                    <div className="from" style={{ color: "#cf203f" }}>From {val.start}</div>
                                                                    <div className="txt t">{val.text}</div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            }



            {/* when true then call video with time latest feature */}
            {/* when true then call video with time latest feature 2*/}





            {
                show &&
                <div>
                    <Modal open={open} onClose={onCloseModal} center>
                            <YouTube videoId={id} opts={{
                                playerVars: {
                                    autoplay: 1,
                                    start: parseInt(times)
                                }
                            }} />
                    </Modal>
                </div>
            }
        </div >

    );
}

export default Content;

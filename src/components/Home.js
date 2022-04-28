import React, { useState } from 'react';
import getVideoId from 'get-video-id';
import '../App.css'
import '../App.css'
import { getSubtitles } from 'youtube-captions-scraper';
import Content from './Keyframes';
import Header from './Header';
import Yurl_channel from './Yurl_channel';
import Modal_show from './Modal_show';



const NewYoutube = () => {
    const [videoDatau, setvideoDatau] = useState([]);
    const [videoDatac, setcvideoDatau] = useState([]);
    const [input, setinput] = useState('');
    const [inputc, setCinput] = useState('');
    const [color, setcolor] = useState('black');
    const [color1, setcolor1] = useState('black');
    const [input_text, setInput_text] = useState('Youtube URL');
    const [caption, setcaption] = useState([])
    const [captionId, setcaptionId] = useState([])
    const [capSnippet, setcapSnippet] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const getInput = (e) => {
        if (input_text === 'Youtube URL') {
            setinput(getVideoId(e.target.value))
        }
        else {
            let str = e.target.value
            setCinput(str.split("channel/").pop())
        }
    }
    // /youtube url api call/ 
    const urlApi = async () => {
        let mounted = true;
        await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${input.id}&key=AIzaSyD9d5mLmQEw1G9GaPfEYR0YS33zrTiC1Hc&part=snippet,contentDetails,statistics`).then((res) => res.json()).then(
            (items) => {
                if (mounted) {
                    if (videoDatau.length < 10) {
                        setvideoDatau((val, index) => {
                            return ([...val, items.items])
                        });
                    }
                    else {
                        setShow(true)
                    }
                }
            }
        )
        return () => mounted = false;
    }
    // /youtube url delete function/ 
    const handleDelete = (index) => {
        if (input_text === 'Youtube URL') {
            setvideoDatau((val) => {
                return val.filter((a, ind) => {
                    return ind !== index
                })
            })
        }
        else {
            setcvideoDatau((val) => {
                return val.filter((a, ind) => {
                    return ind !== index
                })
            })
        }
    }

    // youtube channel api call
    const channelApi = async () => {
        let mounted = true;
        await fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyD9d5mLmQEw1G9GaPfEYR0YS33zrTiC1Hc&channelId=${inputc}&part=snippet,id&order=date&maxResults=5`).then((res) => res.json()).then(
            (items) => {
                if (mounted) {
                    setcvideoDatau((val, index) => {
                        return ([...val, items.items])
                    });
                }
            }
        )
        return () => mounted = false;
    }




    // here we get caption ,videoid,realcapSnippettion and if we hit youtube url then call api() otherwise api2() for youtube channel
    const Search = (e) => {
        e.preventDefault();
        if (input_text === 'Youtube URL') {
            getSubtitles({
                videoID: input.id, // youtube video id
                lang: 'en' // default: `en`
            }).then((captions) => {
                setcaptionId([...captionId, input.id])
                setcaption([...caption, captions])
                const captionApi = async () => {
                    let mounted = true;
                    await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${input.id}&key=AIzaSyD9d5mLmQEw1G9GaPfEYR0YS33zrTiC1Hc&part=snippet,contentDetails,statistics`).then((res) => res.json()).then(
                        (items) => {
                            setcapSnippet((val, index) => {

                                return ([...val, items.items])
                            });
                        }
                    )
                    return () => mounted = false;
                }
                captionApi()
            });
            urlApi();
        }
        else {

            channelApi()
        }
    }
    // here we change the button color of youtube channel
    function youtube_channel() {

        setInput_text('Youtube Channel')
        setcolor('green')
        setcolor1('black')
    }
    // here we change the button color of youtube Url
    function youtube_url() {
        setInput_text('Youtube URL')
        setcolor1('green')
        setcolor('black')
    }

    return (
        <>
            <div className=' mt-5'>
                <Header input_text={input_text} youtube_channel={youtube_channel} youtube_url={youtube_url} getInput={getInput} Search={Search} color={color} color1={color1} />
                <Yurl_channel input_text={input_text} videoDatau={videoDatau} handleDelete={handleDelete} videoDatac={videoDatac} />
                <Modal_show handleClose={handleClose} handleShow={handleShow} show={show} />
            </div >
            {
                <Content videoid={captionId} caption={caption} capSnippet={capSnippet} />
            }

        </>
    );
}

export default NewYoutube;
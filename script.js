// 🔗 GITHUB RAW PLAYLIST LINK (.m3u)
const playlistURL = "https://raw.githubusercontent.com/subirkumarpaul/Subirmaxpro/refs/heads/main/Subirmaxpro";

fetch(playlistURL)
.then(res => res.text())
.then(data => parseM3U(data));

function parseM3U(data){
    let lines = data.split("\n");
    let list = document.getElementById("channelList");
    list.innerHTML = "";

    for(let i=0; i<lines.length; i++){
        if(lines[i].startsWith("#EXTINF")){
            let name = lines[i].split(",")[1];
            let url = lines[i+1];

            let li = document.createElement("li");
            li.innerText = name;
            li.onclick = () => playChannel(url);
            list.appendChild(li);
        }
    }
}

function playChannel(url){
    let video = document.getElementById("video");

    if(Hls.isSupported()){
        let hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
    } else {
        video.src = url;
    }
    video.play();
}

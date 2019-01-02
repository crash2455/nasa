var apod = {

  randomDate: function(start, end){
    let date = new Date(
      start.getTime()+Math.random() *
      (end.getTime() - start.getTime())
    );

    date = new Date(2013,5,6);

    //Format Date
    let d = date.getDate();
    let m = date.getMonth()+1;
    let y = date.getFullYear();

    if(m<10){
      m='0'+m;
    }

    if(d<10){
      d='0'+d;
    }

    return `${y}-${m}-${d}`;
  },
  buildDOM: function(result) {
    document.getElementById("apodTitle").innerHTML= result.title;
    var image = document.getElementById("apodImg");
    var video = document.getElementById("apodVideo");

    if(result.media_type === 'video') {
      image.style.display = "none";
      document.querySelector("#apodVideo > iframe").src= result.url;
      video.style.display = "visible";

    }else{
      video.style.display = "none";
      image.src = result.url;
      image.style.display = "visible";
    }

    document.getElementById("apodCopyright").innerHTML = ("Copyright: " + result.copyright);
    document.getElementById("apodDate").innerHTML = ("Date: " + result.date);
    document.getElementById("apodDesc").innerHTML = (result.explanation);
  },

  //Executes an AJAX call to an API.
  getRequest: function() {
    let _this = this;
    let date = this.randomDate(new Date(1995, 5, 16), new Date());
    let url = "https://api.nasa.gov/planetary/apod?api_key=LcGRMR8ReXp7B91eLkhqcSag0JYHQKh2Y5MAAXHY&date=" + date;
    var xhr = new XMLHttpRequest();
    xhr.open('Get',url);
    xhr.send();
    xhr.onload= function(){
      let result = JSON.parse(xhr.response);

      console.log(result);
      _this.buildDOM(result);
    }
  },
  // Application Constructor
  init: function() {
    this.getRequest();
  }
};
apod.init();

document.getElementById('btnRandApod').onclick = function(){
  apod.getRequest();
};

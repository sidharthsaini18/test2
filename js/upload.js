// //oncontextmenu="return false"

const chooseFile = document.getElementById("choose-file");
var imgPreview = document.getElementById("img-preview");
const songName = document.getElementById("songname");
const url = document.getElementById("url");
const uploadBtn = document.getElementById("uploadbtn");

chooseFile.addEventListener("change", function () {
  getImgData();
});
function getImgData() {
  const files = chooseFile.files[0];
  if (files) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files);
    fileReader.addEventListener("load", function () {
      imgPreview.style.display = "block";
      imgPreview.innerHTML = '<img src="' + this.result + '" />';
    });
  }
}

document.getElementById('uploadForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const imageFile = document.getElementById('imageFile').files[0];
  const songName = document.getElementById('songName').value;
  const songUrl = document.getElementById('songUrl').value;

  const reader = new FileReader();
  reader.onload = function(e) {
      const imageUrl = e.target.result;

      const songData = {
          imageUrl: imageUrl,
          songName: songName,
          songUrl: songUrl
      };

      localStorage.setItem('songData', JSON.stringify(songData));
      window.location.href = 'card.html';
  };

  if (imageFile) {
      reader.readAsDataURL(imageFile);
  }
});
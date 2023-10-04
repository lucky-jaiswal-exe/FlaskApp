const dwnBtn = document.querySelector("#dwnBtn")
const dwnBtn2 = document.querySelector("#dwnBtn2")
const qDiv = document.querySelector('#qualities')
const alertBox = document.querySelector("#alertBox")
const successBox = document.querySelector("#successBox")
const radioField = document.querySelector("#radioBtns")
const linkInp = document.querySelector("#linkInp")
var formatInp
var linkInpVal

$(document).ready(function() {
  getSongs()
});

const getSongs = () =>{
  $.ajax({
            url: "/getSongs",
            type: "POST",
            data: "",
            success: function (i) {
              document.querySelector("#songs").innerHTML = ``
            for (let index = 0; index < i.length; index++) {
              document.querySelector("#songs").innerHTML += `
              <div
              class="w-32 my-3 px-3 text-center border-sm rounded-sm bg-gray-300 h-12 flex flex justify-center items-center">
            <h4 class="truncate">${i[index]}</h4>
        </div>
              `
            }
            }
  })
}

const download = () => {
    formatInp = document.querySelector('input[name = "FormatOption"]:checked').value
    linkInpVal = document.querySelector("#linkInp").value.trim();

    if (linkInpVal != '') {
        var data = {
            "format": formatInp,
            "link": linkInpVal
        }
        success("Fetching data....")
        $.ajax({
            url: "/download",
            type: "POST",
            data: data,
            success: function (i) {
                dwnBtn.style.display = "none"
                radioField.disabled = true
                linkInp.disabled = true
                dwnBtn2.style.display = "inline-block"
                qDiv.innerHTML = `<h3 class="col-start-1 col-end-4 text-lg font-bold ">Choose Any One : </h3>`
                for (let index = 0; index < i.length; index++) {
                    qDiv.innerHTML += `
                    <div>
                            <input type="radio" name="quality" value="${i[index]}" id="${i[index]}" class="peer hidden" checked />
    
                            <label for="${i[index]}"
                                class="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 peer-checked:border-gray-700 peer-checked:bg-gray-700 peer-checked:text-white">
                                <p class="text-sm font-medium">${i[index]}</p>
                            </label>
                        </div>
    
                    `


                }
            }
        });
    }
    else {
        alert("Link is required")
    }
}

const download2 = () => {
    
    var qualityInp = document.querySelector('input[name="quality"]:checked').value
    let qData = {
        "format":formatInp,
        "link":linkInpVal,
        "quality":qualityInp
    }
    console.log(qualityInp)
    $.ajax({
        url: "/finalDownload",
        type: "POST",
        data: qData,
        success: function (i) {
            if(i == "True"){
                success("Download Complete")
                getSongs()
                qDiv.innerHTML = ''
                dwnBtn.style.display = "inline-block"
                dwnBtn2.style.display = "none"
                radioField.disabled = false
                linkInp.disabled = false
            }
            else{
                alertBox("An Error accured while downloading file")
            }
        }
    })
}

const alert = (msg) => {
    alertBox.style.display = "block"
    alertBox.innerHTML = `
    <div class="flex items-center gap-2 text-red-800">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                <path fill-rule="evenodd"
                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clip-rule="evenodd" />
            </svg>

            <strong class="block font-medium"> Something went wrong </strong>
        </div>

        <p class="mt-2 text-sm text-red-700">
            ${msg}
        </p>
    `
    setTimeout(() => {
        alertBox.style.display = 'none'
    }, 2000);
}

const success = (msg) => {
    successBox.style.display = "block"
    successBox.innerHTML = `
    <div class="flex items-center gap-2 text-green-800">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />

        <strong class="block font-medium"> Successful </strong>
    </div>

    <p class="mt-2 text-sm text-green-700">
        ${msg}
    </p>
    `
    setTimeout(() => {
        successBox.style.display = 'none'
    }, 2000);
}


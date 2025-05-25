

let regForm = document.querySelector(".register-form");
let allInput = regForm.querySelectorAll("INPUT");
let allBtnN = regForm.querySelectorAll("BUTTON");
// console.log(allInput);
let regList = document.querySelector(".reg-list");
let closeBtn = document.querySelector(".btn-close");
let addBtn = document.querySelector(".add-btn");
let searchElm = document.querySelector(".search")
let deleteAllBtn = document.querySelector(".delete_All_Btn")
let paginationBox = document.querySelector(".pagination-box");
let nextBtn = document.querySelector(".next-btn");
let prevBtn = document.querySelector(".prev-btn");


let allRegData = [];

let url = "";

// example
// let dataReg = localStorage.getItem("allRegData");
// alert(dataReg);

if (localStorage.getItem("allRegData") != null) {
    allRegData = JSON.parse(localStorage.getItem("allRegData"))
}
// console.log(allRegData);



// Adding Data

regForm.onsubmit = (e) => {
    e.preventDefault();     // use for page not reload ( form default behavior stop )
    // console.log('success');
    // alert("Success");
    let checkEmail = allRegData.find((data) => data.email == allInput[1].value);
    // console.log(checkEmail);
    if (checkEmail == undefined) {
        allRegData.push({
            name: allInput[0].value,
            email: allInput[1].value,
            mobile: allInput[2].value,
            dob: allInput[3].value,
            password: allInput[4].value,
            profile: url == "" ? "profile.png" : url
            
        });
        localStorage.setItem("allRegData", JSON.stringify(allRegData));
        swal("Data Inserted","SuccessFully !","Success")
        closeBtn.click();
        regForm.reset('');
        getRegData(0,3);

    } else {
        swal("Email Already Exit", "Failed", "Warning");
    }
}

const getRegData = (from,to) => {
    regList.innerHTML = "";
    // let filter = allRegData.slice(0, 2);
    // console.log(filter);
    let filter = allRegData.slice(from,to);

    
    // allRegData.forEach((data,index) => {
    filter.forEach((data,index) => {

        let dataString = JSON.stringify(data);
        let finalDataString = dataString.replace(/"/g,"'")
        console.log(data,index);
        // regList.innerHTML = `
        regList.innerHTML += `
         <tr>
            <td>${index+1}</td>
            <td>
                <img src="${data.profile}" alt="img-not-found" class="rounded-circle">
            </td>
            <td>${data.name}</td>
            <td>${data.email}</td>
            <td>+91${data.mobile}</td>
            <td>${data.dob}</td>
            <td>
                <button data="${finalDataString}" idIndex=${index} class="edit-btn btn btn-primary p-1 px-2">
                    <i class="fa fa-edit"></i>
                </button>
                <button idIndex=${index} class="delete-btn btn btn-danger p-1 px-2">
                    <i class="fa fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
        
    })
    action()
}

// delete data 
const action = () => {

    // alert('')
    let allDelBtn = regList.querySelectorAll(".delete-btn");
    // console.log(allDelBtn);
    for (let btn of allDelBtn) {
        btn.onclick = async () => {
                let inConFirm = await conFirm()
            if (inConFirm) {
                let index = btn.getAttribute("idIndex");
                // alert(index);
                allRegData.splice(index,1);
                localStorage.setItem("allRegData", JSON.stringify(allRegData));
                getRegData();
                
                }
                // alert(inConFirm)
            
        }
    }
    // updating data

    let AllEditBtn = regList.querySelectorAll(".edit-btn");
    for (let btn of AllEditBtn) {
        btn.onclick = () => {
            let index = btn.getAttribute("idIndex");
            // alert(index);
            let dataString = btn.getAttribute("data");
            let finalDataString = dataString.replace(/'/g,'"')
            let letData = JSON.parse(finalDataString);
            // console.log(letData);
            addBtn.click();
            allInput[0].value = letData.name;
            allInput[1].value = letData.email;
            allInput[2].value = letData.mobile;
            allInput[3].value = letData.dob;
            allInput[4].value = letData.password;

            url = letData.profile;

            allBtnN[0].disabled = false;
            allBtnN[1].disabled = true;

            allBtnN[0].onclick = () => {
                allRegData[index] = {
                    name: allInput[0].value,
                    email: allInput[1].value,
                    mobile: allInput[2].value,
                    dob: allInput[3].value,
                    password: allInput[4].value,
                    profile: url == "" ? "profile.png" : url
                }
                localStorage.setItem("allRegData", JSON.stringify(allRegData));
                swal("Data Updated","SuccessFully !","Success")
                closeBtn.click();
                regForm.reset('');
                getRegData();
                allBtnN[1].disabled = false;
                allBtnN[0].disabled = true;
            }

        }
    }
    

}

// getRegData();
getRegData(0, 3);

// Reading Profile Data

allInput[5].onchange = () => {
    // alert('Hii....!')
    // store binary data

    let fReader = new FileReader();
    fReader.readAsDataURL(allInput[5].files[0]);
    fReader.onload = (e) => {
        url = e.target.result;
        console.log(url);
        
    }
}


// delete all data

deleteAllBtn.onclick = async () => {
    // alert("Hii");
    let isConfirm = await conFirm();
    if (isConfirm) {
        allRegData = [];
        localStorage.removeItem("allRegData");
        getRegData();
    }
}


// let confirm

const conFirm = () => {
    return new Promise((resolve, reject) => {
        swal({
            title: "Are you sure?", 
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                resolve(true);
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
                reject(false);
              swal("Your imaginary file is safe!");
            }
          });
    })
}


// searching Data

searchElm.oninput = () => {
    search();
}
const search = () => {
    // alert();
    let valueSearch = searchElm.value.toLowerCase();
    // alert(valueSearch);
    let tr = regList.querySelectorAll("TR");
    // console.log(tr);
    let i;
    for (i = 0; i < tr.length; i++)
    {
        let allTD = tr[i].querySelectorAll("TD");
        // console.log(allTD);
        let name = allTD[2].innerHTML;
        // alert(name);
        let email = allTD[3].innerHTML;
        let mobile = allTD[4].innerHTML;
        // let password = allTD[4].innerHTML;
        // let profile = allTD[4].innerHTML;

        if (name.toLocaleLowerCase().indexOf(valueSearch) != -1) {
            tr[i].style.display = "";

        }else if (email.toLocaleLowerCase().indexOf(valueSearch) != -1) {
            tr[i].style.display = "";

        }else if (mobile.toLocaleLowerCase().indexOf(valueSearch) != -1) {
            tr[i].style.display = "";

        } else {
            tr[i].style.display = "none";
            
        }
        
    }

    
}




// Pagination coding

// console.log(allRegData);

let totalLength = Number(allRegData.length / 3);
// console.log(totalLength);
// alert(totalLength);
let i, dataSkip = 0,loadData=3;
if (totalLength.toString().indexOf(".") != -1) {
    totalLength = totalLength + 1;
}
// alert(totalLength);
// console.log(totalLength);

for (let i = 1; i < totalLength; i++){
    paginationBox.innerHTML += `<button data-Skip=${dataSkip} load-data=${loadData} class="btn btn-outline-danger all-Paginate-Btn">${i}</button>`;
    dataSkip = dataSkip + 3;
    loadData = loadData + 3;
    
}

let allPaginateBtn = paginationBox.querySelectorAll(".all-Paginate-Btn");
allPaginateBtn[0].classList.add("active")
allPaginateBtn.forEach((btn,index) => {
    btn.onclick = () => {
        controlPrevAndNext(allPaginateBtn, index);
        for (let element of allPaginateBtn) {
        element.classList.remove("active")
        }
        btn.classList.add("active")
        // alert("");
        let skip = btn.getAttribute("data-Skip");
        let loaded = btn.getAttribute("load-data");
        // alert(skip);
        // alert(loaded);
        getRegData(skip,loaded);

    }
})

// next btn coding
nextBtn.onclick = ()=>{
    // alert('')
    let currentIndex = 0;
    allPaginateBtn.forEach((btn, index) => {
        if (btn.classList.contains("active")) {
            currentIndex = index;

        }
    });
    // alert(currentIndex);
    allPaginateBtn[currentIndex + 1].click();
    controlPrevAndNext(allPaginateBtn,currentIndex+1);
}
const controlPrevAndNext = (allPaginateBtn,currentIndex) => {
    let length = allPaginateBtn.length-1;
    // alert(length);
    // alert(currentIndex);
    if (currentIndex == length) {
        nextBtn.disabled = true;
        prevBtn.disabled = false;
    } else if (currentIndex > 0) {
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    } else {
        prevBtn.disabled = true;
        nextBtn.disabled = false;

    }
    
}


//  prev btn coding
prevBtn.onclick = ()=>{
    // alert('')
    let currentIndex = 0;
    allPaginateBtn.forEach((btn, index) => {
        if (btn.classList.contains("active")) {
            currentIndex = index;

        }
    });
    // alert(currentIndex);
    allPaginateBtn[currentIndex - 1].click();
    controlPrevAndNext(allPaginateBtn, currentIndex - 1);
}



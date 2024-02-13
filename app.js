import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc,
    collection,
    addDoc,
    getDoc,
    query,
    where,
    getDocs,
    orderBy,
    deleteDoc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyBxliGEyRcikcLRRxYt0pCR4sOV4f4LXYs",
    authDomain: "blogging-app-63967.firebaseapp.com",
    projectId: "blogging-app-63967",
    storageBucket: "blogging-app-63967.appspot.com",
    messagingSenderId: "460046879755",
    appId: "1:460046879755:web:618ba800e6b9abf1d48b0e",
    measurementId: "G-R28HJLJ5ZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);
getAllUserBlogs()

const signupBtn = document.getElementById("signup_btn")
const loginBtn = document.getElementById("login_btn")
const loginPage = document.getElementById("login_page")
const signupPage = document.getElementById("signup_page")
const logout = document.getElementById("logout")
const navSignUp = document.getElementById("nav_signUp")
const navLogin = document.getElementById("nav_login")
const currentUserName = document.getElementById("currentUserName")
const dashBoard = document.getElementById("dashBoard")
const dashBoardForm = document.getElementById("dashBoard_form")
const currentUserblogs = document.getElementById("currentUserblogs")
const allUserblogs = document.getElementById("allUserblogs")
const allBlogsBtn = document.getElementById("all_blogs")
const currentUserblogs_container = document.getElementById("currentUserblogs_container")
const allUserblogs_container = document.getElementById("allUserblogs_container")
const seeMoreAllBlogs_container = document.getElementById("seeMoreAllBlogs_container")
const seeMoreAllBlogsOneUserpage = document.getElementById("seeMoreAllBlogsOneUserpage")
const blogerName = document.getElementById("blogerName")
const backToAllBlogsBtn = document.getElementById("back_to_all_blogs")
const UpdateBlogForm = document.getElementById("UpdateBlogForm")
const userName = document.getElementById("userName")
const userEmail = document.getElementById("userEmail")
const updateBlogBtn = document.getElementById("updateBlogBtn")
const cencelBlogBtn = document.getElementById("cencelBlogBtn")
const seeMoreUserEmail = document.getElementById("seeMoreUserEmail")
const flieInput = document.getElementById("flieInput")
const profile_img = document.getElementById("profile_img")
const profile_page = document.getElementById("profile_page")
const seeMoreUserImage = document.getElementById("seeMoreUserImage")


currentUserName.addEventListener('click', () => {
    loginPage.style.display = "none"
    signupPage.style.display = "none"
    navLogin.style.display = "none"
    navSignUp.style.display = "none"
    profile_page.style.display = "block"
    dashBoard.style.display = "none"
    currentUserblogs.style.display = "none"
    currentUserblogs_container.style.display = "none"
    allUserblogs_container.style.display = "none"
    allBlogsBtn.style.display = "none"
})



navSignUp.addEventListener('click', () => {
    loginPage.style.display = "none"
    signupPage.style.display = "block"
    navLogin.style.display = "block"
    navSignUp.style.display = "none"
    currentUserName.style.display = "none"
    dashBoard.style.display = "none"
    currentUserblogs.style.display = "none"
    currentUserblogs_container.style.display = "none"
    allUserblogs_container.style.display = "none"
    allBlogsBtn.style.display = "none"
    profile_page.style.display = "none"

})
navLogin.addEventListener('click', () => {
    loginPage.style.display = "block"
    signupPage.style.display = "none"
    navLogin.style.display = "none"
    navSignUp.style.display = "block"
    currentUserName.style.display = "none"
    dashBoard.style.display = "none"
    allBlogsBtn.style.display = "none"
    currentUserblogs.style.display = "none"
    currentUserblogs_container.style.display = "none"
    allUserblogs_container.style.display = "none"
    profile_page.style.display = "none"
})
cencelBlogBtn.addEventListener('click', () => {
    UpdateBlogForm.style.display = "none"
})
backToAllBlogsBtn.addEventListener('click', () => {
    dashBoard.style.display = "none"
    currentUserblogs_container.style.display = "none"
    allUserblogs_container.style.display = "block"
    seeMoreAllBlogsOneUserpage.style.display = "none"
})
allBlogsBtn.addEventListener('click', () => {
    dashBoard.style.display = "none"
    currentUserblogs_container.style.display = "none"
    allUserblogs_container.style.display = "block"
})



onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        loginPage.style.display = "none"
        signupPage.style.display = "none"
        navSignUp.style.display = "none"
        navLogin.style.display = "none"
        logout.style.display = "block"
        dashBoard.style.display = "block"
        allBlogsBtn.style.display = "block"
        profile_page.style.display = "none"
        currentUserName.style.display = "block"
        currentUserblogs_container.style.display = "block"
        allUserblogs_container.style.display = "none"
        const userInfo = await getUserInfo(uid)
        currentUserName.innerHTML = userInfo.name
        getCurrentUserBlogs()
        getUserInfo(uid)
        console.log(userInfo.name);
        console.log(userInfo.Email);
        userName.innerText = userInfo.name
        userEmail.innerText = userInfo.Email
        profile_img.src = userInfo.image
        console.log("users login hai");
        // ...
    } else {
        logout.style.display = "none"
        navSignUp.style.display = "none"
        navLogin.style.display = "block"
        // profile_page.style.display = "block"
        dashBoard.style.display = "none"
        currentUserName.style.display = "none"
        currentUserblogs_container.style.display = "none"
        allBlogsBtn.style.display = "none"
        allUserblogs_container.style.display = "block"
        console.log("users login nahi hai");
        // User is signed out
        // ...
    }
});


dashBoardForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const dashboardInput = document.getElementById("dashboard_input")
    const dashboardTextarea = document.getElementById("dashboard_textarea")
    console.log("dashboardInput.value", dashboardInput.value);
    console.log("dashboardTextarea.value", dashboardTextarea.value);
    if (dashboardInput.value !== "" && dashboardTextarea.value !== "") {
        const userInfo = await getUserInfo(auth.currentUser.uid)
        const blogObj = {
            title: dashboardInput.value,
            description: dashboardTextarea.value,
            userUid: auth.currentUser.uid,
            userName: userInfo.name,
            Email: userInfo.Email,
            image: userInfo.image,
            currentTime: new Date().toLocaleString()
        }
        swal("Your Blog IS Publish", "", "success");
        const blogRef = collection(db, 'blog_post')
        await addDoc(blogRef, blogObj)
        console.log(dashboardInput.value, dashboardTextarea.value);
        console.log("blogObj ==> ", blogObj);
        getCurrentUserBlogs()
    } else {
        swal("Please add blog", "", "error");
    }
    getAllUserBlogs()
})


async function getCurrentUserBlogs() {
    const q = query(collection(db, "blog_post"), where("userUid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    currentUserblogs.innerHTML = null
    const userInfo = await getUserInfo(auth.currentUser.uid)
    querySnapshot.forEach((data) => {
        const blogInfo = data.data()
        const { title, image, currentTime, userName, description } = blogInfo
        const card = `<div class="container  card">
        <div class="d-flex align-items-center  p-2">
            <div>
                <img src="${image}"/>
            </div>
            <div class="card-title card-userInfo m-4 ">
                <div>
                    <h3 class="blog_heading">${title}</h3>
                </div>
                <div class="card-title">
                    <span class="blog_name">${userName} - </span>
                    <span class="blog_name">${currentTime}</span>
                </div>  
            </div>
        </div> 
        <div class="card-body">${description} </div>
        <div class="container pb-4">
            <button id=${data.id + "del"} class="btn btn-danger fs-6 mx-2 deleteBtn"> Delete </button>
            <button id=${data.id + "edit"} class="btn btn-success fs-6 mx- editBtn"> Edit </button>
        </div>
      </div>`
        currentUserblogs.innerHTML += card
        setTimeout(() => {
            const deleteBlogBtn = document.getElementById(data.id + "del")
            deleteBlogBtn.addEventListener('click', deleteBlogFunc)
            const editBlogBtn = document.getElementById(data.id + "edit")
            editBlogBtn.addEventListener('click', editBlogFunc)
        }, 1000);
    });
    // getCurrentUserBlogs()
}

async function deleteBlogFunc() {
    console.log("id==>", this.id);
    const deleteId = this.id.slice(0, this.id.length - 3)
    console.log(deleteId);
    await deleteDoc(doc(db, "blog_post", deleteId));
    swal("Delete Blog", "", "success");
    getCurrentUserBlogs()
}

async function editBlogFunc(e) {
    e.preventDefault()
    UpdateBlogForm.style.display = "block"
    const editId = this.id.slice(0, this.id.length - 4)
    const title = this.parentNode.parentNode.children[0].childNodes[3].childNodes[1].innerText
    const description = this.parentNode.parentNode.children[1].innerText
    const updateInput = document.getElementById("updateInput").value = title
    const updateTextarea = document.getElementById("updateTextarea").innerText = description
    let updateId = "";
    updateBlogBtn.addEventListener('click', async (e) => {
        e.preventDefault()
        updateId = editId;
        const updateTitle = document.getElementById("updateInput").value;
        const updatedescription = document.getElementById("updateTextarea").value;
        const docRef = await updateDoc(doc(db, "blog_post", editId), {
            title: updateTitle,
            description: updatedescription,
        })
        swal("Update", "Your is Update", "success");
        getCurrentUserBlogs()
        UpdateBlogForm.style.display = "none"
    })
}







async function getAllUserBlogs() {
    const querySnapshot = await getDocs(query(collection(db, "blog_post")), orderBy("currentTime", "desc"));
    allUserblogs.innerHTML = null
    querySnapshot.forEach((data) => {
        const blogInfo = data.data()
        const { title, image, currentTime, userName, description } = blogInfo
        const card = `<div class="container  card" >
        <div class="card_container p-2">
            <div>
                <img src="${image}"/>
            </div>
            <div class="card-title card-userInfo m-4 ">
                <h3 class="blog_heading">${title}</h3>
                <div class="card-title">
                    <span class="blog_name">${userName} - </span>
                    <span class="blog_name">${currentTime}</span>
                </div>  
            </div>
        </div> 
        <div class="card-body">${description} </div>
        <div class="container pb-4">
            <p id=${blogInfo.userUid} class="text-success fw-bold see_more">See more from this user</p>
        </div>
        </div>`
        allUserblogs.innerHTML += card
        setTimeout(() => {
            const seeMore = document.getElementById(blogInfo.userUid)
            seeMore.addEventListener('click', () => {
                dashBoard.style.display = "none"
                currentUserblogs.style.display = "none"
                currentUserblogs_container.style.display = "none"
                allUserblogs_container.style.display = "none"
                allBlogsBtn.style.display = "block"
                seeMoreAllBlogsOneUserpage.style.display = "block"
                seeMoreAllBlogsOneUser(seeMore.id, blogInfo.userName, blogInfo.Email, blogInfo.image)
            })
        }, 100);
    });
}



async function seeMoreAllBlogsOneUser(id, name, email, image) {
    const q = query(collection(db, "blog_post"), where("userUid", "==", id));
    blogerName.innerText = name;
    const querySnapshot = await getDocs(q);
    seeMoreAllBlogs_container.innerHTML = null
    querySnapshot.forEach((data) => {
        const blogInfo = data.data()
        const { title, image, currentTime, userName, description } = blogInfo
        const card = `<div class="container card" >
            <div class="card_container p-2">
                <div>
                    <img src="${image}"/>
                </div>
                <div class="card-title card-userInfo m-4 ">
                    <h3 class="blog_heading">${title}</h3>
                    <div class="card-title">
                        <span class="blog_name">${userName} - </span>
                        <span class="blog_name">${currentTime}</span>
                    </div>  
                </div>
            </div> 
            <div class="card-body">${description} </div>
          </div>`
        seeMoreAllBlogs_container.innerHTML += card
    });
}






let user_img_url = null

flieInput.addEventListener('change', (e) => {
    console.log(flieInput);
    console.log(e.target.files[0]);
    const imgRef = ref(storage, 'user-image' + e.target.files[0].name);
    console.log(imgRef);
    uploadBytes(imgRef, e.target.files[0])
        .then((snapshot) => {
            console.log(snapshot);
            getDownloadURL(imgRef)
                .then(url => {
                    console.log("url==>", url);
                    user_img_url = url
                })
                .catch(err => console.error(err))
        });

})


async function getUserInfo(uid) {
    const userRef = doc(db, "users", uid)
    const docSnap = await getDoc(userRef);
    let userinfo = null
    if (docSnap.exists()) {
        userinfo = docSnap.data()
    } else {
        console.log("No such document!");
    }
    return userinfo
}



signupBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const firstName = document.getElementById("first_name").value
    const lastName = document.getElementById("last_name").value
    const fullName = firstName + " " + lastName
    const signupEmail = document.getElementById("signup_email")
    const signupPassword = document.getElementById("signup_password")
    const repeatPassword = document.getElementById("repeat_password")
    if (signupPassword.value === repeatPassword.value) {
        createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const userInfo = {
                    name: fullName,
                    Email: signupEmail.value,
                    image: user_img_url,
                    uid: user.uid
                }
                const userRef = doc(db, 'users', user.uid)
                await setDoc(userRef, userInfo)
                swal("Login Successfully!", "Wellcome to My Website", "success");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                swal('Oops...', errorMessage, "error");
            });
    } else {
        alert("Passwords do not match.")
    }
})

loginBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const loginEmail = document.getElementById('login_email')
    const loginPassword = document.getElementById('login_password')
    console.log(loginEmail.value, loginPassword.value);
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
        .then((userCredential) => {
            const user = userCredential.user;

            swal("Login Successfully!", "Wellcome to My Website", "success");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
            console.log(errorMessage);
            swal('Oops...', errorMessage, "error");
        });
})


logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log("Logout");
        swal("Logout Successfully!", "", "success");
    }).catch((error) => {
    });
})
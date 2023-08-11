/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import avt from "../img/avt.gif";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db,auth, storage } from "../fire.js";
import { ref, uploadBytesResumable, getDownloadURL,uploadBytes } from "firebase/storage";
import { doc, setDoc,collection, addDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { useNavigate, Link } from "react-router-dom";
// import { db } from "../fire";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate =useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    // const file = e.target[3].files[0];
    const displayImg = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // const storage = getStorage();
      const storageRef = ref(storage, `${email}/userimg`);
      console.log(e.target[3].files[0]);

      uploadBytes(storageRef, e.target[3].files[0]).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });

      // eslint-disable-next-line no-undef
      const uploadTask = uploadBytesResumable(storageRef, e.target[3].files[0]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          // switch (snapshot.state) {
          //   case 'paused':
          //     console.log('Upload is paused');
          //     break;
          //   case 'running':
          //     console.log('Upload is running');
          //     break;
          // }
        },
        (err) => {
          setErr(true);
          setErr(err.message);
          console.error("erroe" + err.message);
        },
        async () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
             updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
             
            });
            console.log(downloadURL);
            console.log("File available at", downloadURL);
            // eslint-disable-next-line no-undef
            //  setDoc(doc(db, "users", res.user.uid), {
            //   uid: res.user.uid,
            //   displayName : "",
            //   email: "",
            //   photoURL: downloadURL
            // });

          // try {
          //   const docRef = await addDoc(collection(db, "users"), {
          //     first: "Ada",
          //     last: "Lovelace",
          //     born: 1815
          //   });
          //   console.log("Document written with ID: ", docRef.id);
          // } catch (e) {
          //   console.error("Error adding document: ", e);
          // }

          // try {
          //   const docRef = await addDoc(collection(db, "users"), {
          //     first: "Alan",
          //     middle: "Mathison",
          //     last: "Turing",
          //     born: 1912
          //   });
          
          //   console.log("Document written with ID: ", docRef.id);
          // } catch (e) {
          //   console.error("Error adding document: ", e);
          // }

           setDoc(doc(db,  "users", res.user.uid), {
            // name: "Los Angeles",
            // state: "CA",
            // country: "USA"
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL
          })
          .then(()=>{
            console.log("successfully added");
          })
          .catch((err)=>{
            console.log(err)
          })

          await setDoc(doc(db, "userChats", res.user.uid), {});
          navigate("/")

          });
        }
      );
    } catch (err) {
      setErr(true);
      setErr(err.message);
      console.error("erroe" + err.message);
    }
    // .then((userCredential) => {
    //   // Signed in
    //   const user = userCredential.user;
    //   console.log(user);
    //   // ...
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // ..
    // });
  };
  // const auth = getAuth();

  return (
    <>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="lgo">Panchayat</span>
          <span className="title">Register</span>
          <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder="User Name" />
            <input type="email" placeholder="User Email" />
            <input type="password" placeholder="User Password" />
            <input type="file" style={{ display: "none" }} id="file" />
            <label htmlFor="file">
              <img src={avt} />
              <span>Add an avtar</span>
            </label>
            <b>{err}</b>
            <button>Sign Up</button>
          </form>
          <p>Do you have an account? <Link>Login</Link></p>
        </div>
      </div>
    </>
  );
};

export default Register;

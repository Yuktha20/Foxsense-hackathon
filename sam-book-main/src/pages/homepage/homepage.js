import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import Navbar from "../../components/navbar/navbar";
import "./homepage-style.css";
import { collection, query, getDocs, getFirestore } from "firebase/firestore";
import { Button } from "@mui/material";

function HomePage() {
  let navigate = useNavigate();
  let db = getFirestore();

  let [loading, setLoading] = useState(true);
  // empty array is initialized in usestate
  let [bookResult, setBookResult] = useState([]);
  let getBooks = async () => {
    const q = query(collection(db, "reference"));
    const querySnapshot = await getDocs(q);

    let allBooks = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      allBooks.push(doc.data());
    });

    setBookResult(allBooks);
    setLoading(false);
  };
  //   useEffect runs when a component is rendered(screen is loaded), so when the homepage loads we check if there is a user in local storage(browser cache), if no then we send the user to welcome page(signin or login)
  useEffect(() => {
    let user = reactLocalStorage.get("user");
    // if no user send to welcome page
    if (!user) {
      navigate("/");
    }
    // if user - fetch the books from firestore
    // https://firebase.google.com/docs/firestore/query-data/get-data?authuser=7#get_multiple_documents_from_a_collection
    else {
      getBooks();
    }
  }, []);
  //   The above [] means run useEffect only once

  return (
    <div>
      <Navbar />

      <div className="books-result">
        {/* waiting for the data to be fetched from firestore */}
        {loading ? (
          <div>
            <h1>Loading</h1>
          </div>
        ) : (
          <div className="book-component">
            <h1 style={{ padding: "2rem" }}>Book Discovery</h1>
            {bookResult.map((value, index) => {
              console.log(value, index);
              return (
                <div className="each-book" key={index}>
                  <div>
                    <h2>{value.BookName}</h2>
                    <h3>{value.AuthorName}</h3>
                    <h3>{value.Genre}</h3>
                  </div>
                  <div>
                    <Button variant="contained" color="success">
                      {" "}
                      Favorite
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;

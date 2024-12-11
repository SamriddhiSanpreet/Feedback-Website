
import { useState } from 'react';

export default function Home() {
  
  // State to store the feedback data and error messages

  const [feedbackList, setFeedbackList] = useState([]); 
  const [rating, setRating] = useState(0);
  const [username, setUsername] = useState('');
  const [comments, setComments] = useState('');
  const [errors, setErrors] = useState({ username: '', rating: '', comments: '' });

  // Handle star rating

  const handleRating = (ratingValue) => {
    setRating(ratingValue);
    setErrors((prevErrors) => ({ ...prevErrors, rating: '' })); 
  };

  // Handle form submission

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors before validating

    setErrors({ username: '', rating: '', comments: '' });

    // Validate fields

    let valid = true;
    const newErrors = {};

    if (!username) {
      newErrors.username = '*Username is required.';
      valid = false;
    }

    if (username.length < 5) {
      newErrors.username = '*Username must be at least 5 characters long.';
      valid = false;
    }

    if (rating === 0) {
      newErrors.rating = '*Please select a rating.';
      valid = false;
    }

    if (!comments) {
      newErrors.comments = '*Comments are required.';
      valid = false;
    }
    if (comments.length < 10) {
      newErrors.comments = '*Comments must be at least 10 characters long.';
      valid = false;
    }

    // If validation failed, set error messages and stop the submission

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    // Collect the form data

    const newFeedback = {
      username,
      rating,
      comments,
    };

    // Add the new feedback to the feedback list

    setFeedbackList((prevFeedbackList) => [...prevFeedbackList, newFeedback]);

    // Reset form fields after submission

    setRating(0);
    setUsername('');
    setComments('');
  };

  return (
    <>
      {/* .......................HEADER.............................  */}

      <header className="d-flex justify-between">
        <div className="logo">
          <h3>COMPANY NAME</h3>
        </div>
        <nav>
          <ul className="d-flex">
            <li>Home</li>
            <li>About</li>
            <li>Projects</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>

      {/* ........................HOME PAGE............................  */}

      <section className="banner">
        <div className="row">
          <div className="col-2">
            <div className="banner-item">
              <h1>WE WANT YOUR FEEDBACK</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                id optio, inventore asperiores laboriosam ipsam aliquid at qui
                cupiditate autem ad corrupti nobis sapiente mollitia, assumenda
                eaque atque. Perspiciatis sequi expedita consequuntur totam?
                Facere suscipit similique fugiat odio harum et, consectetur sed,
                minima odit repellat doloremque molestias. Repellendus, laudantium
                est?
              </p>
              <div className="theme-btn">
                <a href="./Feedback.jsx">GET STARTED</a>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="banner-img">
              <img
                src="src/assets/img/3.png"
                alt="banner-img"
                title="banner-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ........................Feedback Section............................ */}

      <section className="feedback">
        <div className="feedback-title">
          <h2>PLEASE SHARE YOUR FEEDBACK</h2>
        </div>
        <div className="feedback-inner d-flex align-items-center">
          <div className="col-2">
            <div className="feedback-img">
              <img src="src/assets/img/2.jpg" alt="banner-img" title="banner-img" />
            </div>
          </div>
          <div className="col-2">
            <div className="feedback-form">
              <h2>We Appreciate Your Feedback</h2>
              <form onSubmit={handleSubmit}>
                <label>USERNAME</label>
                <input
                  type="text"
                  placeholder="Please Enter Your Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <p className="error-message" style={{ color: 'red', fontSize: '15px', fontFamily: 'Lato, sans-serif', fontWeight: '400' }}>{errors.username}</p>}

                <label>HOW WAS YOUR EXPERIENCE?</label>

                <div className="rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${rating >= star ? 'filled' : ''}`}
                      onClick={() => handleRating(star)}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
                {errors.rating && <p className="error-message" style={{ color: 'red', fontSize: '15px', fontFamily: 'Lato, sans-serif', fontWeight: '400' }}>{errors.rating}</p>}

                <label style={{ margin: '1.5rem 0 5px 0' }}>DO YOU HAVE ANY OTHER COMMENTS OR SUGGESTIONS?</label>
                <textarea
                  placeholder="Write your comments here..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
                {errors.comments && <p className="error-message" style={{ color: 'red', fontSize: '15px', fontFamily: 'Lato, sans-serif', fontWeight: '400' }}>{errors.comments}</p>}

                <input type="submit" value="Submit" style={{ background: '#000', color: '#fff' }} className='submitfun' />
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* .....................Display submitted feedback................................ */}

      <section className="view">
        <div className="view-title">
          <h2>VIEW OUR CLIENTS FEEDBACK</h2>
        </div>
        <div className="view-inner">
          {feedbackList.length > 0 ? (
            feedbackList.map((feedback, index) => (
              <section key={index} className="submitted-data">
                <p style={{fontSize:"1.5rem",margin:"10px 0"}}>{"⭐".repeat(feedback.rating)}</p>
                <p style={{fontSize:"3rem",textTransform:"uppercase",fontFamily: 'Lato, sans-serif',fontWeight: '600'}}>{feedback.username}</p>
                <p style={{fontSize:"20px",maxWidth:"500px",wordWrap:"break-word",marginTop:"20px"}}>{feedback.comments}</p>
              </section>
            ))
          ) : (
            <p className='no-feedback'>No feedback submitted yet.</p>
          )}
        </div>
      </section>
    </>
  );
}

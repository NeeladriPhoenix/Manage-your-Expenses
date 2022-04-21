import React from "react";
import "./Review.css";

function Review() {
  return (
    <div className="review">
      <div className="review-container first">
        <div className="review-row feedback">
          <h4>FEEDBACK</h4>
          <h1>Here's what the early birds had to say 📢</h1>
          <p>
            Every opinion matters and we take our customers seriously. If you
            have anything to add, or just want to talk about expenses, do
            contact us asap.
          </p>
        </div>
        <div className="review-row color-card">
          <div className="color-card-image">
            <img
              src="https://media-exp1.licdn.com/dms/image/C5603AQG5iBbq23n0Iw/profile-displayphoto-shrink_400_400/0/1645600344381?e=1655942400&v=beta&t=mIcRPEeRQc3IJSHmwhC0YFrMa_c1tljRO_AB7-Feca8"
              alt=""
            />
          </div>
          <p>
            Being a food blogger I have to travel all different places so I need
            to keep a track of all the money movements for which this app help
            me a lot.
          </p>
          <div className="review-name">
            <span>
              <strong>Divyansh Singh</strong>
            </span>
            <span>User, Bangalore</span>
          </div>
        </div>
      </div>
      <div className="review-container">
        <div className="review-row color-card">
          <div className="color-card-image">
            <img
              src="https://media-exp1.licdn.com/dms/image/C5603AQGbrWuzVf0lHQ/profile-displayphoto-shrink_400_400/0/1628230237773?e=1655942400&v=beta&t=hemFDQ_n4hZvdMyh1ue7TcSEwWdust7dI067BBSpnMQ"
              alt=""
            />
          </div>
          <p>
            I moved to Bangalore 2 months back after working from home so when I
            shifted over there. There was a ton of expenses for which I always
            wanted an app or a website to track my expense and I recently cam
            across this app and I was pretty much impressed.
          </p>
          <div className="review-name">
            <span>
              <strong>Neeladri Kar</strong>
            </span>
            <span>User, Jharkhand</span>
          </div>
        </div>
        <div className="review-row color-card">
          <div className="color-card-image">
            <img
              src="https://media-exp1.licdn.com/dms/image/C4D03AQEFEXP-92GO5g/profile-displayphoto-shrink_400_400/0/1633790862966?e=1655942400&v=beta&t=HmUU3QtpwStfAEbOiKcIo8M0MfXEaAf-eG_dktocYh8"
              alt=""
            />
          </div>
          <p>
            I am a student and I have to keep record of all expenses including
            my school fees ,tution fees etc. I found this app very much helpful.
          </p>
          <div className="review-name">
            <span>
              <strong>Soumodeep Naskar</strong>
            </span>
            <span>User, West Bengal</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;

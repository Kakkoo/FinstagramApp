import React, { Component } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getPost } from "../../actions/postActions";

class Post extends Component {
  render() {
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            {/* card  */}
            <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2 profile-content">
                  <Link to="profile.html">
                    <img
                      className="profile-img rounded-circle d-none d-md-block"
                      src="https:\/\/0.gravatar.com\/avatar\/b258c6a54d33a27183639ac972107a12=150"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="col-md-10">
                  <h2 align="right" className="header">
                    <i className="fas fa-photo-video"></i> Post
                  </h2>
                  <h6 className="card-title">Michael Dam</h6>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                </div>
              </div>
              <div className="row followers-following">
                <div className="col-md-2"></div>
                <div className="col-md-3">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-people-fill"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
                    />
                  </svg>
                  <small> followers: 40</small>
                </div>
                <div className="col-md-3">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-people"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1h7.956a.274.274 0 0 0 .014-.002l.008-.002c-.002-.264-.167-1.03-.76-1.72C13.688 10.629 12.718 10 11 10c-1.717 0-2.687.63-3.24 1.276-.593.69-.759 1.457-.76 1.72a1.05 1.05 0 0 0 .022.004zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10c-1.668.02-2.615.64-3.16 1.276C1.163 11.97 1 12.739 1 13h3c0-1.045.323-2.086.92-3zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
                    />
                  </svg>
                  <small> following: 100</small>
                </div>
                <div className="col-md-4"></div>
              </div>
              <div className="container">
                <div className="row justify-content-center post-img-card">
                  <div className="col-8 post-img" align="center">
                    <img
                      id="post"
                      crossorigin
                      src="http://res.cloudinary.com/socialconnexion/image/upload/v1601126395/nwcxvn5xqw1ai5bgzaej.jpg"
                      className="card-img-bottom"
                      alt="..."
                    />

                    <p>
                      <i className="far fa-heart"></i> <small>3447 likes</small>
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 comment-form">
                  <form>
                    <div className="input-group">
                      <div className="input-group-prepend valign">
                        <span className="input-group-text">
                          <i className="fas fa-comment-dots"></i>
                        </span>
                      </div>
                      <textarea
                        className="form-control"
                        aria-label="With textarea"
                        placeholder="Add your comment!"
                      ></textarea>
                      <button type="submit" className="btn btn-secondary">
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="row">
                {/* View Comments */}
                <div className="col-md-12">
                  <div className="accordion" id="accordionExample">
                    <div className="card">
                      <div className="card-header" id="headingOne">
                        <h2 className="mb-0">
                          <button
                            className="btn btn-link btn-block text-left"
                            data-toggle="collapse"
                            data-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            View comments
                          </button>
                        </h2>
                      </div>
                      <div
                        id="collapseOne"
                        className="collapse show comment-body"
                        aria-labelledby="headingOne"
                        data-parent="#accordionExample"
                      >
                        <div className="row">
                          <div className="col-md-1 comment">
                            <Link to="profile.html">
                              <img
                                id="profile-mini"
                                className="rounded-circle d-none d-md-block"
                                src="https://www.gravatar.com/avatar/anything?s=50&d=mm"
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="col-md-11">
                            <div className="comment-text">
                              {" "}
                              <p className="card-text">
                                <small>
                                  This is a wider card with supporting text
                                  below as a natural lead-in to additional
                                  content. This content is a little bit longer.
                                </small>
                              </p>
                              <hr />
                            </div>
                          </div>

                          <div className="col-md-1 comment">
                            <Link to="profile.html">
                              <img
                                id="profile-mini"
                                className="rounded-circle d-none d-md-block"
                                src="https://www.gravatar.com/avatar/anything?s=50&d=mm"
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="col-md-11">
                            <div className="comment-text">
                              {" "}
                              <p className="card-text">
                                <small>
                                  This is a wider card with supporting text
                                  below as a natural lead-in to additional
                                  content. This content is a little bit longer.
                                </small>
                              </p>
                              <p className="card-text">
                                <small>
                                  This is a wider card with supporting text
                                  below as a natural lead-in to additional
                                  content. This content is a little bit longer.
                                  This is a wider card with supporting text
                                  below as a natural lead-in to additional
                                  content. This content is a little bit longer.
                                </small>{" "}
                                <svg
                                  width="1em"
                                  height="1em"
                                  viewBox="0 0 16 16"
                                  className="bi bi-emoji-smile"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                                  />
                                  <path
                                    fill-rule="evenodd"
                                    d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683z"
                                  />
                                  <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                                </svg>
                              </p>
                              <hr />
                            </div>
                          </div>
                          <div className="col-md-1 comment">
                            <Link to="profile.html">
                              <img
                                id="profile-mini"
                                className="rounded-circle d-none d-md-block"
                                src="https://www.gravatar.com/avatar/anything?s=50&d=mm"
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="col-md-11">
                            <div className="comment-text">
                              {" "}
                              <p className="card-text">
                                <small>
                                  This is a wider card with supporting text
                                  below as a natural lead-in to additional
                                  content. This content is a little bit longer.
                                </small>
                              </p>
                              <p className="card-text">
                                <small>
                                  This is a wider card with supporting text
                                  below as a natural lead-in to additional
                                  content. This content is a little bit longer.
                                </small>
                                <svg
                                  width="1em"
                                  height="1em"
                                  viewBox="0 0 16 16"
                                  className="bi bi-heart-fill"
                                  fill="red"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                                  />
                                </svg>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
